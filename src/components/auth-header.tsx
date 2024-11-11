import React from 'react'

import LogoWithName from './logo-with-name'

export default function AuthHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <LogoWithName />
      <h2 className="mb-2 mt-3 text-3xl/normal font-semibold text-[#20293a]">
        {title}
      </h2>
      <p className="text-sm/normal font-normal text-[#677489]">{description}</p>
    </div>
  )
}
