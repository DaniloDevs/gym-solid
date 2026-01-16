import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { FetchUserCheckInsHistoryService } from '@/services/fetch-user-check-ins-history'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Fetch user check ins history Services', () => {
   let checkInRepository: InMememoryCheckInRepository
   let service: FetchUserCheckInsHistoryService

   beforeEach(async () => {
      checkInRepository = new InMememoryCheckInRepository()
      service = new FetchUserCheckInsHistoryService(checkInRepository)
   })

   it('should be able to fetch check ins history ', async () => {
      await checkInRepository.create({
         gym_id: 'gym-01',
         user_id: 'user-01',
      })
      await checkInRepository.create({
         gym_id: 'gym-02',
         user_id: 'user-01',
      })

      const { checkIns } = await service.execute({ userId: 'user-01', page: 1 })

      expect(checkIns).toHaveLength(2)
      expect(checkIns).toEqual([
         expect.objectContaining({ gym_id: 'gym-01' }),
         expect.objectContaining({ gym_id: 'gym-02' }),
      ])
   })

   it('should be able to fetch paginated check ins history ', async () => {
      for (let i = 1; i <= 22; i++) {
         await checkInRepository.create({
            gym_id: `gym-${i}`,
            user_id: 'user-01',
         })
      }

      const { checkIns } = await service.execute({
         userId: 'user-01',
         page: 2,
      })

      expect(checkIns).toHaveLength(2)
      expect(checkIns).toEqual([
         expect.objectContaining({ gym_id: 'gym-21' }),
         expect.objectContaining({ gym_id: 'gym-22' }),
      ])
   })
})
