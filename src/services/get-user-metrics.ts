import type { ICheckInRepository } from '@/repositories/check-in-repository'

interface GetUserMetricsRequest {
   userId: string
}

export class GetUserMetricsService {
   constructor(private checkinRepository: ICheckInRepository) {}

   async execute({ userId }: GetUserMetricsRequest) {
      const checkIns = await this.checkinRepository.countByUserId(userId)

      const metrics = {
         checkInCount: checkIns,
      }

      return { metrics }
   }
}
