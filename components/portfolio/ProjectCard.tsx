import type { CSSProperties } from 'react'
import type { ShowcaseItem } from '@/lib/portfolio/showcase-data'

function CardMedia({ item }: { item: ShowcaseItem }) {
  if (item.video) {
    return (
      <video
        src={item.video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    )
  }

  if (item.logoStyle && item.gradient) {
    return (
      <div className="flex aspect-video w-full items-center justify-center p-8">
        <div className="flex items-center justify-center rounded-xl bg-white px-6 py-4 shadow-sm transition-transform duration-500 group-hover:scale-[1.04]">
          <img src={item.image} alt={item.imageAlt} className="h-10 w-auto max-w-[160px] object-contain" />
        </div>
      </div>
    )
  }

  return (
    <img
      src={item.image}
      alt={item.imageAlt}
      className={
        item.logoStyle
          ? 'aspect-video w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]'
          : 'w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]'
      }
    />
  )
}

function CardBody({ item }: { item: ShowcaseItem }) {
  return (
    <>
      <div
        className="group overflow-hidden rounded-2xl bg-[var(--pf-canvas-alt)]"
        style={item.gradient ? { backgroundImage: item.gradient } : undefined}
      >
        <CardMedia item={item} />
      </div>
      <div className="flex flex-col gap-1 pb-2 pt-4 text-pretty">
        <p className="text-[11px] leading-[14px] tracking-widest text-[var(--pf-muted)]">
          {item.eyebrow}
        </p>
        <h3 className="font-serif text-[21px] font-medium leading-6 text-[var(--pf-ink)]">
          {item.name}
        </h3>
        <p className="text-sm leading-5 text-[var(--pf-ink)]">{item.description}</p>
      </div>
    </>
  )
}

export function ProjectCard({ item }: { item: ShowcaseItem }) {
  const style = {
    '--tile-col': item.gridColumn,
    '--tile-row': item.gridRow,
  } as CSSProperties

  if (item.href) {
    const external = item.href.startsWith('http')
    return (
      <a
        href={item.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="showcase-tile block w-full"
        style={style}
      >
        <article>
          <CardBody item={item} />
        </article>
      </a>
    )
  }

  return (
    <article className="showcase-tile w-full" style={style}>
      <CardBody item={item} />
    </article>
  )
}
