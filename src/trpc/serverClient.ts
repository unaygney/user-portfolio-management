import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from '@/server'

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.NODE_ENV === 'production') {
    return 'https://user-portfolio-management-ten.vercel.app'
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const serverClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})
