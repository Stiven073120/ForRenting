import {Entity, hasMany, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Departamento} from './departamento.model';
import {Municipio} from './municipio.model';
import {Sede} from './sede.model';
import {TipoVehiculo} from './tipo-vehiculo.model';

@model()
export class Administrador extends Entity {
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
  codigo_admin: string;

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

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @hasMany(() => Departamento, {keyTo: 'id_administrador'})
  departamentos: Departamento[];

  @hasMany(() => Municipio, {keyTo: 'id_administrador'})
  municipios: Municipio[];

  @hasMany(() => Sede, {keyTo: 'id_administrador'})
  sedes: Sede[];

  @hasMany(() => TipoVehiculo, {keyTo: 'id_administrador'})
  tipoVehiculos: TipoVehiculo[];

  @hasMany(() => Asesor, {keyTo: 'id_administrador'})
  asesors: Asesor[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
