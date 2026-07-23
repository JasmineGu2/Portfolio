'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  WORKFLOW_BENTO_LAYOUTS,
  type WorkflowLayoutConfig,
} from '@/lib/portfolio/bento-workflows/layouts'

export function LayoutSwitcher({
  layout,
  onLayoutChange,
  compact = false,
}: {
  layout: WorkflowLayoutConfig
  onLayoutChange: (slug: string) => void
  compact?: boolean
}) {
  const stripRef = useRef<HTMLDivElement>(null)
  const count = WORKFLOW_BENTO_LAYOUTS.length
  const index = WORKFLOW_BENTO_LAYOUTS.findIndex((item) => item.slug === layout.slug)
  const prev = WORKFLOW_BENTO_LAYOUTS[(index - 1 + count) % count]
  const next = WORKFLOW_BENTO_LAYOUTS[(index + 1) % count]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onLayoutChange(prev.slug)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onLayoutChange(next.slug)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next.slug, onLayoutChange, prev.slug])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const active = strip.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [layout.slug])

  return (
    <div className={cn('hero-workspace-nav__layout-switcher', compact && 'hero-workspace-nav__layout-switcher--compact')}>
      <div className="hero-workspace-nav__layout-controls">
        <button
          type="button"
          onClick={() => onLayoutChange(prev.slug)}
          className="hero-nav-btn hero-nav-btn--ghost hero-layout-nav-btn"
          aria-label={`Previous layout: ${prev.title}`}
          title={`Previous: ${prev.title}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
        </button>

        <div className="hero-workspace-nav__layout-current">
          <span className="hero-workspace-nav__layout-label">{layout.title}</span>
          <span className="hero-workspace-nav__layout-meta">
            {index + 1}/{count}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onLayoutChange(next.slug)}
          className="hero-nav-btn hero-nav-btn--primary hero-layout-nav-btn"
          aria-label={`Next layout: ${next.title}`}
          title={`Next: ${next.title}`}
        >
          <ChevronRight className="w-3.5 h-3.5" aria-hidden />
        </button>
      </div>

      <div
        ref={stripRef}
        className="hero-workspace-nav__layout-strip"
        role="tablist"
        aria-label="Experience layouts"
      >
        {WORKFLOW_BENTO_LAYOUTS.map((item, itemIndex) => {
          const isActive = item.slug === layout.slug
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-active={isActive ? 'true' : 'false'}
              className={cn('hero-layout-chip', isActive && 'hero-layout-chip--active')}
              onClick={() => onLayoutChange(item.slug)}
              title={item.description}
            >
              <span className="hero-layout-chip__num">{String(itemIndex + 1).padStart(2, '0')}</span>
              <span className="hero-layout-chip__title">{item.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
