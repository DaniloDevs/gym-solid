import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUser(server: FastifyInstance) {
   await request(server.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'teste@gmail.com',
      password: '123456',
   })

   const authResponse = await request(server.server).post('/sessions').send({
      email: 'teste@gmail.com',
      password: '123456',
   })

   const { token } = authResponse.body

   return { token }
}
