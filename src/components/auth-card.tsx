import React from 'react'

import { Circle } from './icons'

export default function AuthCard() {
  return (
    <div className="relative hidden w-full max-w-[368px] rounded-[12px] bg-[linear-gradient(180deg,_#838CF1_0%,_#4138C2_100%)] px-6 pt-10 lg:block">
      <Circle className="absolute bottom-0 left-0" />
      <div className="flex flex-col gap-3 text-start text-white">
        <h1 className="text-sm/normal font-semibold">
          Easy Portfolio for Developer
        </h1>
        <p className="text-xs/normal font-light">
          As a web developer, having a portfolio is essential for showcasing
          your technical skills and attracting potential clients. A portfolio is
          a museum of your work, with past tech stacks, case studies, and your
          work history.
        </p>
      </div>
    </div>
  )
}
