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
  Vehiculo,
  VehiculoRentado,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoVehiculoRentadoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Vehiculo has one VehiculoRentado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VehiculoRentado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VehiculoRentado>,
  ): Promise<VehiculoRentado> {
    return this.vehiculoRepository.vehiculoRentado(id).get(filter);
  }

  @post('/vehiculos/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(VehiculoRentado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {
            title: 'NewVehiculoRentadoInVehiculo',
            exclude: ['id'],
            optional: ['id_vehiculo']
          }),
        },
      },
    }) vehiculoRentado: Omit<VehiculoRentado, 'id'>,
  ): Promise<VehiculoRentado> {
    return this.vehiculoRepository.vehiculoRentado(id).create(vehiculoRentado);
  }

  @patch('/vehiculos/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Vehiculo.VehiculoRentado PATCH success count',
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
    return this.vehiculoRepository.vehiculoRentado(id).patch(vehiculoRentado, where);
  }

  @del('/vehiculos/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Vehiculo.VehiculoRentado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VehiculoRentado)) where?: Where<VehiculoRentado>,
  ): Promise<Count> {
    return this.vehiculoRepository.vehiculoRentado(id).delete(where);
  }
}
