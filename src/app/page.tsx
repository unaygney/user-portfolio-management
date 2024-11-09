import { serverClient } from '../trpc/serverClient'

import Users from '@/components/users'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const users = await serverClient.user.getUsers.query()

  return (
    <main className="mx-auto mt-5 max-w-3xl">
      <Users initialData={users} />
    </main>
  )
}
