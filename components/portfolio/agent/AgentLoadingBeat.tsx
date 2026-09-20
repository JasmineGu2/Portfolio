'use client'

import { useEffect, useState } from 'react'
import { play } from 'cuelume'
import { useReducedMotion } from '@/lib/motion'

/**
 * Brief pixel-grid beat shown before the retrieval trace (replaces the old
 * three-dot TypingIndicator). Cells light up in a diagonal wavefront; paired
 * with a shimmering label and a genuinely-elapsed timer for this beat only.
 */
const CELL_DELAYS = Array.from({ length: 9 }, (_, i) => {
  const row = Math.floor(i / 3)
  const col = i % 3
  return (col + Math.abs(row - 1)) * 90
})

function useElapsed(active: boolean) {
  const [ds, setDs] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => setDs((d) => d + 1), 100)
    return () => clearInterval(t)
  }, [active])
  return (ds / 10).toFixed(1)
}

export function AgentLoadingBeat({
  label = 'Looking through her work',
  durationMs = 280,
  onDone,
}: {
  label?: string
  durationMs?: number
  onDone?: () => void
}) {
  const reducedMotion = useReducedMotion()
  const elapsed = useElapsed(true)

  useEffect(() => {
    play('loading')
  }, [])

  useEffect(() => {
    const t = setTimeout(() => onDone?.(), durationMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs])

  return (
    <div role="status" aria-label={label} className="agent-bubble agent-bubble--assistant agent-loading-beat">
      <span aria-hidden className="agent-loading-beat__grid">
        {CELL_DELAYS.map((delay, i) => (
          <span
            key={i}
            className="agent-loading-beat__cell"
            style={
              reducedMotion
                ? undefined
                : { animation: `pixel-on 650ms ease-in-out ${delay}ms infinite` }
            }
          />
        ))}
      </span>
      <span className={`agent-loading-beat__label font-analogue${reducedMotion ? '' : ' agent-shimmer-text'}`}>
        {label}
      </span>
      <span className="agent-loading-beat__timer font-mono tabular-nums">{elapsed}s</span>
    </div>
  )
}
