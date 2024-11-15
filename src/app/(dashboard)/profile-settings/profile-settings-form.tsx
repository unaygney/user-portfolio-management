'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Loader, Paperclip } from 'lucide-react'
import { useState } from 'react'
import { DropzoneOptions } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { resizeImageToBase64 } from '@/lib/utils'
import {
  ProfileSettingsFormSchema,
  profileSettingsFormSchema,
} from '@/lib/validations'

import { CheckCircle, User } from '@/components/icons'
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

import { User as IUser } from '@/db/schema'
import { trpc } from '@/trpc/client'

export default function ProfileSettingsForm({ user }: { user: IUser }) {
  const [files, setFiles] = useState<File[] | null>(null)

  const updateUserMutation = trpc.user.updateUser.useMutation()

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  } satisfies DropzoneOptions

  const form = useForm<ProfileSettingsFormSchema>({
    resolver: zodResolver(profileSettingsFormSchema),
    defaultValues: {
      email: user.email,
      bio: user.bio || '',
      jobTitle: user.jobTitle || '',
      name: user.name || '',
    },
  })

  async function handleFileChange(file: File) {
    try {
      const base64String = await resizeImageToBase64(file)
      form.setValue('imageUrl', base64String)
    } catch (error) {
      toast.error('Failed to process the image.')
    }
  }

  async function onSubmit(values: ProfileSettingsFormSchema) {
    try {
      await updateUserMutation.mutateAsync(values)
      toast.success('Profile updated successfully!')
      setTimeout(() => {
        window.location.reload()
      }, 400)
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* file input */}
        <FormField
          control={form.control}
          name="imageUrl"
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
                      <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#CDD5E0] text-black">
                        <User className="text-black" />
                      </span>
                      <span className="mt-1 text-sm/normal font-normal text-[#677489]">
                        Image must be 256 x 256px - max 2MB
                      </span>
                      <div className="flex gap-3">
                        <Button
                          variant="secondary"
                          type="button"
                          className="bg-white"
                        >
                          <CloudUpload className="h-4 w-4" />
                          Upload Profile Image
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
        {/* Email and Job title */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.com"
                    disabled
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* name */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div />
        </div>
        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[136px] resize-none rounded-[8px] border border-[#e3e8ef] shadow-sm"
                  placeholder="Enter a short introduction.."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* submit button */}
        <Button
          disabled={form.formState.isSubmitting}
          className="ml-auto rounded-[8px] bg-[#6466e9]"
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          Save
        </Button>
      </form>
    </Form>
  )
}
