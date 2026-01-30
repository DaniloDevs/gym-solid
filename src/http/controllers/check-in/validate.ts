import { MakeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateController(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const validateCheckInParamsSchema = z.object({
      checkInId: z.uuid(),
   })

   const { checkInId } = validateCheckInParamsSchema.parse(request.params)

   const validateCheckInUseCase = MakeValidateCheckInService()

   await validateCheckInUseCase.execute({
      checkInId,
   })

   return reply.status(204).send()
}
