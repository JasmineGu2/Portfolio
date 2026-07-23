'use client'

import { GALLERY_PHOTOS, encodeGallerySrc } from '@/lib/portfolio/gallery-data'

export function GalleryPhotoGrid() {
  return (
    <div className="bw-gallery-photos">
      {GALLERY_PHOTOS.map((photo) => (
        <figure key={photo.id} className="bw-gallery-photos__item" tabIndex={0}>
          <div className="bw-gallery-photos__bento">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeGallerySrc(photo.imageSrc)}
              alt={photo.alt ?? photo.title}
              loading="lazy"
              decoding="async"
              className="bw-gallery-photos__img"
            />
            <figcaption className="bw-gallery-photos__caption">
              <span className="bw-gallery-photos__caption-tag">{photo.tag}</span>
              <span className="bw-gallery-photos__caption-title">{photo.title}</span>
              <span className="bw-gallery-photos__caption-desc">{photo.subtitle}</span>
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  )
}
