import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { baseUrl } from './utils'
import { db } from '@/db'
import { authSchema } from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: authSchema,
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async (user, url) => {
      await fetch(`${baseUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY as string,
        },
        body: JSON.stringify({
          to: user.email,
          subject: 'Reset your password',
          text: `Click the link to reset your password: ${url}`,
        }),
      })
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
})

export const isRequestedAuthPage = (pathname: string) => {
  const authPages = [
    '/auth/login',
    '/auth/create-account',
    '/auth/forgot-password',
    '/auth/choose-new-password',
  ]
  return authPages.some((page) => pathname.startsWith(page))
}
export const securedPages = (pathname: string) => {
  const securedPaths = ['/', '/profile-settings', '/projects-settings']
  return securedPaths.some((page) => pathname.startsWith(page))
}
export const publicPages = (pathname: string) => {
  return !securedPages(pathname)
}
