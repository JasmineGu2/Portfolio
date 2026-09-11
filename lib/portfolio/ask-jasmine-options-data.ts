export type AskJasmineVariantId = 'thread-reveal' | 'terminal' | 'accordion'

export interface AskJasmineVariant {
  id: AskJasmineVariantId
  name: string
  description: string
  bestFor: string
}

export const ASK_JASMINE_VARIANTS: AskJasmineVariant[] = [
  {
    id: 'thread-reveal',
    name: 'Thread reveal',
    description:
      'Opens with just the four category chips. Picking one drops its questions into the conversation as a new turn, so the thread grows the way a chat does instead of showing everything at once.',
    bestFor: 'Closest to the current card-and-chip look, smallest visual departure.',
  },
  {
    id: 'terminal',
    name: 'Terminal log',
    description:
      'Monospace, command-log styling: categories read like slash-commands, questions are a numbered menu, and answers print as indented output blocks with collapsed reference lines.',
    bestFor: 'The most literal "looks like a coding assistant" direction.',
  },
  {
    id: 'accordion',
    name: 'Accordion rail',
    description:
      'A persistent row of four category chips stays docked at the top. Clicking one expands its questions inline underneath, collapsing whichever category was open before.',
    bestFor: 'Least disruptive to the existing sidebar layout and rhythm.',
  },
]
