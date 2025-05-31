import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import MouseTrackingScript from '@/components/ui/interactive/MouseTrackingScript'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MegaMart - Global Marketplace',
  description: 'Shop millions of products from trusted sellers worldwide. Best deals, fast shipping, secure payments.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <Providers>
          <MouseTrackingScript />
          {children}
        </Providers>
      </body>
    </html>
  )
}       