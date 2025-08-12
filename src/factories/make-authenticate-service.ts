import { PrismaUserRepository } from '@/repositories/prisma/prisma-users'
import { AuthenticateService } from '@/services/authenticate'

export function MakeAuthenticateService() {
   const userRepository = new PrismaUserRepository()
   const authenticateService = new AuthenticateService(userRepository)

   return authenticateService
}
