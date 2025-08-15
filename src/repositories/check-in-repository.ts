import { type Prisma, type CheckIn } from '@prisma/client'

export interface ICheckInRepository {
   create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
