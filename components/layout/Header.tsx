'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SiteNavLinks } from '@/components/portfolio/SiteNavLinks'
import { SiteNavContact, SiteNavIdentity } from '@/components/portfolio/SiteNavIdentity'

export default function Header() {
  const pathname = usePathname()

  if (pathname === '/bento' || pathname.startsWith('/dev/bento-workflows')) {
    return null
  }

  const isArchitecturePage = pathname === '/architecture' || pathname.startsWith('/architecture/')

  return (
    <header
      className={cn(
        'site-header sticky top-0 z-50 backdrop-blur-sm border-b',
        isArchitecturePage
          ? 'site-header--architecture bg-[#1a1410]/95 border-[color-mix(in_srgb,#fff_10%,transparent)]'
          : 'bg-[var(--pf-cream)]/95 border-[var(--pf-border)]'
      )}
    >
      <div className="site-header__inner px-6 md:px-10 py-2 md:py-2.5 max-w-6xl mx-auto">
        <div className="site-header__row site-header__row--primary">
          <SiteNavIdentity className={cn(isArchitecturePage && 'site-nav-identity--dark')} />

          <nav className="site-header__links flex items-center gap-2 md:gap-3" aria-label="Main">
            <SiteNavLinks
              pathname={pathname}
              variant="header"
              isArchitecturePage={isArchitecturePage}
            />
          </nav>
        </div>

        {!isArchitecturePage && (
          <SiteNavContact variant="header" className="site-header__contact" />
        )}
      </div>
    </header>
  )
}
