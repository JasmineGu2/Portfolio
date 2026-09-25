import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { ResumeLink } from '@/components/portfolio/ResumeLink'
import { FooterSignature } from '@/components/portfolio/footer/FooterSignature'
import { FOOTER_FACTS } from '@/lib/portfolio/play-data'
import { ContactKeycap } from '@/components/portfolio/footer/ContactKeycap'
import { QuoteCard } from '@/components/portfolio/footer/QuoteCard'
import { VideoToggle } from '@/components/portfolio/footer/VideoToggle'
import {
  BackToTop,
  LastRevised,
  LocalClock,
  SiteConditions,
} from '@/components/portfolio/footer/FooterParts'

/**
 * Blueprint footer: her signature and "always curious", a core-value quote card, the orange "Email Me"
 * keycap, then the facts (currently, based in + local time, site conditions, last revised), links, name and year.
 *
 * "always curious" is a plain text stand-in for the Originkit "Vector Wordmark" component. It stays
 * plain until the Originkit MCP is signed in, so the component can be pulled exactly as the MCP returns it.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="pf-foot">
      <div className="pf-foot__in">
        <div className="pf-foot__top">
          <div className="pf-foot__mark">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <FooterSignature />
              <ContactKeycap href={`mailto:${SITE_CONTACT.email}`} />
            </div>
            <div className="pf-foot__wordmark" data-originkit="vector-wordmark">
              {FOOTER_FACTS.wordmark}
            </div>
          </div>
          <QuoteCard />
        </div>

        <div className="pf-foot__facts">
          <div>
            <small>Currently</small>
            {FOOTER_FACTS.currently}
          </div>
          <div>
            <small>Based in</small>
            {FOOTER_FACTS.city} · <LocalClock timeZone={FOOTER_FACTS.timeZone} />
          </div>
          <SiteConditions />
          <div>
            <small>Last revised</small>
            <LastRevised />
          </div>
        </div>

        <div className="pf-foot__bar">
          <nav aria-label="Contact">
            <a href={`mailto:${SITE_CONTACT.email}`}>Email</a>
            <a href={SITE_CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={SITE_CONTACT.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <ResumeLink>Résumé</ResumeLink>
            <VideoToggle />
          </nav>
          <p>
            Jasmine Gu, {year} · <BackToTop />
          </p>
        </div>
      </div>
    </footer>
  )
}
