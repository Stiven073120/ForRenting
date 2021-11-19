import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Solicitud} from './solicitud.model';
import {VehiculoRentado} from './vehiculo-rentado.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Cliente extends Entity {
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

  @belongsTo(() => Asesor, {name: 'asesor'})
  id_asesor: string;

  @hasMany(() => Solicitud, {keyTo: 'id_cliente'})
  solicituds: Solicitud[];

  @hasOne(() => Vehiculo, {keyTo: 'id_cliente'})
  vehiculo: Vehiculo;

  @hasOne(() => VehiculoRentado, {keyTo: 'id_cliente'})
  vehiculoRentado: VehiculoRentado;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
