import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import { auth } from '@/lib/auth'

import ProfileSettingsForm from './profile-settings-form'
import { serverClient } from '@/trpc/serverClient'

export default async function ProfileSettings() {
  const session = await auth.api.getSession({
    headers: headers(),
  })
  if (!session) {
    redirect('/auth/login')
  }
  const userId = session.user.id

  const fetchedUser = await serverClient.user.getUserById.query({ id: userId })

  if (!fetchedUser) {
    redirect('/auth/login ')
  }

  const user = {
    ...fetchedUser,
    createdAt: new Date(fetchedUser.createdAt),
    updatedAt: new Date(fetchedUser.updatedAt),
  }

  return (
    <div className="w-full max-w-[720px] px-4 pt-10 md:px-0">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl/normal font-semibold text-[#20293a]">
          Profile settings
        </h1>
        <div className="rounded-[8px] border border-[#e3e8ef] px-4 pb-6 pt-5">
          <ProfileSettingsForm user={user} />
        </div>
      </div>
    </div>
  )
}
