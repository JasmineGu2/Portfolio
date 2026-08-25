'use client'

import { Monitor, Rocket, Sparkles } from 'lucide-react'
import type { PillItem, PillTone } from '@/lib/portfolio/pill-data'

const TONE_CLASS: Record<PillTone, string> = {
  mint: 'pf-pill--mint',
  sky: 'pf-pill--sky',
  cream: 'pf-pill--cream',
  lavender: 'pf-pill--lavender',
  peach: 'pf-pill--peach',
}

function PillIcon({ type }: { type: NonNullable<PillItem['icon']> }) {
  const cls = 'w-3.5 h-3.5 shrink-0'
  if (type === 'monitor') return <Monitor className={cls} strokeWidth={2} aria-hidden />
  if (type === 'rocket') return <Rocket className={cls} strokeWidth={2} aria-hidden />
  return <Sparkles className={cls} strokeWidth={2} aria-hidden />
}

export function Pill({
  label,
  tone = 'cream',
  rotate = 0,
  icon,
  size = 'md',
  className = '',
}: {
  label: string
  tone?: PillTone
  rotate?: number
  icon?: PillItem['icon']
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClass =
    size === 'sm' ? 'pf-pill-sm' : size === 'lg' ? 'pf-pill-lg' : 'pf-pill-md'

  return (
    <span
      className={`pf-keycap-tag inline-flex items-center ${TONE_CLASS[tone]} ${sizeClass} ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {icon && (
        <span className="pf-pill-icon">
          <PillIcon type={icon} />
        </span>
      )}
      {label}
    </span>
  )
}

export function PillCluster({ pills }: { pills: PillItem[] }) {
  return (
    <div className="pf-pill-cluster">
      {pills.map((pill) => (
        <span
          key={pill.label}
          className={`pf-keycap-tag pf-pill-md pf-pill-float ${TONE_CLASS[pill.tone]}`}
          style={{
            left: `${pill.x}%`,
            top: `${pill.y}%`,
            zIndex: pill.z,
            transform: `rotate(${pill.rotate}deg)`,
          }}
        >
          {pill.icon && (
            <span className="pf-pill-icon">
              <PillIcon type={pill.icon} />
            </span>
          )}
          {pill.label}
        </span>
      ))}
    </div>
  )
}
