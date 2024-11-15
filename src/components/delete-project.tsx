'use client'

import { CheckCircle, Loader, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from './ui/button'
import { Modal } from './ui/modal'
import { Project as IProject } from '@/db/schema'
import { trpc } from '@/trpc/client'

export default function DeleteProjectModal({ project }: { project: IProject }) {
  const [showModal, setShowModal] = useState(false)
  const deleteProjectMutation = trpc.project.deleteProject.useMutation()

  async function handleDelete() {
    try {
      await deleteProjectMutation.mutateAsync({ projectId: project.id })
      toast.success('Project deleted successfully!')
      setShowModal(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project. Please try again.')
    }
  }

  return (
    <div>
      <Button
        size="sm"
        variant="destructive"
        className="rounded-[8px]"
        onClick={() => setShowModal(true)}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="flex flex-col items-start justify-start gap-4 p-4">
            <h2 className="text-lg font-semibold text-[#20293A]">
              Are you sure you want to delete this project?
            </h2>
            <p className="text-sm text-[#677489]">
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button
                disabled={deleteProjectMutation.isLoading}
                className="rounded-[8px] bg-red-600 text-white"
                onClick={handleDelete}
              >
                {deleteProjectMutation.isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </Button>
              <Button
                variant="outline"
                className="rounded-[8px]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
