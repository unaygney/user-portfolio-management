import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Provider from '@/trpc/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
      </body>
    </html>
  )
}
