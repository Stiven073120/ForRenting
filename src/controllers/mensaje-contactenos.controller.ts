import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MensajeContactenos} from '../models';
import {MensajeContactenosRepository} from '../repositories';

export class MensajeContactenosController {
  constructor(
    @repository(MensajeContactenosRepository)
    public mensajeContactenosRepository : MensajeContactenosRepository,
  ) {}

  @post('/mensaje-contactenos')
  @response(200, {
    description: 'MensajeContactenos model instance',
    content: {'application/json': {schema: getModelSchemaRef(MensajeContactenos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeContactenos, {
            title: 'NewMensajeContactenos',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajeContactenos: Omit<MensajeContactenos, 'id'>,
  ): Promise<MensajeContactenos> {
    return this.mensajeContactenosRepository.create(mensajeContactenos);
  }

  @get('/mensaje-contactenos/count')
  @response(200, {
    description: 'MensajeContactenos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MensajeContactenos) where?: Where<MensajeContactenos>,
  ): Promise<Count> {
    return this.mensajeContactenosRepository.count(where);
  }

  @get('/mensaje-contactenos')
  @response(200, {
    description: 'Array of MensajeContactenos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MensajeContactenos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MensajeContactenos) filter?: Filter<MensajeContactenos>,
  ): Promise<MensajeContactenos[]> {
    return this.mensajeContactenosRepository.find(filter);
  }

  @patch('/mensaje-contactenos')
  @response(200, {
    description: 'MensajeContactenos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeContactenos, {partial: true}),
        },
      },
    })
    mensajeContactenos: MensajeContactenos,
    @param.where(MensajeContactenos) where?: Where<MensajeContactenos>,
  ): Promise<Count> {
    return this.mensajeContactenosRepository.updateAll(mensajeContactenos, where);
  }

  @get('/mensaje-contactenos/{id}')
  @response(200, {
    description: 'MensajeContactenos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MensajeContactenos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MensajeContactenos, {exclude: 'where'}) filter?: FilterExcludingWhere<MensajeContactenos>
  ): Promise<MensajeContactenos> {
    return this.mensajeContactenosRepository.findById(id, filter);
  }

  @patch('/mensaje-contactenos/{id}')
  @response(204, {
    description: 'MensajeContactenos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeContactenos, {partial: true}),
        },
      },
    })
    mensajeContactenos: MensajeContactenos,
  ): Promise<void> {
    await this.mensajeContactenosRepository.updateById(id, mensajeContactenos);
  }

  @put('/mensaje-contactenos/{id}')
  @response(204, {
    description: 'MensajeContactenos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajeContactenos: MensajeContactenos,
  ): Promise<void> {
    await this.mensajeContactenosRepository.replaceById(id, mensajeContactenos);
  }

  @del('/mensaje-contactenos/{id}')
  @response(204, {
    description: 'MensajeContactenos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeContactenosRepository.deleteById(id);
  }
}
