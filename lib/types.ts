/**
 * TypeScript types for all components
 */

export interface Experience {
  year: string
  company: string
  role: string
}

export interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  experiences?: Experience[]
  image?: {
    src: string
    alt: string
  }
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
  image?: {
    src: string
    alt: string
  }
  color?: string
}

export interface ExperienceFlipbookProps {
  experiences: ExperienceItem[]
}

export interface CareerHighlight {
  id: string
  title: string
  description: string
  icon?: string
  link?: string
  tags?: string[]
}

export interface CareerHighlightsProps {
  highlights: CareerHighlight[]
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  image?: {
    src: string
    alt: string
  }
  link?: string
  featured?: boolean
}

export interface ProjectGridProps {
  projects: Project[]
  title?: string
  description?: string
}

export interface CaseStudy {
  id: string
  title: string
  company?: string
  category?: string
  description: string
  challenge: string
  solution: string
  results: string[]
  image?: {
    src: string
    alt: string
  }
  link?: string
  tags: string[]
}

export interface CaseStudiesProps {
  caseStudies: CaseStudy[]
  title?: string
}

export interface TechnicalProject {
  id: string
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: {
    src: string
    alt: string
  }
}

export interface TechnicalProjectsProps {
  projects: TechnicalProject[]
  title?: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterProps {
  email: string
  socialLinks?: FooterLink[]
  copyright?: string
}


