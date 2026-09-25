'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { motion, useDragControls, useReducedMotion } from 'motion/react'

/** Dragging needs a precise pointer and room to move; below this the windows simply stack. */
const DRAGGABLE = '(min-width: 768px) and (hover: hover) and (pointer: fine)'

const subscribeDraggable = (onChange: () => void) => {
  const query = window.matchMedia(DRAGGABLE)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const getDraggable = () => window.matchMedia(DRAGGABLE).matches
const getDraggableOnServer = () => false

/**
 * Entrance, staggered by the parent's `staggerChildren`. Opacity only: drag owns the element's transform, and a
 * scale during the entrance skews framer's drag-constraint measurement on mount, which shoved windows up to
 * ~190px off their grid tracks.
 */
const WINDOW_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export interface WindowPlacement {
  /** `grid-column` / `grid-row` values, applied from 768px up. */
  col?: string
  row?: string
  /** `aspect-ratio` for the media area of a work window. */
  aspect?: string
}

interface InspoWindowProps {
  /** Filename shown in the title bar, e.g. `tesla.mp4`. */
  title: string
  placement?: WindowPlacement
  href?: string
  /** Tag shown beside the site cursor while hovering the window body (see `SiteCursor`). */
  cursorLabel?: string
  dimmed?: boolean
  /** Windows can be dragged anywhere inside this element. */
  constraintsRef: RefObject<HTMLElement>
  /** Returns the next z-index, so the pressed window lands above the others. */
  raise: () => number
  caption?: ReactNode
  children: ReactNode
}

export function InspoWindow({
  title,
  placement,
  href,
  cursorLabel,
  dimmed,
  constraintsRef,
  raise,
  caption,
  children,
}: InspoWindowProps) {
  const canDrag = useSyncExternalStore(subscribeDraggable, getDraggable, getDraggableOnServer)
  const reduceMotion = useReducedMotion()
  const controls = useDragControls()
  const foldId = useId()
  const [collapsed, setCollapsed] = useState(false)
  const [z, setZ] = useState(0)

  const style = {
    zIndex: z || undefined,
    '--col': placement?.col,
    '--row': placement?.row,
    '--win-aspect': placement?.aspect,
  } as CSSProperties

  const body = (
    <>
      {children}
      {caption}
    </>
  )

  return (
    <motion.section
      aria-label={title}
      className="inspo-win"
      style={style}
      variants={WINDOW_VARIANTS}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
      data-placed={placement ? '' : undefined}
      data-dimmed={dimmed ? '' : undefined}
      data-collapsed={collapsed ? '' : undefined}
      data-draggable={canDrag ? '' : undefined}
      drag={canDrag}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onPointerDown={() => setZ(raise())}
    >
      <header
        className="inspo-win__bar"
        data-cursor-label={canDrag ? 'drag' : undefined}
        onPointerDown={(event: ReactPointerEvent<HTMLElement>) => {
          if (canDrag) controls.start(event)
        }}
      >
        <span className="inspo-win__title">{title}</span>
        <button
          type="button"
          className="inspo-win__close"
          aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${title}`}
          aria-expanded={!collapsed}
          aria-controls={foldId}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setCollapsed((value) => !value)}
        >
          <span aria-hidden>{collapsed ? '+' : '×'}</span>
        </button>
      </header>

      <div id={foldId} className="inspo-win__fold">
        {href ? (
          <a className="inspo-win__pane" href={href} data-cursor-label={cursorLabel}>
            {body}
          </a>
        ) : (
          <div className="inspo-win__pane" data-cursor-label={cursorLabel}>
            {body}
          </div>
        )}
      </div>
    </motion.section>
  )
}

/**
 * Mounts the `<video>` only once its window has scrolled near the viewport, so ten autoplaying
 * clips don't all load (and play) on first paint.
 */
export function WindowVideo({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen])

  return (
    <div ref={ref} className="inspo-win__fill">
      {seen && <video src={src} autoPlay loop muted playsInline className="inspo-win__video" />}
    </div>
  )
}
