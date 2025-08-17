import { type Gym } from '@prisma/client'
import type { IGymRepository } from '../gyms-repository'

export class InMememoryGymRepository implements IGymRepository {
   public itens: Gym[] = []

   async findById(id: string): Promise<Gym | null> {
      const gym = this.itens.find((gym) => gym.id === id)

      return gym ? gym : null
   }
}
