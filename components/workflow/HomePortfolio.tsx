'use client'

import { HeroWriteup } from './HeroWriteup'
import { CareerN8nFlow } from './CareerN8nFlow'
import { STORY_STEPS } from '@/lib/workflow/story-narrative'

export function HomePortfolio() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <HeroWriteup />
      </div>

      <CareerN8nFlow steps={STORY_STEPS} />

      <footer className="border-t border-n8n-border py-8 text-center text-sm text-n8n-dim">
        <a
          href="mailto:jgu.hba2027@ivey.ca"
          className="hover:text-n8n-accent transition-colors"
        >
          jgu.hba2027@ivey.ca
        </a>
      </footer>
    </div>
  )
}
