'use client'

import Link from 'next/link'
import { CopyButton } from '@/components/interior/copy-button'
import { TextReveal } from '@/components/interior/text-reveal'
import { LoadingButton } from '@/components/interior/loading-button'
import { StickyHeader } from '@/components/interior/sticky-header'
import { HERO_TAGLINE } from '@/lib/portfolio/site-copy'
import { CAPABILITY_MODULES } from '@/lib/portfolio/capabilities'
import { SITE_CONTACT } from '@/lib/portfolio/mindmap-data'

function DemoSection({
  title,
  install,
  usedFor,
  children,
}: {
  title: string
  install: string
  usedFor: string
  children: React.ReactNode
}) {
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px', borderTop: '1px solid #e7e5e4' }}>
      <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 600 }}>{title}</h2>
      <p style={{ margin: '0 0 4px', fontSize: 14, color: '#78716c' }}>{usedFor}</p>
      <code style={{ display: 'inline-block', margin: '4px 0 24px', fontSize: 12, color: '#a8a29e', background: '#fafaf9', padding: '4px 8px', borderRadius: 6 }}>
        pnpm dlx shadcn@latest add {install}
      </code>
      <div>{children}</div>
    </section>
  )
}

export default function ProtoInteriorPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#1c1917', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 0' }}>
        <Link href="/proto" style={{ color: 'inherit', fontSize: 14 }}>
          ← Proto
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 600, margin: '16px 0 8px' }}>Using interior.dev</h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#57534e', margin: 0 }}>
          interior.dev is a shadcn-style registry of React micro-interactions — components
          you copy into your project via the shadcn CLI (not a CDN or a runtime dependency),
          built on <code>motion</code> (Framer Motion&apos;s successor). Each ships as one
          self-contained file under <code>components/interior/</code>. Four below, wired to
          your real content instead of placeholder text.
        </p>
      </header>

      <DemoSection
        title="Copy Button"
        install="https://www.interior.dev/r/copy-button.json"
        usedFor="Your real contact email, with clipboard copy + a check-mark morph on success."
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14 }}>{SITE_CONTACT.email}</span>
          <CopyButton value={SITE_CONTACT.email} label="Copy email" copiedLabel="Copied!" />
        </div>
      </DemoSection>

      <DemoSection
        title="Text Reveal"
        install="https://www.interior.dev/r/text-reveal.json"
        usedFor="Your real hero headline, word-by-word on scroll into view. Scroll away and back to replay isn't built in (once=true) — reload to see it again."
      >
        <TextReveal text={HERO_TAGLINE.primary} by="word" className="text-[28px] font-medium leading-snug" />
      </DemoSection>

      <DemoSection
        title="Loading Button"
        install="https://www.interior.dev/r/loading-button.json"
        usedFor="Wraps any async action with idle → pending → success/error states. Simulated here with a 1.2s delay standing in for a real request."
      >
        <LoadingButton
          onAction={() => new Promise((resolve) => setTimeout(resolve, 1200))}
          successLabel="Done"
        >
          View the work
        </LoadingButton>
      </DemoSection>

      <DemoSection
        title="Sticky Header"
        install="https://www.interior.dev/r/sticky-header.json"
        usedFor="Note: this condenses on scroll WITHIN its own internal scrollable panel, not the page — closer to a mobile-app screen than a page-level nav. Scroll the box below."
      >
        <StickyHeader title="Capabilities" subtitle="6 modules" maxHeight={280}>
          <div style={{ padding: '0 16px 16px' }}>
            {CAPABILITY_MODULES.map((cap) => (
              <div key={cap.id} style={{ padding: '14px 0', borderBottom: '1px solid #e7e5e4' }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{cap.title}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#78716c' }}>{cap.description}</p>
              </div>
            ))}
          </div>
        </StickyHeader>
      </DemoSection>

      <footer style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 64px', fontSize: 13, color: '#a8a29e' }}>
        Installed via the shadcn CLI — <code>motion</code> was added to package.json as a real
        dependency (not a CDN), and each component&apos;s source now lives in your repo under{' '}
        <code>components/interior/</code>, editable like any other component.
      </footer>
    </div>
  )
}
