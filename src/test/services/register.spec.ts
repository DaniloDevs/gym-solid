import { UserAlreadyExistsError } from '@/_errors/user-alredy-exists'
import { InMememoryUserRepository } from '@/repositories/in-memory/user-repository'
import { RegisterService } from '@/services/register'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

describe('Register Services', () => {
   it('should be able to register ', async () => {
      const repository = new InMememoryUserRepository()
      const service = new RegisterService(repository)

      const { user } = await service.execute({
         name: 'John Doe',
         email: 'jhon@exemple.com',
         password: '123456',
      })

      expect(user.id).toEqual(expect.any(String))
   })

   it('should hash user password upon registration', async () => {
      const repository = new InMememoryUserRepository()
      const service = new RegisterService(repository)

      const { user } = await service.execute({
         name: 'John Doe',
         email: 'jhon@exemple.com',
         password: '123456',
      })

      const isPassawordCorrectly = await compare('123456', user.password_hash)

      expect(isPassawordCorrectly).toBe(true)
   })

   it('should not be able to register with same email twice', async () => {
      const repository = new InMememoryUserRepository()
      const service = new RegisterService(repository)

      const email = 'jhon@exemple.com'

      await service.execute({
         name: 'John Doe',
         email,
         password: '123456',
      })

      await expect(() =>
         service.execute({
            name: 'John Doe',
            email,
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(UserAlreadyExistsError)
   })
})
