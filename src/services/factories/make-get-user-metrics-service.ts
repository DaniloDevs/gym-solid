import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in'
import { GetUserMetricsService } from '@/services/get-user-metrics'

export function MakeGetUserMetricsService() {
   const checkInRepository = new PrismaCheckInRepository()
   const getUserMetricsService = new GetUserMetricsService(checkInRepository)

   return getUserMetricsService
}
