import type { ICheckInRepository } from '@/repositories/check-in-repository'

interface FetchUserCheckInsHistoryRequest {
   userId: string
   page: number
}

export class FetchUserCheckInsHistoryService {
   constructor(private checkInService: ICheckInRepository) {}

   async execute({ userId, page }: FetchUserCheckInsHistoryRequest) {
      const checkIns = await this.checkInService.findManyByUserId(userId, page)

      return { checkIns }
   }
}
