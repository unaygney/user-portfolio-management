import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

import { db } from '@/db'
import { usersTable as users } from '@/db/schema'

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await db.select().from(users)
  }),
  addUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await db.insert(users).values({
        name: input.name,
        age: input.age,
        email: input.email,
      })
      return true
    }),
})
