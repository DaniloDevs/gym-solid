import { randomUUID } from 'crypto'
import type { IUserRepository } from '../user-repositoy'
import { type Prisma, type User } from '@prisma/client'

export class InMememoryUserRepository implements IUserRepository {
   public itens: User[] = []

   async findById(id: string): Promise<User | null> {
      const user = this.itens.find((user) => user.id === id)

      return user ? user : null
   }

   async findByEmail(email: string): Promise<User | null> {
      const user = this.itens.find((user) => user.email === email)

      return user ? user : null
   }

   async create(data: Prisma.UserCreateInput): Promise<User> {
      const user = {
         id: randomUUID(),
         name: data.name,
         email: data.email,
         password_hash: data.password_hash,
         created_at: new Date(),
      }

      this.itens.push(user)

      return user
   }
}
