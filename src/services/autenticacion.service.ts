import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Administrador, Asesor, Cliente} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';
const generador = require("password-generator");
const criptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,

    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,

    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository

  ) { }

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

  IdentificarAdministrador(usuario: string, clave: string) {
    try {
      let ad = this.administradorRepository.findOne({where: {correo: usuario, clave: clave}})
      if (ad) {
        return ad;
      }
      return false;
    } catch {
      return false;
    }
  }

  IdentificarAsesor(usuario: string, clave: string) {
    try {
      let a = this.asesorRepository.findOne({where: {correo: usuario, clave: clave}})
      if (a) {
        return a;
      }
      return false;
    } catch {
      return false;
    }
  }

  IdentificarCliente(usuario: string, clave: string) {
    try {
      let c = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}})
      if (c) {
        return c;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerearTokenJWT_ad(administrador: Administrador) {
    let token = jwt.sign({
      data: {
        id: administrador.id,
        nombre: administrador.nombre + " " + administrador.apellido,
        correo: administrador.correo
      }
    },
      Llaves.claveJWT);
    return token;
  }

  GenerearTokenJWT_a(asesor: Asesor) {
    let token = jwt.sign({
      data: {
        id: asesor.id,
        nombre: asesor.nombre + " " + asesor.apellido,
        correo: asesor.correo
      }
    },
      Llaves.claveJWT);
    return token;
  }

  GenerearTokenJWT_c(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.id,
        nombre: cliente.nombre + " " + cliente.apellido,
        correo: cliente.correo
      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarToken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
