import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { CheckInService } from '@/services/check-in'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Check in Services', () => {
   let repository: InMememoryCheckInRepository
   let service: CheckInService

   beforeEach(() => {
      repository = new InMememoryCheckInRepository()
      service = new CheckInService(repository)
   })

   it('should be able to check-in ', async () => {
      const { checkIn } = await service.execute({
         gymId: '',
         userId: '',
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })
})
