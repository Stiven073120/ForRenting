import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamento,
  Administrador,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoAdministradorController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Departamento.prototype.id,
  ): Promise<Administrador> {
    return this.departamentoRepository.administrador(id);
  }
}
