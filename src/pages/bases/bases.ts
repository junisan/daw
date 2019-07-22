import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BigNumber} from 'bignumber.js';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the BasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bases',
    templateUrl: 'bases.html',
})
export class BasesPage {
    form:FormGroup;
    operation = {numero: 15, deBase: 10, aBase: 2, resultado: '1111'};

    constructor(public navCtrl: NavController, public navParams: NavParams,
                fb:FormBuilder) {
        this.form = fb.group({
            numero: [15, Validators.required],
            enBase: [10, this.rangeBaseValidator],
            aBase:  [2, this.rangeBaseValidator]
        });

        this.form.statusChanges.subscribe((valido)=>{
            try{
                let numero:number = parseFloat(this.form.controls['numero'].value);
                let enBase:number = parseFloat(this.form.controls['enBase'].value);
                let aBase:number = parseFloat(this.form.controls['aBase'].value);

                try{
                    let a = new BigNumber(numero, enBase);
                    this.operation.resultado = a.toString(aBase);
                }catch(err){
                    console.error('Hay algo mal: '+ err.message);
                }
            }catch{

            }


        });
    }

    ionViewDidLoad() {

    }

    public invertir(){
        let numero = this.operation.resultado;
        let aBase  = this.form.controls['enBase'].value;
        let enBase = this.form.controls['aBase'].value;

        this.form.controls['numero'].setValue(numero);
        this.form.controls['aBase'].setValue(aBase);
        this.form.controls['enBase'].setValue(enBase);

    }

    rangeBaseValidator(control: FormControl) {
        let number:number;
        if(/\d+?/.test(control.value)){
            number = parseInt(control.value);
        }else{
            number = -1;
        }
        if(number >= 2 && number <= 20) return null;
        return{
            range:{
                valid: false
            }
        }
    }
}
