import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dynamic New Production - Creative Agency',
  description: 'Premium creative agency specializing in logo design, web development, video editing, and digital marketing',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
