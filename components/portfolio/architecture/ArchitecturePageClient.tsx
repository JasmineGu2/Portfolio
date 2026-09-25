import { GalleryPhotoGrid } from '@/components/portfolio/GalleryPhotoGrid'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { SIDE_PROJECT_SHOWCASE } from '@/lib/portfolio/showcase-data'

const HEADING = 'font-serif text-[21px] font-medium leading-6 text-[var(--pf-ink)]'

/** The Journey: side projects, then the photo gallery. SiteShell already provides the page's <main>. */
export function ArchitecturePageClient() {
  return (
    <div className="arch-page portfolio-content">
      <section id="arch-side-projects" className="arch-section arch-section--light">
        <div className="arch-container">
          <h2 className={HEADING}>Side projects</h2>
          <div className="mt-6">
            <ProjectGrid items={SIDE_PROJECT_SHOWCASE} />
          </div>
        </div>
      </section>

      <section id="arch-gallery" className="arch-section arch-section--light">
        <div className="arch-container">
          <h2 className={HEADING}>Gallery</h2>
          <div className="mt-6">
            <GalleryPhotoGrid />
          </div>
        </div>
      </section>
    </div>
  )
}
