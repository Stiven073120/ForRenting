import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Asesor, Credenciales} from '../models';
import {AsesorRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post("/identificarAsesor", {
    responses: {
      '200': {
        description: "Identificacion de Asesor"
      }
    }
  })
  async identificarAsesor(
    @requestBody() credenciales: Credenciales
  ) {
    let a = await this.servicioAutenticacion.IdentificarAsesor(credenciales.usuario, credenciales.clave);
    if (a) {
      let token = this.servicioAutenticacion.GenerearTokenJWT_a(a);
      return {
        datos: {
          nombre: a.nombre,
          correo: a.correo,
          role: a.role,
          id: a.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos")
    }
  }


  @post('/asesors')
  @response(200, {
    description: 'Asesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    asesor: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    asesor.clave = claveCifrada;
    let a = await this.asesorRepository.create(asesor);

    //Notificar al administrador

    let destino = asesor.correo;
    let asunto = 'Registro en la plataforma como Asesor'
    let contenido = `Hola ${asesor.nombre}, su usuario como asesor es ${asesor.correo} y su contraseña es ${clave}`
    fetch(`${Llaves.urlServicioNotificaciones}/send-email?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)

      .then((data: any) => {
        console.log(data);
      })
    return a;
  }

  @get('/asesors/count')
  @response(200, {
    description: 'Asesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  @get('/asesors')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asesor) filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesors')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesors/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Asesor>
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/asesors/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesors/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesors/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
