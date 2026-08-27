import type { Metadata } from 'next'
import { ExperienceVideosPageClient } from '@/components/portfolio/experience-videos/ExperienceVideosPageClient'
import './experience-videos.css'

export const metadata: Metadata = {
  title: 'Experience video tiles · Jasmine Gu',
  description: 'Animated square previews for each work experience, with logo fallbacks.',
}

export default function ExperienceVideosPage() {
  return <ExperienceVideosPageClient />
}
