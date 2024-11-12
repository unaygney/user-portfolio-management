'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import {
  ChooseNewPasswordSchema,
  chooseNewPasswordSchema,
} from '@/lib/validations'

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

export function ChooseNewPasswordForm() {
  const router = useRouter()
  const form = useForm<ChooseNewPasswordSchema>({
    resolver: zodResolver(chooseNewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
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

  async function onSubmit(values: ChooseNewPasswordSchema) {
    const { data, error } = await authClient.resetPassword({
      newPassword: values.password,
    })

    if (data?.status) {
      toast.success('Password reset successfully')
      router.push('/auth/login')
    } else if (error) {
      toast.error(error?.message || 'An error occurred')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter a new password"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handlePasswordChange(e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Re-enter a password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle
              className={
                passwordRequirements.lowercase
                  ? 'text-[#6466E9]'
                  : 'text-[#677489]'
              }
            />
            <p className="text-[10px] font-normal text-[#677489]">
              one lowercase character
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              className={
                passwordRequirements.specialChar
                  ? 'text-[#6466E9]'
                  : 'text-[#677489]'
              }
            />
            <p className="text-[10px] font-normal text-[#677489]">
              one special character
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              className={
                passwordRequirements.uppercase
                  ? 'text-[#6466E9]'
                  : 'text-[#677489]'
              }
            />
            <p className="text-[10px] font-normal text-[#677489]">
              one uppercase character
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              className={
                passwordRequirements.minLength
                  ? 'text-[#6466E9]'
                  : 'text-[#677489]'
              }
            />
            <p className="text-[10px] font-normal text-[#677489]">
              8 character minimum
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle
              className={
                passwordRequirements.number
                  ? 'text-[#6466E9]'
                  : 'text-[#677489]'
              }
            />
            <p className="text-[10px] font-normal text-[#677489]">one number</p>
          </div>
        </div>
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
      </form>
    </Form>
  )
}
