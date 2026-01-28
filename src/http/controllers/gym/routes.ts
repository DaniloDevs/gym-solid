import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { type FastifyInstance } from 'fastify'

export default async function GymRoutes(server: FastifyInstance) {
  server.addHook('onRequest', VerifyJwt)
}
