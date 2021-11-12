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
  Municipio,
  Sede,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioSedeController {
  constructor(
    @repository(MunicipioRepository) protected municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/sedes', {
    responses: {
      '200': {
        description: 'Array of Municipio has many Sede',
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
    return this.municipioRepository.sedes(id).find(filter);
  }

  @post('/municipios/{id}/sedes', {
    responses: {
      '200': {
        description: 'Municipio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sede)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSedeInMunicipio',
            exclude: ['id'],
            optional: ['id_municipio']
          }),
        },
      },
    }) sede: Omit<Sede, 'id'>,
  ): Promise<Sede> {
    return this.municipioRepository.sedes(id).create(sede);
  }

  @patch('/municipios/{id}/sedes', {
    responses: {
      '200': {
        description: 'Municipio.Sede PATCH success count',
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
    return this.municipioRepository.sedes(id).patch(sede, where);
  }

  @del('/municipios/{id}/sedes', {
    responses: {
      '200': {
        description: 'Municipio.Sede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.municipioRepository.sedes(id).delete(where);
  }
}
