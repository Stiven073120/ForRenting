import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Sede} from './sede.model';
import {Administrador} from './administrador.model';

@model()
export class Municipio extends Entity {
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

  @belongsTo(() => Departamento, {name: 'departamento'})
  id_departamento: string;

  @hasMany(() => Sede, {keyTo: 'id_municipio'})
  sedes: Sede[];

  @belongsTo(() => Administrador, {name: 'administrador'})
  id_administrador: string;

  constructor(data?: Partial<Municipio>) {
    super(data);
  }
}

export interface MunicipioRelations {
  // describe navigational properties here
}

export type MunicipioWithRelations = Municipio & MunicipioRelations;
