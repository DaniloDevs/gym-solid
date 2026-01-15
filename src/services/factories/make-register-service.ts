import { PrismaUserRepository } from '@/repositories/prisma/prisma-users'
import { RegisterService } from '@/services/register'

export function MakeRegisterService() {
   const userRepository = new PrismaUserRepository()
   const registerService = new RegisterService(userRepository)

   return registerService
}
