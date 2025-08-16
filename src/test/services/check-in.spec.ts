import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { CheckInService } from '@/services/check-in'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

describe('Check in Services', () => {
   let repository: InMememoryCheckInRepository
   let service: CheckInService

   beforeEach(() => {
      repository = new InMememoryCheckInRepository()
      service = new CheckInService(repository)

      vi.useFakeTimers()
   })

   afterAll(() => {
      vi.useRealTimers()
   })

   it('should be able to check in ', async () => {
      const { checkIn } = await service.execute({
         gymId: 'gym-01',
         userId: 'user-01',
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   it('should not be able to check in twice in the same day ', async () => {
      vi.setSystemTime(new Date(2021, 0, 25, 8, 0, 0))

      await service.execute({
         gymId: 'gym-01',
         userId: 'user-01',
      })

      await expect(() =>
         service.execute({
            gymId: 'gym-01',
            userId: 'user-01',
         }),
      ).rejects.toBeInstanceOf(Error)
   })

   it('should be able to check in twice but in different days', async () => {
      vi.setSystemTime(new Date(2021, 0, 25, 8, 0, 0))

      await service.execute({
         gymId: 'gym-01',
         userId: 'user-01',
      })

      vi.setSystemTime(new Date(2021, 0, 29, 8, 0, 0))

      const { checkIn } = await service.execute({
         gymId: 'gym-01',
         userId: 'user-01',
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })
})
