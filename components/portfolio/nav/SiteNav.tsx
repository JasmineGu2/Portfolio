'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeartToggle } from '@/components/portfolio/nav/HeartToggle'

const NAV_ITEMS = [
  { label: 'Work', href: '/' },
  { label: 'About me', href: '/about' },
] as const

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname.startsWith('/work/')
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Plain text header: name and role on the left, two links in the middle, the heart on the right. */
export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="site-nav pf-header">
      <Link href="/" className="pf-header__brand">
        <b>Jasmine Gu</b>
        <span>Product engineer</span>
      </Link>

      <nav aria-label="Primary" className="pf-header__links">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="pf-header__end">
        <HeartToggle />
      </div>
    </header>
  )
}
