import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  Sede,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorSedeController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/sedes', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Sede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sede>,
  ): Promise<Sede[]> {
    return this.administradorRepository.sedes(id).find(filter);
  }

  @post('/administradors/{id}/sedes', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sede)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSedeInAdministrador',
            exclude: ['id'],
            optional: ['id_administrador']
          }),
        },
      },
    }) sede: Omit<Sede, 'id'>,
  ): Promise<Sede> {
    return this.administradorRepository.sedes(id).create(sede);
  }

  @patch('/administradors/{id}/sedes', {
    responses: {
      '200': {
        description: 'Administrador.Sede PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {partial: true}),
        },
      },
    })
    sede: Partial<Sede>,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.administradorRepository.sedes(id).patch(sede, where);
  }

  @del('/administradors/{id}/sedes', {
    responses: {
      '200': {
        description: 'Administrador.Sede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.administradorRepository.sedes(id).delete(where);
  }
}
