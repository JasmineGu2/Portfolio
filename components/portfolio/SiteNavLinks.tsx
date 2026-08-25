'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MAIN_NAV, architectureNavIsActive, exploreNavIsActive } from '@/lib/portfolio/workspace-nav'

export function SiteNavLinks({
  pathname,
  variant,
  isArchitecturePage: isArchitecturePageProp,
}: {
  pathname: string
  variant: 'hero' | 'header'
  isArchitecturePage?: boolean
}) {
  const isArchitecturePage =
    isArchitecturePageProp ??
    architectureNavIsActive(pathname)
  const exploreActive = exploreNavIsActive(pathname)
  const architectureActive = architectureNavIsActive(pathname)

  function navItemClassName(active: boolean) {
    return cn(
      'site-nav-link',
      variant === 'hero' ? 'site-nav-link--hero' : 'site-nav-link--header',
      isArchitecturePage && 'site-nav-link--dark',
      active && 'site-nav-link--active'
    )
  }

  return (
    <>
      <Link href={MAIN_NAV.explore.href} className={navItemClassName(exploreActive)}>
        {MAIN_NAV.explore.label}
      </Link>

      <Link
        href={MAIN_NAV.architecture.href}
        className={navItemClassName(architectureActive)}
      >
        {MAIN_NAV.architecture.label}
      </Link>
    </>
  )
}
