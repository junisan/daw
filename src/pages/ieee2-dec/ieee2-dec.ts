import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IeeeProvider} from "../../providers/ieee/ieee";
import {Validators} from '../../validators/validators';

@IonicPage()
@Component({
  selector: 'page-ieee2-dec',
  templateUrl: 'ieee2-dec.html',
})
export class Ieee2DecPage {
  public form:FormGroup;
  public result:string = '1101.1';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fb: FormBuilder, public ieee: IeeeProvider) {
      this.form = fb.group({
          signo: ['0', Validators.binaryCharValidator],
          exponente: ['111', Validators.binaryStringValidator],
          mantisa:  ['1011', Validators.binaryStringValidator]
      });

      this.form.valueChanges.subscribe(() => {
          if(!this.form.valid){
            this.result = null;
          }else{
              this.result = this.ieee.IeeeToNumber(
                  this.form.controls['signo'].value.toString(),
                  this.form.controls['exponente'].value.toString(),
                  this.form.controls['mantisa'].value.toString()
              );
          }
      });
  }

  ionViewDidLoad() {}

}
