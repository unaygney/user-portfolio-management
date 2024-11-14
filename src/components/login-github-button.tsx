'use client'

import { createAuthClient } from 'better-auth/react'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Github } from './icons'
import { Button } from './ui/button'

export default function LoginGithubButton() {
  const client = createAuthClient()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    await client.signIn.social(
      {
        provider: 'github',
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          toast.success('Login successful, redirecting...')
        },
        onError: (ctx) => {
          setLoading(false)
          console.error('Login failed:', ctx.error.message)
          toast.error('Login failed, please try again.')
        },
      }
    )
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      <Button
        onClick={handleLogin}
        disabled={loading}
        className="bg-[#20293A] hover:bg-[#20293A]/90"
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            <Github />
            Sign in with Github
          </>
        )}
      </Button>
      <div className="flex items-center gap-2">
        <span className="block h-[1px] w-full bg-[#e3e8ef]" />
        <span className="py-0.5 text-[10px] font-medium leading-normal text-[#677489]">
          or
        </span>
        <span className="block h-[1px] w-full bg-[#e3e8ef]" />
      </div>
    </div>
  )
}
