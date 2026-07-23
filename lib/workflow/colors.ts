// ============================================================================
// WORKFLOW COLOR TOKENS — Semantic color mapping for agents and nodes
// ============================================================================

import type { AgentColor, AgentType } from './types'

export const WORKFLOW_COLORS: Record<
  AgentColor,
  { bg: string; border: string; accent: string; text: string; light: string }
> = {
  coral: {
    bg: '#F7F5F1',
    border: '#EC896F',
    accent: '#EC896F',
    text: '#253247',
    light: 'rgba(236, 137, 111, 0.12)',
  },
  peach: {
    bg: '#F7F5F1',
    border: '#FFA27C',
    accent: '#FFA27C',
    text: '#253247',
    light: 'rgba(255, 162, 124, 0.12)',
  },
  sand: {
    bg: '#F7F5F1',
    border: '#E3B78F',
    accent: '#E3B78F',
    text: '#253247',
    light: 'rgba(227, 183, 143, 0.12)',
  },
  blue: {
    bg: '#F7F5F1',
    border: '#4D90D8',
    accent: '#4D90D8',
    text: '#253247',
    light: 'rgba(77, 144, 216, 0.12)',
  },
  powder: {
    bg: '#F7F5F1',
    border: '#C7E3F1',
    accent: '#4D90D8',
    text: '#253247',
    light: 'rgba(199, 227, 241, 0.35)',
  },
}

export const AGENT_COLOR_MAP: Record<AgentType, AgentColor> = {
  context: 'coral',
  user: 'peach',
  product: 'peach',
  engineering: 'blue',
  operations: 'sand',
  experience: 'peach',
  intelligence: 'powder',
  reliability: 'blue',
  delivery: 'sand',
}

export const AGENT_LABELS: Record<AgentType, string> = {
  context: 'Context Agent',
  user: 'User Agent',
  product: 'Product Agent',
  engineering: 'Engineering Agent',
  operations: 'Operations Agent',
  experience: 'Experience Agent',
  intelligence: 'Intelligence Agent',
  reliability: 'Reliability Agent',
  delivery: 'Delivery Agent',
}

export const EXECUTION_MESSAGES: Record<string, string> = {
  trigger: 'Receiving problem…',
  context: 'Processing context…',
  user: 'Mapping workflow…',
  product: 'Validating requirements…',
  engineering: 'Building system…',
  operations: 'Aligning stakeholders…',
  switch: 'Routing specialization…',
  experience: 'Refining experience…',
  intelligence: 'Transforming data…',
  reliability: 'Checking reliability…',
  delivery: 'Aligning delivery…',
  merge: 'Merging perspectives…',
  orchestrator: 'Orchestrating system…',
  output: 'Output ready',
}
