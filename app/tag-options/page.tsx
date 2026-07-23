import type { Metadata } from 'next'
import { TagOptionsPageClient } from '@/components/portfolio/tag-options/TagOptionsPageClient'
import './tag-options.css'

export const metadata: Metadata = {
  title: 'Tag styling options — Jasmine Gu',
  description: 'Compare ten alternative tag styles for the portfolio bento workspace.',
}

export default function TagOptionsPage() {
  return <TagOptionsPageClient />
}
