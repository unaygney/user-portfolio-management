'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import { baseUrl } from '@/lib/utils'
import { ForgotPasswordSchema, forgotPasswordSchema } from '@/lib/validations'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: ForgotPasswordSchema) {
    const { data, error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: `${baseUrl}/auth/choose-new-password`,
    })
    if (data?.status) {
      toast.success('Password reset link has been sent to your email')
    } else if (error) {
      toast.error(error?.message || 'An error occurred')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-[#6466e9] hover:bg-[#6466e9]/90"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loader className="h-4 w-4 animate-spin" />
          )}
          Reset Password
        </Button>
        <div className="text-xs/normal font-semibold">
          <Link className="text-[#6466e9]" href={'/auth/create-account'}>
            Back to login
          </Link>
        </div>
      </form>
    </Form>
  )
}
