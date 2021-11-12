import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sede,
  Administrador,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeAdministradorController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Sede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Sede.prototype.id,
  ): Promise<Administrador> {
    return this.sedeRepository.administrador(id);
  }
}
