/**
 * Company logos from /public — transparent PNGs/SVGs under public/work/.
 */
export const COMPANY_LOGOS = {
  metaverse: '/work/metaverse.png',
  omers: '/work/omers.svg',
  intuit: '/puzzle/intuit.png',
  tesla: '/work/tesla.png',
  autodesk: '/work/autodesk.png',
  autodeskIcon: '/work/autodesk-icon.png',
  western: '/work/western-ivey.png',
  hackWestern: '/work/hack-western.png',
  iveyProduct: '/work/ivey-product.png',
  stealthStartup: '/work/stealth-startup.png',
  jasmine: '/icons/jasmine-logo.png',
  linkedin: '/icons/linkedin.png',
} as const

export type CompanyLogoKey = keyof typeof COMPANY_LOGOS

/** Wordmarks that should not be zoom-scaled like square marks */
export const WIDE_LOGO_KEYS = new Set<CompanyLogoKey>([
  'western',
  'omers',
  'autodesk',
  'autodeskIcon',
])

export function isWideLogoSrc(src?: string | null): boolean {
  if (!src) return false
  return (
    src.includes('western-ivey') ||
    src.includes('omers.') ||
    src.includes('autodesk')
  )
}
