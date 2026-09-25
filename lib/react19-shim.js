/**
 * Astryx (the Outline component) is written for React 19 and calls `use(context)`. This site is on
 * React 18, which has no `use`. next.config.js points only the Astryx packages' `react` imports at this
 * file: everything React 18 already exports passes straight through, and `use` is added for the one case
 * Astryx needs (reading a context). Promises are not supported, and nothing in Outline uses them.
 */
import * as React from 'react'

export * from 'react'
export default React

export function use(usable) {
  if (usable && typeof usable.then === 'function') {
    throw new Error('use(promise) is not supported by the React 18 shim')
  }
  return React.useContext(usable)
}
