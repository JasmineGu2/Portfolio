'use client'

import { RoadMap } from './RoadMap'

export function Footer() {
  return (
    <footer className="about-v2-footer">
      <div className="footer-roadmap">
        <RoadMap />
      </div>
      <div className="footer-content">
        <p>&copy; 2024 Jasmine Gu. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/about-v2">About</a>
          <a href="mailto:jazz.gu2004@gmail.com">Email</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </nav>
      </div>
      <style jsx>{`
        .footer-roadmap {
          height: 120px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        /* Hide any magic 8 ball or spinner elements */
        [class*='magic'],
        [class*='spinner'],
        [class*='loader'],
        [role='progressbar'] {
          display: none !important;
        }
      `}</style>
    </footer>
  )
}
