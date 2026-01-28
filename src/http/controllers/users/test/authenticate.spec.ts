import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { server } from '@/index'

describe('Authenticate (e2e)', () => {
   beforeAll(async () => {
      await server.ready()
   })

   afterAll(async () => {
      await server.close()
   })

   test('should be able to register', async () => {
      await request(server.server).post('/users').send({
         name: 'Jhon Doe',
         email: 'teste@gmail.com',
         password: '123456',
      })

      const response = await request(server.server).post('/sessions').send({
         email: 'teste@gmail.com',
         password: '123456',
      })

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual({
         token: expect.any(String),
      })
   })
})
