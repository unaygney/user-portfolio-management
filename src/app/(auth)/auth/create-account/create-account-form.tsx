'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import { CreateAccountSchema, createAccountSchema } from '@/lib/validations'

import { CheckCircle } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function CreateAccountForm() {
  const router = useRouter()
  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  })

  const handlePasswordChange = (value: string) => {
    setPasswordRequirements({
      minLength: value.length >= 8,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[^a-zA-Z0-9]/.test(value),
    })
  }

  async function onSubmit(values: CreateAccountSchema) {
    const { data, error } = await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: '',
      },
      {
        onSuccess: (ctx) => {
          toast.success('Account created successfully. Redirecting...')
          router.push('/')
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      }
    )
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
                  type="password"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handlePasswordChange(e.target.value)
                  }}
                />
              </FormControl>
              <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle
                    className={`${
                      passwordRequirements.lowercase
                        ? 'text-[#6466E9]'
                        : 'text-[#677489]'
                    } transition-colors duration-200`}
                  />
                  <p className="text-[10px] font-normal text-[#677489]">
                    one lower case character
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle
                    className={`${
                      passwordRequirements.specialChar
                        ? 'text-[#6466E9]'
                        : 'text-[#677489]'
                    } transition-colors duration-200`}
                  />
                  <p className="text-[10px] font-normal text-[#677489]">
                    one special character
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle
                    className={`${
                      passwordRequirements.uppercase
                        ? 'text-[#6466E9]'
                        : 'text-[#677489]'
                    } transition-colors duration-200`}
                  />
                  <p className="text-[10px] font-normal text-[#677489]">
                    one uppercase character
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle
                    className={`${
                      passwordRequirements.minLength
                        ? 'text-[#6466E9]'
                        : 'text-[#677489]'
                    } transition-colors duration-200`}
                  />
                  <p className="text-[10px] font-normal text-[#677489]">
                    8 character minimum
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle
                    className={`${
                      passwordRequirements.number
                        ? 'text-[#6466E9]'
                        : 'text-[#677489]'
                    } transition-colors duration-200`}
                  />
                  <p className="text-[10px] font-normal text-[#677489]">
                    one number
                  </p>
                </div>
              </div>

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
          Create account
        </Button>
        <div className="flex items-center gap-2 text-xs/normal font-normal">
          <p className="text-[#677489]">Already have an account?</p>
          <Link className="text-[#6466e9]" href={'/auth/login'}>
            Log in
          </Link>
        </div>
      </form>
    </Form>
  )
}
