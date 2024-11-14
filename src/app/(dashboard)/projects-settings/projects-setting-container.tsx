'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import ProjectSettingsForm from './projects-settings-form'

export default function ProjectSettingsContainer() {
  const [forms, setForms] = useState<number[]>([0])

  function addProjectForm() {
    setForms([...forms, forms.length])
  }

  function removeProjectForm(index: number) {
    setForms((prevForms) => prevForms.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        onClick={addProjectForm}
        className="mb-4 w-full items-center justify-start rounded-[8px] bg-[#E1E7FD] text-start text-[#4138C2] hover:bg-[#e1e7fd] hover:bg-opacity-80"
        size="lg"
      >
        <Plus className="h-4 w-4" />
        Add project
      </Button>

      {forms.map((formId, index) => (
        <ProjectSettingsForm
          key={formId}
          onRemove={() => removeProjectForm(index)}
        />
      ))}
    </div>
  )
}
