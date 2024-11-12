import { createAuthClient } from 'better-auth/react'

import { baseUrl } from './utils'

export const authClient = createAuthClient({
  baseURL: baseUrl,
})
