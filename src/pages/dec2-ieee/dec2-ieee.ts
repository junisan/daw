import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IeeeProvider} from "../../providers/ieee/ieee";
import {IEEEModel} from "../../Models/IEEEModel";

@IonicPage()
@Component({
  selector: 'page-dec2-ieee',
  templateUrl: 'dec2-ieee.html',
})
export class Dec2IeeePage {
  form:FormGroup;
  result:IEEEModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fb:FormBuilder, public ieee: IeeeProvider) {
    this.form = fb.group({
        numero: ['0.0110111', Validators.required],
        base: ['2', Validators.required],
        expB: ['3', Validators.required],
        manB: ['4', Validators.required],
    });
    this.form.valueChanges.subscribe(()=>{
        if(this.form.valid){
            this.result = this.ieee.NumberToIEEE(
                this.form.controls['numero'].value,
                this.form.controls['base'].value,
                parseInt(this.form.controls['expB'].value),
                parseInt(this.form.controls['manB'].value)
            );
            console.log(this.result);
        }else this.result = null;
    });

    //Primera carga
    this.result = this.ieee.NumberToIEEE('0.0110111', '2', 3, 4);
  }

}
