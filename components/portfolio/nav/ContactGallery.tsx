'use client'

import ThreeDHoverGallery, { type GalleryItem } from '@/components/lightswind/3d-hover-gallery'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { RESUME_HREF } from '@/lib/portfolio/resume'

const ITEMS: GalleryItem[] = [
  {
    url: '/contact-tiles/email.svg',
    title: 'Email',
    category: 'Contact',
    description: SITE_CONTACT.email,
  },
  {
    url: '/contact-tiles/linkedin.svg',
    title: 'LinkedIn',
    category: 'Contact',
    description: 'Connect professionally',
  },
  {
    url: '/contact-tiles/resume.svg',
    title: 'Résumé',
    category: 'Contact',
    description: 'Download the PDF',
  },
]

const HREFS = [`mailto:${SITE_CONTACT.email}`, SITE_CONTACT.linkedin, RESUME_HREF]

export function ContactGallery() {
  return (
    <ThreeDHoverGallery
      items={ITEMS}
      itemHeight={56}
      gap={6}
      onImageClick={(index) => {
        const href = HREFS[index]
        if (href) window.open(href, href.startsWith('mailto:') ? undefined : '_blank', 'noopener,noreferrer')
      }}
      className="!w-auto !py-0"
    />
  )
}
