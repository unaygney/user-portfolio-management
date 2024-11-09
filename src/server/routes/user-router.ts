import { publicProcedure, router } from '../trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/db'
import { user } from '@/db/schema'

export const userRouter = router({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const userData = await db
        .select()
        .from(user)
        .where(eq(user.id, input.id))
        .limit(1)
        .then((rows) => rows[0] || null)

      return userData
    }),
})
