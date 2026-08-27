# 02, Site Architecture

## Route map

| Route | Page | Role | Status |
|-------|------|------|--------|
| `/` | Work | Default landing, experience bento | ✅ Built |
| `/architecture` | Agent Architecture | Background narrative, abstraction engine | 🔲 Placeholder |
| `/projects` | Projects | PM + technical project bento | ✅ Built |
| `/tesla` | Tesla case study | Full case study detail | ✅ Built |
| `/work/[slug]` | Experience detail | Generic experience pages | ✅ Built |
| `/ask` |, | Redirects to `/` (use side panel) | ✅ Redirect |
| `/work` |, | Redirects to `/` | ✅ Redirect |
| `/gallery` | Gallery | Community/photos, linked from Architecture later | ✅ Exists, not in main nav |

---

## Navigation

```text
Work  ·  Architecture  ·  Projects  ·  Resume
```

- **Ask is NOT in nav**, floating side panel only
- **Gallery is NOT in main nav**, accessible from Architecture Community/Memory section when built
- Resume opens PDF in new tab

---

## Page hierarchy

```text
WORK (backbone)
  │
  ├── Experience tiles → /tesla, /work/[slug]
  │
ARCHITECTURE (background)
  │
  ├── Links back to Work tiles
  ├── Memory / Community → links to /gallery
  │
PROJECTS (separate evidence)
  │
  └── External links, Devpost, Figma, etc.

ASK (overlay)
  │
  ├── Visible on: /, /architecture, /projects, /tesla, /work/*
  ├── Hidden on: /ask, dev/exploration pages
  └── Can highlight Work tiles, reference Architecture paths
```

---

## Recommended visitor flow

```text
1. Land on Work (/)
      ↓
2. Scan bento, click Tesla, Autodesk, etc.
      ↓
3. Optional: open Ask side panel, "What did you build at Tesla?"
      ↓
4. Optional: read Architecture, full zoom-out narrative
      ↓
5. Optional: Projects, case studies and hackathon builds
```

Visitors may enter any view at any time. The system always allows movement between them.

---

## Component architecture

```text
app/
  page.tsx                    → Work (WorkflowBentoCanvas)
  architecture/page.tsx       → Architecture narrative
  projects/page.tsx           → Projects bento
  work/[slug]/page.tsx        → Experience detail
  tesla/page.tsx              → Tesla case study

components/portfolio/
  bento-workflows/            → Bento shell, canvas, tiles, nav
  agent/AgentSidePanel.tsx    → Floating Ask panel
  PortfolioStateContext.tsx   → Shared UI state

lib/portfolio/
  portfolio-data.ts           → Unified data (source of truth)
  graph.ts                    → Node connections
  capabilities.ts             → 6 capability modules
  experience-cards-data.ts    → Legacy source (migrate toward portfolio-data)
  projects-bento-data.ts      → Legacy source (migrate toward portfolio-data)
```

---

## Global state (`PortfolioState`)

Shared across Work, Architecture, and Ask:

```ts
type PortfolioState = {
  activeView: 'architecture' | 'work' | 'ask'
  selectedExperienceIds: string[]
  selectedContexts: string[]
  activeFilters: WorkFilter[]
  highlightedNodeIds: string[]
  agentOpen: boolean
}
```

Enables: AI query highlights a Work tile, clicking a tile adds Ask context, filter state persists.

---

## Exploration / dev pages (not in production nav)

Internal design tooling from earlier iteration. Hidden from nav, may be deleted or moved to `/dev/`:

- `/card-options`, `/hero-options`, `/tag-options`
- `/bento-workflows`, `/bento-formats/*`
- `/palette-duo-editor`, `/tesla-style-options`
- `/gallery-options`, `/storytelling-options`, etc.

These are **not part of the portfolio product**.

---

## Responsive behavior

| View | Desktop | Mobile |
|------|---------|--------|
| Work | Full bento grid | Stacked connected cards |
| Architecture | Scroll narrative + graph sections | Vertical stages, stacked graph |
| Projects | Bento mosaic | 1–2 column cards |
| Ask | Right side panel | Full-width bottom sheet (planned) |

Do not shrink a dense desktop graph onto a narrow screen, convert to vertical connected cards.

---

## Cross-page interaction example

Visitor on Work, viewing Tesla tile:

1. Clicks **Ask Jasmine** → panel opens with Tesla-specific suggestions
2. Asks: *"How did this influence what you did next?"*
3. Agent answers, shows chip: `Autodesk SWE ↗`
4. Offers: **Trace this transition** → highlights `TESLA → AUTODESK SWE` on Architecture page

Every meaningful content piece must connect across Work, Architecture, and Ask.
