import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  /*
This page is a placeholder for the dashboard page.
It will redirect to the profile-settings page if the user is authenticated.
If the user is not authenticated, it will redirect to the login page.
  */
  if (!session) redirect('/auth/login')

  redirect('/profile-settings')

  return null
}
