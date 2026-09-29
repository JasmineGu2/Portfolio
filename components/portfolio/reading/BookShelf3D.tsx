'use client'

/**
 * 3D book shelf with reading mode, adapted from Cue Foundations "3D Book Carousel Reading Mode" (cue074).
 * Changes from the original: input is scoped to the shelf (vertical page scroll is never hijacked), the
 * animation pauses offscreen, React only re-renders when the centred book changes, covers are drawn in the
 * site palette instead of hotlinked images, and there are arrow buttons + keyboard control.
 */
import { useEffect, useRef, useState } from 'react'
import type { ReadingItem } from '@/lib/portfolio/reading'
import './book-shelf.css'

type Labels = { open: string; close: string; prev: string; next: string; hint: string }

// Site palette: navy, orange, legal-pad yellow, paper, ink, sky
const COVERS = [
  { bg: '#0e3b8f', fg: '#fffefb' },
  { bg: '#ed3801', fg: '#fffefb' },
  { bg: '#fcf5cf', fg: '#0e3b8f' },
  { bg: '#1f2a44', fg: '#fcf5cf' },
  { bg: '#fffefb', fg: '#0e3b8f' },
  { bg: '#9fd3ff', fg: '#0e3b8f' },
]
const OPEN_W = 220
const GAP = 64
const smoothstep = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

// Books are thick, articles thin like pamphlets; heights vary a little so the row looks like a real shelf.
const spineOf = (it: ReadingItem, i: number) => (it.kind === 'Books' ? 46 + ((i * 13) % 22) : 18 + ((i * 7) % 10))
const heightOf = (i: number) => 280 + ((i * 37) % 60)

export function BookShelf3D({ items, labels }: { items: ReadingItem[]; labels: Labels }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([])
  const initial = Math.floor(items.length / 2)
  const [active, setActive] = useState(initial)
  const [reading, setReading] = useState(false)
  const state = useRef({ target: initial, current: initial, dragging: false, moved: false, startX: 0, scrollStart: 0, opened: -1, openness: items.map(() => 0), shown: initial })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const spines = items.map(spineOf)
    const rotZs = items.map((_, i) => (i % 5 === 2 ? -2.5 : 0))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduced ? 1 : 0.08
    const openEase = reduced ? 1 : 0.06
    let raf = 0
    let visible = false

    function step() {
      const s = state.current
      s.current += (s.target - s.current) * ease
      const widthAt = (i: number) => {
        const eo = smoothstep(Math.max(0, 1 - Math.abs(i - s.current)))
        return spines[i] + eo * (OPEN_W - spines[i])
      }
      const positions: number[] = []
      let left = 0
      for (let i = 0; i < items.length; i++) {
        positions[i] = left
        left += widthAt(i) + GAP
      }
      const centerOf = (i: number) => positions[i] + widthAt(i) / 2
      const prev = Math.floor(s.current)
      const frac = s.current - prev
      const c1 = centerOf(prev)
      const c2 = prev + 1 < items.length ? centerOf(prev + 1) : c1
      const cameraX = c1 * (1 - frac) + c2 * frac

      const idx = Math.max(0, Math.min(items.length - 1, Math.round(s.current)))
      if (idx !== s.shown) {
        s.shown = idx
        setActive(idx)
      }

      wrapperRefs.current.forEach((el, i) => {
        if (!el) return
        const diff = i - s.current
        const eo = smoothstep(Math.max(0, 1 - Math.abs(diff)))
        let x = positions[i] - cameraX + (1 - eo) * (spines[i] / 2)
        let z = eo * 60
        let y = 0
        s.openness[i] += ((s.opened === i ? 1 : 0) - s.openness[i]) * openEase
        const easeRise = smoothstep(Math.min(1, s.openness[i] * 2))
        const easeSwing = smoothstep(Math.max(0, (s.openness[i] - 0.5) * 2))
        x += easeSwing * (OPEN_W / 2)
        z += easeRise * 150
        y += easeRise * -90
        el.style.zIndex = String(Math.round(100 - Math.abs(diff) * 10))
        el.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${1 + eo * 0.05}) rotateZ(${rotZs[i] * (1 - eo)}deg)`
        const book = el.firstElementChild as HTMLElement | null
        if (book) book.style.transform = `rotateY(${(1 - eo) * 90}deg)`
        const hinge = el.querySelector<HTMLElement>('.bs-hinge')
        if (hinge) hinge.style.transform = `translateZ(${spines[i] / 2}px) rotateY(${easeSwing * -140}deg)`
        const spine = el.querySelector<HTMLElement>('.bs-spine')
        if (spine) spine.style.filter = `brightness(${0.7 + eo * 0.3})`
      })
      if (progressRef.current) progressRef.current.style.width = `${(s.current / Math.max(1, items.length - 1)) * 100}%`
      raf = visible ? requestAnimationFrame(step) : 0
    }

    // Only animate while the shelf is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(step)
    })
    io.observe(root)

    const clamp = (v: number) => Math.max(0, Math.min(v, items.length - 1))
    const locked = () => state.current.opened !== -1
    // Horizontal trackpad swipes move the shelf; vertical wheel keeps scrolling the page.
    const onWheel = (e: WheelEvent) => {
      if (locked() || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      state.current.target = clamp(state.current.target + e.deltaX * 0.01)
    }
    const down = (x: number) => {
      if (locked()) return
      Object.assign(state.current, { dragging: true, moved: false, startX: x, scrollStart: state.current.target })
    }
    const move = (x: number) => {
      const s = state.current
      if (!s.dragging || locked()) return
      if (Math.abs(x - s.startX) > 5) s.moved = true
      s.target = clamp(s.scrollStart + (x - s.startX) * -0.01)
    }
    const up = () => (state.current.dragging = false)
    const onMouseDown = (e: MouseEvent) => down(e.clientX)
    const onMouseMove = (e: MouseEvent) => move(e.clientX)
    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX)

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', up)
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchmove', onTouchMove, { passive: true })
    root.addEventListener('touchend', up)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', up)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchmove', onTouchMove)
      root.removeEventListener('touchend', up)
    }
  }, [items])

  const goTo = (i: number) => {
    const s = state.current
    s.opened = -1
    setReading(false)
    s.target = Math.max(0, Math.min(i, items.length - 1))
  }
  const handleClick = (i: number) => {
    const s = state.current
    if (s.moved) return
    if (Math.round(s.current) === i) {
      s.opened = s.opened === i ? -1 : i
      setReading(s.opened !== -1)
    } else goTo(i)
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goTo(Math.round(state.current.target) + 1)
    else if (e.key === 'ArrowLeft') goTo(Math.round(state.current.target) - 1)
    else if (e.key === 'Escape') goTo(Math.round(state.current.target))
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(Math.round(state.current.current))
    }
  }
  const cur = items[active]

  return (
    <div className="bs" ref={rootRef} tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="carousel" aria-label={labels.hint}>
      <p className={`bs-caption${reading ? ' hidden' : ''}`} aria-live="polite">
        <span className="bs-kind">{cur?.kind}</span>
        <span className="bs-now">{cur?.title}</span>
      </p>
      <button type="button" className={`bs-close${reading ? ' visible' : ''}`} onClick={() => goTo(active)} aria-label={labels.close} tabIndex={reading ? 0 : -1}>
        <span aria-hidden="true">×</span>
      </button>
      <div className="bs-scene">
        <div className="bs-track">
          {items.map((b, i) => {
            const sW = spineOf(b, i)
            const c = COVERS[i % COVERS.length]
            return (
              <div key={`${b.title}-${i}`} ref={(el) => { wrapperRefs.current[i] = el }} className="bs-wrapper" onClick={() => handleClick(i)}>
                <div className="bs-book" style={{ height: heightOf(i) }}>
                  <div className="bs-face bs-hinge" style={{ transform: `translateZ(${sW / 2}px)` }}>
                    <div className="bs-face bs-front" style={{ width: OPEN_W, background: c.bg, color: c.fg }}>
                      <div className="bs-overlay" />
                      <div className="bs-cover">
                        <span className="bs-cover-kind">{b.kind}</span>
                        <span className="bs-cover-title">{b.title}</span>
                        {b.byline && <span className="bs-cover-by">{b.byline}</span>}
                      </div>
                    </div>
                    <div className="bs-face bs-inside" style={{ width: OPEN_W }} />
                  </div>
                  <div className="bs-face bs-page" style={{ transform: `translateZ(${sW / 2 - 1}px)` }}>
                    <div className="bs-page-inner">
                      <div className="bs-page-eyebrow">{b.kind}</div>
                      <h3 className="bs-page-title">{b.title}</h3>
                      {b.byline && <p className="bs-page-by">{b.byline}</p>}
                      <div className="bs-page-rule" />
                      {b.href && (
                        <a className="bs-page-link" href={b.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} tabIndex={reading && i === active ? 0 : -1}>
                          {labels.open} ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="bs-face bs-back" style={{ width: OPEN_W, background: c.bg, transform: `rotateY(180deg) translateZ(${sW / 2}px)` }} />
                  <div className="bs-face bs-spine" style={{ width: sW, left: -sW / 2, background: c.bg }}>
                    <div className="bs-spine-text" style={{ color: c.fg }}>{b.title}</div>
                  </div>
                  <div className="bs-face bs-pages bs-pages-right" style={{ width: sW, left: OPEN_W - sW / 2 }} />
                  <div className="bs-face bs-pages bs-pages-top" style={{ height: sW, top: -sW / 2 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="bs-controls">
        <button type="button" onClick={() => goTo(active - 1)} aria-label={labels.prev} disabled={active === 0}>←</button>
        <div className="bs-progress"><div ref={progressRef} className="bs-progress-bar" /></div>
        <button type="button" onClick={() => goTo(active + 1)} aria-label={labels.next} disabled={active === items.length - 1}>→</button>
      </div>
    </div>
  )
}
