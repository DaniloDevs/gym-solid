import { prisma } from '@/lib/prisma'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export default async function registerController(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const requestBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string(),
   })

   const { name, email, password } = requestBodySchema.parse(request.body)

   await prisma.user.create({
      data: {
         name,
         email,
         password,
      },
   })

   return reply.status(201).send()
}
