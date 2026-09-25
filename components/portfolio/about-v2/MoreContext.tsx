'use client'

export function MoreContext() {
  return (
    <div className="more-context">
      <section className="context-section">
        <h2>About</h2>
        <p>
          I'm a product engineer focused on building systems that enable better decision-making
          and scale across organizations.
        </p>
        <p>
          I've worked as a PM, backend engineer, and frontend engineer—roles that taught me how
          to think across the full stack and understand tradeoffs at scale.
        </p>
      </section>

      <section className="context-section">
        <h2>Currently</h2>
        <p>At Autodesk, working on the data platform serving 100+ internal teams.</p>
      </section>

      <section className="context-section">
        <h2>Skills</h2>
        <ul>
          <li>Product strategy & execution</li>
          <li>Full-stack engineering (TypeScript, React, Node.js, Python)</li>
          <li>System design & scale</li>
          <li>Technical leadership</li>
          <li>User research & design thinking</li>
        </ul>
      </section>
    </div>
  )
}
