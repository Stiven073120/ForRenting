import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Municipio, Administrador} from '../models';
import {MunicipioRepository} from './municipio.repository';
import {AdministradorRepository} from './administrador.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly municipios: HasManyRepositoryFactory<Municipio, typeof Departamento.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Departamento, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.municipios = this.createHasManyRepositoryFactoryFor('municipios', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipios', this.municipios.inclusionResolver);
  }
}
