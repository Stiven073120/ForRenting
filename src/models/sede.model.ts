import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Municipio} from './municipio.model';
import {Administrador} from './administrador.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Sede extends Entity {
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

  @belongsTo(() => Municipio, {name: 'municipio'})
  id_municipio: string;

  @belongsTo(() => Administrador, {name: 'administrador'})
  id_administrador: string;

  @hasMany(() => Vehiculo, {keyTo: 'id_sede'})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
