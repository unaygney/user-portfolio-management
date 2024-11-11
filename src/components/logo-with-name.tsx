import React from 'react'

import { Logo } from './icons'

export default function LogoWithName() {
  return (
    <div className="flex items-center gap-1.5">
      <Logo />
      <h6 className="text-xs font-semibold text-[#20293A]">DevPort</h6>
    </div>
  )
}
