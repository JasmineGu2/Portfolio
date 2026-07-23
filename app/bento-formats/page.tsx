import { BentoFormatHub } from '@/components/portfolio/bento-formats/BentoFormatShell'

export const metadata = {
  title: 'Jasmine Gu — Bento format explorations',
  description: 'Four alternate bento layout formats for portfolio preview',
}

export default function BentoFormatsPage() {
  return (
    <main className="min-h-screen bg-[var(--pf-cream)]">
      <BentoFormatHub />
    </main>
  )
}
