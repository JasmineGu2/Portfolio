'use client'

import { useEffect, useRef, useState } from 'react'

export function useFitScale(
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasWidth: number,
  canvasHeight: number
) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const pad = 32
      const w = el.clientWidth - pad
      const h = el.clientHeight - pad
      const sx = w / canvasWidth
      const sy = h / canvasHeight
      setScale(Math.min(1, sx, sy))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [containerRef, canvasWidth, canvasHeight])

  return scale
}
