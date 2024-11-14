import { protectedProcedure, publicProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { profileSettingsFormSchema } from '@/lib/validations'

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
  updateUser: protectedProcedure
    .input(profileSettingsFormSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id

      const currentUserData = await db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1)
        .then((rows) => rows[0])

      if (!currentUserData) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const updateData = {
        name: input.name || currentUserData.name || '',
        jobTitle: input.jobTitle || currentUserData.jobTitle || '',
        bio: input.bio || currentUserData.bio || '',
        image: input.imageUrl || currentUserData.image || null,
      }

      await db.update(user).set(updateData).where(eq(user.id, userId))

      return { success: true }
    }),
})
