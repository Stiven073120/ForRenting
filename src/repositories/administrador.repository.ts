import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Departamento, Municipio, Sede, TipoVehiculo, Asesor} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {MunicipioRepository} from './municipio.repository';
import {SedeRepository} from './sede.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {AsesorRepository} from './asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly departamentos: HasManyRepositoryFactory<Departamento, typeof Administrador.prototype.id>;

  public readonly municipios: HasManyRepositoryFactory<Municipio, typeof Administrador.prototype.id>;

  public readonly sedes: HasManyRepositoryFactory<Sede, typeof Administrador.prototype.id>;

  public readonly tipoVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Administrador.prototype.id>;

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
    this.tipoVehiculos = this.createHasManyRepositoryFactoryFor('tipoVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculos', this.tipoVehiculos.inclusionResolver);
    this.sedes = this.createHasManyRepositoryFactoryFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
    this.municipios = this.createHasManyRepositoryFactoryFor('municipios', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipios', this.municipios.inclusionResolver);
    this.departamentos = this.createHasManyRepositoryFactoryFor('departamentos', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
  }
}
