import Link from 'next/link'
import { BENTO_FORMATS, type FormatId } from '@/lib/portfolio/bento-formats-data'

export function BentoFormatShell({
  formatId,
  title,
  description,
  children,
}: {
  formatId: FormatId
  title: string
  description: string
  children: React.ReactNode
}) {
  const index = BENTO_FORMATS.findIndex((f) => f.id === formatId)

  return (
    <div className={`bf-page bf-page--${formatId}`}>
      <div className="bf-page-inner">
        <div className="bf-page-nav">
          <div className="flex flex-wrap items-center gap-3">
            <p className="bento-preview-badge mb-0">Bento format {index + 1} of 4</p>
            <span className="bf-format-tag">{BENTO_FORMATS[index]?.tag}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/bento-formats" className="bento-link-inline">
              All formats
            </Link>
            <Link href="/bento" className="bento-link-inline">
              Current bento →
            </Link>
            <Link href="/" className="bento-link-inline">
              Home
            </Link>
          </div>
        </div>

        <header className="bf-page-header">
          <h1 className="bf-page-title">{title}</h1>
          <p className="bf-page-desc">{description}</p>
        </header>

        {children}

        <nav className="bf-format-switcher" aria-label="Other bento formats">
          {BENTO_FORMATS.filter((f) => f.id !== formatId).map((f) => (
            <Link key={f.id} href={`/bento-formats/${f.id}`} className="bf-switcher-link">
              <span className="bf-switcher-tag">{f.tag}</span>
              <span className="bf-switcher-title">{f.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function BentoFormatHub() {
  return (
    <div className="bf-page bf-page--hub">
      <div className="bf-page-inner">
        <div className="bf-page-nav">
          <p className="bento-preview-badge mb-0">Format explorations</p>
          <Link href="/bento" className="bento-link-inline text-sm">
            Current bento →
          </Link>
        </div>

        <header className="bf-page-header">
          <h1 className="bf-page-title">4 bento layout formats</h1>
          <p className="bf-page-desc">
            Alternate layouts using the same portfolio content. The live preview at{' '}
            <Link href="/bento" className="underline decoration-[var(--pf-border)]">
              /bento
            </Link>{' '}
            is unchanged.
          </p>
        </header>

        <div className="bf-hub-grid">
          {BENTO_FORMATS.map((format, i) => (
            <Link key={format.id} href={`/bento-formats/${format.id}`} className="bf-hub-card">
              <span className="bf-hub-num">0{i + 1}</span>
              <span className="bf-format-tag">{format.tag}</span>
              <h2 className="bf-hub-title">{format.title}</h2>
              <p className="bf-hub-desc">{format.description}</p>
              <span className="bf-hub-cta">View format →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
