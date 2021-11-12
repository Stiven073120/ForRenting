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
  Cliente,
  VehiculoRentado,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteVehiculoRentadoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Cliente has one VehiculoRentado',
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
    return this.clienteRepository.vehiculoRentado(id).get(filter);
  }

  @post('/clientes/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(VehiculoRentado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehiculoRentado, {
            title: 'NewVehiculoRentadoInCliente',
            exclude: ['id'],
            optional: ['id_cliente']
          }),
        },
      },
    }) vehiculoRentado: Omit<VehiculoRentado, 'id'>,
  ): Promise<VehiculoRentado> {
    return this.clienteRepository.vehiculoRentado(id).create(vehiculoRentado);
  }

  @patch('/clientes/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Cliente.VehiculoRentado PATCH success count',
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
    return this.clienteRepository.vehiculoRentado(id).patch(vehiculoRentado, where);
  }

  @del('/clientes/{id}/vehiculo-rentado', {
    responses: {
      '200': {
        description: 'Cliente.VehiculoRentado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VehiculoRentado)) where?: Where<VehiculoRentado>,
  ): Promise<Count> {
    return this.clienteRepository.vehiculoRentado(id).delete(where);
  }
}
