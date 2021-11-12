import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VehiculoRentado, VehiculoRentadoRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class VehiculoRentadoRepository extends DefaultCrudRepository<
  VehiculoRentado,
  typeof VehiculoRentado.prototype.id,
  VehiculoRentadoRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof VehiculoRentado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(VehiculoRentado, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
