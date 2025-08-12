import { InvalidCredentilsError } from '@/_errors/invalid-credentials'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users'
import { AuthenticateService } from '@/services/authenticate'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import z from 'zod'

export default async function authenticateController(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const requestBodySchema = z.object({
      email: z.email(),
      password: z.string(),
   })

   const { email, password } = requestBodySchema.parse(request.body)

   try {
      const userRepository = new PrismaUserRepository()
      const authenticateService = new AuthenticateService(userRepository)

      await authenticateService.execute({
         email,
         password,
      })
   } catch (err) {
      if (err instanceof InvalidCredentilsError) {
         return reply.status(400).send({ message: err.message })
      }

      throw err
   }

   return reply.status(200).send()
}
