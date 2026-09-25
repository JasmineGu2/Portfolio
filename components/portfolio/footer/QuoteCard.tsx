'use client'

import { useEffect, useState } from 'react'
import { FOOTER_QUOTES } from '@/lib/portfolio/play-data'

/**
 * A quote card in the Pinterest style: one of my core values, set large in serif on paper.
 * It starts on a random one after load (the server render is always the first, so nothing mismatches);
 * click it for another.
 */
export function QuoteCard() {
  const [index, setIndex] = useState(0)
  const [flip, setFlip] = useState(0)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * FOOTER_QUOTES.length))
  }, [])

  const next = () => {
    setIndex((n) => (n + 1) % FOOTER_QUOTES.length)
    setFlip((n) => n + 1)
  }

  return (
    <button type="button" className="pf-quote" onClick={next} aria-label="Show another core value">
      <span className="pf-quote__mark" aria-hidden>
        “
      </span>
      <span
        key={flip}
        className="pf-quote__text"
        data-long={FOOTER_QUOTES[index].length > 70}
        aria-live="polite"
      >
        {FOOTER_QUOTES[index]}
      </span>
      <span className="pf-quote__foot">
        <span>A core value</span>
        <span>
          {index + 1} / {FOOTER_QUOTES.length} · Another
        </span>
      </span>
    </button>
  )
}
