'use client'

import { useState, useRef } from 'react'
import { useDrag } from '@/hooks/useDrag'

const PHOTOS = [
  { id: 1, src: '/mocks/img/pinboard.png', alt: 'Photo 1' },
  { id: 2, src: '/mocks/img/pinboard.png', alt: 'Photo 2' },
  { id: 3, src: '/mocks/img/pinboard.png', alt: 'Photo 3' },
  { id: 4, src: '/mocks/img/pinboard.png', alt: 'Photo 4' },
  { id: 5, src: '/mocks/img/pinboard.png', alt: 'Photo 5' },
]

export function PolaroidGallery() {
  const refs = PHOTOS.map(() => useRef<HTMLDivElement>(null))
  const [positions, setPositions] = useState(PHOTOS.map((_, i) => ({ x: i * 80, y: i * 60 })))

  PHOTOS.forEach((_, i) => {
    useDrag(refs[i], {
      onDrag: (x, y) => {
        setPositions((prev) => {
          const newPos = [...prev]
          newPos[i] = { x, y }
          return newPos
        })
      },
      constrainX: [0, 1000],
      constrainY: [0, 600],
    })
  })

  return (
    <div className="polaroid-gallery">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.id}
          ref={refs[i]}
          className="polaroid"
          style={{
            transform: `translate(${positions[i].x}px, ${positions[i].y}px) rotate(${Math.random() * 6 - 3}deg)`,
          }}
        >
          <img src={photo.src} alt={photo.alt} />
        </div>
      ))}
    </div>
  )
}
