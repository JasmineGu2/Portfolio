'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  pickPorts,
  portPoint,
  workflowPath,
  type Rect,
  type WorkflowEdge,
} from '@/lib/portfolio/workflow-connectors'

export function WorkflowConnectors({
  wrapRef,
  cellRefs,
  edges,
  className = 'bento-connectors',
}: {
  wrapRef: React.RefObject<HTMLDivElement | null>
  cellRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
  edges: WorkflowEdge[]
  className?: string
}) {
  const [paths, setPaths] = useState<
    { d: string; primary: boolean; key: string; x1: number; y1: number; x2: number; y2: number }[]
  >([])

  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const box = wrap.getBoundingClientRect()

    const getRect = (id: string): Rect | null => {
      const el = cellRefs.current.get(id)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        x: r.left - box.left,
        y: r.top - box.top,
        w: r.width,
        h: r.height,
      }
    }

    const next = edges
      .map(({ from, to, primary }) => {
        const a = getRect(from)
        const b = getRect(to)
        if (!a || !b) return null
        const [fromSide, toSide] = pickPorts(a, b)
        const p1 = portPoint(a, fromSide)
        const p2 = portPoint(b, toSide)
        return {
          d: workflowPath(p1.x, p1.y, p2.x, p2.y, fromSide, toSide),
          primary: primary ?? false,
          key: `${from}-${to}`,
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
        }
      })
      .filter(Boolean) as typeof paths

    setPaths(next)
  }, [wrapRef, cellRefs, edges])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    measure()
    const raf = requestAnimationFrame(measure)
    const delayed = [
      window.setTimeout(measure, 0),
      window.setTimeout(measure, 120),
      window.setTimeout(measure, 450),
    ]

    const wrap = wrapRef.current
    if (!wrap) {
      return () => {
        cancelAnimationFrame(raf)
        delayed.forEach(clearTimeout)
      }
    }

    const ro = new ResizeObserver(measure)
    ro.observe(wrap)
    cellRefs.current.forEach((el) => ro.observe(el))
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)

    return () => {
      cancelAnimationFrame(raf)
      delayed.forEach(clearTimeout)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [measure, wrapRef, cellRefs, edges])

  if (edges.length === 0) return null

  return (
    <svg className={className} aria-hidden>
      {paths.length === 0
        ? null
        : paths.map(({ d, primary, key, x1, y1, x2, y2 }) => (
            <g key={key}>
              <path
                d={d}
                fill="none"
                className={primary ? 'bento-connector bento-connector--primary' : 'bento-connector'}
              />
              <circle cx={x1} cy={y1} r={3.5} className="bento-connector-port" />
              <circle cx={x2} cy={y2} r={3.5} className="bento-connector-port" />
            </g>
          ))}
    </svg>
  )
}
