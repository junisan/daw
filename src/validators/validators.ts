import {FormControl} from "@angular/forms";

export class Validators{
  static binaryCharValidator(control: FormControl){
    let value:string = control.value;
    if(value === '1' || value === '0'){
      return null;
    }else{
      return{
        binaryChar:{
          valid: false
        }
      }
    }
  }

  static binaryStringValidator(control: FormControl){
    if(/^([01]+)$/.test(control.value)){
      return null;
    }else{
      return{
        binary:{
          valid: false
        }
      }
    }
  }
}
