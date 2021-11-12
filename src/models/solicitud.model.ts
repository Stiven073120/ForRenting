import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Solicitud extends Entity {
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
  tipo_solicitud: string;
  @belongsTo(() => Asesor, {name: 'asesor'})
  id_asesor: string;

  @belongsTo(() => Cliente, {name: 'cliente'})
  id_cliente: string;

  @belongsTo(() => Vehiculo, {name: 'vehiculo'})
  id_vehiculo: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
