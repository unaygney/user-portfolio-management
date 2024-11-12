'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'

import { Button } from './ui/button'

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
  return <Button onClick={handleSignout}>Signout</Button>
}
