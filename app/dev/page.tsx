import Link from 'next/link'

const DEV_PAGES = [
  { label: 'Hero text options', href: '/dev/hero-text-options' },
  { label: 'Hero options', href: '/dev/hero-options' },
  { label: 'Hero layout options', href: '/dev/hero-layout-options' },
  { label: 'Hero subheading options', href: '/dev/hero-subheading-options' },
  { label: 'Work typography options', href: '/dev/work-typography-options' },
  { label: 'Tag options', href: '/dev/tag-options' },
  { label: 'Card options', href: '/dev/card-options' },
  { label: 'Header options', href: '/dev/header-options' },
  { label: 'Workflow node options', href: '/dev/workflow-node-options' },
  { label: 'Gallery options', href: '/dev/gallery-options' },
  { label: 'Gallery format options', href: '/dev/gallery-format-options' },
  { label: 'Gallery text options', href: '/dev/gallery-text-options' },
  { label: 'Storytelling options', href: '/dev/storytelling-options' },
  { label: 'Tesla style options', href: '/dev/tesla-style-options' },
  { label: 'Bento workflows', href: '/dev/bento-workflows' },
  { label: 'Palette duo editor', href: '/dev/palette-duo-editor' },
] as const

export default function DevIndexPage() {
  return (
    <main
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        maxWidth: '42rem',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        color: '#1a1a1a',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Dev tools</h1>
      <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
        Internal design exploration — not linked from production nav.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {DEV_PAGES.map((page) => (
          <li key={page.href} style={{ marginBottom: '0.5rem' }}>
            <Link
              href={page.href}
              style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '2rem', fontSize: '0.8125rem', color: '#888' }}>
        <Link href="/" style={{ color: '#666' }}>
          ← Back to site
        </Link>
      </p>
    </main>
  )
}
