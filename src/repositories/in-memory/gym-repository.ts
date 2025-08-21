import { Prisma, type Gym } from '@prisma/client'
import type { IGymRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'

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
}
