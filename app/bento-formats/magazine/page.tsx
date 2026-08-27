import { MagazineBentoFormat } from '@/components/portfolio/bento-formats/MagazineBentoFormat'

export const metadata = {
  title: 'Bento format · Magazine editorial',
}

export default function MagazineBentoPage() {
  return (
    <main className="min-h-screen bg-[var(--pf-cream)]">
      <MagazineBentoFormat />
    </main>
  )
}
