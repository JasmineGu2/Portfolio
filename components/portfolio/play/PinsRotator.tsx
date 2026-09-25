'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PLAY_QUOTES } from '@/lib/portfolio/play-data'

const TILT = [-3, 2, -1.5, 3, -2.5]

/** A stack of pins that rotates: the top one slides away and goes to the back. Click to advance. */
export function PinsRotator() {
  const n = PLAY_QUOTES.length
  const [order, setOrder] = useState(() => PLAY_QUOTES.map((_, i) => i))
  const [leaving, setLeaving] = useState<number | null>(null)
  const busy = useRef(false)
  const hold = useRef(false)

  const orderRef = useRef(order)

  const next = useCallback(() => {
    if (busy.current) return
    busy.current = true
    setLeaving(orderRef.current[0])
    setTimeout(() => {
      const o = orderRef.current
      const shifted = [...o.slice(1), o[0]]
      orderRef.current = shifted
      setOrder(shifted)
      setLeaving(null)
      busy.current = false
    }, 520)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!hold.current) next()
    }, 4600)
    return () => clearInterval(id)
  }, [next])

  return (
    <div
      className="play-pins"
      onClick={next}
      onMouseEnter={() => (hold.current = true)}
      onMouseLeave={() => (hold.current = false)}
    >
      {PLAY_QUOTES.map((text, i) => {
        const pos = order.indexOf(i)
        return (
          <div
            key={text}
            className={`pin${leaving === i ? ' out' : ''}`}
            style={
              {
                '--p': pos,
                '--z': n - pos,
                '--r': `${TILT[i % TILT.length]}deg`,
                opacity: pos > 2 ? 0 : 1,
              } as React.CSSProperties
            }
          >
            <q>{text}</q>
            <small>
              <span>placeholder pin</span>
              <span>
                {String(i + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}
              </span>
            </small>
          </div>
        )
      })}
    </div>
  )
}
