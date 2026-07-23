import type { Metadata } from 'next'
import { TeslaCaseStudyClient } from '@/components/portfolio/tesla/TeslaCaseStudyClient'
import './tesla-case-study.css'

export const metadata: Metadata = {
  title: 'Building Reusable Factory Software — Tesla — Jasmine Gu',
  description:
    'Case study on building frontend systems for Tesla’s internal factory software — information design, reusable workflows, secure video playback, and operational impact across global factories.',
}

export default function TeslaCaseStudyPage() {
  return <TeslaCaseStudyClient />
}
