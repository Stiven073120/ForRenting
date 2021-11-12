import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {VehiculoRentado} from './vehiculo-rentado.model';
import {Solicitud} from './solicitud.model';
import {Sede} from './sede.model';

@model()
export class Vehiculo extends Entity {
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
  descripcion: string;
  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  id_tipovehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_encargado: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @belongsTo(() => Asesor, {name: 'asesor'})
  id_asesor: string;

  @belongsTo(() => TipoVehiculo, {name: 'tipovehiculo'})
  tipo_vehiculo: string;

  @property({
    type: 'string',
  })
  id_cliente?: string;

  @hasOne(() => VehiculoRentado, {keyTo: 'id_vehiculo'})
  vehiculoRentado: VehiculoRentado;

  @hasMany(() => Solicitud, {keyTo: 'id_vehiculo'})
  solicituds: Solicitud[];

  @belongsTo(() => Sede, {name: 'sede'})
  id_sede: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
