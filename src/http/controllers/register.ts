import registerService from '@/service/register'
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

   try {
      await registerService({
         name,
         email,
         password,
      })
   } catch {
      return reply.status(409).send()
   }

   return reply.status(201).send()
}
