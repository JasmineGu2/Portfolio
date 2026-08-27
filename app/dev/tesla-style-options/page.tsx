import type { Metadata } from 'next'
import { TeslaStyleOptionsPageClient } from '@/components/portfolio/tesla-style-options/TeslaStyleOptionsPageClient'
import './tesla-style-options.css'

export const metadata: Metadata = {
  title: 'Tesla case study styling, Jasmine Gu',
  description: 'Story-driven and spacious editorial layout options for the Tesla case study.',
}

export default function TeslaStyleOptionsPage() {
  return <TeslaStyleOptionsPageClient />
}
