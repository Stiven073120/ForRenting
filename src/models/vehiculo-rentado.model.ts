import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<VehiculoRentado>) {
    super(data);
  }
}

export interface VehiculoRentadoRelations {
  // describe navigational properties here
}

export type VehiculoRentadoWithRelations = VehiculoRentado & VehiculoRentadoRelations;
