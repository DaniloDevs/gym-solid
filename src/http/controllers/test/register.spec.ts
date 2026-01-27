import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { server } from '@/index'

describe('Register (e2e)', () => {
   beforeAll(async () => {
      await server.ready()
   })

   afterAll(async () => {
      await server.close()
   })

   test('should be able to register', async () => {
      const response = await request(server.server).post('/users').send({
         name: 'Jhon Doe',
         email: 'teste@gmail.com',
         password: '123456',
      })

      expect(response.statusCode).toEqual(201)
   })
})
