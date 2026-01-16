import { ResourceNotFoundError } from '@/services/_errors/resource-not-found'
import { type IGymRepository } from './../repositories/gyms-repository'
import { type ICheckInRepository } from '@/repositories/check-in-repository'
import { getDistanceBetweenCordinates } from '@/utils/get-distance-between-coordinate'
import { MaxDistanceError } from '@/services/_errors/max-distance'
import { MaxNumberOfCheckInsError } from '@/services/_errors/max-number-of-check-ins'

interface CheckInRequest {
   userId: string
   gymId: string
   userLatitude: number
   userLongitude: number
}

export class CheckInService {
   constructor(
      private checkInRepository: ICheckInRepository,
      private gymRepository: IGymRepository,
   ) {}

   async execute({
      userId,
      gymId,
      userLatitude,
      userLongitude,
   }: CheckInRequest) {
      const gym = await this.gymRepository.findById(gymId)

      if (!gym) throw new ResourceNotFoundError()

      const distance = getDistanceBetweenCordinates(
         {
            latitude: userLatitude,
            longitude: userLongitude,
         },
         {
            latitude: gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber(),
         },
      )

      const MAX_DISTANCE_IN_KM = 0.1

      if (distance > MAX_DISTANCE_IN_KM) {
         throw new MaxDistanceError()
      }

      const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
         userId,
         new Date(),
      )

      if (checkInOnSameDay) {
         throw new MaxNumberOfCheckInsError()
      }

      const checkIn = await this.checkInRepository.create({
         gym_id: gymId,
         user_id: userId,
      })

      return { checkIn }
   }
}
