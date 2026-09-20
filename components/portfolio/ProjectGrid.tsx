import { ProjectCard } from '@/components/portfolio/ProjectCard'
import type { ShowcaseItem } from '@/lib/portfolio/showcase-data'

export function ProjectGrid({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12">
      {items.map((item) => (
        <ProjectCard key={item.id} item={item} />
      ))}
    </div>
  )
}
