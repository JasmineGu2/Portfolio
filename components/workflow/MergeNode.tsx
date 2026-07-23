'use client'

import type { WorkflowNodeData, ExecutionState } from '@/lib/workflow/types'
import { WorkflowNode } from './WorkflowNode'

interface MergeNodeProps {
  node: WorkflowNodeData
  executionState: ExecutionState
  isActive: boolean
}

export function MergeNode({ node, executionState, isActive }: MergeNodeProps) {
  return (
    <WorkflowNode
      node={node}
      executionState={executionState}
      isActive={isActive}
      className="max-w-md w-full"
    />
  )
}
