import { type ICheckInRepository } from '@/repositories/check-in-repository'

interface CheckInRequest {
   userId: string
   gymId: string
}

export class CheckInService {
   constructor(private repository: ICheckInRepository) {}

   async execute({ userId, gymId }: CheckInRequest) {
      const checkIn = await this.repository.create({
         gym_id: gymId,
         user_id: userId,
      })

      return { checkIn }
   }
}
