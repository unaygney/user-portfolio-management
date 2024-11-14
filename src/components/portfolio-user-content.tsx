import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { buttonVariants } from './ui/button'
import { User } from '@/db/schema'

export default function PortfolioUserContent({ user }: { user: User }) {
  return (
    <div className="mx-auto mt-[-84px] w-full max-w-[720px]">
      <div className="flex w-full flex-col gap-6 border-b border-[#E3E8EF] pb-9">
        {/* Image */}
        <Avatar className="h-[160px] w-[160px] border-4 border-white">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        {/* Name Area */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl/normal font-semibold text-[#364153]">
            {user.name}
          </h1>
          <p className="text-base/normal font-medium text-[#677489]">
            {user?.jobTitle}
          </p>
        </div>
        {/* Contact Button */}
        <Link
          href={`mailto:${user.email}`}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'self-start rounded-[8px] border-[#e3e8ef] px-3 py-2 text-sm font-medium text-[#677489]'
          )}
        >
          <Mail className="h-4 w-4" />
          Contact
        </Link>
        {/* Bio Area */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm/normal font-medium text-[#677489]">Bio</h3>
          <p className="text-base/normal font-medium text-[#364153]">
            {user?.bio}
          </p>
        </div>
      </div>
    </div>
  )
}
