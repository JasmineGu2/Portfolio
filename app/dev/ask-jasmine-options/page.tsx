import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AskJasmineOptionsPageClient } from '@/components/portfolio/ask-jasmine-options/AskJasmineOptionsPageClient'
import './ask-jasmine-options.css'

export const metadata: Metadata = {
  title: 'Ask Jasmine interaction options, Jasmine Gu',
  description: 'Three interactive redesign directions for the Ask Jasmine chat panel.',
}

export default function AskJasmineOptionsPage() {
  return (
    <Suspense>
      <AskJasmineOptionsPageClient />
    </Suspense>
  )
}
