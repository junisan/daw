import {Injectable} from '@angular/core';
import {BigNumber} from "bignumber.js";
import {IEEEModel, IEEENormalizeModel} from "../../Models/IEEEModel";

@Injectable()
export class IeeeProvider {

    constructor() {
    }

    /**
     * A partir de un signo, exponente y mantisa, devuelve el número en formato decimal utilizando IEEE con bit impli.
     * @param {string} sign Bit de signo. 1 o 0
     * @param {string} exponent Bits del exponente (que representa la posición dentro del rango de N bits). 1s o 0s
     * @param {string} significant Bits de la parte significante o mantisa. 1s o 0s
     * @constructor
     */
    public IeeeToNumber(sign: string, exponent: string, significant: string): string {
        //Calculamos el límite inferior del rango del exponente
        let lowExponentRange: number = -1 * Math.pow(2, (exponent.length - 1));
        //Calculamos el desplazamiento desde el rango inferior del exponente
        let offsetExponentPosition: number = parseInt(exponent, 2);
        //Obtenemos el valor numérico del exponente
        let exponentValInt: number = lowExponentRange + offsetExponentPosition;
        //Registramos la parte entera y la parte decimal del resultado.
        //Contiene el bit implícito.
        let decimalResult: string[] = ["1", significant];

        //Hasta que el exponente no sea cero, desplazar la coma.
        //Esto se consigue pasando de la parte entera a la decimal o viceversa
        while (exponentValInt !== 0) {
            if (exponentValInt > 0) {
                //La coma se corre hacia la derecha, pasando el primer dígito de la parte decimal
                //al último carácter de la parte entera.
                if (decimalResult[1] === '') decimalResult[1] = '0';
                decimalResult[0] += decimalResult[1].charAt(0);
                decimalResult[1] = decimalResult[1].substr(1);
                exponentValInt--;
            } else {
                //La coma se corre hacia la izda, pasando el último dígito de la parte entera
                //al primer carácter de la parte decimal.
                if (decimalResult[0] === '') decimalResult[0] = '0';
                decimalResult[1] = decimalResult[0].slice(-1) + decimalResult[1];
                decimalResult[0] = decimalResult[0].substr(0, decimalResult[0].length - 1);
                exponentValInt++;
            }
        }
        //Añadimos el signo
        let result = parseInt(sign) === 0 ? '' : '-';
        //Añadimos la parte entera
        result += (decimalResult[0] === '') ? '0' : decimalResult[0];
        //Añadimos la parte decimal (si hubiese)
        if (decimalResult[1] !== '') result += '.' + decimalResult[1];

        return result;
    }

    /**
     * A partir de un número, la base en la que está indicado, la cantidad de bits a usar por el exponente y la cantidad
     * de bits que dispone la mantisa, convierte un número "decimal" a formato IEEE con bit implícito.
     * @param {string} number Número con o sin parte decimal
     * @param {string} base Base en la que está expecificado el número
     * @param {number} exponentBits Número de bits a utilizar por el exponente
     * @param {number} significantBits Número de bits a utilizar por la parte significativa o mantisa
     * @return IEEEModel con el signo, exponente, mantisa y si ha perdido precisión en la redución de mantisa
     */
    public NumberToIEEE(number: string, base: string, exponentBits: number, significantBits: number)
        : IEEEModel {

        let numberInBase: BigNumber = new BigNumber(number, parseInt(base));
        if (numberInBase.isNaN()) {
            return {sign:null,exponent:null,significant:null,lossPrecission:null,errorExponent:null, errorBase: true};
        }
        let numberObject: IEEENormalizeModel = IeeeProvider.normalizeNumber(numberInBase.toString(2));
        let lossPrecission: boolean = (numberObject.decimal.length > significantBits);
        let exponentPosition = IeeeProvider.calculateExpRange(numberObject.exponent, exponentBits);
        if (exponentPosition === null) {
            return {sign: null, exponent: null, significant: null, lossPrecission: null, errorExponent: true};
        }
        //Rellenar el final de mantisa con ceros
        while(numberObject.decimal.length < significantBits) numberObject.decimal+= '0';

        return {
            sign: numberObject ? '0' : '',
            exponent: exponentPosition,
            significant: numberObject.decimal.substr(0, significantBits),
            lossPrecission: lossPrecission
        };

    }

    /**
     * Normaliza un número en formato 1,AAAAA x 2 ^ EXP
     * Devuelve un array con campos number (parte entera), decimal (parte decimal purgada de ceros a la dcha.),
     * exponent (número al que elevar a dos) y negative (boolean que indica si el número es negativo).
     * @param {string} number Número binario en formato \d+(\.\d+)?
     */
    protected static normalizeNumber(number: string): IEEENormalizeModel {
        let result = {negative: false, exponent: 0, number: '0', decimal: '0'};
        let pattern = /^(-)?(\d+)(\.\d+)?$/;
        if (!pattern.test(number)) return null;
        let fragments: object = pattern.exec(number);

        //Si el campo 1 es el signo negativo, lo marcamos.
        if (fragments[1] !== undefined) result.negative = true;

        //Si no hay parte decimal, establecemos a ''. En caso contrario, quitamos el caracter punto
        if (fragments[3] !== undefined) fragments[3] = fragments[3].substr(1);
        else fragments[3] = '';

        //Si hay parte entera, la coma avanza a la izda. (aumentando exp.)
        //si no, la coma retrocede hacia la dcha. (reduciendo exp.).
        //Recorremos el string entero desde la izda en busca del primer 0.
        for (let i = 0; i < fragments[2].length; i++) {
            if (fragments[2].charAt(i) === '1') {
                //Primer 1 localizado. Establecemos la coma detrás de él y pasamos el resto
                //de parte entera al comienzo de la parte decimal. Aumentamos también el exponente
                //tantos caracteres como hayamos movido a la parte decimal.
                result.number = '1';
                result.decimal = this.purgeZerosDecimalPart(fragments[2].substr(i + 1) + fragments[3]);
                result.exponent = fragments[2].length - (i + 1);
                console.log(result);


                return result;
            }
        }
        //Llegados aquí, no había parte entera, por lo que empezamos a procesar la decimal.
        //El exponente será negativo.
        for (let i = 0; i < fragments[3].length; i++) {
            if (fragments[3].charAt(i) === '1') {
                //Primer 1 localizado en parte decimal.
                //Lo convertimos en parte entera, eliminando los 0 antecesores
                //El exponente es -1 * número de caracteres hasta el 1.
                result.number = '1';
                result.decimal = this.purgeZerosDecimalPart(fragments[3].substr(i + 1));
                result.exponent = -1 * (i + 1);
                console.log(result);
                return result;
            }
        }

        return result;
    }

    /**
     * Elimina los ceros a la derecha del número pasado
     * @param {string} decimal Número a purgar
     * @return string Número con los ceros insignificantes a la derecha eliminados
     */
    protected static purgeZerosDecimalPart(decimal: string): string {
        let i;
        //Determinar en qué posición se encuentra el primer 1 desde el final.
        for (i = (decimal.length - 1); i >= 0; i--) {
            if (decimal.charAt(i) === '1') break;
        }
        let returnString = decimal.substr(0, i + 1);
        return returnString === '' ? '0' : returnString;
    }

    /**
     * Calcula la posición del rango (zona exponente de IEEE) que ocupará un número decimal dado
     * dentro de los n-bits disponibles para guardar dicho valor
     * @param {number} exponente Número en base 10 del exponente a guardar
     * @param {number} bits Número de bits disponibles para guardar
     * @return {string, null} String representando en binario la posición dentro del rango o null si no puede ser
     *                              representado con dicha cantidad de bits.
     */
    protected static calculateExpRange(exponente: number, bits: number): string {
        let range: object = [-1 * Math.pow(2, bits - 1), Math.pow(2, bits - 1) - 1];
        if (exponente < range[0] || exponente > range[1]) {
            return null;
        }

        //Primer elemento del rango + posición en el rango = valor del exponente
        // Posición del rango = valor del exponente - Primer elemento del rango
        let expBinary: string = (exponente - range[0]).toString(2);

        //Si la longitud del exponente es menor que los bits disponibles, lo rellenamos con 0
        while (expBinary.length < bits) {
            expBinary = '0' + expBinary;
        }
        return expBinary;
    }
}
