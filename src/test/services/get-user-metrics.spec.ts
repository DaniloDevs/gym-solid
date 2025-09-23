import { InMememoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { GetUserMetricsService } from '@/services/get-user-metrics'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Get User Metrics Services', () => {
   let checkInRepository: InMememoryCheckInRepository
   let getUserMetricsService: GetUserMetricsService

   beforeEach(async () => {
      checkInRepository = new InMememoryCheckInRepository()
      getUserMetricsService = new GetUserMetricsService(checkInRepository)
   })

   it('should be able to get check-ins coutn from metrics ', async () => {
      for (let i = 1; i <= 22; i++) {
         await checkInRepository.create({
            gym_id: `gym-${i}`,
            user_id: 'user-01',
         })
      }
      const { metrics } = await getUserMetricsService.execute({
         userId: 'user-01',
      })

      expect(metrics.checkInCount).toBe(22)
   })
})
