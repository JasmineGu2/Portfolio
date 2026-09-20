'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { ACCENT_ORANGE } from '@/lib/portfolio/brand'

/**
 * Site-wide cursor modelled on anikamantri.com: an orange arrow with a small tag beside it.
 * Any element can retitle the tag by carrying `data-cursor-label="…"` (the work tiles do, see `WorkBentoTile`).
 * Labels are read off the element under the pointer on every move rather than via per-element hooks, so
 * server components can opt in with a plain attribute and a label can't go stale if its element unmounts.
 */

const CREAM = '#FFFEFD'

/** Tag shown when nothing labelled is under the pointer. '' shows the bare arrow, like the reference. */
const DEFAULT_LABEL = 'jasmine'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const ARROW_W = 22
const TAG_GAP = 6
const EDGE_MARGIN = 16
/** The arrow's tip sits ~2px inside its SVG box; nudge the box so the tip lands on the click point. */
const TIP_OFFSET = -2

/** Fields that need the native I-beam (and a visible caret target), so the arrow steps aside over them. */
const TEXT_FIELD = [
  'textarea',
  'input:not([type])',
  'input[type="text"]',
  'input[type="search"]',
  'input[type="email"]',
  'input[type="url"]',
  'input[type="tel"]',
  'input[type="password"]',
  'input[type="number"]',
  '[contenteditable="true"]',
].join(', ')

// Injected only after the first fine-pointer move, so touch devices and no-JS visitors keep their cursor.
const HIDE_NATIVE_CURSOR = `* { cursor: none !important; } ${TEXT_FIELD} { cursor: text !important; }`

const subscribeFinePointer = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const getFinePointer = () => window.matchMedia(FINE_POINTER).matches
const getFinePointerOnServer = () => false

function Arrow() {
  return (
    <svg width={ARROW_W} height={26} viewBox="0 0 26 31" fill="none" aria-hidden className="block shrink-0">
      <path
        d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
        fill={ACCENT_ORANGE}
        stroke={CREAM}
        strokeWidth={2}
        strokeLinecap="square"
      />
    </svg>
  )
}

export function SiteCursor() {
  const finePointer = useSyncExternalStore(subscribeFinePointer, getFinePointer, getFinePointerOnServer)
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [active, setActive] = useState(false)
  const [shown, setShown] = useState(true)
  const [label, setLabel] = useState(DEFAULT_LABEL)
  const [flipped, setFlipped] = useState(false)
  const pointerX = useRef(0)
  const tagWidth = useRef(0)

  // The tag flips to the arrow's left when it would run off the right edge of the viewport.
  const updateFlip = useCallback(() => {
    setFlipped(pointerX.current + ARROW_W + TAG_GAP + tagWidth.current + EDGE_MARGIN > window.innerWidth)
  }, [])

  // Ignore null: an exiting tag unmounting after a label swap must not zero the width of the new one.
  const measureTag = useCallback(
    (el: HTMLSpanElement | null) => {
      if (!el) return
      tagWidth.current = el.offsetWidth
      updateFlip()
    },
    [updateFlip]
  )

  useEffect(() => {
    if (!finePointer) return

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      x.set(e.clientX)
      y.set(e.clientY)
      pointerX.current = e.clientX

      const target = e.target instanceof Element ? e.target : null
      setActive(true)
      setShown(!target?.closest(TEXT_FIELD))
      setLabel(target?.closest<HTMLElement>('[data-cursor-label]')?.dataset.cursorLabel ?? DEFAULT_LABEL)
      updateFlip()
    }
    const hide = () => setShown(false)

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
    }
  }, [finePointer, x, y, updateFlip])

  // After a client-side navigation the pointer hasn't moved yet, so drop the previous page's label.
  useEffect(() => setLabel(DEFAULT_LABEL), [pathname])

  if (!finePointer) return null

  const duration = reduceMotion ? 0 : 0.14

  return (
    <>
      {active && <style>{HIDE_NATIVE_CURSOR}</style>}
      {/* Above everything, toasts included: with the native cursor hidden, this is the only cursor there is. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[2147483647]"
        style={{ x, y, marginLeft: TIP_OFFSET, marginTop: TIP_OFFSET }}
        initial={false}
        animate={{ opacity: active && shown ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.12 }}
      >
        <div className="relative flex">
          <Arrow />
          <AnimatePresence initial={false}>
            {label && (
              <motion.span
                key={label}
                ref={measureTag}
                initial={{ opacity: 0, scale: 0.85, x: flipped ? 4 : -4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: flipped ? 4 : -4 }}
                transition={{ duration, ease: 'easeOut' }}
                style={{ backgroundColor: ACCENT_ORANGE, color: CREAM }}
                className={`absolute top-2 whitespace-nowrap rounded-[4px] px-2 py-1 font-mono text-[11px] lowercase leading-[1.2] shadow-sm ${
                  flipped ? 'right-full mr-1.5' : 'left-full ml-1.5'
                }`}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
