'use client'

import { useEffect, useRef } from 'react'

/** Interactive children keep working: pressing on one of these never starts a drag. */
const INTERACTIVE = 'button, a, input, textarea, select, video, canvas, [data-nodrag]'

/** Shared across pieces so the one you just moved always sits on top. */
let zTop = 20

/**
 * Makes anything on the About page something you can pick up and move. It only changes the CSS `translate`
 * property, so the piece keeps its own tilt and position. The piece stays inside the page: sideways within the
 * window, vertically within the `.play` section. Buttons and links inside it still work, and a real drag never
 * counts as a click.
 */
export function Draggable({
  children,
  className = '',
  style,
  mouseOnly = false,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Large pieces skip touch, so a finger on them still scrolls the page. */
  mouseOnly?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const s = useRef({
    on: false,
    id: 0,
    sx: 0,
    sy: 0,
    x: 0,
    y: 0,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    moved: false,
    touch: false,
    armed: true,
    hold: 0 as unknown as ReturnType<typeof setTimeout>,
  })

  // Once a finger has held long enough to pick the piece up, stop the page from scrolling under it. A native,
  // non-passive listener is the only way to cancel touch scrolling.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const block = (e: TouchEvent) => {
      if (s.current.on && s.current.armed && e.cancelable) e.preventDefault()
    }
    el.addEventListener('touchmove', block, { passive: false })
    return () => el.removeEventListener('touchmove', block)
  }, [])
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || (e.pointerType === 'mouse' && e.button !== 0)) return
    if (mouseOnly && e.pointerType !== 'mouse') return
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return
    const box = el.getBoundingClientRect()
    const area = el.closest('.play')?.getBoundingClientRect()
    const cur = s.current
    cur.on = true
    cur.moved = false
    cur.touch = e.pointerType === 'touch'
    // a mouse picks a piece up at once; a finger has to hold for a moment (so swiping past it scrolls the page)
    cur.armed = !cur.touch
    clearTimeout(cur.hold)
    if (cur.touch) {
      cur.hold = setTimeout(() => {
        cur.armed = true
        el.classList.add('is-armed')
        navigator.vibrate?.(8)
      }, 380)
    }
    cur.id = e.pointerId
    cur.sx = e.clientX
    cur.sy = e.clientY
    cur.minX = 8 - box.left
    cur.maxX = window.innerWidth - 8 - box.right
    cur.minY = (area ? area.top : 0) - box.top
    cur.maxY = (area ? area.bottom : Number.POSITIVE_INFINITY) - box.bottom
    // the bounds above are relative to where the piece is now, so measure the offset from here
    cur.minX += cur.x
    cur.maxX += cur.x
    cur.minY += cur.y
    cur.maxY += cur.y
    el.style.zIndex = String(++zTop)
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    const cur = s.current
    if (!el || !cur.on) return
    const dx = e.clientX - cur.sx
    const dy = e.clientY - cur.sy
    if (!cur.armed) {
      // the finger moved before the hold finished: the user is scrolling, not dragging
      if (Math.hypot(dx, dy) > 10) {
        clearTimeout(cur.hold)
        cur.on = false
      }
      return
    }
    if (!cur.moved && Math.hypot(dx, dy) < 4) return
    // Capture only once it is a real drag: capturing on press would send a plain click to this wrapper
    // instead of the child that was pressed (the pins, for one, advance on click).
    cur.moved = true
    if (!el.hasPointerCapture(cur.id)) el.setPointerCapture(cur.id)
    el.classList.add('is-dragging')
    // `x` and `y` hold the resting offset; the live one is that plus the pointer travel, kept inside the bounds
    const x = Math.max(cur.minX, Math.min(cur.maxX, cur.x + dx))
    const y = Math.max(cur.minY, Math.min(cur.maxY, cur.y + dy))
    el.style.translate = `${x}px ${y}px`
  }

  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    const cur = s.current
    if (!el) return
    clearTimeout(cur.hold)
    el.classList.remove('is-armed')
    if (!cur.on) return
    cur.on = false
    el.classList.remove('is-dragging')
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    const m = /(-?[\d.]+)px (-?[\d.]+)px/.exec(el.style.translate || '')
    if (m) {
      cur.x = Number(m[1])
      cur.y = Number(m[2])
    }
    // the click that ends a drag arrives right after this; anything later (a keyboard "click") is real
    setTimeout(() => {
      cur.moved = false
    }, 0)
  }

  return (
    <div
      ref={ref}
      style={style}
      className={`pd${mouseOnly ? ' pd--mouse' : ''} ${className}`.trim()}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onClickCapture={(e) => {
        // a drag ends with a click on whatever was under the pointer; swallow it
        if (s.current.moved) {
          e.stopPropagation()
          e.preventDefault()
          s.current.moved = false
        }
      }}
    >
      {children}
    </div>
  )
}
