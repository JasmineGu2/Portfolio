'use client'

import type { WorkflowNodeData, ExecutionState } from '@/lib/workflow/types'
import { WorkflowNode } from './WorkflowNode'

interface TriggerNodeProps {
  node: WorkflowNodeData
  executionState: ExecutionState
  isActive: boolean
}

export function TriggerNode({ node, executionState, isActive }: TriggerNodeProps) {
  return (
    <WorkflowNode
      node={node}
      executionState={executionState}
      isActive={isActive}
      className="max-w-sm"
    />
  )
}
