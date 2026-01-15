import { PrismaGymRepository } from '@/repositories/prisma/gym-check-in'
import { SearchGymsService } from '@/services/search-gyms'

export function MakeSearchGymsService() {
   const gymRepository = new PrismaGymRepository()
   const searchGymsService = new SearchGymsService(gymRepository)

   return searchGymsService
}
