import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UrlObject } from 'url'

import { cn } from '@/lib/utils'

import { ExternalLink } from './icons'
import { buttonVariants } from './ui/button'
import { Project as IProject } from '@/db/schema'

export default function PortfolioUserProjects({
  projects,
}: {
  projects: IProject[]
}) {
  return (
    <div className="mx-auto mt-6 w-full max-w-[720px]">
      <div className="flex flex-col gap-4">
        <h3 className="text-base/normal font-medium text-[#677489]">
          Projects
        </h3>

        {projects.length === 0 ? (
          <p className="text-center text-[#677489]">
            You haven&apos;t added any projects yet.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex w-full flex-col gap-6 rounded-[8px] border border-[#e3e8ef] p-3 md:flex-row"
              >
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
                  <p className="line-clamp-3 text-sm/normal font-normal text-[#677489]">
                    {project.description}
                  </p>
                  <div className="mt-auto flex gap-3">
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl as unknown as UrlObject}
                        referrerPolicy="no-referrer"
                        target="_blank"
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                          'rounded-[8px] px-3 py-2 text-[#677489]'
                        )}
                      >
                        Demo URL <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                    <Link
                      href={project.repositoryUrl as unknown as UrlObject}
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'rounded-[8px] px-3 py-2 text-[#677489]'
                      )}
                    >
                      Repository URL <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
