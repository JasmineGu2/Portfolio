import { RESUME_LINK_PROPS } from '@/lib/portfolio/resume'

export const MAIN_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resume', href: RESUME_LINK_PROPS.href, external: true as const },
]

export const PINNED_NAV = [
  { label: 'Layouts', href: '/bento-workflows' },
  { label: 'Formats', href: '/bento-formats' },
  { label: 'Palettes', href: '/palette-duo-editor' },
  { label: 'Tags', href: '/tag-options' },
  { label: 'Videos', href: '/experience-videos' },
]

export function navIsActive(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`)
}
