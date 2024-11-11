import React from 'react'

import AuthHeader from '@/components/auth-header'
import LoginGithubButton from '@/components/login-github-button'

import { CreateAccountForm } from './create-account-form'

export default function CreateAccount() {
  return (
    <div className="flex flex-col">
      <AuthHeader
        title="Create your account"
        description="Enter the fields below to get started"
      />
      <LoginGithubButton />
      <CreateAccountForm />
    </div>
  )
}
