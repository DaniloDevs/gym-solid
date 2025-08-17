import { ResourceNotFoundError } from '@/_errors/resource-not-found'
import { type IGymRepository } from './../repositories/gyms-repository'
import { type ICheckInRepository } from '@/repositories/check-in-repository'

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

   async execute({ userId, gymId }: CheckInRequest) {
      const gym = await this.gymRepository.findById(gymId)

      if (!gym) throw new ResourceNotFoundError()

      const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
         userId,
         new Date(),
      )

      if (checkInOnSameDay) {
         throw new Error()
      }

      const checkIn = await this.checkInRepository.create({
         gym_id: gymId,
         user_id: userId,
      })

      return { checkIn }
   }
}
