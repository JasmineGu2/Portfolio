'use client'

import { useCallback, useId, useState, type KeyboardEvent } from 'react'
import {
  CAPABILITY_LAYERS,
  CAPABILITY_LAYER_A11Y_SUMMARY,
  type CapabilityLayerId,
} from '@/lib/portfolio/capability-layers-data'

type SlabGeometry = {
  width: number
  depthX: number
  depthY: number
  thickness: number
  rowStep: number
  pull: number
}

const SLAB_GEOMETRY = {
  default: {
    width: 72,
    depthX: 16,
    depthY: 9,
    thickness: 9,
    rowStep: 16,
    pull: 12,
  },
  large: {
    width: 140,
    depthX: 30,
    depthY: 17,
    thickness: 18,
    rowStep: 40,
    pull: 24,
  },
} as const satisfies Record<'default' | 'large', SlabGeometry>

const LAYER_PALETTE: Record<
  CapabilityLayerId,
  { top: string; left: string; right: string }
> = {
  product: {
    top: 'var(--cap-layer-product-top)',
    left: 'var(--cap-layer-product-left)',
    right: 'var(--cap-layer-product-right)',
  },
  'software-engineering': {
    top: 'var(--cap-layer-engineering-top)',
    left: 'var(--cap-layer-engineering-left)',
    right: 'var(--cap-layer-engineering-right)',
  },
  business: {
    top: 'var(--cap-layer-business-top)',
    left: 'var(--cap-layer-business-left)',
    right: 'var(--cap-layer-business-right)',
  },
  community: {
    top: 'var(--cap-layer-community-top)',
    left: 'var(--cap-layer-community-left)',
    right: 'var(--cap-layer-community-right)',
  },
}

function IsometricSlab({
  colors,
  active,
  dimmed,
  geometry,
}: {
  colors: (typeof LAYER_PALETTE)[CapabilityLayerId]
  active: boolean
  dimmed: boolean
  geometry: SlabGeometry
}) {
  const { width: w, depthX: dx, depthY: dy, thickness: h } = geometry

  return (
    <g className={dimmed ? 'capability-layer-stack__slab--dimmed' : undefined}>
      <path
        d={`M 0 0 L ${w} 0 L ${w + dx} ${dy} L ${dx} ${dy} Z`}
        fill={colors.top}
        className="capability-layer-stack__slab-top"
      />
      <path
        d={`M ${w} 0 L ${w + dx} ${dy} L ${w + dx} ${dy + h} L ${w} ${h} Z`}
        fill={colors.right}
        className="capability-layer-stack__slab-right"
      />
      <path
        d={`M 0 0 L ${dx} ${dy} L ${dx} ${dy + h} L 0 ${h} Z`}
        fill={colors.left}
        className="capability-layer-stack__slab-left"
      />
      {active && (
        <path
          d={`M 0 0 L ${w} 0 L ${w + dx} ${dy} L ${dx} ${dy} Z`}
          fill="none"
          stroke="var(--cap-layer-active-stroke)"
          strokeWidth="1.5"
          className="capability-layer-stack__slab-active-ring"
        />
      )}
    </g>
  )
}

export function CapabilityLayerStack({ size = 'default' }: { size?: 'default' | 'large' }) {
  const geometry = SLAB_GEOMETRY[size]
  const groupId = useId()
  const [activeId, setActiveId] = useState<CapabilityLayerId | null>(null)
  const [focusedId, setFocusedId] = useState<CapabilityLayerId | null>(null)

  const highlightedId = activeId ?? focusedId

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        const next = CAPABILITY_LAYERS[(index + 1) % CAPABILITY_LAYERS.length]
        setFocusedId(next.id)
        document.getElementById(`${groupId}-${next.id}`)?.focus()
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const prev =
          CAPABILITY_LAYERS[(index - 1 + CAPABILITY_LAYERS.length) % CAPABILITY_LAYERS.length]
        setFocusedId(prev.id)
        document.getElementById(`${groupId}-${prev.id}`)?.focus()
      } else if (event.key === 'Escape') {
        setActiveId(null)
        setFocusedId(null)
        ;(event.target as HTMLButtonElement).blur()
      }
    },
    [groupId]
  )

  const stackHeight =
    geometry.rowStep * (CAPABILITY_LAYERS.length - 1) +
    geometry.depthY +
    geometry.thickness +
    4

  return (
    <div
      className={size === 'large' ? 'capability-layer-stack capability-layer-stack--large' : 'capability-layer-stack'}
      role="group"
      aria-label="Core strengths by layer"
      onMouseLeave={() => setActiveId(null)}
    >
      <div className="capability-layer-stack__graphic" aria-hidden="true">
        <svg
          viewBox={`0 0 ${geometry.width + geometry.depthX + 20} ${stackHeight}`}
          width={geometry.width + geometry.depthX + 20}
          height={stackHeight}
          className="capability-layer-stack__svg"
        >
          {CAPABILITY_LAYERS.map((layer, index) => {
            const isActive = highlightedId === layer.id
            const isDimmed = highlightedId !== null && !isActive
            const pull = isActive ? geometry.pull : 0

            return (
              <g
                key={layer.id}
                className="capability-layer-stack__slab-group"
                transform={`translate(${pull}, ${index * geometry.rowStep})`}
                data-active={isActive ? 'true' : undefined}
                onMouseEnter={() => setActiveId(layer.id)}
              >
                <IsometricSlab
                  colors={LAYER_PALETTE[layer.id]}
                  active={isActive}
                  dimmed={isDimmed}
                  geometry={geometry}
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="capability-layer-stack__legend">
        {CAPABILITY_LAYERS.map((layer, index) => {
          const isActive = highlightedId === layer.id

          return (
            <div
              key={layer.id}
              className="capability-layer-stack__legend-row"
              data-active={isActive ? 'true' : undefined}
              style={{ minHeight: `${geometry.rowStep}px` }}
            >
              <button
                type="button"
                id={`${groupId}-${layer.id}`}
                className="capability-layer-stack__layer-btn font-analogue"
                aria-expanded={isActive}
                aria-controls={`${groupId}-${layer.id}-caps`}
                onMouseEnter={() => setActiveId(layer.id)}
                onFocus={() => setFocusedId(layer.id)}
                onBlur={() => setFocusedId((current) => (current === layer.id ? null : current))}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="capability-layer-stack__connector" aria-hidden="true" />
                <span className="capability-layer-stack__label">{layer.label}</span>
              </button>

              <ul
                id={`${groupId}-${layer.id}-caps`}
                className="capability-layer-stack__capabilities"
                hidden={!isActive}
              >
                {layer.capabilities.map((cap) => (
                  <li key={cap}>
                    <span className="capability-layer-stack__cap-chip font-analogue">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <ul className="sr-only">
        {CAPABILITY_LAYER_A11Y_SUMMARY.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
