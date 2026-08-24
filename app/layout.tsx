import type { Metadata } from 'next'
import { BentoWorkspaceRoot } from '@/components/portfolio/bento-workflows/BentoWorkspaceRoot'
import { PortfolioStateProvider } from '@/components/portfolio/PortfolioStateContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jasmine Gu — Product / Software',
  description:
    'Product Manager and Engineer building thoughtful, AI-powered products. CS + Business @ Western / Ivey.',
  icons: { icon: '/icons/puzzleicon.jpg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <PortfolioStateProvider>
          <BentoWorkspaceRoot>{children}</BentoWorkspaceRoot>
        </PortfolioStateProvider>
      </body>
    </html>
  )
}
