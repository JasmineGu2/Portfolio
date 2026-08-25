const LEGACY_WORK_PATHS = ['/tesla', '/intuit', '/omers', '/metaverse'] as const

export const MAIN_NAV = {
  explore: {
    label: 'Work',
    href: '/',
  },
  explorations: {
    label: 'Explorations',
    href: '/projects',
  },
  gallery: {
    label: 'Gallery',
    href: '/gallery',
  },
  architecture: {
    label: 'The Journey',
    href: '/architecture',
  },
} as const

/** Internal design tooling — hidden from production nav */
export const DEV_NAV = [
  { label: 'Dev index', href: '/dev' },
  { label: 'Layouts', href: '/dev/bento-workflows' },
  { label: 'Formats', href: '/dev/bento-formats' },
  { label: 'Palettes', href: '/dev/palette-duo-editor' },
  { label: 'Tags', href: '/dev/tag-options' },
  { label: 'Videos', href: '/experience-videos' },
]

/** @deprecated Use DEV_NAV — kept for any lingering imports */
export const PINNED_NAV = DEV_NAV

export function navIsActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href.startsWith('mailto:') || href.endsWith('.pdf')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function exploreNavIsActive(pathname: string) {
  if (pathname === '/') return true
  if (pathname.startsWith('/work/')) return true
  return LEGACY_WORK_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )
}

export function architectureNavIsActive(pathname: string) {
  return pathname === '/architecture' || pathname.startsWith('/architecture/')
}

export function isAgentPanelRoute(pathname: string) {
  // Chat experience turned off on work-experience pages for now (Tesla + /work/*).
  if (pathname === '/ask') return false
  if (pathname.startsWith('/dev/') || pathname.startsWith('/bento-') || pathname.includes('-options')) {
    return false
  }
  return pathname === '/'
}
