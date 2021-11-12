import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VehiculoRentado,
  Asesor,
} from '../models';
import {VehiculoRentadoRepository} from '../repositories';

export class VehiculoRentadoAsesorController {
  constructor(
    @repository(VehiculoRentadoRepository)
    public vehiculoRentadoRepository: VehiculoRentadoRepository,
  ) { }

  @get('/vehiculo-rentados/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to VehiculoRentado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof VehiculoRentado.prototype.id,
  ): Promise<Asesor> {
    return this.vehiculoRentadoRepository.asesor(id);
  }
}
