import { CompactBentoFormat } from '@/components/portfolio/bento-formats/CompactBentoFormat'

export const metadata = {
  title: 'Bento format — Compact mosaic',
}

export default function CompactBentoPage() {
  return (
    <main className="min-h-screen bg-[var(--pf-cream)]">
      <CompactBentoFormat />
    </main>
  )
}
