import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feedback form',
  description: 'course instructor feedback form',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
