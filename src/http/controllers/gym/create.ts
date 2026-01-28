import { UserAlreadyExistsError } from "@/services/_errors/user-alredy-exists"
import { MakeCreateGymService } from "@/services/factories/make-create-gym-service"
import { MakeRegisterService } from "@/services/factories/make-register-service"
import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"


export default async function createController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = MakeCreateGymService()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
