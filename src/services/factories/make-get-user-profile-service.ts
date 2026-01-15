import { PrismaUserRepository } from '@/repositories/prisma/prisma-users'
import { GetUserProfileService } from '@/services/get-user-profile'

export function MakeGetUserProfileService() {
   const userRepository = new PrismaUserRepository()
   const getUserProfileService = new GetUserProfileService(userRepository)

   return getUserProfileService
}
