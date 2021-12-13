import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  //url: 'mongodb+srv://Sc_07:stiven073120@cluster0.jl1pp.mongodb.net/AlquilerDB?retryWrites=true&w=majority',
  url: 'mongodb://Sc_07:stiven073120@cluster0-shard-00-00.jl1pp.mongodb.net:27017,cluster0-shard-00-01.jl1pp.mongodb.net:27017,cluster0-shard-00-02.jl1pp.mongodb.net:27017/AlquilerDB?ssl=true&replicaSet=atlas-jkkl6t-shard-0&authSource=admin&retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
