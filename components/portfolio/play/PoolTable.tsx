'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Ban, Gem, Lock, MessageSquarePlus, Mic, Network, Newspaper, Nfc, Send, Workflow, type LucideIcon } from 'lucide-react'
import { FAVORITE_TOOLS, FAVORITE_TOOLS_LEAD } from '@/lib/portfolio/play-data'

/** Playfield in its own units (the whole table scales to fit its card). */
const W = 560
const H = 300
const R = 27 // ball radius
const RAIL = 22
const POCKETS: [number, number][] = [
  [0, 0],
  [W / 2, 0],
  [W, 0],
  [0, H],
  [W / 2, H],
  [W, H],
]
const SINK = 42 // a ball whose center gets this close to a pocket goes in
const FRICTION = 0.985 // per 16.7ms
const WALL = 0.82 // energy kept off a cushion
const PAIR = 0.96 // energy kept in a ball-ball hit
const MAX_SPEED = 20 // px per frame at full pull
const MAX_PULL = 150

const TOOL_LOOK: Record<string, { Icon: LucideIcon; color: string }> = {
  Obsidian: { Icon: Gem, color: '#6d4bd8' },
  Agentation: { Icon: MessageSquarePlus, color: '#ed3801' },
  'Job hunting system': { Icon: Send, color: '#1f8fe0' },
  'Interview app': { Icon: Mic, color: '#b0356e' },
  Foqus: { Icon: Lock, color: '#1b1b1b' },
  'TLDR.tech': { Icon: Newspaper, color: '#d99a00' },
  Tailscale: { Icon: Network, color: '#0e3b8f' },
  'Apple Automations': { Icon: Workflow, color: '#2e9e5b' },
  Freedom: { Icon: Ban, color: '#0f766e' },
  'NFC Chips': { Icon: Nfc, color: '#6b6b6b' },
}

type Ball = { id: string; x: number; y: number; vx: number; vy: number; sunk: boolean; home: [number, number] }
type Aim = { id: string; ux: number; uy: number; pull: number; px: number; py: number }

/** Rack: a ten-ball triangle (1, 2, 3, 4 balls across) on the right; the white cue ball on the left. */
function rack(): Ball[] {
  const x0 = W * 0.56
  const dx = R * 1.75 + 0.5
  const dy = R + 0.5
  const spots: [number, number][] = [
    [x0, H / 2],
    [x0 + dx, H / 2 - dy],
    [x0 + dx, H / 2 + dy],
    [x0 + 2 * dx, H / 2 - 2 * dy],
    [x0 + 2 * dx, H / 2],
    [x0 + 2 * dx, H / 2 + 2 * dy],
    [x0 + 3 * dx, H / 2 - 3 * dy],
    [x0 + 3 * dx, H / 2 - dy],
    [x0 + 3 * dx, H / 2 + dy],
    [x0 + 3 * dx, H / 2 + 3 * dy],
  ]
  const balls: Ball[] = [{ id: 'cue', x: W * 0.22, y: H / 2, vx: 0, vy: 0, sunk: false, home: [W * 0.22, H / 2] }]
  FAVORITE_TOOLS.forEach((tool, i) => {
    const [x, y] = spots[i] ?? [x0, H / 2]
    balls.push({ id: tool.name, x, y, vx: 0, vy: 0, sunk: false, home: [x, y] })
  })
  return balls
}

/**
 * Favorite tools, as a pool table. Each tool is a ball with its icon on it, plus a white cue ball. Press a ball,
 * pull back and let go to hit it: balls bounce off each other and the cushions, and drop into the pockets (they
 * come back a moment later). Plain physics, no library; the loop only runs while something is moving.
 */
export function PoolTable() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const feltRef = useRef<HTMLDivElement>(null)
  const els = useRef<Record<string, HTMLDivElement | null>>({})
  const balls = useRef<Ball[]>(rack())
  const raf = useRef(0)
  const last = useRef(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const aimRef = useRef<Aim | null>(null)
  const [aim, setAim] = useState<Aim | null>(null)
  const [scale, setScale] = useState(1)
  const [hot, setHot] = useState<string | null>(null)

  const paint = useCallback(() => {
    for (const b of balls.current) {
      const el = els.current[b.id]
      if (!el) continue
      el.style.transform = `translate(${b.x - R}px, ${b.y - R}px)${b.sunk ? ' scale(0.15)' : ''}`
      el.classList.toggle('sunk', b.sunk)
    }
  }, [])

  const free = (x: number, y: number, self: Ball) =>
    balls.current.every((o) => o === self || o.sunk || Math.hypot(o.x - x, o.y - y) > 2 * R + 2)

  const respawn = useCallback(
    (b: Ball) => {
      let spot: [number, number] | null = free(b.home[0], b.home[1], b) ? b.home : null
      for (let gx = W * 0.15; !spot && gx < W - R; gx += 34) {
        for (let gy = R + 6; !spot && gy < H - R; gy += 34) if (free(gx, gy, b)) spot = [gx, gy]
      }
      const [x, y] = spot ?? b.home
      b.x = x
      b.y = y
      b.vx = b.vy = 0
      b.sunk = false
      paint()
    },
    [paint],
  )

  const step = useCallback(
    (t: number) => {
      const dt = Math.min(2.5, (t - last.current) / 16.667 || 1)
      last.current = t
      const live = balls.current.filter((b) => !b.sunk)
      const vmax = live.reduce((m, b) => Math.max(m, Math.hypot(b.vx, b.vy)), 0)
      const n = Math.max(1, Math.ceil((vmax * dt) / (R * 0.6)))
      const h = dt / n
      for (let s = 0; s < n; s++) {
        for (const b of live) {
          if (b.sunk) continue
          b.x += b.vx * h
          b.y += b.vy * h
          // pockets first, so a ball rolling into a corner drops instead of being clamped to the cushion
          if (POCKETS.some(([px, py]) => Math.hypot(b.x - px, b.y - py) < SINK)) {
            const [px, py] = POCKETS.reduce((a, c) => (Math.hypot(b.x - c[0], b.y - c[1]) < Math.hypot(b.x - a[0], b.y - a[1]) ? c : a))
            b.sunk = true
            b.x = px
            b.y = py
            b.vx = b.vy = 0
            timers.current.push(setTimeout(() => respawn(b), 1100))
            continue
          }
          if (b.x < R) {
            b.x = R
            b.vx = Math.abs(b.vx) * WALL
          } else if (b.x > W - R) {
            b.x = W - R
            b.vx = -Math.abs(b.vx) * WALL
          }
          if (b.y < R) {
            b.y = R
            b.vy = Math.abs(b.vy) * WALL
          } else if (b.y > H - R) {
            b.y = H - R
            b.vy = -Math.abs(b.vy) * WALL
          }
        }
        for (let i = 0; i < live.length; i++) {
          for (let j = i + 1; j < live.length; j++) {
            const a = live[i]
            const c = live[j]
            if (a.sunk || c.sunk) continue
            const dx = c.x - a.x
            const dy = c.y - a.y
            const d = Math.hypot(dx, dy) || 0.001
            if (d >= 2 * R) continue
            const nx = dx / d
            const ny = dy / d
            const push = (2 * R - d) / 2
            a.x -= nx * push
            a.y -= ny * push
            c.x += nx * push
            c.y += ny * push
            const vrel = (a.vx - c.vx) * nx + (a.vy - c.vy) * ny
            if (vrel > 0) {
              const j2 = ((1 + PAIR) * vrel) / 2
              a.vx -= j2 * nx
              a.vy -= j2 * ny
              c.vx += j2 * nx
              c.vy += j2 * ny
            }
          }
        }
      }
      const f = Math.pow(FRICTION, dt)
      let moving = false
      for (const b of live) {
        if (b.sunk) continue
        b.vx *= f
        b.vy *= f
        if (Math.hypot(b.vx, b.vy) < 0.05) b.vx = b.vy = 0
        else moving = true
      }
      paint()
      raf.current = moving ? requestAnimationFrame(step) : 0
    },
    [paint, respawn],
  )

  const kick = useCallback(() => {
    if (raf.current) return
    last.current = performance.now()
    raf.current = requestAnimationFrame(step)
  }, [step])

  useLayoutEffect(() => {
    paint()
    const wrap = wrapRef.current
    if (!wrap) return
    const fit = () => setScale(Math.min(1, wrap.clientWidth / (W + 2 * RAIL)))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [paint])

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current)
      timers.current.forEach(clearTimeout)
    },
    [],
  )

  /** Pointer position in table units. */
  const local = (e: React.PointerEvent) => {
    const r = feltRef.current!.getBoundingClientRect()
    const k = r.width / W
    return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k }
  }

  const onDown = (e: React.PointerEvent, b: Ball) => {
    if (b.sunk) return
    e.currentTarget.setPointerCapture(e.pointerId)
    aimRef.current = { id: b.id, ux: 0, uy: 0, pull: 0, px: b.x, py: b.y }
    setHot(b.id)
  }
  const onMove = (e: React.PointerEvent) => {
    const a = aimRef.current
    if (!a) return
    const b = balls.current.find((o) => o.id === a.id)!
    const p = local(e)
    let vx = b.x - p.x
    let vy = b.y - p.y
    const len = Math.hypot(vx, vy)
    if (len > MAX_PULL) {
      vx = (vx / len) * MAX_PULL
      vy = (vy / len) * MAX_PULL
    }
    const pull = Math.min(len, MAX_PULL)
    const next = { id: a.id, ux: len ? vx / len : 0, uy: len ? vy / len : 0, pull, px: b.x - vx, py: b.y - vy }
    aimRef.current = next
    setAim(next)
  }
  const onUp = () => {
    const a = aimRef.current
    aimRef.current = null
    setAim(null)
    if (!a || a.pull < 8) return
    const b = balls.current.find((o) => o.id === a.id)!
    if (b.sunk) return
    const power = a.pull / MAX_PULL
    b.vx = a.ux * power * MAX_SPEED
    b.vy = a.uy * power * MAX_SPEED
    kick()
  }

  const aimBall = aim ? balls.current.find((o) => o.id === aim.id) : null

  return (
    <div className="pool-card">
      <h2 className="play-h">Favorite tools</h2>
      <p className="pool-lead">{FAVORITE_TOOLS_LEAD}</p>

      <div ref={wrapRef} className="pool" style={{ height: (H + 2 * RAIL) * scale }}>
        <div className="pool__stage" style={{ width: W + 2 * RAIL, height: H + 2 * RAIL, transform: `scale(${scale})` }}>
          <div
            ref={feltRef}
            className="pool__felt"
            data-nodrag
            role="group"
            aria-label="Pool table of my favorite tools. Press a ball, pull back and let go to hit it."
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {POCKETS.map(([x, y]) => (
              <span key={`${x}-${y}`} className="pool__pocket" style={{ left: x, top: y }} aria-hidden />
            ))}

            {aim && aimBall && aim.pull > 8 && (
              <svg className="pool__aim" viewBox={`0 0 ${W} ${H}`} aria-hidden>
                <line
                  className="pool__cue"
                  x1={aimBall.x - aim.ux * (R + 5)}
                  y1={aimBall.y - aim.uy * (R + 5)}
                  x2={aim.px - aim.ux * (R + 5)}
                  y2={aim.py - aim.uy * (R + 5)}
                />
                <line
                  className="pool__path"
                  x1={aimBall.x + aim.ux * (R + 4)}
                  y1={aimBall.y + aim.uy * (R + 4)}
                  x2={aimBall.x + aim.ux * (R + 4 + 30 + (aim.pull / MAX_PULL) * 170)}
                  y2={aimBall.y + aim.uy * (R + 4 + 30 + (aim.pull / MAX_PULL) * 170)}
                />
              </svg>
            )}

            {balls.current.map((b) => {
              const look = TOOL_LOOK[b.id]
              return (
                <div
                  key={b.id}
                  ref={(el) => {
                    els.current[b.id] = el
                  }}
                  className={`ball${b.id === 'cue' ? ' cue' : ''}`}
                  style={{ ['--c' as string]: look?.color ?? '#f4f2ec' }}
                  role="img"
                  aria-label={b.id === 'cue' ? 'Cue ball' : b.id}
                  onPointerDown={(e) => onDown(e, b)}
                  onPointerEnter={() => setHot(b.id)}
                  onPointerLeave={() => setHot((h) => (aimRef.current ? h : h === b.id ? null : h))}
                >
                  <span className="ball__disc">{look ? <look.Icon size={18} strokeWidth={2} /> : <i />}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <ul className="pool-legend">
        {FAVORITE_TOOLS.map((t) => (
          <li key={t.name} data-hot={hot === t.name}>
            <i style={{ background: TOOL_LOOK[t.name]?.color }} aria-hidden />
            <span className="n">{t.name}</span>
            <span className="r">{t.role}</span>
            {t.note && <span className="note">{t.note}</span>}
          </li>
        ))}
      </ul>
      <p className="pool-hint">pull back from a ball and let go to hit it</p>
    </div>
  )
}
