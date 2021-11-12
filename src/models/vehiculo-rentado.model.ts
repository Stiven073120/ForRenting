import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model()
export class VehiculoRentado extends Entity {
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
  fecha_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_entrega: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_cliente: string;

  @belongsTo(() => Asesor, {name: 'asesor'})
  id_asesor: string;

  constructor(data?: Partial<VehiculoRentado>) {
    super(data);
  }
}

export interface VehiculoRentadoRelations {
  // describe navigational properties here
}

export type VehiculoRentadoWithRelations = VehiculoRentado & VehiculoRentadoRelations;
