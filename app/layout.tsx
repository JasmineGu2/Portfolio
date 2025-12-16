import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'
import ThemeToggle from '@/components/ui/theme-toggle'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jasmine Gu - Personal Website',
  description: 'Engineer → Product Thinker → Community Builder',
  icons: {
    icon: '/icons/puzzleicon.jpg',
    shortcut: '/icons/puzzleicon.jpg',
    apple: '/icons/puzzleicon.jpg',
  },
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
      <body className="transition-colors">
        <div className="fixed inset-0 -z-10">
          <GridPatternSpotlight />
        </div>
        <ThemeToggle />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}


