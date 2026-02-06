import { InvalidCredentilsError } from '@/services/_errors/invalid-credentials'
import { MakeAuthenticateService } from '@/services/factories/make-authenticate-service'
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
      const authenticateService = MakeAuthenticateService()

      const { user } = await authenticateService.execute({
         email,
         password,
      })

      const token = await reply.jwtSign(
         {},
         {
            sign: {
               sub: user.id,
            },
         },
      )

      const refreshToken = await reply.jwtSign(
         {},
         {
            sign: {
               sub: user.id,
               expiresIn: '7d',
            },
         },
      )

      return reply
         .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true,
         })
         .status(200)
         .send({ token })
   } catch (err) {
      if (err instanceof InvalidCredentilsError) {
         return reply.status(400).send({ message: err.message })
      }

      throw err
   }
}
