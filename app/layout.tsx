import type { Metadata } from 'next'
import { BentoWorkspaceRoot } from '@/components/portfolio/bento-workflows/BentoWorkspaceRoot'
import { PortfolioStateProvider } from '@/components/portfolio/PortfolioStateContext'
import { SITE_METADATA } from '@/lib/portfolio/site-copy'
import './globals.css'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  icons: { icon: '/icons/puzzleicon.jpg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-body">
        <PortfolioStateProvider>
          <BentoWorkspaceRoot>{children}</BentoWorkspaceRoot>
        </PortfolioStateProvider>
      </body>
    </html>
  )
}
