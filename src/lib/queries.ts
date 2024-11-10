import { db } from '@/db'

export const getUserWithProjects = async (userId: string) => {
  return await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      projects: true,
    },
  })
}
