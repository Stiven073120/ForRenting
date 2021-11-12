import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Municipio, MunicipioRelations, Departamento, Sede, Administrador} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {SedeRepository} from './sede.repository';
import {AdministradorRepository} from './administrador.repository';

export class MunicipioRepository extends DefaultCrudRepository<
  Municipio,
  typeof Municipio.prototype.id,
  MunicipioRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Municipio.prototype.id>;

  public readonly sedes: HasManyRepositoryFactory<Sede, typeof Municipio.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Municipio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Municipio, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.sedes = this.createHasManyRepositoryFactoryFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
