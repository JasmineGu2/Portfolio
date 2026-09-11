'use client'

import type { AskJasmineVariantId } from '@/lib/portfolio/ask-jasmine-options-data'
import { ThreadRevealVariant } from './variants/ThreadRevealVariant'
import { TerminalVariant } from './variants/TerminalVariant'
import { AccordionVariant } from './variants/AccordionVariant'

export function AskJasminePreview({ variantId }: { variantId: AskJasmineVariantId }) {
  switch (variantId) {
    case 'terminal':
      return <TerminalVariant />
    case 'accordion':
      return <AccordionVariant />
    case 'thread-reveal':
    default:
      return <ThreadRevealVariant />
  }
}
