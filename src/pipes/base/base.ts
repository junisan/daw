import { Pipe, PipeTransform } from '@angular/core';
import {BigNumber} from "bignumber.js";

@Pipe({
  name: 'base',
})
export class BasePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let bases = args[0];
    let baseFrom = bases[0], baseTo = bases[1];

    return new BigNumber(value, baseFrom).toString(baseTo);
  }
}
