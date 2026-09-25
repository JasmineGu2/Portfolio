'use client'

// SVG road network background (from mock 35 blueprint)
// This creates the repeating road/grid pattern

export function RoadMap() {
  return (
    <svg className="roadmap-svg" viewBox="0 0 1400 2000" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#e0e0e0" strokeWidth="1" />
        </pattern>
        <pattern id="roads" width="200" height="200" patternUnits="userSpaceOnUse">
          <line x1="0" y1="100" x2="200" y2="100" stroke="#d0d0d0" strokeWidth="2" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="#d0d0d0" strokeWidth="2" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="1400" height="2000" fill="#f8f8f8" />

      {/* Grid pattern */}
      <rect width="1400" height="2000" fill="url(#grid)" />

      {/* Road network */}
      <rect width="1400" height="2000" fill="url(#roads)" opacity="0.6" />

      {/* Street labels (sample) */}
      <text x="50" y="120" fontSize="12" fill="#999" className="street-label">
        Product Ave
      </text>
      <text x="120" y="150" fontSize="12" fill="#999" className="street-label">
        Engineering St
      </text>
    </svg>
  )
}
