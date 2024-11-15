'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { resizeImageToBase64 } from '@/lib/utils'
import {
  ProjectSettingsFormSchema,
  projectSettingsFormSchema,
} from '@/lib/validations'

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Button } from './ui/button'
import { Modal } from './ui/modal'
import { Project as IProject } from '@/db/schema'
import { trpc } from '@/trpc/client'

export default function UpdateProjectModal({ project }: { project: IProject }) {
  const [showModal, setShowModal] = useState(false)
  const [files, setFiles] = useState<File[] | null>(null)

  const updateProjectMutation = trpc.project.updateProject.useMutation()

  const form = useForm<ProjectSettingsFormSchema>({
    resolver: zodResolver(projectSettingsFormSchema),
    defaultValues: {
      name: project.name,
      demoUrl: project.demoUrl,
      repositoryUrl: project.repositoryUrl,
      description: project.description,
      image: project.image,
    },
  })

  async function handleFileChange(file: File) {
    try {
      const base64String = await resizeImageToBase64(file, 500, 500)
      form.setValue('image', base64String)
    } catch (error) {
      toast.error('Failed to process the image.')
    }
  }

  async function onSubmit(values: ProjectSettingsFormSchema) {
    try {
      await updateProjectMutation.mutateAsync({
        projectId: project.id,
        ...values,
      })
      toast.success('Project updated successfully!')
      setShowModal(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('Failed to update project. Please try again.')
    }
  }

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        className="rounded-[8px] border-none bg-[#F2F5F9] text-[#20293A]"
        onClick={() => setShowModal(true)}
      >
        <Pencil className="h-3 w-3" />
        Edit
      </Button>
      <Modal
        className="md:h-[75%] md:overflow-auto"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4"
          >
            {/* file input */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={(newFiles) => {
                        setFiles(newFiles)
                        if (newFiles && newFiles[0]) {
                          handleFileChange(newFiles[0])
                        }
                      }}
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 2,
                        multiple: false,
                        accept: {
                          'image/png': ['.png'],
                          'image/jpeg': ['.jpg', '.jpeg'],
                        },
                      }}
                      className="relative rounded-lg bg-background p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="overflow-hidden rounded-[6px] outline-slate-500"
                      >
                        <div className="flex h-[205px] w-full flex-col items-center justify-center gap-3 bg-[#f2f5f9]">
                          <span className="mt-1 text-sm/normal font-normal text-[#677489]">
                            Image must be PNG or JPEG - max 2MB
                          </span>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Project Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Repository URL */}
            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/your-repo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Demo URL */}
            <FormField
              control={form.control}
              name="demoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-demo-url.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[136px] resize-none rounded-[8px] border border-[#e3e8ef] shadow-sm"
                      placeholder="Enter a short project description.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit and Close buttons */}
            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => setShowModal(false)}
                type="button"
                variant="outline"
                className="ml-auto rounded-[8px]"
              >
                Cancel
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                className="rounded-[8px] bg-[#6466e9]"
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  )
}
