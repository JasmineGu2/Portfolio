'use client'

import { useState } from 'react'

const DEPTH = 50
const SHRINK = 0.2

/** The extrusion: one slice per pixel of depth, each a little smaller than the last, so the sides slope like a keycap. */
const LAYERS = Array.from({ length: DEPTH - 1 }, (_, i) => {
  const z = i + 1
  return { z, scale: 1 - (z / DEPTH) * SHRINK }
})

/**
 * Orange isometric mechanical keycap, labelled "Email Me", that opens an email to me. The 3D comes from the CSS in app/pf-keycap.css
 * (rotateX(60deg) rotateZ(-45deg), stacked translateZ layers, a `scaleZ` press). It is a plain link, so it
 * works without JavaScript; the state below only makes the Enter and Space keys press the key down too.
 */
export function ContactKeycap({ href, label = 'Email Me' }: { href: string; label?: string }) {
  const [down, setDown] = useState(false)

  return (
    <div className="pf-key-scale">
      <div className="pf-key-scene">
        <a
          href={href}
          className="pf-key"
          data-down={down}
          aria-label={`${label} (opens an email)`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setDown(true)
          }}
          onKeyUp={() => setDown(false)}
          onBlur={() => setDown(false)}
        >
          <span className="pf-key__socket" aria-hidden />
          <span className="pf-key__extrusion" aria-hidden>
            {LAYERS.map(({ z, scale }) => (
              <span
                key={z}
                className="pf-key__layer"
                style={{ transform: `translateZ(${z}px) scale(${scale})` }}
              />
            ))}
            <span className="pf-key__top" style={{ transform: `translateZ(${DEPTH}px) scale(${1 - SHRINK})` }}>
              {label}
            </span>
          </span>
        </a>
      </div>
    </div>
  )
}
