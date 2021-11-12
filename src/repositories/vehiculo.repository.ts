import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor, TipoVehiculo, VehiculoRentado, Solicitud, Sede} from '../models';
import {AsesorRepository} from './asesor.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {VehiculoRentadoRepository} from './vehiculo-rentado.repository';
import {SolicitudRepository} from './solicitud.repository';
import {SedeRepository} from './sede.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.id>;

  public readonly tipovehiculo: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype.id>;

  public readonly vehiculoRentado: HasOneRepositoryFactory<VehiculoRentado, typeof Vehiculo.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.id>;

  public readonly sede: BelongsToAccessor<Sede, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('VehiculoRentadoRepository') protected vehiculoRentadoRepositoryGetter: Getter<VehiculoRentadoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.vehiculoRentado = this.createHasOneRepositoryFactoryFor('vehiculoRentado', vehiculoRentadoRepositoryGetter);
    this.registerInclusionResolver('vehiculoRentado', this.vehiculoRentado.inclusionResolver);
    this.tipovehiculo = this.createBelongsToAccessorFor('tipovehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipovehiculo', this.tipovehiculo.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
