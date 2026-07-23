import type { Metadata } from 'next'
import { WorkTypographyOptionsPageClient } from '@/components/portfolio/work-typography-options/WorkTypographyOptionsPageClient'
import './work-typography-options.css'

export const metadata: Metadata = {
  title: 'Work card typography — Jasmine Gu',
  description: 'Compare four font pairings for company, role, and subtitle on experience cards.',
}

export default function WorkTypographyOptionsPage() {
  return <WorkTypographyOptionsPageClient />
}
