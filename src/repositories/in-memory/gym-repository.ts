import { Prisma, type Gym } from '@prisma/client'
import type { FindManyNearbyParams, IGymRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCordinates } from '@/utils/get-distance-between-coordinate'

export class InMememoryGymRepository implements IGymRepository {
   public itens: Gym[] = []

   async create(data: Prisma.GymCreateInput): Promise<Gym> {
      const gym: Gym = {
         id: data.id ?? randomUUID(),
         description: data.description ?? null,
         latitude: new Prisma.Decimal(data.latitude.toString()),
         longitude: new Prisma.Decimal(data.longitude.toString()),
         phone: data.phone ?? null,
         title: data.title,
      }

      this.itens.push(gym)

      return gym
   }

   async findById(id: string): Promise<Gym | null> {
      const gym = this.itens.find((gym) => gym.id === id)

      return gym ?? null
   }

   async searchMany(query: string, page: number) {
      return this.itens
         .filter((item) => item.title.includes(query))
         .slice((page - 1) * 20, page * 20)
   }
   async findManyNearby(params: FindManyNearbyParams) {
      return this.itens.filter((item) => {
         const distance = getDistanceBetweenCordinates(
            { latitude: params.latitude, longitude: params.longitude },
            {
               latitude: item.latitude.toNumber(),
               longitude: item.longitude.toNumber(),
            },
         )

         return distance < 10
      })
   }
}
