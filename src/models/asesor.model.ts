import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Cliente} from './cliente.model';
import {Solicitud} from './solicitud.model';
import {VehiculoRentado} from './vehiculo-rentado.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_asesor: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_doc: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_doc: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @belongsTo(() => Administrador, {name: 'administrador'})
  id_administrador: string;

  @hasMany(() => Vehiculo, {keyTo: 'id_asesor'})
  vehiculos: Vehiculo[];

  @hasMany(() => VehiculoRentado, {keyTo: 'id_asesor'})
  vehiculoRentados: VehiculoRentado[];

  @hasMany(() => Solicitud, {keyTo: 'id_asesor'})
  solicituds: Solicitud[];

  @hasMany(() => Cliente, {keyTo: 'id_asesor'})
  clientes: Cliente[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
