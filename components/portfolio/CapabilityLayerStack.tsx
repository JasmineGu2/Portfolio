'use client'

import { useCallback, useId, useState, type CSSProperties, type KeyboardEvent } from 'react'
import {
  CAPABILITY_LAYERS,
  CAPABILITY_LAYER_A11Y_SUMMARY,
  type CapabilityLayerId,
} from '@/lib/portfolio/capability-layers-data'

type SlabGeometry = {
  width: number
  depthX: number
  depthY: number
  rowStep: number
  pull: number
}

const SLAB_GEOMETRY = {
  default: {
    width: 72,
    depthX: 16,
    depthY: 9,
    rowStep: 18,
    pull: 10,
  },
  large: {
    width: 140,
    depthX: 30,
    depthY: 17,
    rowStep: 34,
    pull: 20,
  },
} as const satisfies Record<'default' | 'large', SlabGeometry>

const toDeg = (radians: number) => `${((radians * 180) / Math.PI).toFixed(2)}deg`

/**
 * Slab faces are skewed boxes rather than svg paths so the side faces can stretch to
 * whatever height their row ends up at. An open layer's block simply gets thicker,
 * which keeps the ladder contiguous — no gap opens up where a layer should be.
 */
function slabVars(geometry: SlabGeometry): CSSProperties {
  const { width, depthX, depthY, rowStep, pull } = geometry

  return {
    '--cap-slab-w': `${width}px`,
    '--cap-slab-dx': `${depthX}px`,
    '--cap-slab-dy': `${depthY}px`,
    '--cap-slab-step': `${rowStep}px`,
    '--cap-slab-pull': `${pull}px`,
    '--cap-slab-skew-x': toDeg(Math.atan(depthX / depthY)),
    '--cap-slab-skew-y': toDeg(Math.atan(depthY / depthX)),
  } as CSSProperties
}

const DEFAULT_LAYER_ID = CAPABILITY_LAYERS[0].id

export function CapabilityLayerStack({ size = 'default' }: { size?: 'default' | 'large' }) {
  const geometry = SLAB_GEOMETRY[size]
  const groupId = useId()
  /**
   * One layer is always open, and it only changes on a real pointer move, a focus, or a
   * tap — never on a bare mouseenter. Opening a row resizes it, and a mouseenter fired
   * by that reflow (cursor stationary, content sliding under it) would hand the open
   * state to whichever row slid into place and oscillate.
   */
  const [openId, setOpenId] = useState<CapabilityLayerId>(DEFAULT_LAYER_ID)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        const next = CAPABILITY_LAYERS[(index + 1) % CAPABILITY_LAYERS.length]
        setOpenId(next.id)
        document.getElementById(`${groupId}-${next.id}`)?.focus()
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const prev =
          CAPABILITY_LAYERS[(index - 1 + CAPABILITY_LAYERS.length) % CAPABILITY_LAYERS.length]
        setOpenId(prev.id)
        document.getElementById(`${groupId}-${prev.id}`)?.focus()
      } else if (event.key === 'Escape') {
        ;(event.target as HTMLButtonElement).blur()
      }
    },
    [groupId]
  )

  return (
    <div
      className={
        size === 'large'
          ? 'capability-layer-stack capability-layer-stack--large'
          : 'capability-layer-stack'
      }
      role="group"
      aria-label="Core strengths by layer"
      style={slabVars(geometry)}
    >
      {CAPABILITY_LAYERS.map((layer, index) => {
        const isOpen = openId === layer.id
        const detailId = `${groupId}-${layer.id}-detail`

        return (
          <div
            key={layer.id}
            className="capability-layer-stack__row"
            data-open={isOpen ? 'true' : undefined}
          >
            <div
              className="capability-layer-stack__slab"
              data-layer={layer.id}
              aria-hidden="true"
              onPointerMove={() => setOpenId(layer.id)}
              onClick={() => setOpenId(layer.id)}
            >
              <span className="capability-layer-stack__face capability-layer-stack__face--top" />
              <span className="capability-layer-stack__face capability-layer-stack__face--front" />
              <span className="capability-layer-stack__face capability-layer-stack__face--left" />
              <span className="capability-layer-stack__face capability-layer-stack__face--right" />
            </div>

            <div className="capability-layer-stack__body">
              <button
                type="button"
                id={`${groupId}-${layer.id}`}
                className="capability-layer-stack__layer-btn font-analogue"
                aria-expanded={isOpen}
                aria-controls={detailId}
                onPointerMove={() => setOpenId(layer.id)}
                onClick={() => setOpenId(layer.id)}
                onFocus={() => setOpenId(layer.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="capability-layer-stack__connector" aria-hidden="true" />
                <span className="capability-layer-stack__label" title={layer.label}>
                  {layer.label}
                </span>
              </button>

              {/* Opens in place, directly under its own title. One line per role. */}
              <div
                id={detailId}
                className="capability-layer-stack__detail"
                aria-hidden={!isOpen}
              >
                <ul className="capability-layer-stack__roles font-analogue">
                  {layer.experiences.map((experience) => (
                    <li
                      key={`${experience.org}-${experience.role}`}
                      className="capability-layer-stack__role"
                    >
                      <span className="capability-layer-stack__role-title">
                        {experience.role}
                      </span>
                      <span className="capability-layer-stack__role-sep" aria-hidden="true">
                        ·
                      </span>
                      <span className="capability-layer-stack__role-org">{experience.org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}

      <ul className="sr-only">
        {CAPABILITY_LAYER_A11Y_SUMMARY.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
