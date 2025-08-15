import { ResourceNotFoundError } from '@/_errors/resource-not-found'
import { InMememoryUserRepository } from '@/repositories/in-memory/user-repository'
import { GetUserProfileService } from '@/services/get-user-profile'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Get user profile Services', () => {
   let repository: InMememoryUserRepository
   let service: GetUserProfileService

   beforeEach(() => {
      repository = new InMememoryUserRepository()
      service = new GetUserProfileService(repository)
   })

   it('should be able to get user profile', async () => {
      const createdUser = await repository.create({
         name: 'John Doe',
         email: 'jhon@exemple.com',
         password_hash: await hash('123456', 6),
      })

      const { user } = await service.execute({
         userId: createdUser.id,
      })

      expect(user.id).toEqual(expect.any(String))
      expect(user.name).toEqual('John Doe')
   })

   it('should not be able to get user profile with wrong id ', async () => {
      await expect(
         service.execute({
            userId: 'non-existing-id',
         }),
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
})
