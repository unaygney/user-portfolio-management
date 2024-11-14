import { projectRouter } from './routes/project-router'
import { userRouter } from './routes/user-router'
import { router } from './trpc'

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
})

export type AppRouter = typeof appRouter
