import { type FastifyInstance } from 'fastify'
import registerController from './controllers/register'
import authenticateController from './controllers/authenticate'
import { profileController } from './controllers/profile'
import { VerifyJwt } from './middleware/verify-jwt'

export default async function SetupRoutes(server: FastifyInstance) {
   server.post('/users', registerController)
   server.post('/sessions', authenticateController)

   server.get('/profile', { onRequest: [VerifyJwt] }, profileController)
}
