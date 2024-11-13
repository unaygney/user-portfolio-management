import React from 'react'

import ProfileSettingsForm from './profile-settings-form'

export default function ProfileSettings() {
  return (
    <div className="w-full max-w-[720px] px-4 pt-10 md:px-0">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl/normal font-semibold text-[#20293a]">
          Profile settings
        </h1>
        <div className="rounded-[8px] border border-[#e3e8ef] px-4 pb-6 pt-5">
          <ProfileSettingsForm />
        </div>
      </div>
    </div>
  )
}
