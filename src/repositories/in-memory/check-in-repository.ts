import dayjs from 'dayjs'

import { randomUUID } from 'crypto'
import { type CheckIn, type Prisma } from '@prisma/client'
import { type ICheckInRepository } from '../check-in-repository'

export class InMememoryCheckInRepository implements ICheckInRepository {
   public itens: CheckIn[] = []

   async findByUserIdOnDate(
      userId: string,
      date: Date,
   ): Promise<CheckIn | null> {
      const startOfTheDay = dayjs(date).startOf('date')
      const endOfTheDay = dayjs(date).endOf('date')

      const chekInSameDate = this.itens.find((checkIn) => {
         const checkInDate = dayjs(checkIn.created_at)

         const isSameDate =
            checkInDate.isAfter(startOfTheDay) &&
            checkInDate.isBefore(endOfTheDay)

         return checkIn.user_id === userId && isSameDate
      })

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

   async findManyByUserId(userId: string, page: number) {
      return this.itens
         .filter((item) => item.user_id === userId)
         .slice((page - 1) * 20, page * 20)
   }

   async countByUserId(userId: string) {
      return this.itens.filter((item) => item.user_id === userId).length
   }

   async findById(id: string) {
      const checkIn = this.itens.find((item) => item.id === id)

      if (!checkIn) {
         return null
      }

      return checkIn
   }

   async save(checkIn: CheckIn) {
      const checkInIndex = this.itens.findIndex(
         (item) => item.id === checkIn.id,
      )

      if (checkInIndex >= 0) {
         this.itens[checkInIndex] = checkIn
      }

      return checkIn
   }
}
