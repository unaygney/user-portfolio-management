import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

import { auth } from '@/lib/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Airplay,
  ExternalLink,
  Logout,
  MultipleImage,
  Profile,
  User,
} from './icons'
import LogoWithName from './logo-with-name'
import SignoutButton from './signout-button'

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#E3E8EF] px-6">
      <LogoWithName />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image ? user.image : undefined} />

            <AvatarFallback className="border-2 border-neutral-300 text-white">
              <User />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[250px]">
          <DropdownMenuItem asChild>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.image ? user.image : undefined} />

                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm/normal font-medium text-[#20293a]">
                  {user?.name ?? ''}
                </h3>
                <p className="line-clamp-1 truncate text-xs/normal font-normal text-[#677489]">
                  {user?.email ?? ''}
                </p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs/normal font-normal text-[#677489]">
            Account
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link
              className="py-3 text-sm/normal font-medium text-[#20293a]"
              href={'/profile-settings'}
            >
              <Profile />
              Profile settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={'/projects-settings'}
              className="py-3 text-sm/normal font-medium text-[#20293a]"
            >
              <MultipleImage />
              Projects settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="py-3 text-sm/normal font-medium text-[#20293a]"
          >
            <Link href={`/portfolio/${user?.id}`}>
              <Airplay />
              My Portfolio
              <ExternalLink />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <SignoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
