import { type Gym, type Prisma } from '@prisma/client'

export interface IGymRepository {
   create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
   findById(id: string): Promise<Gym | null>
}
