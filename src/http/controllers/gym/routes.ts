import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { type FastifyInstance } from 'fastify'
import searchController from './search'
import { nearbyController } from './nearby'
import createController from './create'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

export default async function GymRoutes(server: FastifyInstance) {
   server.addHook('onRequest', VerifyJwt)

   server.get('/gyms/search', searchController)
   server.get('/gyms/nearby', nearbyController)
   server.post(
      '/gyms',
      { onRequest: [verifyUserRole('ADMIN')] },
      createController,
   )
}
