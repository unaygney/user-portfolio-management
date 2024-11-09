'use client'

import { createAuthClient } from 'better-auth/react'
import { useState } from 'react'

import { authClient } from '@/lib/auth-client'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const client = createAuthClient()

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message)
        },
      }
    )
  }

  const signUpWithGitHub = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: 'github',
    })

    if (error) {
      alert(error.message)
    } else {
      // Redirect to the dashboard or any other page after successful GitHub signup
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 bg-neutral-200">
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button onClick={signUpWithGitHub}>Sign Up github</button>
      <button onClick={signUp}>Sign Up</button>
    </div>
  )
}
