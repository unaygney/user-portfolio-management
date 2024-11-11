import React from 'react'

import AuthHeader from '@/components/auth-header'
import LoginGithubButton from '@/components/login-github-button'

import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <div className="flex flex-col">
      <AuthHeader
        title="Login to account"
        description="Enter your credentials to access your account"
      />
      <LoginGithubButton />
      <LoginForm />
    </div>
  )
}
