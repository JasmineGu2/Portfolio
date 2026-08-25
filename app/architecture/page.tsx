import { ArchitecturePageClient } from '@/components/portfolio/architecture/ArchitecturePageClient'
import { HERO_TAGLINE } from '@/lib/portfolio/site-copy'
import './architecture.css'

export const metadata = {
  title: 'The Journey — Jasmine Gu',
  description: `${HERO_TAGLINE.primary} ${HERO_TAGLINE.secondary}`,
}

export default function ArchitecturePage() {
  return <ArchitecturePageClient />
}
