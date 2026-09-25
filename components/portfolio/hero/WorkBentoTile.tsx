import type { ShowcaseItem } from '@/lib/portfolio/showcase-data'

/**
 * A big tile: 16:10 media, then a small caption row (a serif line on the left, mono details on the right).
 * Work tiles show "Company · period" and the three skill tags; side projects show the title and its kind.
 * Hovering anywhere on a tile shows the small cursor tag (for engineering roles: the languages used), and an
 * engineering tile's grey skill line turns orange.
 */
export function WorkBentoTile({
  item,
  placement,
}: {
  item: ShowcaseItem
  /** Where the tile sits in the 12-column bento (grid column, row and how many columns wide). */
  placement?: { col: string; row: number; span: number }
}) {
  const media = item.video ? (
    <video
      data-src={item.video}
      preload="none"
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  ) : item.logoStyle ? (
    <div className="flex h-full w-full items-center justify-center p-6">
      <img src={item.image} alt={item.imageAlt} className="max-h-16 w-auto object-contain" />
    </div>
  ) : (
    <img
      src={item.image}
      alt={item.imageAlt}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  )

  const isWork = Boolean(item.tags)
  const line1 = isWork ? (item.period ? `${item.name} · ${item.period}` : item.name) : item.name
  const line2 = isWork ? item.tags?.join(' · ') : item.eyebrow

  return (
    <a
      href={item.href}
      className="group pf-tile"
      data-group={item.group}
      data-cursor-label={item.cursorLabel}
      data-narrow={placement && placement.span <= 5 ? 'true' : undefined}
      data-span={placement?.span}
      style={placement ? { gridColumn: placement.col, gridRow: placement.row } : undefined}
      target={isWork ? undefined : '_blank'}
      rel={isWork ? undefined : 'noopener noreferrer'}
    >
      <div className="pf-tile__media" style={{ backgroundImage: item.gradient }}>
        {media}
      </div>
      <div className="pf-tile__cap">
        <p className="pf-tile__sub">{item.subtitle ?? item.description}</p>
        <p className="pf-tile__meta">
          <span>{line1}</span>
          {line2 && <span className="pf-tile__tags">{line2}</span>}
          {item.languages && item.languages.length > 0 && (
            <span className="pf-tile__langs">
              <b>Built with</b> {item.languages.join(' · ')}
            </span>
          )}
        </p>
      </div>
    </a>
  )
}
