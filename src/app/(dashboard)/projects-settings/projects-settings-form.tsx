'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Loader, Paperclip, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { DropzoneOptions } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { resizeImageToBase64 } from '@/lib/utils'
import {
  ProjectSettingsFormSchema,
  projectSettingsFormSchema,
} from '@/lib/validations'

import { CheckCircle } from '@/components/icons'
import { Button } from '@/components/ui/button'
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

import { trpc } from '@/trpc/client'

export default function ProjectSettingsForm({
  onRemove,
}: {
  onRemove: () => void
}) {
  const [files, setFiles] = useState<File[] | null>(null)

  const addProjectMutation = trpc.project.addProject.useMutation()

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  } satisfies DropzoneOptions

  const form = useForm<ProjectSettingsFormSchema>({
    resolver: zodResolver(projectSettingsFormSchema),
    defaultValues: {
      name: '',
      demoUrl: '',
      repositoryUrl: '',
      description: '',
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
      await addProjectMutation.mutateAsync(values)
      toast.success('Project created successfully!')
      form.reset({
        name: '',
        demoUrl: '',
        repositoryUrl: '',
        description: '',
        image: undefined,
      })
      setFiles(null)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Failed to create project. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg border p-4"
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
                  dropzoneOptions={dropZoneConfig}
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
                      <div className="flex gap-3">
                        <Button
                          variant="secondary"
                          type="button"
                          className="bg-white"
                        >
                          <CloudUpload className="h-4 w-4" />
                          Upload Project Image
                        </Button>
                      </div>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
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
        {/* Project name and Demo URL */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>
        {/* Repository URL */}
        <FormField
          control={form.control}
          name="repositoryUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository URL</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/your-repo" {...field} />
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
        {/* Submit and Remove buttons */}
        <div className="mt-4 flex gap-2">
          <Button
            onClick={onRemove}
            variant="outline"
            className="ml-auto rounded-[8px]"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            className="rounded-[8px] bg-[#6466e9]"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add
          </Button>
        </div>
      </form>
    </Form>
  )
}
