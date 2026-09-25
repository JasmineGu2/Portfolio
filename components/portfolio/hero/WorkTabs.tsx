'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkBentoTile } from '@/components/portfolio/hero/WorkBentoTile'
import type { ShowcaseItem } from '@/lib/portfolio/showcase-data'

type TabId = 'all' | 'engineering' | 'business' | 'side'

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'business', label: 'Product/Business' },
  { id: 'side', label: 'Side projects' },
]

/**
 * The original home bento, back: a 12-column mosaic where each experience keeps the width it had (Autodesk PM 8, Tesla 4,
 * Autodesk engineering 5, OMERS 7, Intuit 7, Hack Western 4, IPS 5, LaurelSpace 2 wide and tall...). Splitting the mosaic
 * over tabs means a few widths stretch to complete a row (Intuit 7 -> 8, Metaverse 6 -> 12); Western had no original slot.
 * Same tiles as before (no cards), just their original size and orientation.
 *
 * "All" is the whole original mosaic in one grid: every experience except side projects, each in the slot it had (Western,
 * which never had one, closes it as a full-width row).
 */
const BENTO: Partial<Record<TabId, Record<string, { col: string; row: number; span: number }>>> = {
  all: {
    autodesk: { col: '1 / span 8', row: 1, span: 8 },
    tesla: { col: '9 / span 4', row: 1, span: 4 },
    'autodesk-eng': { col: '1 / span 5', row: 2, span: 5 },
    omers: { col: '6 / span 7', row: 2, span: 7 },
    'stealth-startup': { col: '1 / span 2', row: 3, span: 2 },
    metaverse: { col: '3 / span 6', row: 3, span: 6 },
    'hack-western': { col: '9 / span 4', row: 3, span: 4 },
    intuit: { col: '1 / span 7', row: 4, span: 7 },
    'ivey-product': { col: '8 / span 5', row: 4, span: 5 },
    western: { col: '1 / span 12', row: 5, span: 12 },
  },
  engineering: {
    tesla: { col: '1 / span 4', row: 1, span: 4 },
    intuit: { col: '5 / span 8', row: 1, span: 8 },
    'autodesk-eng': { col: '1 / span 5', row: 2, span: 5 },
    omers: { col: '6 / span 7', row: 2, span: 7 },
    metaverse: { col: '1 / span 12', row: 3, span: 12 },
  },
  business: {
    autodesk: { col: '1 / span 8', row: 1, span: 8 },
    'hack-western': { col: '9 / span 4', row: 1, span: 4 },
    'stealth-startup': { col: '1 / span 2', row: 2, span: 2 },
    'ivey-product': { col: '3 / span 5', row: 2, span: 5 },
    western: { col: '8 / span 5', row: 2, span: 5 },
  },
}

/** Which entries sit under a tab: product, leadership and school all live under Product/Business. */
function itemsFor(id: TabId, work: ShowcaseItem[], side: ShowcaseItem[]) {
  if (id === 'side') return side
  if (id === 'all') {
    const order = Object.keys(BENTO.all ?? {})
    return order.map((key) => work.find((item) => item.id === key)).filter((item): item is ShowcaseItem => Boolean(item))
  }
  return work.filter((item) => (id === 'engineering' ? item.group === 'engineering' : item.group !== 'engineering'))
}

/**
 * The home page's work, under tabs: All (the whole original mosaic) / Engineering / Product/Business (product, leadership,
 * school) / Side projects.
 * Inactive panels unmount, so only the visible tab's videos load and play.
 */
export function WorkTabs({ work, side }: { work: ShowcaseItem[]; side: ShowcaseItem[] }) {
  return (
    <Tabs defaultValue={TABS[0].id}>
      <TabsList className="pf-tabs" aria-label="Kinds of work">
        {TABS.map(({ id, label }) => (
          <TabsTrigger key={id} value={id} variant="bare" className="pf-tab">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map(({ id }) => (
        <TabsContent key={id} value={id} className="mt-0">
          <div className={BENTO[id] ? 'pf-tiles pf-tiles--bento' : 'pf-tiles'}>
            {itemsFor(id, work, side).map((item) => (
              <WorkBentoTile key={item.id} item={item} placement={BENTO[id]?.[item.id]} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
