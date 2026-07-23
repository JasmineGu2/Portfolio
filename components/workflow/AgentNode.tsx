'use client'

import type { WorkflowNodeData, ExecutionState } from '@/lib/workflow/types'
import { WorkflowNode } from './WorkflowNode'

interface AgentNodeProps {
  node: WorkflowNodeData
  executionState: ExecutionState
  isActive: boolean
}

export function AgentNode({ node, executionState, isActive }: AgentNodeProps) {
  return (
    <WorkflowNode
      node={node}
      executionState={executionState}
      isActive={isActive}
      className="max-w-xs md:max-w-sm w-full"
    />
  )
}
