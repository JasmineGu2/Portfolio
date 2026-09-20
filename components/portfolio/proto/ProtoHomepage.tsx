import Link from 'next/link'
import './proto-layout.css'
import { HERO_TAGLINE } from '@/lib/portfolio/site-copy'
import { MAIN_NAV } from '@/lib/portfolio/workspace-nav'
import { CAPABILITY_MODULES } from '@/lib/portfolio/capabilities'
import { SITE_CONTACT } from '@/lib/portfolio/mindmap-data'

const NAV_ITEMS = Object.values(MAIN_NAV)

/**
 * Same markup for both /proto/mine and /proto/theirs — only the wrapping
 * className + its CSS custom properties differ between the two routes.
 */
export function ProtoHomepage({ otherVariantHref, otherVariantLabel }: {
  otherVariantHref: string
  otherVariantLabel: string
}) {
  return (
    <div className="proto-page">
      <header className="proto-nav">
        <span className="proto-nav__brand md-typescale-title-large">Jasmine Gu</span>
        <nav className="proto-nav__links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <md-text-button key={item.href} href={item.href}>
              {item.label}
            </md-text-button>
          ))}
        </nav>
        <div className="proto-nav__actions">
          <md-outlined-button href={otherVariantHref}>{otherVariantLabel}</md-outlined-button>
          <Link href="/" className="proto-nav__back">
            ← Live site
          </Link>
        </div>
      </header>

      <section className="proto-hero">
        <h1 className="proto-hero__headline md-typescale-display-large">{HERO_TAGLINE.primary}</h1>
        <p className="proto-hero__subhead md-typescale-body-large">{HERO_TAGLINE.secondary}</p>
        <div className="proto-hero__actions">
          <md-filled-button href="/">View the work</md-filled-button>
          <md-outlined-button href="/ask">Ask Jasmine</md-outlined-button>
        </div>
      </section>

      <md-divider></md-divider>

      <section className="proto-capabilities" aria-label="Capabilities">
        {CAPABILITY_MODULES.map((cap) => (
          <md-elevated-card key={cap.id} className="proto-card">
            <h3 className="proto-card__title md-typescale-title-medium">{cap.title}</h3>
            <p className="proto-card__description md-typescale-body-medium">{cap.description}</p>
            <md-chip-set className="proto-card__chips">
              {cap.evidence.map((item) => (
                <md-suggestion-chip key={item} label={item}></md-suggestion-chip>
              ))}
            </md-chip-set>
          </md-elevated-card>
        ))}
      </section>

      <md-divider></md-divider>

      <footer className="proto-footer md-typescale-body-small">
        <span>Western / Ivey · CS + Business · Grad 2027</span>
        <div className="proto-footer__links">
          <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
          <a href={SITE_CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
