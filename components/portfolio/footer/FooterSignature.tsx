'use client'

import { useState } from 'react'
import { Signature } from '@/components/ui/signature'
import { FOOTER_FACTS } from '@/lib/portfolio/play-data'

/**
 * The footer signature. It draws itself every time the footer scrolls into view (not just the first time),
 * and clicking it signs again.
 */
export function FooterSignature() {
  const [round, setRound] = useState(0)
  return (
    <div className="pf-foot__sig" onClick={() => setRound((n) => n + 1)} title="click to sign again">
      <Signature key={round} text={FOOTER_FACTS.signature} fontSize={50} duration={1.5} color="#f2f6ff" inView once={false} />
    </div>
  )
}
