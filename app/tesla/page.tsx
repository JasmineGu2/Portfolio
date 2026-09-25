import type { Metadata } from ‘next’
import { TeslaCaseStudyClient } from ‘@/components/portfolio/tesla/TeslaCaseStudyClient’
import { GlobalBackground } from ‘@/components/portfolio/GlobalBackground’
import ‘./tesla-case-study.css’

export const metadata: Metadata = {
  title: ‘Building Reusable Factory Software · Tesla · Jasmine Gu’,
  description:
    ‘Case study on the frontend systems I built for Tesla’s internal factory software: information design, reusable workflows, secure video playback, and the results across global factories.’,
}

export default function TeslaCaseStudyPage() {
  return (
    <>
      <GlobalBackground />
      <div className="relative z-10">
        <TeslaCaseStudyClient />
      </div>
    </>
  )
}
