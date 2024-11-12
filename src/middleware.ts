import type { Session } from 'better-auth/types'
import { type NextRequest, NextResponse } from 'next/server'

import { isRequestedAuthPage, securedPages } from '@/lib/auth'

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isRequestedAuthPage(pathname)) {
    const response = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      }
    )
    const session: Session | null = response.ok ? await response.json() : null

    if (session) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  }

  let session: Session | null = null
  try {
    const response = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      }
    )

    if (response.ok) {
      session = await response.json()
    }
  } catch (error) {
    console.error('Session fetch failed:', error)
  }

  if (!session && securedPages(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
