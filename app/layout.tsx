import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GradientBlobs from '@/components/layout/GradientBlobs'
import ThemeToggle from '@/components/ui/theme-toggle'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jasmine Gu - Personal Website',
  description: 'Engineer → Product Thinker → Community Builder',
}

const navItems = [
  { label: 'Work', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black transition-colors">
        <GradientBlobs />
        <ThemeToggle />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}


