import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { MaterialWebLoader } from '@/components/portfolio/proto/MaterialWebLoader'
import { AUTODESK_AUDIENCES } from '@/lib/portfolio/autodesk-case-study'
import '@/components/portfolio/proto/proto-mine.css'
import '@/components/portfolio/proto/proto-kitchen-sink.css'
import '@/app/autodesk/autodesk-case-study.css'

export const metadata = {
  title: 'Proto — existing components, before/after',
  description: 'Your real Button variants and Autodesk case-study cards next to their Material Web equivalents.',
}

const BUTTON_VARIANTS = [
  { variant: 'default' as const, label: 'default → md-filled-button' },
  { variant: 'secondary' as const, label: 'secondary → md-filled-tonal-button' },
  { variant: 'outline' as const, label: 'outline → md-outlined-button' },
  { variant: 'ghost' as const, label: 'ghost → md-text-button' },
  { variant: 'link' as const, label: 'link → md-text-button (closest match)' },
]

export default function ProtoComponentsPage() {
  return (
    <>
      <MaterialWebLoader />
      <div className="proto-mine kitchen-sink">
        <header className="kitchen-sink__header">
          <Link href="/proto/mine" style={{ color: 'inherit' }}>
            ← Proto / mine
          </Link>
          <h1 className="md-typescale-headline-large" style={{ marginTop: 12 }}>
            Your existing components, before / after
          </h1>
          <p className="md-typescale-body-large">
            The real <code>components/ui/button.tsx</code> variants and the real Autodesk
            case-study cards, next to their Material Web equivalents. Nothing here is wired
            into production — this is still `/proto`.
          </p>
        </header>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Buttons</h2>
          <p className="kitchen-sink__section-hint">
            Left: your actual <code>&lt;Button variant=&quot;...&quot;&gt;</code>. Right: the Material Web equivalent.
          </p>
          <div className="kitchen-sink__grid">
            {BUTTON_VARIANTS.map(({ variant, label }) => (
              <div className="kitchen-sink__swatch" key={variant}>
                <span className="kitchen-sink__swatch-label">{label}</span>
                <div className="kitchen-sink__row">
                  <Button variant={variant}>Current</Button>
                  {variant === 'default' && <md-filled-button>Material</md-filled-button>}
                  {variant === 'secondary' && <md-filled-tonal-button>Material</md-filled-tonal-button>}
                  {variant === 'outline' && <md-outlined-button>Material</md-outlined-button>}
                  {variant === 'ghost' && <md-text-button>Material</md-text-button>}
                  {variant === 'link' && <md-text-button>Material</md-text-button>}
                </div>
              </div>
            ))}
            <div className="kitchen-sink__swatch">
              <span className="kitchen-sink__swatch-label">destructive → md-filled-button (error color override)</span>
              <div className="kitchen-sink__row">
                <Button variant="destructive">Current</Button>
                <md-filled-button
                  style={{
                    '--md-filled-button-container-color': 'var(--md-sys-color-error, #b3261e)',
                    '--md-filled-button-label-text-color': 'var(--md-sys-color-on-error, #fff)',
                  } as CSSProperties}
                >
                  Material
                </md-filled-button>
              </div>
            </div>
          </div>
          <p className="kitchen-sink__section-hint" style={{ marginTop: 20 }}>
            Note: Material buttons don&apos;t have sm/lg/icon size variants the way yours do —
            sizing is done per-instance via CSS custom properties, not a size prop.
          </p>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Case-study cards (Autodesk)</h2>
          <p className="kitchen-sink__section-hint">
            Real content from <code>AUTODESK_AUDIENCES</code>. Left group: your actual
            <code> .adsk-cs__card</code> styling. Right group: <code>md-elevated-card</code>.
          </p>
          <p className="md-typescale-title-medium" style={{ marginTop: 24 }}>Current</p>
          <div className="adsk-cs">
            <div className="adsk-cs__grid adsk-cs__grid--three adsk-cs__wide">
              {AUTODESK_AUDIENCES.map((card) => (
                <div key={card.title} className="adsk-cs__card">
                  <p className="adsk-cs__card-title">{card.title}</p>
                  <p className="adsk-cs__card-detail">{card.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="md-typescale-title-medium" style={{ marginTop: 32 }}>Material</p>
          <div className="kitchen-sink__grid">
            {AUTODESK_AUDIENCES.map((card) => (
              <md-elevated-card key={card.title}>
                <div className="kitchen-sink__card-content">
                  <p className="md-typescale-title-medium" style={{ margin: '0 0 8px' }}>
                    {card.title}
                  </p>
                  <p className="md-typescale-body-medium" style={{ margin: 0 }}>
                    {card.detail}
                  </p>
                </div>
              </md-elevated-card>
            ))}
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Homepage nav + hero, capability cards</h2>
          <p className="kitchen-sink__section-hint">
            Already built — that&apos;s the whole of{' '}
            <Link href="/proto/mine" style={{ color: 'var(--md-sys-color-primary)' }}>
              /proto/mine
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  )
}
