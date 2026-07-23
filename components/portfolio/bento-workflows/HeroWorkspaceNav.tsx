'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FlowerIcon } from '@/components/portfolio/FlowerIcon'
import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'
import { MAIN_NAV, PINNED_NAV, navIsActive } from '@/lib/portfolio/workspace-nav'
import {
  BENTO_COLOR_SCHEMES,
  PALETTE_DUO_SCHEME_IDS,
  PALETTE_LIGHT_SCHEME_IDS,
  PALETTE_TINT_SCHEME_IDS,
} from '@/lib/portfolio/bento-workflows/color-schemes'
import { useBentoWorkspace } from './BentoWorkspaceContext'
import { ColorSchemeSwitcher } from './ColorSchemeSwitcher'
import { LayoutSwitcher } from './LayoutSwitcher'

function schemesByIds(ids: readonly string[]) {
  return BENTO_COLOR_SCHEMES.filter((scheme) => ids.includes(scheme.id))
}

export function HeroWorkspaceNav({
  compact = false,
  showWorkspaceControls = true,
}: {
  compact?: boolean
  showWorkspaceControls?: boolean
}) {
  const pathname = usePathname()
  const { colorScheme, setColorScheme, layoutControls } = useBentoWorkspace()
  const layout = layoutControls?.layout
  const showSwitcher = layoutControls?.showSwitcher
  const onLayoutChange = layoutControls?.onLayoutChange
  const classicSchemes = BENTO_COLOR_SCHEMES.filter(
    (scheme) =>
      !PALETTE_LIGHT_SCHEME_IDS.includes(scheme.id) &&
      !PALETTE_TINT_SCHEME_IDS.includes(scheme.id) &&
      !PALETTE_DUO_SCHEME_IDS.includes(scheme.id)
  )
  const paletteLightSchemes = schemesByIds(PALETTE_LIGHT_SCHEME_IDS)
  const paletteTintSchemes = schemesByIds(PALETTE_TINT_SCHEME_IDS)
  const paletteDuoSchemes = schemesByIds(PALETTE_DUO_SCHEME_IDS)

  function SchemePicker({ schemes, label }: { schemes: typeof BENTO_COLOR_SCHEMES; label: string }) {
    return (
      <div className="hero-workspace-nav__scheme-group">
        <span className="hero-workspace-nav__scheme-group-label">{label}</span>
        <div className="hero-workspace-nav__schemes" role="listbox" aria-label={label}>
          {schemes.map((scheme) => (
            <button
              key={scheme.id}
              type="button"
              role="option"
              aria-selected={colorScheme === scheme.id}
              className={cn('hero-scheme-btn', colorScheme === scheme.id && 'hero-scheme-btn--active')}
              onClick={() => setColorScheme(scheme.id)}
              title={scheme.description}
            >
              <span className="hero-scheme-btn__swatches" aria-hidden>
                {scheme.swatches.map((c) => (
                  <span key={c} className="hero-scheme-btn__swatch" style={{ background: c }} />
                ))}
              </span>
              <span className="hero-scheme-btn__label">{scheme.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('hero-workspace-nav', compact && 'hero-workspace-nav--compact hero-workspace-nav--site')}>
      <div className="hero-workspace-nav__row">
        <Link href="/" className="hero-workspace-nav__brand-link" aria-label="Jasmine Gu — home">
          <span className="hero-workspace-nav__brand-tag">
            <FlowerIcon className="hero-workspace-nav__brand-flower" />
            Jasmine Gu
          </span>
        </Link>

        <nav className="hero-workspace-nav__links" aria-label="Main">
          {MAIN_NAV.map((item) => {
            const isActive = navIsActive(pathname, item.href)
            if (item.external) {
              return (
                <a
                  key={item.label}
                  {...RESUME_LINK_PROPS}
                  className={cn('hero-nav-btn', isActive && 'hero-nav-btn--active')}
                >
                  {item.label}
                </a>
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn('hero-nav-btn', isActive && 'hero-nav-btn--active')}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {!compact && showWorkspaceControls && (
        <div className="hero-workspace-nav__row">
          <nav className="hero-workspace-nav__links hero-workspace-nav__links--muted" aria-label="Pinned">
            {PINNED_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'hero-nav-btn hero-nav-btn--ghost',
                  navIsActive(pathname, item.href) && 'hero-nav-btn--active'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {showWorkspaceControls && layout && showSwitcher && onLayoutChange && (
        <LayoutSwitcher layout={layout} onLayoutChange={onLayoutChange} compact={compact} />
      )}

      {showWorkspaceControls && (
        <ColorSchemeSwitcher
          colorScheme={colorScheme}
          onColorSchemeChange={setColorScheme}
          compact={compact}
          keyboardPriority={showSwitcher ? 'secondary' : 'primary'}
        />
      )}

      {!compact && showWorkspaceControls && (
        <div className="hero-workspace-nav__row hero-workspace-nav__row--schemes">
          <span className="hero-workspace-nav__section-label">Scheme</span>
          <div className="hero-workspace-nav__scheme-groups">
            <SchemePicker schemes={classicSchemes} label="Classic" />
            <SchemePicker schemes={paletteLightSchemes} label="Palette Light" />
            <SchemePicker schemes={paletteTintSchemes} label="Palette Tint" />
            <SchemePicker schemes={paletteDuoSchemes} label="Palette Duo" />
          </div>
        </div>
      )}
    </div>
  )
}
