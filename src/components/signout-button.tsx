'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'

import { Logout } from './icons'
import { Button } from './ui/button'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function SignoutButton() {
  const router = useRouter()
  const handleSignout = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Signed out')
          router.push('/auth/login')
        },
        onError: (error) => {
          toast.error(`Error signing out: ${error.error.message}`)
        },
      },
    })
  }
  return (
    <DropdownMenuItem
      className="text-sm/normal font-medium text-[#dd524c]"
      onClick={handleSignout}
    >
      <Logout />
      Log out
    </DropdownMenuItem>
  )
}
