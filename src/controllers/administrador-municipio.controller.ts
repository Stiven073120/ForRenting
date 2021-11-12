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
  Municipio,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorMunicipioController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/municipios', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Municipio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Municipio>,
  ): Promise<Municipio[]> {
    return this.administradorRepository.municipios(id).find(filter);
  }

  @post('/administradors/{id}/municipios', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {
            title: 'NewMunicipioInAdministrador',
            exclude: ['id'],
            optional: ['id_administrador']
          }),
        },
      },
    }) municipio: Omit<Municipio, 'id'>,
  ): Promise<Municipio> {
    return this.administradorRepository.municipios(id).create(municipio);
  }

  @patch('/administradors/{id}/municipios', {
    responses: {
      '200': {
        description: 'Administrador.Municipio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {partial: true}),
        },
      },
    })
    municipio: Partial<Municipio>,
    @param.query.object('where', getWhereSchemaFor(Municipio)) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.administradorRepository.municipios(id).patch(municipio, where);
  }

  @del('/administradors/{id}/municipios', {
    responses: {
      '200': {
        description: 'Administrador.Municipio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Municipio)) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.administradorRepository.municipios(id).delete(where);
  }
}
