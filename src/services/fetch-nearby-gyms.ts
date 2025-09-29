import type { IGymRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseRequest {
   userLatitude: number
   userLongitude: number
}

export class FetchNearbyGymsService {
   constructor(private gymsRepository: IGymRepository) {}

   async execute({
      userLatitude,
      userLongitude,
   }: FetchNearbyGymsUseCaseRequest) {
      const gyms = await this.gymsRepository.findManyNearby({
         latitude: userLatitude,
         longitude: userLongitude,
      })

      return {
         gyms,
      }
   }
}
