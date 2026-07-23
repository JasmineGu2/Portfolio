'use client'

import { BIO_LINKS, BIO_NAV, BIO_PARAGRAPHS } from '@/lib/workflow/bio-copy'

function renderParagraph(text: string, linkKeys?: string[]) {
  if (!linkKeys?.length) return text

  const parts: React.ReactNode[] = []
  const regex = /\{(\w+)\}/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const link = BIO_LINKS[match[1]]
    if (link) {
      parts.push(
        <a
          key={key++}
          href={link.href}
          className="underline decoration-n8n-border hover:decoration-n8n-accent text-n8n-text transition-colors"
        >
          {link.label}
        </a>
      )
    } else {
      parts.push(match[0])
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

export function HeroWriteup() {
  return (
    <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 mb-16 md:mb-20">
      <div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl italic font-normal text-n8n-text leading-[1.05] mb-8">
          Jasmine Gu
        </h1>

        <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-n8n-muted max-w-xl">
          {BIO_PARAGRAPHS.map((para, i) => (
            <p key={i}>{renderParagraph(para.text, para.linkKeys)}</p>
          ))}
        </div>
      </div>

      <nav className="flex md:flex-col gap-4 md:gap-2 md:text-right shrink-0 text-[15px]">
        <div className="flex md:flex-col gap-4 md:gap-2">
          {BIO_NAV.primary.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-n8n-text hover:text-n8n-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block h-px bg-n8n-border my-2" />
        <div className="flex md:flex-col gap-4 md:gap-2 text-n8n-dim">
          {BIO_NAV.secondary.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="hover:text-n8n-text transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
