import { InMememoryGymRepository } from '@/repositories/in-memory/gym-repository'
import { SearchGymsService } from '@/services/search-gyms'
import { expect, describe, it, beforeEach } from 'vitest'

describe('Search Gyms Use Case', () => {
   let gymsRepository: InMememoryGymRepository
   let sut: SearchGymsService

   beforeEach(async () => {
      gymsRepository = new InMememoryGymRepository()
      sut = new SearchGymsService(gymsRepository)
   })

   it('should be able to search for gyms', async () => {
      await gymsRepository.create({
         title: 'JavaScript Gym',
         description: null,
         phone: null,
         latitude: -27.2092052,
         longitude: -49.6401091,
      })

      await gymsRepository.create({
         title: 'TypeScript Gym',
         description: null,
         phone: null,
         latitude: -27.2092052,
         longitude: -49.6401091,
      })

      const { gyms } = await sut.execute({
         query: 'JavaScript',
         page: 1,
      })

      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
         expect.objectContaining({ title: 'JavaScript Gym' }),
      ])
   })

   it('should be able to fetch paginated gym search', async () => {
      for (let i = 1; i <= 22; i++) {
         await gymsRepository.create({
            title: `JavaScript Gym ${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
         })
      }

      const { gyms } = await sut.execute({
         query: 'JavaScript',
         page: 2,
      })

      expect(gyms).toHaveLength(2)
      expect(gyms).toEqual([
         expect.objectContaining({ title: 'JavaScript Gym 21' }),
         expect.objectContaining({ title: 'JavaScript Gym 22' }),
      ])
   })
})
