import {Entity, model, property} from '@loopback/repository';

@model()
export class MensajeContactenos extends Entity {
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
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<MensajeContactenos>) {
    super(data);
  }
}

export interface MensajeContactenosRelations {
  // describe navigational properties here
}

export type MensajeContactenosWithRelations = MensajeContactenos & MensajeContactenosRelations;
