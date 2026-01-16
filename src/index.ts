import fastify from 'fastify'
import SetupRoutes from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const server = fastify()

server.register(fastifyJwt, {
   secret: env.JWT_SECRET,
})

server.register(SetupRoutes)

server.setErrorHandler((error, _, reply) => {
   if (error instanceof ZodError) {
      return reply.status(400).send({
         message: 'Validation error',
         issues: error.issues,
      })
   }

   if (env.NODE_ENV !== 'prod') {
      console.error(error)
   }

   return reply.status(500).send({
      message: 'Internal server error',
      error: error.message,
   })
})
