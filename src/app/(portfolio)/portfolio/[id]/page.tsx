import { redirect } from 'next/navigation'
import React from 'react'

import { getUserWithProjects } from '@/lib/queries'

import PortfolioHeader from '@/components/portfolio-header'
import PortfolioUserContent from '@/components/portfolio-user-content'
import PortfolioUserProjects from '@/components/portfolio-user-projects'

import { serverClient } from '@/trpc/serverClient'

export default async function PortfolioPage({
  params,
}: {
  params: { id: string }
}) {
  const userWithProjects = await getUserWithProjects(params.id)

  if (!userWithProjects) {
    redirect('/auth/login')
  }

  const userWithDate = {
    ...userWithProjects,
    createdAt: new Date(userWithProjects.createdAt),
    updatedAt: new Date(userWithProjects.updatedAt),
  }

  const projects = userWithProjects.projects.map((project) => ({
    ...project,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  }))

  return (
    <div className="flex flex-col pb-20">
      <PortfolioHeader />
      <PortfolioUserContent user={userWithDate} />
      <PortfolioUserProjects projects={projects} />
    </div>
  )
}
