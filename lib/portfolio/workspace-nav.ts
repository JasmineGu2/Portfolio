const LEGACY_WORK_PATHS = ['/tesla', '/autodesk', '/intuit', '/omers', '/metaverse'] as const

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

/** Internal design tooling, hidden from production nav */
export const DEV_NAV = [
  { label: 'Dev index', href: '/dev' },
  { label: 'Layouts', href: '/dev/bento-workflows' },
  { label: 'Formats', href: '/dev/bento-formats' },
  { label: 'Palettes', href: '/dev/palette-duo-editor' },
  { label: 'Tags', href: '/dev/tag-options' },
  { label: 'Videos', href: '/experience-videos' },
]

/** @deprecated Use DEV_NAV, kept for any lingering imports */
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

const AGENT_PANEL_ROUTES = ['/projects', '/architecture', '/tesla', '/autodesk', '/gallery']

/**
 * Where the Ask Jasmine side panel appears (spec §2). The home page is excluded
 * because it has the full hero panel instead; dev and exploration pages never
 * get it. `/intuit`, `/omers`, `/metaverse` redirect to `/work/*`, so `/work/`
 * covers them.
 */
export function isAgentPanelRoute(pathname: string) {
  if (pathname === '/' || pathname === '/ask') return false
  if (
    pathname.startsWith('/dev/') ||
    pathname.startsWith('/bento-') ||
    pathname.includes('-options')
  ) {
    return false
  }
  if (pathname.startsWith('/work/')) return true
  return AGENT_PANEL_ROUTES.includes(pathname)
}
