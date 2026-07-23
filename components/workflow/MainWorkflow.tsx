'use client'

import type { ExecutionState } from '@/lib/workflow/types'
import {
  MAIN_WORKFLOW_NODES,
  MAIN_WORKFLOW_EDGES,
  SWITCH_BRANCHES,
} from '@/lib/workflow/workflow-data'
import { AgentNode } from './AgentNode'
import { SwitchNode } from './SwitchNode'
import { MergeNode } from './MergeNode'
import { OrchestratorNode, OutputNode } from './OutputNode'
import { Connector, ConnectorLabel } from './Connector'
import { WorkflowGroup } from './WorkflowGroup'

interface MainWorkflowProps {
  nodeStates: Record<string, ExecutionState>
  activeEdgeId: string | null
  currentNodeId: string | null
}

function getNode(id: string) {
  return MAIN_WORKFLOW_NODES.find((n) => n.id === id)!
}

function isEdgeActive(
  from: string,
  to: string,
  activeEdgeId: string | null
): boolean {
  return activeEdgeId === `${from}->${to}`
}

function isEdgeCompleted(
  from: string,
  to: string,
  nodeStates: Record<string, ExecutionState>
): boolean {
  return (
    nodeStates[from] === 'complete' &&
    (nodeStates[to] === 'running' || nodeStates[to] === 'complete')
  )
}

export function MainWorkflow({
  nodeStates,
  activeEdgeId,
  currentNodeId,
}: MainWorkflowProps) {
  const agentIds = [
    'context',
    'user',
    'product',
    'engineering',
    'operations',
  ] as const

  const branchStates = Object.fromEntries(
    SWITCH_BRANCHES.map((b) => [b.id, nodeStates[b.id] ?? 'idle'])
  )

  return (
    <WorkflowGroup
      id="main-workflow"
      title="Multi-Agent Workflow"
      subtitle="Each agent translates between functions. The value is in the handoffs."
    >
      {/* Desktop: horizontal agent chain */}
      <div className="hidden xl:block overflow-x-auto pb-4">
        <div className="flex items-center gap-0 min-w-max px-2">
          {agentIds.map((id, i) => {
            const node = getNode(id)
            const fromId = i === 0 ? 'trigger' : agentIds[i - 1]
            const edge = MAIN_WORKFLOW_EDGES.find(
              (e) => e.from === fromId && e.to === id
            )
            return (
              <div key={id} className="flex items-center">
                <div className="flex flex-col items-center mx-1">
                  <Connector
                    id={`${fromId}-${id}`}
                    active={isEdgeActive(fromId, id, activeEdgeId)}
                    completed={isEdgeCompleted(fromId, id, nodeStates)}
                  />
                  {edge && (
                    <ConnectorLabel label={edge.label} className="mt-6 w-28" />
                  )}
                </div>
                <AgentNode
                  node={node}
                  executionState={nodeStates[id]}
                  isActive={currentNodeId === id}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Tablet / Mobile: vertical stack */}
      <div className="xl:hidden space-y-2">
        {agentIds.map((id, i) => {
          const node = getNode(id)
          const fromId = i === 0 ? 'trigger' : agentIds[i - 1]
          const edge = MAIN_WORKFLOW_EDGES.find(
            (e) => e.from === fromId && e.to === id
          )
          return (
            <div key={id}>
              {edge && (
                <div className="flex flex-col items-center py-1">
                  <Connector
                    id={`mobile-${fromId}-${id}`}
                    direction="vertical"
                    active={isEdgeActive(fromId, id, activeEdgeId)}
                    completed={isEdgeCompleted(fromId, id, nodeStates)}
                    label={edge.label}
                  />
                </div>
              )}
              <AgentNode
                node={node}
                executionState={nodeStates[id]}
                isActive={currentNodeId === id}
              />
            </div>
          )
        })}
      </div>

      {/* Switch node */}
      <div className="mt-8 md:mt-12">
        <div className="flex flex-col items-center mb-4">
          <Connector
            id="operations-switch"
            direction="vertical"
            active={isEdgeActive('operations', 'switch', activeEdgeId)}
            completed={isEdgeCompleted('operations', 'switch', nodeStates)}
          />
          <ConnectorLabel
            label="Route the problem based on what the system needs next."
            className="mt-2"
          />
        </div>
        <SwitchNode
          title={getNode('switch').title}
          description={getNode('switch').description}
          branches={SWITCH_BRANCHES}
          branchStates={branchStates}
          isActive={currentNodeId === 'switch'}
        />

        {/* Branch merge connectors */}
        <div className="mt-6 flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl mb-2">
            {SWITCH_BRANCHES.map((branch) => (
              <Connector
                key={`merge-${branch.id}`}
                id={`branch-merge-${branch.id}`}
                direction="vertical"
                active={
                  isEdgeActive(branch.id, 'merge', activeEdgeId) ||
                  nodeStates[branch.id] === 'running' ||
                  nodeStates[branch.id] === 'complete'
                }
                completed={nodeStates.merge === 'complete' || nodeStates.merge === 'running'}
                className="mx-auto"
              />
            ))}
          </div>
          <ConnectorLabel label="All perspectives converge" className="mb-2" />
        </div>
      </div>

      {/* Merge */}
      <div className="mt-8 md:mt-12 flex flex-col items-center">
        <ConnectorLabel label="Merge perspectives" className="mb-4" />
        <MergeNode
          node={getNode('merge')}
          executionState={nodeStates.merge}
          isActive={currentNodeId === 'merge'}
        />
      </div>

      {/* Orchestrator */}
      <div className="mt-8 md:mt-12">
        <div className="flex justify-center mb-4">
          <ConnectorLabel
            label={
              MAIN_WORKFLOW_EDGES.find((e) => e.from === 'merge')?.label ??
              'Orchestrate the whole workflow.'
            }
          />
        </div>
        <OrchestratorNode
          node={getNode('orchestrator')}
          executionState={nodeStates.orchestrator}
          isActive={currentNodeId === 'orchestrator'}
        />
      </div>

      {/* Output */}
      <div className="mt-8 md:mt-12">
        <div className="flex justify-center mb-4">
          <ConnectorLabel label="Return useful outcome." />
        </div>
        <OutputNode
          node={getNode('output')}
          executionState={nodeStates.output}
          isActive={currentNodeId === 'output'}
        />
      </div>
    </WorkflowGroup>
  )
}
