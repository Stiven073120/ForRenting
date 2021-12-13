import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MensajeContactenos, MensajeContactenosRelations} from '../models';

export class MensajeContactenosRepository extends DefaultCrudRepository<
  MensajeContactenos,
  typeof MensajeContactenos.prototype.id,
  MensajeContactenosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(MensajeContactenos, dataSource);
  }
}
