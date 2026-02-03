import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { server } from '@/index'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
   beforeAll(async () => {
      await server.ready()
   })

   afterAll(async () => {
      await server.close()
   })

   test('should be able to create gym', async () => {
      const { token } = await CreateAndAuthenticateUser(server)

      const createResponse = await request(server.server)
         .post('/gyms')
         .set('Authorization', `Bearer ${token}`)
         .send({
            title: 'TypeScript Gym',
            description: 'Some description.',
            phone: '1199999999',
            latitude: -27.2092052,
            longitude: -49.6401091,
         })

      expect(createResponse.statusCode).toEqual(201)
   })
})
