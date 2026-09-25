'use client'

import { Mail, Linkedin, Github } from 'lucide-react'
import { useSound } from '@/components/portfolio/SoundProvider'

interface SocialLink {
  href: string
  label: string
  iconType: 'mail' | 'linkedin' | 'github'
}

const ICON_MAP = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
}

export function SocialLinks({ links }: { links: SocialLink[] }) {
  const { play } = useSound()

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {links.map(({ href, label, iconType }) => {
        const Icon = ICON_MAP[iconType]
        return (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="pf-btn pf-btn--icon"
            onClick={() => play('select')}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        )
      })}
    </div>
  )
}
