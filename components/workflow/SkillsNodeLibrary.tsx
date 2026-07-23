'use client'

import type { SkillGroup } from '@/lib/workflow/types'
import { WORKFLOW_COLORS } from '@/lib/workflow/colors'

interface SkillsNodeLibraryProps {
  groups: SkillGroup[]
}

export function SkillsNodeLibrary({ groups }: SkillsNodeLibraryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groups.map((group) => {
        const colors = WORKFLOW_COLORS[group.color]
        return (
          <div
            key={group.id}
            className="rounded-xl border bg-workflow-ivory p-4 shadow-sm"
            style={{ borderColor: `${colors.border}55` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.accent }}
                aria-hidden
              />
              <h3 className="text-sm font-semibold text-workflow-text">
                {group.agentLabel}
              </h3>
              <span className="font-mono text-[9px] text-workflow-muted ml-auto">
                node library
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors hover:shadow-sm cursor-default"
                  style={{
                    borderColor: `${colors.border}44`,
                    backgroundColor: colors.light,
                    color: colors.text,
                  }}
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
