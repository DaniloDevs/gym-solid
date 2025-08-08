import { UserAlreadyExistsError } from '@/_erros/user-alredy-exists'
import { type IUserRepository } from '@/repositories/user-repositoy'
import { hash } from 'bcryptjs'

interface RegisterServiceDTO {
   name: string
   email: string
   password: string
}

export class RegisterService {
   constructor(private userRepository: IUserRepository) {}

   async execute({ name, email, password }: RegisterServiceDTO) {
      const userWithSameEmail = await this.userRepository.findByEmail(email)

      if (userWithSameEmail) {
         throw new UserAlreadyExistsError()
      }

      const password_hash = await hash(password, 6)

      await this.userRepository.create({
         name,
         email,
         password_hash,
      })
   }
}
