import React from 'react'

import AuthHeader from '@/components/auth-header'

import { ForgotPasswordForm } from './forgot-password'

export default function ForgotPassword() {
  return (
    <div className="flex flex-col">
      <AuthHeader
        title="Forgot password"
        description="We’ll email you instructions to reset your password"
      />
      <ForgotPasswordForm />
    </div>
  )
}
