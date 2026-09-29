// The ID badge on /about (components/ui/id-card-lanyard.tsx). Facts only from the old badge and the site.
// Photo: set `photoSrc` below to a file in public/, e.g. '/about/jasmine-badge.jpg', and `photoAlt` to describe it.
// Until then the badge shows `artSrc` (the flower mark the old badge used).

export const BADGE = {
  name: 'Jasmine Gu',
  role: 'Product Engineer',
  brand: 'JASMINE GU',
  brandTagline: 'Product engineer',
  pillars: ['Engineering', 'Product', 'Business'] as [string, string, string],
  location: 'Toronto',
  // decorative, not a real ID; the old badge said "Class of 2027"
  idNumber: 'JG-2027',
  validThru: '2027',
  site: 'jasminegu.com',
  linkedinUrl: 'https://www.linkedin.com/in/jasmine-gu-b2aa65201',
  githubUrl: 'https://github.com/JasmineGu2',
  footer: ['Engineering', 'Product', 'Business'],
  scanTitle: 'Scan for portfolio',
  scanText: 'Case studies, tools and side quests.',
  photoSrc: undefined as string | undefined,
  photoAlt: '',
  artSrc: '/icons/jasmine-logo.png',
}
