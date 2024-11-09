import { userRouter } from './routes/user-router'
import { router } from './trpc'

export const appRouter = router({
  user: userRouter,
})

export type AppRouter = typeof appRouter
