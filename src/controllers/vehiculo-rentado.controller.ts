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
import {VehiculoRentado} from '../models';
import {VehiculoRentadoRepository} from '../repositories';

export class VehiculoRentadoController {
  constructor(
    @repository(VehiculoRentadoRepository)
    public vehiculoRentadoRepository : VehiculoRentadoRepository,
  ) {}

  @post('/vehiculo-rentados')
  @response(200, {
    description: 'VehiculoRentado model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehiculoRentado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {
            title: 'NewVehiculoRentado',
            exclude: ['id'],
          }),
        },
      },
    })
    vehiculoRentado: Omit<VehiculoRentado, 'id'>,
  ): Promise<VehiculoRentado> {
    return this.vehiculoRentadoRepository.create(vehiculoRentado);
  }

  @get('/vehiculo-rentados/count')
  @response(200, {
    description: 'VehiculoRentado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehiculoRentado) where?: Where<VehiculoRentado>,
  ): Promise<Count> {
    return this.vehiculoRentadoRepository.count(where);
  }

  @get('/vehiculo-rentados')
  @response(200, {
    description: 'Array of VehiculoRentado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehiculoRentado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehiculoRentado) filter?: Filter<VehiculoRentado>,
  ): Promise<VehiculoRentado[]> {
    return this.vehiculoRentadoRepository.find(filter);
  }

  @patch('/vehiculo-rentados')
  @response(200, {
    description: 'VehiculoRentado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {partial: true}),
        },
      },
    })
    vehiculoRentado: VehiculoRentado,
    @param.where(VehiculoRentado) where?: Where<VehiculoRentado>,
  ): Promise<Count> {
    return this.vehiculoRentadoRepository.updateAll(vehiculoRentado, where);
  }

  @get('/vehiculo-rentados/{id}')
  @response(200, {
    description: 'VehiculoRentado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehiculoRentado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VehiculoRentado, {exclude: 'where'}) filter?: FilterExcludingWhere<VehiculoRentado>
  ): Promise<VehiculoRentado> {
    return this.vehiculoRentadoRepository.findById(id, filter);
  }

  @patch('/vehiculo-rentados/{id}')
  @response(204, {
    description: 'VehiculoRentado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {partial: true}),
        },
      },
    })
    vehiculoRentado: VehiculoRentado,
  ): Promise<void> {
    await this.vehiculoRentadoRepository.updateById(id, vehiculoRentado);
  }

  @put('/vehiculo-rentados/{id}')
  @response(204, {
    description: 'VehiculoRentado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehiculoRentado: VehiculoRentado,
  ): Promise<void> {
    await this.vehiculoRentadoRepository.replaceById(id, vehiculoRentado);
  }

  @del('/vehiculo-rentados/{id}')
  @response(204, {
    description: 'VehiculoRentado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehiculoRentadoRepository.deleteById(id);
  }
}
