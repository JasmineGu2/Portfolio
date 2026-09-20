import type { ShowcaseItem } from '@/lib/portfolio/showcase-data'

export function WorkBentoTile({ item }: { item: ShowcaseItem }) {
  const media = item.video ? (
    <video
      src={item.video}
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center p-4">
      <img src={item.image} alt={item.imageAlt} className="max-h-8 w-auto object-contain" />
    </div>
  )

  return (
    <a href={item.href} className="group flex flex-col gap-2">
      <div
        className="aspect-square w-full overflow-hidden rounded-xl"
        style={{ backgroundImage: item.gradient }}
        data-cursor-label={item.cursorLabel}
      >
        {media}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: '#282828' }}>
          {item.name}
        </p>
        <p className="line-clamp-2 text-xs" style={{ color: '#282828', opacity: 0.6 }}>
          {item.description}
        </p>
      </div>
    </a>
  )
}
