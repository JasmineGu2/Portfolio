import Link from 'next/link'
import { ResumeLink } from '@/components/portfolio/ResumeLink'
import { SITE_CONTACT } from '@/lib/portfolio/mindmap-data'

export function ProfileStrip() {
  return (
    <section className="landing-profile" aria-label="Contact and education">
      <div className="landing-profile__inner">
        <div className="landing-profile__identity">
          <span className="landing-profile__monogram" aria-hidden>
            JG
          </span>
          <div>
            <p className="landing-profile__label">Product Manager + Engineer</p>
            <p className="landing-profile__meta">
              Western / Ivey · Computer Science + Business · Grad 2027
            </p>
          </div>
        </div>

        <div className="landing-profile__links">
          <a href={`mailto:${SITE_CONTACT.email}`} className="landing-profile__link">
            {SITE_CONTACT.email}
          </a>
          <Link
            href={SITE_CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="landing-profile__link"
          >
            LinkedIn
          </Link>
          <ResumeLink className="landing-profile__link">Résumé</ResumeLink>
        </div>
      </div>
    </section>
  )
}
