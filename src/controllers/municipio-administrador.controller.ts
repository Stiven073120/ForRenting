import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Municipio,
  Administrador,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioAdministradorController {
  constructor(
    @repository(MunicipioRepository)
    public municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Municipio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Municipio.prototype.id,
  ): Promise<Administrador> {
    return this.municipioRepository.administrador(id);
  }
}
