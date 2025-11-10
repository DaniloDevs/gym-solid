import { LateCheckInValidationError } from '@/_errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/_errors/resource-not-found'
import type { ICheckInRepository } from '@/repositories/check-in-repository'
import dayjs from 'dayjs'

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

      const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
         checkIn.created_at,
         'minutes',
      )

      if (distanceInMinutesFromCheckInCreation > 20) {
         throw new LateCheckInValidationError()
      }

      checkIn.validated_at = new Date()

      await this.checkInsRepository.save(checkIn)

      return { checkIn }
   }
}
