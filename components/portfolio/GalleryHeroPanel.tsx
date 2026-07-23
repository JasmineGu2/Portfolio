'use client'

import { useCallback, type MutableRefObject, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SchemeTag } from './bento-workflows/SchemeTag'
import {
  GALLERY_IMPACT_ROLES,
  GALLERY_INTRO,
  GALLERY_PHOTO_COUNT,
  GALLERY_SIDE_QUESTS,
  type GalleryKind,
} from '@/lib/portfolio/gallery-data'
import type { ColorSchemeId } from '@/lib/portfolio/bento-workflows/color-schemes'
import { getSchemePaletteColor } from '@/lib/portfolio/bento-workflows/work-accents'

function GalleryHeroCell({
  id,
  className,
  cellRefs,
  children,
}: {
  id: string
  className?: string
  cellRefs: MutableRefObject<Map<string, HTMLDivElement>>
  children: ReactNode
}) {
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) cellRefs.current.set(id, el)
      else cellRefs.current.delete(id)
    },
    [id, cellRefs]
  )

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  )
}

export function GalleryHeroPanel({
  cellRefs,
  colorScheme,
  activeKind,
  onActiveKindChange,
  showKindTabs = true,
}: {
  cellRefs: MutableRefObject<Map<string, HTMLDivElement>>
  colorScheme: ColorSchemeId
  activeKind?: GalleryKind
  onActiveKindChange?: (kind: GalleryKind) => void
  showKindTabs?: boolean
}) {
  return (
    <div className="hero-bento-grid hero-bento-grid--editorial hero-bento-grid--compact hero-bento-grid--gallery-hero">
      <GalleryHeroCell
        id="gallery-intro"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--intro"
      >
        <div className="bento-tile bento-tile--editorial hero-bento-block">
          <span className="hero-bento-port hero-bento-port--right" aria-hidden />
          <p className="hero-editorial-headline font-serif-display">{GALLERY_INTRO.title}</p>
          <p className="hero-editorial-sub mt-3 md:mt-3.5">{GALLERY_INTRO.lead}</p>
        </div>
      </GalleryHeroCell>

      <GalleryHeroCell
        id="gallery-impact"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--pills"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
          <span className="hero-bento-port hero-bento-port--left" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <p className="bw-card-label">Impact roles</p>
          <ul className="bw-tag-grid">
            {GALLERY_IMPACT_ROLES.map((role, index) => (
              <li key={role.id}>
                <SchemeTag
                  label={role.title}
                  color={getSchemePaletteColor(colorScheme, index + 1)}
                  size="sm"
                />
              </li>
            ))}
          </ul>
        </div>
      </GalleryHeroCell>

      <GalleryHeroCell
        id="gallery-side"
        cellRefs={cellRefs}
        className="hero-bento-cell hero-bento-cell--side"
      >
        <div className="bento-tile bento-tile--editorial-soft hero-bento-block">
          <span className="hero-bento-port hero-bento-port--top" aria-hidden />
          <span className="hero-bento-port hero-bento-port--bottom" aria-hidden />
          <p className="bw-card-label">Side-questing at…</p>
          <ul className="bw-tag-grid mb-2.5">
            {GALLERY_SIDE_QUESTS.map((role, index) => (
              <li key={role.id}>
                <SchemeTag
                  label={role.title}
                  color={getSchemePaletteColor(colorScheme, index + 6)}
                  size="sm"
                />
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {showKindTabs && onActiveKindChange && activeKind && (
              <>
                <button
                  type="button"
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                    activeKind === 'impact'
                      ? 'border-[var(--sch-hero-border)] bg-[var(--sch-hero)] text-[var(--sch-hero-fg)]'
                      : 'border-transparent bg-transparent text-[var(--sch-hero-sub)] hover:text-[var(--sch-hero-fg)]'
                  )}
                  onClick={() => onActiveKindChange('impact')}
                >
                  Impact roles
                </button>
                <button
                  type="button"
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                    activeKind === 'side'
                      ? 'border-[var(--sch-hero-border)] bg-[var(--sch-hero)] text-[var(--sch-hero-fg)]'
                      : 'border-transparent bg-transparent text-[var(--sch-hero-sub)] hover:text-[var(--sch-hero-fg)]'
                  )}
                  onClick={() => onActiveKindChange('side')}
                >
                  Side quests
                </button>
                <button
                  type="button"
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                    activeKind === 'moments'
                      ? 'border-[var(--sch-hero-border)] bg-[var(--sch-hero)] text-[var(--sch-hero-fg)]'
                      : 'border-transparent bg-transparent text-[var(--sch-hero-sub)] hover:text-[var(--sch-hero-fg)]'
                  )}
                  onClick={() => onActiveKindChange('moments')}
                >
                  Moments ({GALLERY_PHOTO_COUNT})
                </button>
              </>
            )}
          </div>
        </div>
      </GalleryHeroCell>
    </div>
  )
}
