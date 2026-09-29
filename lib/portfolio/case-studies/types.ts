/** One piece of a case-study section. Each type maps to one element in `CaseStudyArticle`. */
export type CaseStudyBlock =
  | { type: 'paragraph'; text: string }
  /** A line pulled out of the flow, like a workflow written as a sentence. */
  | { type: 'emphasis'; text: string }
  /** A small heading inside a section. It is not listed in the side list. */
  | { type: 'subhead'; text: string }
  | { type: 'tags'; items: string[] }

export interface CaseStudySection {
  /** Anchor id: the URL hash and the side-list link target. */
  id: string
  heading: string
  /** Shorter name for the side list. Falls back to `heading`. */
  tocLabel?: string
  blocks: CaseStudyBlock[]
}

export interface CaseStudyMedia {
  kind: 'video' | 'image'
  src: string
  /** Still image shown before a video loads. */
  poster?: string
  alt: string
  /** CSS aspect-ratio of the frame, e.g. "16 / 9". Stills leave it out and the frame takes the image's own shape. */
  aspect?: string
  /** Logos, posters and wordmarks are shown whole (never cropped or scaled past their own size). */
  fit: 'cover' | 'contain'
}

export interface CaseStudy {
  slug: string
  /** Small line above the title (company, product, year). */
  eyebrow?: string
  title: string
  /** One-line summary under the title. */
  dek?: string
  /** Short facts shown as one line, joined with a dot. */
  meta: string[]
  heroMedia?: CaseStudyMedia
  /** Skills and themes shown under the hero media. */
  tags?: string[]
  /** The written sections. Empty means the full write-up isn't ready yet, so the page shows a "coming soon" note. */
  sections: CaseStudySection[]
}
