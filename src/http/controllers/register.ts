import { UserAlreadyExistsError } from '@/services/_errors/user-alredy-exists'
import { MakeRegisterService } from '@/services/factories/make-register-service'
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
      const registerService = MakeRegisterService()

      await registerService.execute({
         name,
         email,
         password,
      })
   } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
         return reply.status(409).send({ message: err.message })
      }

      throw err
   }

   return reply.status(201).send()
}
