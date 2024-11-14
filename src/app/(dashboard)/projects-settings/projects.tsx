import { Pen, Pencil } from 'lucide-react'
import { headers } from 'next/headers'
import Image from 'next/image'
import React from 'react'

import { auth } from '@/lib/auth'

import { Button } from '@/components/ui/button'

import { Project as IProject } from '@/db/schema'
import { serverClient } from '@/trpc/serverClient'

export default async function Projects() {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session) {
    return null
  }

  const userWithProjects = await serverClient.project.userProjects.query({
    userId: session.user.id,
  })

  const projects = userWithProjects.projects.map((project) => ({
    ...project,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  }))

  return (
    <div className="mt-6 flex flex-col gap-6">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  )
}

function Project({ project }: { project: IProject }) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-[8px] border border-[#e3e8ef] p-3 md:flex-row">
      <div className="relative h-[327px] w-full overflow-hidden rounded-[8px] md:h-[138px] md:w-[217px]">
        <Image
          src={project.image}
          alt={`project.name ${project.name}'s`}
          fill
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-1">
        <h2 className="text-base/normal font-semibold text-black">
          {project.name}
        </h2>
        <p className="text-sm/normal font-normal text-[#677489]">
          {project.description}
        </p>
        <div className="mt-auto flex gap-3">
          <Button
            size="sm"
            variant="outline"
            className="rounded-[8px] border-none bg-[#F2F5F9] text-[#20293A]"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}
