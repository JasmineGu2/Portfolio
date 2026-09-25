'use client'

import { useEffect, useState } from 'react'
import { AboveTheFoldStage } from './AboveTheFoldStage'
import { DeskSection } from './DeskSection'
import { AskPanel } from './AskPanel'
import { WorkTabs } from './WorkTabs'
import { PolaroidGallery } from './PolaroidGallery'
import { MoreContext } from './MoreContext'
import { Footer } from './Footer'
import { useSound } from '@/components/portfolio/SoundProvider'
import '@/styles/about-v2.css'

export function AboutV2Client() {
  const [askOpen, setAskOpen] = useState(false)
  const sound = useSound()

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && askOpen) {
        setAskOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [askOpen])

  return (
    <div className="about-v2">
      {/* Main content */}
      <main className="about-v2-main">
        {/* Hero section with draggable cards */}
        <section className="about-v2-hero">
          <AboveTheFoldStage onAskClick={() => setAskOpen(true)} />
        </section>

        {/* Desk section with 4 draggable tiles */}
        <section className="about-v2-desk">
          <DeskSection />
        </section>

        {/* Work tabs and project showcase */}
        <section className="about-v2-work">
          <WorkTabs />
        </section>

        {/* Photo gallery */}
        <section className="about-v2-gallery">
          <PolaroidGallery />
        </section>

        {/* Resume and context */}
        <section className="about-v2-context">
          <MoreContext />
        </section>
      </main>

      {/* Ask panel (side) */}
      {askOpen && <AskPanel onClose={() => setAskOpen(false)} />}

      {/* Footer */}
      <Footer />
    </div>
  )
}
