import React from 'react'

import AuthCard from '@/components/auth-card'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full w-full p-6">
        <AuthCard />
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  )
}
