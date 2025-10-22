import { ResourceNotFoundError } from '@/_errors/resource-not-found'
import type { ICheckInRepository } from '@/repositories/check-in-repository'

interface ValidateCheckInRequest {
   checkInId: string
}

export class ValidateCheckInService {
   constructor(private checkInsRepository: ICheckInRepository) {}

   async execute({ checkInId }: ValidateCheckInRequest) {
      const checkIn = await this.checkInsRepository.findById(checkInId)

      if (!checkIn) {
         throw new ResourceNotFoundError()
      }

      checkIn.validated_at = new Date()

      await this.checkInsRepository.save(checkIn)

      return { checkIn }
   }
}
