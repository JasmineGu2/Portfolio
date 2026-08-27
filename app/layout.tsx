import type { Metadata } from 'next'
import { BentoWorkspaceRoot } from '@/components/portfolio/bento-workflows/BentoWorkspaceRoot'
import { PortfolioStateProvider } from '@/components/portfolio/PortfolioStateContext'
import { LaunchLoader } from '@/components/visuals/FlowersLoader/LaunchLoader'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { VisitTracker } from '@/components/analytics/VisitTracker'
import { SITE_METADATA } from '@/lib/portfolio/site-copy'
import './globals.css'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  icons: { icon: '/icons/jasmine-logo.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-body">
        <LaunchLoader />
        <PortfolioStateProvider>
          <BentoWorkspaceRoot>{children}</BentoWorkspaceRoot>
        </PortfolioStateProvider>
        {/*
          Three independent layers, because any single one has a blind spot:
          Vercel's script can be ad-blocked, and the server-side middleware can't
          see viewport, engagement time, or outbound clicks. See lib/analytics/events.ts.
        */}
        <Analytics />
        <SpeedInsights />
        <VisitTracker />
      </body>
    </html>
  )
}
