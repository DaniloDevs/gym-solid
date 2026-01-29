import { MakeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import z from 'zod'

export default async function searchController(
   request: FastifyRequest,
   reply: FastifyReply,
) {
   const searchGymBodySchema = z.object({
      query: z.string(),
      page: z.coerce.number(),
   })

   const { page, query } = searchGymBodySchema.parse(request.body)

   const searchGymUseCase = MakeSearchGymsService()

   const gym = await searchGymUseCase.execute({
      page,
      query,
   })

   return reply.status(201).send({
      gym,
   })
}
