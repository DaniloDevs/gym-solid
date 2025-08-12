import { InvalidCredentilsError } from '@/_errors/invalid-credentials'
import { InMememoryUserRepository } from '@/repositories/in-memory/user-repository'
import { AuthenticateService } from '@/services/authenticate'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

describe('Authenticate Services', () => {
   it('should be able to register ', async () => {
      const repository = new InMememoryUserRepository()
      const service = new AuthenticateService(repository)

      repository.create({
         name: 'John Doe',
         email: 'jhon@exemple.com',
         password_hash: await hash('123456', 6),
      })

      const { user } = await service.execute({
         email: 'jhon@exemple.com',
         password: '123456',
      })

      expect(user.id).toEqual(expect.any(String))
   })

   it('should not be albe authenticate with wrong email ', async () => {
      const repository = new InMememoryUserRepository()
      const service = new AuthenticateService(repository)

      await expect(
         service.execute({
            email: 'jhon@exemple.com',
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(InvalidCredentilsError)
   })

   it('should be able to register ', async () => {
      const repository = new InMememoryUserRepository()
      const service = new AuthenticateService(repository)

      repository.create({
         name: 'John Doe',
         email: 'jhon@exemple.com',
         password_hash: await hash('123456', 6),
      })

      await expect(
         service.execute({
            email: 'jhon@exemple.com',
            password: '124578',
         }),
      ).rejects.toBeInstanceOf(InvalidCredentilsError)
   })
})
