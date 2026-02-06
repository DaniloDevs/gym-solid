import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import GymRoutes from './http/controllers/gym/routes'
import UserRoutes from './http/controllers/users/routes'

export const server = fastify()

server.register(fastifyJwt, {
   secret: env.JWT_SECRET,
   cookie: {
      cookieName:'refreshToken',
      signed: false,
   },
   sign: {
      expiresIn: '10m',
   },
})

server.register(fastifyCookie)

server.register(UserRoutes)
server.register(GymRoutes)

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
