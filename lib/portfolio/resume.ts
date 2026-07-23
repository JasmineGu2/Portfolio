export const RESUME_HREF = '/Jasmine_Gu_PM.pdf'

/** Use on every resume anchor so the PDF always opens in a new browser tab. */
export const RESUME_LINK_PROPS = {
  href: RESUME_HREF,
  target: '_blank',
  rel: 'noopener noreferrer',
} as const
