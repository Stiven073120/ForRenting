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
  Asesor,
  VehiculoRentado,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorVehiculoRentadoController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/vehiculo-rentados', {
    responses: {
      '200': {
        description: 'Array of Asesor has many VehiculoRentado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VehiculoRentado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VehiculoRentado>,
  ): Promise<VehiculoRentado[]> {
    return this.asesorRepository.vehiculoRentados(id).find(filter);
  }

  @post('/asesors/{id}/vehiculo-rentados', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(VehiculoRentado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {
            title: 'NewVehiculoRentadoInAsesor',
            exclude: ['id'],
            optional: ['id_asesor']
          }),
        },
      },
    }) vehiculoRentado: Omit<VehiculoRentado, 'id'>,
  ): Promise<VehiculoRentado> {
    return this.asesorRepository.vehiculoRentados(id).create(vehiculoRentado);
  }

  @patch('/asesors/{id}/vehiculo-rentados', {
    responses: {
      '200': {
        description: 'Asesor.VehiculoRentado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {partial: true}),
        },
      },
    })
    vehiculoRentado: Partial<VehiculoRentado>,
    @param.query.object('where', getWhereSchemaFor(VehiculoRentado)) where?: Where<VehiculoRentado>,
  ): Promise<Count> {
    return this.asesorRepository.vehiculoRentados(id).patch(vehiculoRentado, where);
  }

  @del('/asesors/{id}/vehiculo-rentados', {
    responses: {
      '200': {
        description: 'Asesor.VehiculoRentado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VehiculoRentado)) where?: Where<VehiculoRentado>,
  ): Promise<Count> {
    return this.asesorRepository.vehiculoRentados(id).delete(where);
  }
}
