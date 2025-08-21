import { InMememoryGymRepository } from '@/repositories/in-memory/gym-repository'
import { CreateGymService } from '@/services/create-gym'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Register Services', () => {
   let repository: InMememoryGymRepository
   let service: CreateGymService

   beforeEach(() => {
      repository = new InMememoryGymRepository()
      service = new CreateGymService(repository)
   })

   it('should be able to register ', async () => {
      const { gym } = await service.execute({
         title: 'JAVA',
         description: null,
         phone: null,
         latitude: -22.7878316,
         longitude: -43.3131158,
      })

      expect(gym.id).toEqual(expect.any(String))
   })
})
