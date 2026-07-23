import { VerticalFlowBentoFormat } from '@/components/portfolio/bento-formats/VerticalFlowBentoFormat'

export const metadata = {
  title: 'Bento format — Vertical flow strips',
}

export default function VerticalBentoPage() {
  return (
    <main className="min-h-screen bg-[var(--pf-cream)]">
      <VerticalFlowBentoFormat />
    </main>
  )
}
