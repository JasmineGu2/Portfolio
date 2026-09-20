'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkBentoTile } from '@/components/portfolio/hero/WorkBentoTile'
import type { ShowcaseItem, WorkGroup } from '@/lib/portfolio/showcase-data'

const GROUPS: { id: WorkGroup; label: string }[] = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'product', label: 'Product' },
  { id: 'other', label: 'Other' },
]

/**
 * The home page's work tiles, sorted into Engineering / Product / Other. Inactive panels unmount, so only the
 * visible tab's videos load and play.
 */
export function WorkTabs({ items }: { items: ShowcaseItem[] }) {
  return (
    <Tabs defaultValue={GROUPS[0].id} className="self-start">
      <TabsList className="relative h-auto w-full justify-start gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-[var(--pf-card-border)]">
        {GROUPS.map(({ id, label }) => (
          <TabsTrigger
            key={id}
            value={id}
            className="overflow-hidden rounded-b-none rounded-t-[4px] border-x border-t border-[var(--pf-card-border)] bg-[var(--pf-canvas-alt)] px-4 py-2 text-xs data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {GROUPS.map(({ id }) => (
        <TabsContent key={id} value={id} className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            {items
              .filter((item) => item.group === id)
              .map((item) => (
                <WorkBentoTile key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
