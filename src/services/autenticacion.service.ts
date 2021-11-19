import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generador = require("password-generator");
const criptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor() { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = criptoJS.MD5(clave).toString();
    return claveCifrada;
  }


}
