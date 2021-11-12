import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Municipio} from './municipio.model';
import {Administrador} from './administrador.model';

@model()
export class Departamento extends Entity {
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

  @hasMany(() => Municipio, {keyTo: 'id_departamento'})
  municipios: Municipio[];

  @belongsTo(() => Administrador, {name: 'administrador'})
  id_administrador: string;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
