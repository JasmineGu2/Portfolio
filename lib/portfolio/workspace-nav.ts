import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'

export const MAIN_NAV = [
  { label: 'Work', href: '/' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: RESUME_LINK_PROPS.href, external: true as const },
]

/** Internal design tooling — hidden from production nav */
export const DEV_NAV = [
  { label: 'Layouts', href: '/bento-workflows' },
  { label: 'Formats', href: '/bento-formats' },
  { label: 'Palettes', href: '/palette-duo-editor' },
  { label: 'Tags', href: '/tag-options' },
  { label: 'Videos', href: '/experience-videos' },
]

/** @deprecated Use DEV_NAV — kept for any lingering imports */
export const PINNED_NAV = DEV_NAV

export function navIsActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
