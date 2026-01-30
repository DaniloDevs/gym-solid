import { type FastifyReply, type FastifyRequest } from 'fastify'
import { MakeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function metricsController(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const getUserMetricsUseCase = MakeGetUserMetricsService()

   const {
      metrics: { checkInCount },
   } = await getUserMetricsUseCase.execute({
      userId: request.user.sub,
   })

   return reply.status(200).send({
      checkInCount,
   })
}
