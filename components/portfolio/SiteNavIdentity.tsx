'use client'

import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'
import { SITE_CONTACT } from '@/lib/portfolio/mindmap-data'
import { ResumeLink } from '@/components/portfolio/ResumeLink'
import { cn } from '@/lib/utils'

const CONTACT_SEP = '·'

export function SiteNavIdentity({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('site-nav-identity', className)} aria-label="Jasmine Gu — home">
      <span className="site-nav-identity__text">
        <span className="site-nav-identity__name">Jasmine Gu</span>
        <span className="site-nav-identity__role">Engineer + PM</span>
      </span>
    </Link>
  )
}

export function SiteNavContact({
  className,
  variant = 'hero',
}: {
  className?: string
  variant?: 'hero' | 'header'
}) {
  return (
    <div
      className={cn(
        'site-nav-contact',
        variant === 'hero' && 'site-nav-contact--hero',
        variant === 'header' && 'site-nav-contact--header',
        className
      )}
    >
      <span>Western / Ivey · CS + Business</span>
      <span aria-hidden>{CONTACT_SEP}</span>
      <span>Grad 2027</span>
      <span aria-hidden>{CONTACT_SEP}</span>
      <a
        href={`mailto:${SITE_CONTACT.email}`}
        className="site-nav-contact__link site-nav-contact__icon-link"
        aria-label={SITE_CONTACT.email}
        title={SITE_CONTACT.email}
      >
        <Mail className="h-3.5 w-3.5" aria-hidden />
      </a>
      <span aria-hidden>{CONTACT_SEP}</span>
      <Link
        href={SITE_CONTACT.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="site-nav-contact__link site-nav-contact__icon-link"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden />
      </Link>
      <span aria-hidden>{CONTACT_SEP}</span>
      <ResumeLink className="site-nav-contact__link">Résumé</ResumeLink>
    </div>
  )
}
