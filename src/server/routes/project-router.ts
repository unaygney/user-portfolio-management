import { protectedProcedure, publicProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { getUserWithProjects } from '@/lib/queries'
import { projectSettingsFormSchema } from '@/lib/validations'

import { db } from '@/db'
import { project } from '@/db/schema'

export const projectRouter = router({
  addProject: protectedProcedure
    .input(projectSettingsFormSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id

      try {
        await db.insert(project).values({
          id: uuidv4(),
          userId,
          name: input.name,
          description: input.description,
          image: input.image,
          repositoryUrl: input.repositoryUrl,
          demoUrl: input.demoUrl || '',
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        revalidatePath('/', 'layout')
        return { success: true, message: 'Project added successfully' }
      } catch (error) {
        console.error('Error adding project:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to add project',
        })
      }
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        ...projectSettingsFormSchema.shape,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { projectId, ...updateData } = input
      const userId = ctx.user.id

      try {
        const existingProject = await db
          .select()
          .from(project)
          .where(and(eq(project.id, projectId), eq(project.userId, userId)))
          .limit(1)
          .then((rows) => rows[0])

        if (!existingProject) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message:
              'Project not found or you do not have permission to update it',
          })
        }

        await db
          .update(project)
          .set({
            name: updateData.name,
            description: updateData.description,
            image: updateData.image,
            repositoryUrl: updateData.repositoryUrl,
            demoUrl: updateData.demoUrl || '',
            updatedAt: new Date(),
          })
          .where(eq(project.id, projectId))

        revalidatePath('/', 'layout')
        return { success: true, message: 'Project updated successfully' }
      } catch (error) {
        console.error('Error updating project:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update project',
        })
      }
    }),
  userProjects: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const userWithProjects = await getUserWithProjects(input.userId)

        if (!userWithProjects) {
          throw new Error('User not found')
        }

        return userWithProjects
      } catch (error) {
        console.error('Error fetching user projects:', error)
        throw new Error('Failed to fetch user projects')
      }
    }),
})
