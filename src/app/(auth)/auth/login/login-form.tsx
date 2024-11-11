'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { LoginSchema, loginSchema } from '@/lib/validations'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginSchema) {
    const res = new Promise((resolve) => {
      setTimeout(() => {
        resolve(values)
      }, 2000)
    })
    console.log(await res)
    return res
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter a password"
                  {...field}
                  type="passowrd"
                />
              </FormControl>
              <FormDescription className="text-right">
                <Link
                  className="text-xs/normal font-semibold text-[#6466e9]"
                  href={'/auth/forgot-password'}
                >
                  Forgot password
                </Link>
              </FormDescription>
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
          Sign In
        </Button>
        <div className="flex items-center gap-2 text-xs/normal font-normal">
          <p className="text-[#677489]">Not a member?</p>
          <Link className="text-[#6466e9]" href={'/auth/create-account'}>
            Create an account
          </Link>
        </div>
      </form>
    </Form>
  )
}
