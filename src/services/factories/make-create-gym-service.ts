import { PrismaGymRepository } from '@/repositories/prisma/gym-check-in'
import { CreateGymService } from '@/services/create-gym'

export function MakeCreateGymService() {
   const gymRepository = new PrismaGymRepository()
   const createGymService = new CreateGymService(gymRepository)

   return createGymService
}
