import { InvalidCredentilsError } from '@/_errors/invalid-credentials'
import type { IUserRepository } from '@/repositories/user-repositoy'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
   email: string
   password: string
}

export class AuthenticateService {
   constructor(private repository: IUserRepository) {}

   async execute({ email, password }: AuthenticateRequest) {
      const user = await this.repository.findByEmail(email)

      if (!user) {
         throw new InvalidCredentilsError()
      }

      const doesPasswordMatchs = await compare(password, user.password_hash)

      if (!doesPasswordMatchs) {
         throw new InvalidCredentilsError()
      }

      return { user }
   }
}
