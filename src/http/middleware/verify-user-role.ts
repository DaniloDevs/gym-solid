import { type FastifyReply, type FastifyRequest } from 'fastify'

export function verifyUserRole(roles: 'ADMIN' | 'MEMBER') {
   return async (request: FastifyRequest, reply: FastifyReply) => {
      if (!request.user) {
         return reply.status(401).send({ message: 'Unauthorized.' })
      }

      if (!roles.includes(request.user.role)) {
         return reply.status(403).send({ message: 'Forbidden.' })
      }

      return reply
   }
}
