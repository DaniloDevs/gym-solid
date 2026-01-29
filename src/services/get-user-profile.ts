import { ResourceNotFoundError } from '@/services/_errors/resource-not-found'
import { type IUserRepository } from '@/repositories/user-repositoy'
import type { User } from '@prisma/client'

interface GetUserProfileServiceDTO {
   userId: string
}

interface GetUserProfileServiceResponse {
   user: User
}

export class GetUserProfileService {
   constructor(private userRepository: IUserRepository) {}

   async execute({
      userId,
   }: GetUserProfileServiceDTO): Promise<GetUserProfileServiceResponse> {
      const user = await this.userRepository.findById(userId)

      if (!user) {
         throw new ResourceNotFoundError()
      }

      return { user }
   }
}
