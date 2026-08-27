// ============================================================================
// WORKFLOW TYPES, Edit content in workflow-data.ts, not here
// ============================================================================

export type NodeType =
  | 'trigger'
  | 'agent'
  | 'switch'
  | 'merge'
  | 'orchestrator'
  | 'output'

export type AgentType =
  | 'context'
  | 'user'
  | 'product'
  | 'engineering'
  | 'operations'
  | 'experience'
  | 'intelligence'
  | 'reliability'
  | 'delivery'

export type ExecutionState = 'idle' | 'queued' | 'running' | 'complete'

export type AgentColor =
  | 'coral'
  | 'peach'
  | 'sand'
  | 'blue'
  | 'powder'

export interface NodeDetails {
  input: string
  process: string
  output: string
  translation: string
  unlocked: string
  tools: string[]
}

export interface WorkflowNodeData {
  id: string
  type: NodeType
  agentType?: AgentType
  categoryLabel: string
  title: string
  subtitle?: string
  description: string
  body?: string
  input?: string
  output?: string
  inputTags?: string[]
  responsibilities?: string[]
  experienceRefs?: string[]
  color: AgentColor
  icon: string
  details?: NodeDetails
  coreStatement?: string
  supportingStatement?: string
  connectedLabels?: string[]
  secondaryOutputs?: string[]
  targetRoles?: string[]
  finalLine?: string
  buttons?: { label: string; href: string; external?: boolean }[]
}

export interface WorkflowEdge {
  id: string
  from: string
  to: string
  label: string
}

export interface SwitchBranch {
  id: string
  agentType: AgentType
  title: string
  focus: string[]
  experienceRefs: string[]
  output: string
  color: AgentColor
}

export interface ExperienceExecution {
  id: string
  company: string
  problemReceived: string
  agentsActivated: AgentType[]
  workflowBuilt: string
  resultProduced: string
  capabilityUnlocked: string
  role?: string
  area?: string
}

export interface ProjectExecution {
  id: string
  title: string
  input: string
  agents: AgentType[]
  output: string
}

export interface SkillGroup {
  id: string
  agentLabel: string
  color: AgentColor
  skills: string[]
}

export interface AutodeskBranch {
  id: string
  title: string
  role: string
  area: string
  questions: string[]
  color: AgentColor
}

export type WorkflowControlAction = 'run' | 'pause' | 'reset' | 'skip'

export interface ExecutionStatusInfo {
  state: ExecutionState
  message?: string
}
