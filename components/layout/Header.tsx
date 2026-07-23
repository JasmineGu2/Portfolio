'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'

type NavItem = {
  label: string
  href: string
  external?: boolean
}

const NAV: NavItem[] = [
  { label: 'Work', href: '/#work-experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resume', href: RESUME_LINK_PROPS.href, external: true },
]

export default function Header() {
  const pathname = usePathname()

  if (pathname === '/bento' || pathname.startsWith('/bento-workflows')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 bg-[var(--pf-cream)]/95 backdrop-blur-sm border-b border-[var(--pf-border)]">
      <div className="px-6 md:px-10 h-14 md:h-16 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/"
          className="font-playful font-bold text-[var(--pf-ink)] hover:opacity-80 transition-opacity"
        >
          Jasmine Gu
        </Link>

        <nav className="flex items-center gap-4 md:gap-6">
          {NAV.map((item) => {
            const isActive =
              !item.external &&
              (item.href === '/#work-experience'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`))

            if ('external' in item && item.external) {
              return (
                <a
                  key={item.label}
                  {...RESUME_LINK_PROPS}
                  className="text-sm md:text-base font-medium text-[var(--pf-muted)] hover:text-[var(--pf-ink)] transition-colors"
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm md:text-base font-medium transition-colors',
                  isActive
                    ? 'text-[var(--pf-ink)] font-semibold'
                    : 'text-[var(--pf-muted)] hover:text-[var(--pf-ink)]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
