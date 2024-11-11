import React from 'react'

import AuthHeader from '@/components/auth-header'

import { ChooseNewPasswordForm } from './choose-new-password-form'

export default function ChooseNewPassword() {
  return (
    <div className="flex flex-col">
      <AuthHeader
        title="Choose new password"
        description="Enter your new password and you’re all set."
      />

      <ChooseNewPasswordForm />
    </div>
  )
}
