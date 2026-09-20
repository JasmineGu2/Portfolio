import Link from 'next/link'
import { MaterialWebLoader } from '@/components/portfolio/proto/MaterialWebLoader'

export const metadata = {
  title: 'Proto — Material Web design system preview',
  description: 'What the portfolio frontend could look like rebuilt on Material Web.',
}

const LINKS = [
  {
    href: '/proto/mine',
    title: 'Homepage — your colors',
    body: 'Nav, hero, capability cards, footer rebuilt with real Material Web components, styled with your existing --pf-* palette and fonts.',
  },
  {
    href: '/proto/theirs',
    title: 'Homepage — GSAP style',
    body: 'The exact same structure and components as above, restyled with the GSAP styles.md palette (cream-on-black) and Inter Tight.',
  },
  {
    href: '/proto/mine/components',
    title: 'Real components, before / after',
    body: 'Your actual Button variants and Autodesk case-study cards, rendered next to their Material Web equivalents.',
  },
  {
    href: '/proto/all',
    title: 'Full component catalog',
    body: 'Every @material/web component on one page — buttons, chips, selection controls, text fields, tabs, cards, dialog — with a live theme picker.',
  },
  {
    href: '/proto/interior',
    title: 'Using interior.dev',
    body: 'A different animation approach — shadcn-style copy-in React components (Copy Button, Text Reveal, Loading Button, Sticky Header) wired to your real content, not Material.',
  },
]

export default function ProtoIndexPage() {
  return (
    <>
      <MaterialWebLoader />
      <div
        style={{
          minHeight: '100vh',
          maxWidth: 720,
          margin: '0 auto',
          padding: '64px 24px',
          fontFamily: 'Roboto, system-ui, sans-serif',
        }}
      >
        <h1 className="md-typescale-headline-large" style={{ margin: '0 0 12px' }}>
          Material Web design system preview
        </h1>
        <p className="md-typescale-body-large" style={{ margin: '0 0 40px' }}>
          A prototype of what this portfolio could look like rebuilt on Google&apos;s Material
          Web component library instead of the current ad-hoc, per-page CSS. Nothing here
          touches the live site.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <md-outlined-card style={{ display: 'block' }}>
                <div style={{ padding: 20 }}>
                  <p className="md-typescale-title-medium" style={{ margin: '0 0 6px' }}>
                    {link.title}
                  </p>
                  <p className="md-typescale-body-medium" style={{ margin: 0, color: '#666' }}>
                    {link.body}
                  </p>
                </div>
              </md-outlined-card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
