import { type FastifyInstance } from 'fastify'
import registerController from './controllers/register'
import authenticateController from './controllers/authenticate'

export default async function SetupRoutes(server: FastifyInstance) {
   server.post('/users', registerController)
   server.post('/sessions', authenticateController)
}
