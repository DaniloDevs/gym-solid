import { type FastifyInstance } from 'fastify'
import registerController from './controllers/register'

export default async function SetupRoutes(server: FastifyInstance) {
   server.post('/users', registerController)
}
