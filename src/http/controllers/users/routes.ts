import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { type FastifyInstance } from 'fastify'
import authenticateController from './authenticate'
import { profileController } from './profile'
import registerController from './register'
import refreshController from './refresh'

export default async function UserRoutes(server: FastifyInstance) {
   server.post('/users', registerController)
   server.post('/sessions', authenticateController)

   server.patch('/token/refresh', refreshController)

   server.get('/profile', { onRequest: [VerifyJwt] }, profileController)
}
