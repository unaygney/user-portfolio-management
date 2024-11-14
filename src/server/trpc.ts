import { TRPCError, initTRPC } from '@trpc/server'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'

const t = initTRPC.create()

const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session || !session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    })
  }

  return next({
    ctx: {
      ...ctx,
      user: session.user,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthenticated)
