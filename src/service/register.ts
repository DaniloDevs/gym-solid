import { UserAlreadyExistsError } from '@/_errors/user-alredy-exists'
import { type IUserRepository } from '@/repositories/user-repositoy'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterServiceDTO {
   name: string
   email: string
   password: string
}

interface RegisterServiceResponse {
   user: User
}

export class RegisterService {
   constructor(private userRepository: IUserRepository) {}

   async execute({
      name,
      email,
      password,
   }: RegisterServiceDTO): Promise<RegisterServiceResponse> {
      const userWithSameEmail = await this.userRepository.findByEmail(email)

      if (userWithSameEmail) {
         throw new UserAlreadyExistsError()
      }

      const password_hash = await hash(password, 6)

      const user = await this.userRepository.create({
         name,
         email,
         password_hash,
      })

      return { user }
   }
}
