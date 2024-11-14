import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from '@/server'

export const getBaseUrl = () => {
  // browser should use relative path
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.NODE_ENV === 'development') {
    return 'https://user-portfolio-management.vercel.app'
  }

  return 'https://user-portfolio-management.vercel.app'
}

export const serverClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})
