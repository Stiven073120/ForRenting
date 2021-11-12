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
  Municipio,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeMunicipioController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/municipio', {
    responses: {
      '200': {
        description: 'Municipio belonging to Sede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async getMunicipio(
    @param.path.string('id') id: typeof Sede.prototype.id,
  ): Promise<Municipio> {
    return this.sedeRepository.municipio(id);
  }
}
