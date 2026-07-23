'use client'

/**
 * Lightweight motion shim — Framer Motion-compatible API.
 * Swap imports to `framer-motion` when the package is available.
 */

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react'

interface MotionProps extends HTMLAttributes<HTMLElement> {
  initial?: Record<string, number | string>
  animate?: Record<string, number | string>
  whileInView?: Record<string, number | string>
  exit?: Record<string, number | string>
  transition?: { duration?: number; delay?: number; repeat?: number; ease?: string }
  viewport?: { once?: boolean; margin?: string }
  layout?: boolean
  children?: ReactNode
  d?: string
  fill?: string
  stroke?: string
  strokeWidth?: number
  strokeLinecap?: string
  r?: number
  viewBox?: string
  preserveAspectRatio?: string
  offsetPath?: string
}

function buildStyle(
  initial?: Record<string, number | string>,
  animate?: Record<string, number | string>,
  visible: boolean = true
): CSSProperties {
  const style: CSSProperties = {}
  const source = visible ? animate ?? initial : initial
  if (!source) return style

  if ('opacity' in source) style.opacity = source.opacity as number
  if ('y' in source) style.transform = `translateY(${source.y}px)`
  if ('x' in source) style.transform = `translateX(${source.x}px)`
  if ('scale' in source) style.transform = `scale(${source.scale})`
  if ('pathLength' in source) {
    ;(style as Record<string, unknown>)['strokeDasharray'] = '100'
    ;(style as Record<string, unknown>)['strokeDashoffset'] =
      100 - Number(source.pathLength) * 100
  }
  return style
}

function createMotionComponent(tag: string) {
  return function MotionComponent({
    initial,
    animate,
    whileInView,
    exit: _exit,
    transition,
    viewport,
    layout: _layout,
    children,
    className = '',
    style,
    ...rest
  }: MotionProps) {
    const ref = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(!whileInView)

    useEffect(() => {
      if (!whileInView || !ref.current) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (viewport?.once) observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: viewport?.margin ?? '0px' }
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }, [whileInView, viewport?.once, viewport?.margin])

    const motionStyle = buildStyle(initial, animate ?? whileInView, visible)
    const duration = transition?.duration ?? 0.4
    const delay = transition?.delay ?? 0

    return createElement(
      tag,
      {
        ...rest,
        ref,
        className: `${className} motion-element`.trim(),
        style: {
          ...style,
          ...motionStyle,
          transition: `all ${duration}s ease ${delay}s`,
        },
      },
      children
    )
  }
}

export const motion = {
  div: createMotionComponent('div'),
  article: createMotionComponent('article'),
  span: createMotionComponent('span'),
  path: createMotionComponent('path'),
  circle: createMotionComponent('circle'),
  p: createMotionComponent('p'),
  h1: createMotionComponent('h1'),
}

interface AnimatePresenceProps {
  children?: ReactNode
}

export function AnimatePresence({ children }: AnimatePresenceProps) {
  return <>{children}</>
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function useScroll(_options?: {
  target?: RefObject<HTMLElement | null>
  offset?: string[]
}) {
  const [scrollYProgress, setScrollYProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setScrollYProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return { scrollYProgress }
}

export function useTransform(
  progress: number,
  inputRange: number[],
  outputRange: number[]
): number {
  const [value, setValue] = useState(outputRange[0])

  useEffect(() => {
    const p = typeof progress === 'number' ? progress : 0
    const inMin = inputRange[0]
    const inMax = inputRange[inputRange.length - 1]
    const outMin = outputRange[0]
    const outMax = outputRange[outputRange.length - 1]
    const t = Math.min(1, Math.max(0, (p - inMin) / (inMax - inMin || 1)))
    setValue(outMin + t * (outMax - outMin))
  }, [progress, inputRange, outputRange])

  return value
}
