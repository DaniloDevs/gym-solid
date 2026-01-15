import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in'
import { PrismaGymRepository } from '@/repositories/prisma/gym-check-in'
import { CheckInService } from '@/services/check-in'

export function MakeCheckInService() {
   const checkInRepository = new PrismaCheckInRepository()
   const gymRepository = new PrismaGymRepository()
   const checkInService = new CheckInService(checkInRepository, gymRepository)

   return checkInService
}
