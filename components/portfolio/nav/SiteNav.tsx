'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ContactGallery } from '@/components/portfolio/nav/ContactGallery'
import { HeartToggle } from '@/components/portfolio/nav/HeartToggle'

const NAV_ITEMS = [
  { label: 'Work', href: '/' },
  { label: 'Photos', href: '/gallery' },
  { label: 'The Journey', href: '/architecture' },
] as const

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav className="site-nav flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm sm:px-10">
      <div className="flex flex-wrap items-center gap-1">
        <HeartToggle />
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-sm px-2 py-1 text-xs transition-colors',
              isActive(pathname, item.href)
                ? 'bg-[var(--pf-ink)] text-[var(--pf-canvas)]'
                : 'text-[var(--pf-ink)] hover:bg-[var(--pf-canvas-alt)]'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* The home hero already has its own contact icons; every other page keeps them here. */}
      {pathname !== '/' && (
        <div className="flex items-center">
          <ContactGallery />
        </div>
      )}
    </nav>
  )
}
