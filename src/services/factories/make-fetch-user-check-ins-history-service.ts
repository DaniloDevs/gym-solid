import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in'
import { FetchUserCheckInsHistoryService } from '@/services/fetch-user-check-ins-history'

export function MakeFetchUserCheckInsHistoryService() {
   const checkInRepository = new PrismaCheckInRepository()
   const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
      checkInRepository,
   )

   return fetchUserCheckInsHistoryService
}
