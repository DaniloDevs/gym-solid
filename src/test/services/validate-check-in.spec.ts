import { ResourceNotFoundError } from '@/_errors/resource-not-found'
import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { ValidateCheckInService } from '@/services/validate-check-in'
import { expect, describe, it, beforeEach, afterEach } from 'vitest'

let checkInsRepository: InMememoryCheckInRepository
let sut: ValidateCheckInService

describe('Validate Check-in Use Case', () => {
   beforeEach(async () => {
      checkInsRepository = new InMememoryCheckInRepository()
      sut = new ValidateCheckInService(checkInsRepository)

      // vi.useFakeTimers()
   })

   afterEach(() => {
      // vi.useRealTimers()
   })

   it('should be able to validate the check-in', async () => {
      const createdCheckIn = await checkInsRepository.create({
         gym_id: 'gym-01',
         user_id: 'user-01',
      })

      const { checkIn } = await sut.execute({
         checkInId: createdCheckIn.id,
      })

      expect(checkIn.validated_at).toEqual(expect.any(Date))
      expect(checkInsRepository.itens[0].validated_at).toEqual(expect.any(Date))
   })

   it('should not be able to validate an inexistent check-in', async () => {
      await expect(() =>
         sut.execute({
            checkInId: 'inexistent-check-in-id',
         }),
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
})
