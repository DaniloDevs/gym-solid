import { PrismaGymRepository } from '@/repositories/prisma/gym-check-in'
import { FetchNearbyGymsService } from '@/services/fetch-nearby-gyms'

export function MakeFetchNearbyGymsService() {
   const gymRepository = new PrismaGymRepository()
   const fetchNearbyGymsService = new FetchNearbyGymsService(gymRepository)

   return fetchNearbyGymsService
}
