import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { server } from '@/index'

describe('Profile (e2e)', () => {
   beforeAll(async () => {
      await server.ready()
   })

   afterAll(async () => {
      await server.close()
   })

   test('should be able to get user profile', async () => {
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

      const profileResponse = await request(server.server)
         .get('/profile')
         .set('Authorization', `Bearer ${token}`)
         .send()

      expect(profileResponse.statusCode).toEqual(200)
   })
})
