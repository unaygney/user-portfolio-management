import { redirect } from 'next/navigation'
import React from 'react'

import PortfolioHeader from '@/components/portfolio-header'
import PortfolioUserContent from '@/components/portfolio-user-content'

import { serverClient } from '@/trpc/serverClient'

export default async function PortfolioPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await serverClient.user.getUserById.query({ id: params.id })

  if (!user) {
    redirect('/auth/login')
  }

  const userWithDate = {
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }

  return (
    <div className="flex flex-col">
      <PortfolioHeader />
      <PortfolioUserContent user={userWithDate} />
    </div>
  )
}
