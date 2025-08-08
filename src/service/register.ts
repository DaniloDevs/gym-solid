import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceDTO {
   name: string
   email: string
   password: string
}

export default async function registerService({
   email,
   name,
   password,
}: RegisterServiceDTO) {
   const password_hash = await hash(password, 6)

   const userWithSameEmail = await prisma.user.findUnique({
      where: {
         email,
      },
   })

   if (userWithSameEmail) {
      throw new Error('E-mail obrigatorio')
   }

   await prisma.user.create({
      data: {
         name,
         email,
         password_hash,
      },
   })
}
