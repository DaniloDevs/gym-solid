import { MakeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function historyController(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const checkInHistoryQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
   })

   const { page } = checkInHistoryQuerySchema.parse(request.query)

   const fetchUserCheckInsHistoryUseCase = MakeFetchUserCheckInsHistoryService()

   const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      page,
      userId: request.user.sub,
   })

   return reply.status(200).send({
      checkIns,
   })
}
