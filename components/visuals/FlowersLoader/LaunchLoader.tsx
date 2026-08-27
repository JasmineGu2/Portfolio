'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { FlowersLoader } from './FlowersLoader'

/**
 * Shows the launch animation only when the visitor's session *starts* on the landing page.
 *
 * This gate lives in the root layout, which survives client-side navigation, so the ref
 * captures the route the app booted on and never updates. Loading `/architecture` directly,
 * or clicking through to `/` from another route, both skip the loader, it only plays on a
 * genuine launch of the landing page.
 */
export function LaunchLoader() {
  const pathname = usePathname()
  const launchPathRef = useRef(pathname)

  if (launchPathRef.current !== '/') return null

  return <FlowersLoader />
}
