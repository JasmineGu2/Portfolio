import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { ResumeLink } from '@/components/portfolio/ResumeLink'

const LINK = 'transition-colors hover:text-[var(--pf-ink)] hover:underline underline-offset-4'

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-[80%] flex-col gap-4 border-t border-[var(--pf-card-border)] py-8 text-sm text-[var(--pf-muted)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[var(--pf-ink)]">Jasmine Gu</p>
        <p className="text-xs">&copy; {new Date().getFullYear()} Jasmine Gu</p>
      </div>
      <nav aria-label="Contact" className="flex flex-wrap gap-x-5 gap-y-2">
        <a href={`mailto:${SITE_CONTACT.email}`} className={LINK}>
          Email
        </a>
        <a href={SITE_CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
          LinkedIn
        </a>
        <a href={SITE_CONTACT.github} target="_blank" rel="noopener noreferrer" className={LINK}>
          GitHub
        </a>
        <ResumeLink className={LINK}>Résumé</ResumeLink>
      </nav>
    </footer>
  )
}
