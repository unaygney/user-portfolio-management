import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { cn } from '@/lib/utils'

import './globals.css'
import Provider from '@/trpc/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'User Portfolio Management',
  description: 'User Portfolio Management with Next.js and tRPC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={process.env.NODE_ENV === 'development'}
        className={cn(
          inter.className,
          process.env.NODE_ENV === 'development' ? 'debug-screens' : '',
          'scroll-smooth antialiased'
        )}
      >
        <Provider>{children}</Provider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  )
}
