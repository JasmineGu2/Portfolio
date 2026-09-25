'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Blackjack } from '@/components/portfolio/play/Blackjack'
import { Draggable } from '@/components/portfolio/play/Draggable'
import { PinsRotator } from '@/components/portfolio/play/PinsRotator'
import { PoolTable } from '@/components/portfolio/play/PoolTable'
import {
  DitherPostcard,
  GalleryNote,
  LaunchesNote,
  LessonsNote,
  NotesSheet,
  PolaroidPair,
  StockList,
} from '@/components/portfolio/play/PlaySections'
import { PLAY_PHOTOS } from '@/lib/portfolio/play-data'

type Rect = { x: number; y: number; w: number; h: number }
type Spot = { x: number; y: number; rot: number }

/** Where the bigger pieces start on a wide screen: x is a fraction of the board width, y is px; w and h are their rough size. */
const PIECES = {
  notes: { x: 0.02, y: 24, w: 470, h: 490 },
  tools: { x: 0.365, y: 10, w: 660, h: 910 },
  blackjack: { x: 0.03, y: 570, w: 380, h: 470 },
  stocks: { x: 0.3, y: 990, w: 260, h: 200 },
  pins: { x: 0.52, y: 990, w: 260, h: 300 },
  pair: { x: 0.72, y: 990, w: 250, h: 360 },
  launch: { x: 0.375, y: 1390, w: 320, h: 190 },
  lessons: { x: 0.61, y: 1400, w: 360, h: 670 },
  dither: { x: 0.03, y: 1200, w: 480, h: 270 },
  gallery: { x: 0.03, y: 1520, w: 440, h: 190 },
} as const

const BOARD_HEIGHT = 2450
const PHOTO = { w: 204, h: 262 }
const WIDE = 1300

const overlap = (a: Rect, b: Rect) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
}

/** Scatter the polaroids over the free space: best of a few random tries each, so they land between the bigger pieces. */
function scatter(width: number, count: number): Spot[] {
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const fixed: Rect[] = Object.values(PIECES).map((p) => ({ x: p.x * width - 12, y: p.y - 12, w: p.w + 24, h: p.h + 24 }))
  const placed: Rect[] = []
  return Array.from({ length: count }, () => {
    let best: Rect | null = null
    let bestScore = Infinity
    for (let t = 0; t < 260 && bestScore > 0; t++) {
      const r = { x: 12 + rnd() * (width - PHOTO.w - 24), y: 6 + rnd() * (BOARD_HEIGHT - PHOTO.h - 12), w: PHOTO.w, h: PHOTO.h }
      let score = 0
      for (const f of fixed) score += overlap(r, f) * 6
      for (const p of placed) score += overlap(r, p)
      if (score < bestScore) {
        best = r
        bestScore = score
      }
    }
    placed.push(best!)
    return { x: Math.round(best!.x), y: Math.round(best!.y), rot: Number(((rnd() * 10 - 5) || 1).toFixed(1)) }
  })
}

/**
 * The About page as a pinboard: one big canvas with everything pinned on it at an angle, and every piece can be
 * picked up and moved. On a narrower window the pieces flow into a wrapped pile instead of sitting at set spots.
 */
export function PinBoard() {
  const boardRef = useRef<HTMLDivElement>(null)
  const [wide, setWide] = useState(false)
  const [width, setWidth] = useState(1400)

  useLayoutEffect(() => {
    const board = boardRef.current
    if (!board) return
    const measure = () => {
      setWide(window.innerWidth >= WIDE)
      setWidth(board.clientWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(board)
    return () => ro.disconnect()
  }, [])

  const spots = useMemo(() => (wide ? scatter(width, PLAY_PHOTOS.length) : null), [wide, width])
  const at = (k: keyof typeof PIECES): React.CSSProperties | undefined =>
    wide ? { left: Math.round(PIECES[k].x * width), top: PIECES[k].y } : undefined

  return (
    <div ref={boardRef} className={`play-board${wide ? '' : ' flow'}`} style={wide ? { height: BOARD_HEIGHT } : undefined}>
      <p className="play-hint">it is a pinboard: pick anything up, and hit the tools</p>

      <Draggable className="pb pb-notes" style={at('notes')} mouseOnly>
        <NotesSheet />
      </Draggable>
      <Draggable className="pb pb-tools" style={at('tools')}>
        <PoolTable />
      </Draggable>
      <Draggable className="pb pb-blackjack" style={at('blackjack')}>
        <Blackjack />
      </Draggable>
      <Draggable className="pb pb-stocks" style={at('stocks')}>
        <StockList />
      </Draggable>
      <Draggable className="pb pb-pins" style={at('pins')}>
        <PinsRotator />
      </Draggable>
      <Draggable className="pb pb-pair" style={at('pair')}>
        <PolaroidPair />
      </Draggable>
      <Draggable className="pb pb-launch" style={at('launch')}>
        <LaunchesNote />
      </Draggable>
      <Draggable className="pb pb-lessons" style={at('lessons')}>
        <LessonsNote />
      </Draggable>
      <Draggable className="pb pb-dither" style={at('dither')}>
        <DitherPostcard />
      </Draggable>
      <Draggable className="pb pb-gallery" style={at('gallery')}>
        <GalleryNote />
      </Draggable>

      {PLAY_PHOTOS.map((src, i) => (
        <Draggable
          key={src}
          className="pb pb-photo"
          style={
            spots
              ? { left: spots[i].x, top: spots[i].y, ['--r' as string]: `${spots[i].rot}deg` }
              : { ['--r' as string]: `${i % 2 ? 2.5 : -2.5}deg` }
          }
        >
          <figure className="pol">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" draggable={false} />
            <i>{String(i + 1).padStart(2, '0')}</i>
          </figure>
        </Draggable>
      ))}
    </div>
  )
}
