import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, Municipio, Administrador, Vehiculo} from '../models';
import {MunicipioRepository} from './municipio.repository';
import {AdministradorRepository} from './administrador.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id,
  SedeRelations
> {

  public readonly municipio: BelongsToAccessor<Municipio, typeof Sede.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Sede.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Sede.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Sede, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.municipio = this.createBelongsToAccessorFor('municipio', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipio', this.municipio.inclusionResolver);
  }
}
