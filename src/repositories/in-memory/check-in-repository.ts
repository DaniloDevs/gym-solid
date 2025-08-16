import { randomUUID } from 'crypto'
import { type CheckIn, type Prisma } from '@prisma/client'
import { type ICheckInRepository } from '../check-in-repository'

export class InMememoryCheckInRepository implements ICheckInRepository {
   public itens: CheckIn[] = []

   async findByUserIdOnDate(
      userId: string,
      date: Date,
   ): Promise<CheckIn | null> {
      const chekInSameDate = this.itens.find(
         (checkIn) => checkIn.user_id === userId,
      )

      return chekInSameDate ? chekInSameDate : null
   }

   async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
      const user = {
         id: randomUUID(),
         user_id: data.user_id,
         gym_id: data.gym_id,
         created_at: new Date(),
         validated_at: data.validated_at ? new Date(data.validated_at) : null,
      }

      this.itens.push(user)

      return user
   }
}
