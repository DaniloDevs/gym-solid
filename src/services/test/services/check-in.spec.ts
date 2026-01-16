import { MaxDistanceError } from '@/services/_errors/max-distance'
import { MaxNumberOfCheckInsError } from '@/services/_errors/max-number-of-check-ins'
import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { InMememoryGymRepository } from '@/repositories/in-memory/gym-repository'
import { CheckInService } from '@/services/check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'

describe('Check in Services', () => {
   let checkInRepository: InMememoryCheckInRepository
   let gymRepository: InMememoryGymRepository
   let checkInService: CheckInService

   beforeEach(async () => {
      checkInRepository = new InMememoryCheckInRepository()
      gymRepository = new InMememoryGymRepository()
      checkInService = new CheckInService(checkInRepository, gymRepository)

      await gymRepository.create({
         id: 'gym-01',
         title: 'C# Gym',
         description: 'Fazendo o teste da gym',
         phone: '',
         latitude: -22.7878316,
         longitude: -43.3131158,
      })

      vi.useFakeTimers()
   })

   afterAll(() => {
      vi.useRealTimers()
   })

   it('should be able to check in ', async () => {
      const { checkIn } = await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -22.7878316,
         userLongitude: -43.3131158,
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   it('should not be able to check in twice in the same day ', async () => {
      vi.setSystemTime(new Date(2021, 0, 25, 8, 0, 0))

      await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -22.7878316,
         userLongitude: -43.3131158,
      })

      await expect(() =>
         checkInService.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -22.7878316,
            userLongitude: -43.3131158,
         }),
      ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
   })

   it('should be able to check in twice but in different days', async () => {
      vi.setSystemTime(new Date(2021, 0, 25, 8, 0, 0))

      await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -22.7878316,
         userLongitude: -43.3131158,
      })

      vi.setSystemTime(new Date(2021, 0, 29, 8, 0, 0))

      const { checkIn } = await checkInService.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -22.7878316,
         userLongitude: -43.3131158,
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   it('should not be able to check in on distant gym', async () => {
      gymRepository.itens.push({
         id: 'gym-02',
         title: 'C# Gym',
         description: 'Fazendo o teste da gym',
         phone: '',
         latitude: new Decimal(-22.9335783),
         longitude: new Decimal(-43.2401386),
      })

      await expect(() =>
         checkInService.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -22.7878316,
            userLongitude: -43.3131158,
         }),
      ).rejects.toBeInstanceOf(MaxDistanceError)
   })
})
