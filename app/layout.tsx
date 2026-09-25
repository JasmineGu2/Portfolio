import type { Metadata } from 'next'
import { Agentation } from 'agentation'
import { Toaster } from 'sonner'
import { SiteShell } from '@/components/portfolio/SiteShell'
import { SoundProvider } from '@/components/portfolio/SoundProvider'
import { PortfolioStateProvider } from '@/components/portfolio/PortfolioStateContext'
import { BentoWorkspaceProvider } from '@/components/portfolio/bento-workflows/BentoWorkspaceContext'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { VisitTracker } from '@/components/analytics/VisitTracker'
import { SiteCursor } from '@/components/portfolio/cursor/SiteCursor'
import { VideoAutoplay } from '@/components/portfolio/VideoAutoplay'
import { SITE_METADATA } from '@/lib/portfolio/site-copy'
import './globals.css'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  icons: { icon: '/icons/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }} className="q q6" data-map="blue">
        {children}
        {/*
          Three independent layers, because any single one has a blind spot:
          Vercel's script can be ad-blocked, and the server-side middleware can't
          see viewport, engagement time, or outbound clicks. See lib/analytics/events.ts.
        */}
        <Analytics />
        <SpeedInsights />
        <VisitTracker />
        <SiteCursor />
        <VideoAutoplay />
        <Toaster position="bottom-right" />
        {process.env.NODE_ENV === 'development' && <Agentation endpoint="http://localhost:4747" />}
      </body>
    </html>
  )
}
