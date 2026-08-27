'use client'

import { CapabilityLayerStack } from '@/components/portfolio/CapabilityLayerStack'

const OPTIONS = [
  { id: 'a', label: 'A, Current', className: 'stack-palette-a' },
  { id: 'b', label: 'B, Claude orange ramp', className: 'stack-palette-b' },
  { id: 'c', label: 'C, Earthy editorial', className: 'stack-palette-c' },
  { id: 'd', label: 'D, Cool contrast, orange pop', className: 'stack-palette-d' },
] as const

export default function StackColorsPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <style>{`
        .stack-palette-b {
          --cap-layer-product-top: color-mix(in srgb, var(--pf-accent) 30%, white 65%);
          --cap-layer-product-left: color-mix(in srgb, var(--pf-accent) 45%, white 45%);
          --cap-layer-product-right: color-mix(in srgb, var(--pf-accent) 55%, white 30%);
          --cap-layer-engineering-top: color-mix(in srgb, var(--pf-accent) 55%, white 25%);
          --cap-layer-engineering-left: color-mix(in srgb, var(--pf-accent) 70%, var(--pf-ink) 5%);
          --cap-layer-engineering-right: color-mix(in srgb, var(--pf-accent) 60%, var(--pf-ink) 15%);
          --cap-layer-business-top: var(--pf-accent);
          --cap-layer-business-left: color-mix(in srgb, var(--pf-accent) 85%, var(--pf-ink) 10%);
          --cap-layer-business-right: color-mix(in srgb, var(--pf-accent) 65%, var(--pf-ink) 25%);
          --cap-layer-community-top: color-mix(in srgb, var(--pf-accent) 60%, var(--pf-ink) 25%);
          --cap-layer-community-left: color-mix(in srgb, var(--pf-accent) 45%, var(--pf-ink) 40%);
          --cap-layer-community-right: color-mix(in srgb, var(--pf-accent) 30%, var(--pf-ink) 55%);
        }
        .stack-palette-c {
          --cap-layer-product-top: color-mix(in srgb, #a8ab8f 75%, white);
          --cap-layer-product-left: color-mix(in srgb, #7d8266 78%, var(--pf-ink) 8%);
          --cap-layer-product-right: color-mix(in srgb, #63684f 70%, var(--pf-ink) 16%);
          --cap-layer-engineering-top: color-mix(in srgb, #c7b299 75%, white);
          --cap-layer-engineering-left: color-mix(in srgb, #a3896b 75%, var(--pf-ink) 8%);
          --cap-layer-engineering-right: color-mix(in srgb, #8a7057 65%, var(--pf-ink) 18%);
          --cap-layer-business-top: color-mix(in srgb, var(--pf-accent) 55%, #c7b299 30%);
          --cap-layer-business-left: color-mix(in srgb, var(--pf-accent) 72%, var(--pf-ink) 8%);
          --cap-layer-business-right: color-mix(in srgb, var(--pf-accent) 55%, var(--pf-ink) 24%);
          --cap-layer-community-top: color-mix(in srgb, var(--pf-ink) 25%, #c7b299 45%);
          --cap-layer-community-left: color-mix(in srgb, var(--pf-ink) 45%, #8a7057 30%);
          --cap-layer-community-right: color-mix(in srgb, var(--pf-ink) 62%, #63684f 20%);
        }
        .stack-palette-d {
          --cap-layer-product-top: color-mix(in srgb, #0f3d3e 20%, white 75%);
          --cap-layer-product-left: color-mix(in srgb, #0f3d3e 65%, var(--pf-ink) 10%);
          --cap-layer-product-right: color-mix(in srgb, #0f3d3e 80%, var(--pf-ink) 15%);
          --cap-layer-engineering-top: color-mix(in srgb, #1e3a5f 22%, white 74%);
          --cap-layer-engineering-left: color-mix(in srgb, #1e3a5f 68%, var(--pf-ink) 8%);
          --cap-layer-engineering-right: color-mix(in srgb, #1e3a5f 82%, var(--pf-ink) 14%);
          --cap-layer-business-top: color-mix(in srgb, var(--pf-accent) 50%, white 40%);
          --cap-layer-business-left: color-mix(in srgb, var(--pf-accent) 70%, var(--pf-ink) 8%);
          --cap-layer-business-right: color-mix(in srgb, var(--pf-accent) 55%, var(--pf-ink) 22%);
          --cap-layer-community-top: color-mix(in srgb, #4a2f52 24%, white 72%);
          --cap-layer-community-left: color-mix(in srgb, #4a2f52 65%, var(--pf-ink) 10%);
          --cap-layer-community-right: color-mix(in srgb, #4a2f52 80%, var(--pf-ink) 16%);
        }
        .stack-option-card {
          background: var(--pf-surface);
          border: 1px solid var(--pf-card-border);
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .stack-option-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--pf-accent);
          margin-bottom: 1rem;
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '64rem',
          margin: '0 auto',
        }}
      >
        {OPTIONS.map((option) => (
          <div key={option.id} className={`stack-option-card ${option.className}`}>
            <div className="stack-option-label">{option.label}</div>
            <CapabilityLayerStack size="large" />
          </div>
        ))}
      </div>
    </div>
  )
}
