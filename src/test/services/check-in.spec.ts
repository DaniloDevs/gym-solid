import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { InMememoryGymRepository } from '@/repositories/in-memory/gym-repository'
import { CheckInService } from '@/services/check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

describe('Check in Services', () => {
   let checkInRepository: InMememoryCheckInRepository
   let gymRepository: InMememoryGymRepository
   let checkInService: CheckInService

   beforeEach(() => {
      checkInRepository = new InMememoryCheckInRepository()
      gymRepository = new InMememoryGymRepository()
      checkInService = new CheckInService(checkInRepository, gymRepository)

      vi.useFakeTimers()
   })

   afterAll(() => {
      vi.useRealTimers()
   })

   it('should be able to check in ', async () => {
      gymRepository.itens.push({
         id: 'gym-01',
         title: 'Java Gym',
         description: 'Fazendo o teste da gym',
         phone: '',
         latitude: new Decimal(0),
         longitude: new Decimal(0),
      })

      const { checkIn } = await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 0,
         userLongitude: 0,
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   it('should not be able to check in twice in the same day ', async () => {
      vi.setSystemTime(new Date(2021, 0, 25, 8, 0, 0))

      gymRepository.itens.push({
         id: 'gym-01',
         title: 'Java Gym',
         description: 'Fazendo o teste da gym',
         phone: '',
         latitude: new Decimal(0),
         longitude: new Decimal(0),
      })

      await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 0,
         userLongitude: 0,
      })

      await expect(() =>
         checkInService.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
         }),
      ).rejects.toBeInstanceOf(Error)
   })

   it('should be able to check in twice but in different days', async () => {
      vi.setSystemTime(new Date(2021, 0, 25, 8, 0, 0))

      gymRepository.itens.push({
         id: 'gym-01',
         title: 'Java Gym',
         description: 'Fazendo o teste da gym',
         phone: '',
         latitude: new Decimal(0),
         longitude: new Decimal(0),
      })

      await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 0,
         userLongitude: 0,
      })

      vi.setSystemTime(new Date(2021, 0, 29, 8, 0, 0))

      const { checkIn } = await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 0,
         userLongitude: 0,
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })
})
