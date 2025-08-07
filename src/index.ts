import fastify from 'fastify'
import SetupRoutes from './http/routes'

export const server = fastify()

server.register(SetupRoutes)
