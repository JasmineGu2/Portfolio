import { KeycapBentoFormat } from '@/components/portfolio/bento-formats/KeycapBentoFormat'

export const metadata = {
  title: 'Bento format · Keycap playground',
}

export default function KeycapBentoPage() {
  return (
    <main className="min-h-screen bg-[var(--pf-cream)]">
      <KeycapBentoFormat />
    </main>
  )
}
