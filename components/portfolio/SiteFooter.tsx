import Link from 'next/link'
import { SITE_CONTACT } from '@/lib/portfolio/mindmap-data'
import { ResumeLink } from '@/components/portfolio/ResumeLink'

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--pf-border)] px-6 md:px-10 py-10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="font-playful font-semibold text-[var(--pf-ink)]">Jasmine Gu</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--pf-muted)]">
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="hover:text-[var(--pf-orange)] transition-colors"
          >
            {SITE_CONTACT.email}
          </a>
          <Link
            href={SITE_CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--pf-orange)] transition-colors"
          >
            LinkedIn
          </Link>
          <ResumeLink className="hover:text-[var(--pf-orange)] transition-colors">
            Résumé
          </ResumeLink>
        </div>
      </div>
    </footer>
  )
}
