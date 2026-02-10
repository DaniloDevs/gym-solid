import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { type FastifyInstance } from 'fastify'
import { historyController } from './history'
import { metricsController } from './metrics'
import { createController } from './create'
import { validateController } from './validate'
import { verifyUserRole } from '@/http/middleware/verify-user-role'

export default async function CheckInRoutes(server: FastifyInstance) {
   server.addHook('onRequest', VerifyJwt)

   server.get('/check-ins/history', historyController)
   server.get('/check-ins/metrics', metricsController)

   server.post('/gyms/:gymId/check-ins', createController)
   server.patch(
      '/check-ins/:checkInId/validate',
      { onRequest: [verifyUserRole('ADMIN')] },
      validateController,
   )
}
