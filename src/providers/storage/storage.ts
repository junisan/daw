// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  constructor() {}

    /**
     * Recupera una variable del almacenamiento definido
     * @param {string} name Nombre de la variable
     * @return {string|object|null}
     */
  public getVariable(name:string):string|object|null{
    return StorageProvider.readFromLocal(name);
  }

    /**
     * Escribe una variable en el almacenamiento definido
     * @param {string} name
     * @param {string, object, null} value
     */
  public writeVariable(name:string, value:string|object):void{
    return StorageProvider.writeToLocal(name, value);
  }

    /**
     * Intenta recuperar una variable del almacenamiento local.
     * Si fue guardado como string, recuperará el string. Recuperará
     * el objecto si fue guardado como tal.
     * @param {string} name Nombre de la variable a recuperar
     * @return {string|object|null} Variable recuperada o null si no existía
     */
  private static readFromLocal(name:string){
      let pure = window.localStorage.getItem(name);
      if(pure !== undefined && pure !== null){
          let parsed = JSON.parse(pure);
          if(parsed.hasOwnProperty('isString') && parsed.isString === true){
              return parsed.value;
          }else{
              return parsed;
          }
      }
      return null;
  }

    /**
     * Escribe un string u objeto en el almacenamiento local
     * @param {string} name Nombre del elemento a guardar
     * @param {string|object} key Valor a guardar
     */
  private static writeToLocal(name:string, key:string|object){
      if(key === null){
          window.localStorage.removeItem(name);
          return;
      }

      let toStore:string;
      if(typeof key === 'string'){
          toStore = JSON.stringify({isString: true, value: key});
      }else{
          toStore = JSON.stringify(key);
      }
      window.localStorage.setItem(name, toStore);
  }

}
