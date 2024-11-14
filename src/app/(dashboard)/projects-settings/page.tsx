import React from 'react'

import Projects from './projects'
import ProjectSettingsContainer from './projects-setting-container'

export default function ProjectsSettings() {
  return (
    <div className="w-full max-w-[720px] px-4 pb-20 pt-10 md:px-0">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl/normal font-semibold text-[#20293a]">
          Projects settings
        </h1>
        <ProjectSettingsContainer />
        <Projects />
      </div>
    </div>
  )
}
