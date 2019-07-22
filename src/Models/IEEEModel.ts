export interface IEEEModel {
    sign: string,
    exponent: string,
    significant: string,
    lossPrecission?:boolean,
    errorExponent?:boolean,
    errorBase?:boolean
}
export interface IEEENormalizeModel {
    negative: boolean,
    exponent: number,
    number: string,
    decimal: string
}