import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in'
import { ValidateCheckInService } from '@/services/validate-check-in'

export function MakeValidateCheckInService() {
   const checkInRepository = new PrismaCheckInRepository()
   const validateCheckInService = new ValidateCheckInService(checkInRepository)

   return validateCheckInService
}
