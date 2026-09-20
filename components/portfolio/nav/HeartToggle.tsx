'use client'

import { useId, useState } from 'react'
import './heart-toggle.css'

/** Like button for the top-left of the nav. State is local: it resets on a full reload, and isn't stored anywhere. */
export function HeartToggle() {
  const id = useId()
  const [touched, setTouched] = useState(false)

  return (
    <span className="heart-toggle">
      <input
        id={id}
        type="checkbox"
        className="heart-toggle__input"
        aria-label="Like this site"
        onChange={() => setTouched(true)}
      />
      <label htmlFor={id} className={touched ? 'heart-toggle__heart is-touched' : 'heart-toggle__heart'}>
        <span className="heart-toggle__round" aria-hidden />
        <span className="heart-toggle__bottom" aria-hidden />
      </label>
    </span>
  )
}
