import { Hero } from '@/components/portfolio/hero/Hero'
import { SITE_METADATA } from '@/lib/portfolio/site-copy'

export const metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
}

export default function WorkPage() {
  return (
    <div className="pt-10">
      <Hero />
    </div>
  )
}
