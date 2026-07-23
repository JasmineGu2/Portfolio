'use client'

import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  BENTO_COLOR_SCHEMES,
  getAdjacentColorScheme,
  getColorSchemeIndex,
  type ColorSchemeId,
} from '@/lib/portfolio/bento-workflows/color-schemes'

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
  )
}

export function ColorSchemeSwitcher({
  colorScheme,
  onColorSchemeChange,
  compact = false,
  keyboardPriority = 'primary',
}: {
  colorScheme: ColorSchemeId
  onColorSchemeChange: (id: ColorSchemeId) => void
  compact?: boolean
  /** Use arrow keys when no layout switcher is visible on the page. */
  keyboardPriority?: 'primary' | 'secondary'
}) {
  const count = BENTO_COLOR_SCHEMES.length
  const index = getColorSchemeIndex(colorScheme)
  const current = BENTO_COLOR_SCHEMES[index >= 0 ? index : 0]
  const prev = getAdjacentColorScheme(colorScheme, 'prev')
  const next = getAdjacentColorScheme(colorScheme, 'next')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return

      const useArrowKeys = keyboardPriority === 'primary'
      const prevKey = useArrowKeys ? event.key === 'ArrowLeft' : event.key === '['
      const nextKey = useArrowKeys ? event.key === 'ArrowRight' : event.key === ']'

      if (prevKey) {
        event.preventDefault()
        onColorSchemeChange(prev)
      }

      if (nextKey) {
        event.preventDefault()
        onColorSchemeChange(next)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [keyboardPriority, next, onColorSchemeChange, prev])

  return (
    <div
      className={cn(
        'hero-workspace-nav__scheme-switcher',
        compact && 'hero-workspace-nav__scheme-switcher--compact'
      )}
    >
      <div className="hero-workspace-nav__scheme-controls">
        <button
          type="button"
          onClick={() => onColorSchemeChange(prev)}
          className="hero-nav-btn hero-nav-btn--ghost hero-scheme-nav-btn"
          aria-label={`Previous color scheme: ${BENTO_COLOR_SCHEMES[getColorSchemeIndex(prev)]?.label ?? prev}`}
          title={`Previous: ${BENTO_COLOR_SCHEMES[getColorSchemeIndex(prev)]?.label ?? prev}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
        </button>

        <div className="hero-workspace-nav__scheme-current">
          <span className="hero-scheme-btn__swatches" aria-hidden>
            {current.swatches.map((color) => (
              <span key={color} className="hero-scheme-btn__swatch" style={{ background: color }} />
            ))}
          </span>
          <span className="hero-workspace-nav__scheme-label">{current.label}</span>
          <span className="hero-workspace-nav__scheme-meta">
            {index + 1}/{count}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onColorSchemeChange(next)}
          className="hero-nav-btn hero-nav-btn--primary hero-scheme-nav-btn"
          aria-label={`Next color scheme: ${BENTO_COLOR_SCHEMES[getColorSchemeIndex(next)]?.label ?? next}`}
          title={`Next: ${BENTO_COLOR_SCHEMES[getColorSchemeIndex(next)]?.label ?? next}`}
        >
          <ChevronRight className="w-3.5 h-3.5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
