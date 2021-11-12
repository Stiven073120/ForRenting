import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Asesor, Solicitud, Vehiculo, VehiculoRentado} from '../models';
import {AsesorRepository} from './asesor.repository';
import {SolicitudRepository} from './solicitud.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {VehiculoRentadoRepository} from './vehiculo-rentado.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Cliente.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.id>;

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Cliente.prototype.id>;

  public readonly vehiculoRentado: HasOneRepositoryFactory<VehiculoRentado, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('VehiculoRentadoRepository') protected vehiculoRentadoRepositoryGetter: Getter<VehiculoRentadoRepository>,
  ) {
    super(Cliente, dataSource);
    this.vehiculoRentado = this.createHasOneRepositoryFactoryFor('vehiculoRentado', vehiculoRentadoRepositoryGetter);
    this.registerInclusionResolver('vehiculoRentado', this.vehiculoRentado.inclusionResolver);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
