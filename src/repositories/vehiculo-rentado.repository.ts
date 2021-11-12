import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VehiculoRentado, VehiculoRentadoRelations} from '../models';

export class VehiculoRentadoRepository extends DefaultCrudRepository<
  VehiculoRentado,
  typeof VehiculoRentado.prototype.id,
  VehiculoRentadoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(VehiculoRentado, dataSource);
  }
}
