import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio - Shriyan Yamali',
  description: 'Personal portfolio website for Shriyan Yamali and his projects, resume, awards, and contact information.',
  keywords: 'Shriyan, Yamali, portfolio, resume, projects, awards, contact',
  icons: {
    icon: '/favicon.ico',
  },
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
