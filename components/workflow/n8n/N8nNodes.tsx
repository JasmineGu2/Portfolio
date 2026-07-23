'use client'

import type { StoryStep } from '@/lib/workflow/story-narrative'

export const N8N_NODE_SIZE = { w: 96, h: 96 } as const
export const N8N_CONFIG_SIZE = { w: 80, h: 80 } as const
export const N8N_STICKY_SIZE = { w: 132, h: 44 } as const

type HandleSide = 'left' | 'right' | 'top' | 'bottom'

export function N8nHandle({ side }: { side: HandleSide }) {
  return (
    <span className={`n8n-handle n8n-handle--${side}`} aria-hidden>
      <span className="n8n-handle-dot" />
    </span>
  )
}

function N8nNodeIcon({ step }: { step: StoryStep }) {
  if (step.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={step.logo} alt="" className="n8n-node-icon" />
    )
  }
  return (
    <span className="n8n-node-icon--fallback">
      {step.id === 'laurelspace' ? '?' : step.company.slice(0, 1)}
    </span>
  )
}

export function N8nDefaultNode({
  step,
  active,
  isTrigger,
  isRunning,
  showHandles = ['left', 'right', 'top', 'bottom'],
  onClick,
}: {
  step: StoryStep
  active?: boolean
  isTrigger?: boolean
  isRunning?: boolean
  showHandles?: HandleSide[]
  onClick?: () => void
}) {
  const role = step.flowRole ?? step.role
  const subtitle = step.flowSubtitle ?? step.company

  return (
    <div className="n8n-node-shell">
      <button
        type="button"
        onClick={onClick}
        className={[
          'n8n-node',
          isTrigger ? 'n8n-node--trigger' : '',
          active ? 'n8n-node--selected' : '',
          isRunning ? 'n8n-node--running' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={`${step.company}: ${role}`}
      >
        {showHandles.includes('left') && <N8nHandle side="left" />}
        {showHandles.includes('right') && <N8nHandle side="right" />}
        {showHandles.includes('top') && <N8nHandle side="top" />}
        {showHandles.includes('bottom') && <N8nHandle side="bottom" />}
        <N8nNodeIcon step={step} />
      </button>
      <div className="n8n-node-description">
        <p className="n8n-node-label">{role}</p>
        <p className="n8n-node-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export function N8nConfigurationNode({
  label,
  active,
  onClick,
}: {
  label?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <div className="n8n-node-shell">
      <button
        type="button"
        onClick={onClick}
        className={[
          'n8n-node n8n-node--configuration',
          active ? 'n8n-node--selected' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={label ?? 'Route'}
      >
        <N8nHandle side="left" />
        <N8nHandle side="top" />
        <N8nHandle side="bottom" />
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[var(--color--neutral-400)] pointer-events-none"
          aria-hidden
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
        </svg>
      </button>
      {label && (
        <div className="n8n-node-description">
          <p className="n8n-node-label" style={{ fontSize: 'var(--font-size--xs)' }}>
            {label}
          </p>
        </div>
      )}
    </div>
  )
}

export function N8nStickyNode({
  label,
  active,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'n8n-sticky-node',
        active ? 'n8n-sticky-node--selected' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ minHeight: N8N_STICKY_SIZE.h, width: N8N_STICKY_SIZE.w }}
      aria-label={label}
    >
      <N8nHandle side="top" />
      <p className="n8n-sticky-text">{label}</p>
    </button>
  )
}
