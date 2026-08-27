# Portfolio Specs

Product specifications for Jasmine's portfolio, one connected system, three views, one data layer.

---

## How to read these specs

```text
01 Product Overview          ← start here (the "why")
        ↓
02 Site Architecture         ← routes, nav, components, state
03 Data Model                ← shared schema (source of truth)
        ↓
04 Visual System             ← typography, color, motion rules
05 Work & Projects           ← bento pages (backbone)
06 Agent Architecture Page   ← /architecture narrative (background)
07 Ask Side Agent            ← floating query panel
        ↓
08 Build Plan                ← phases, status, decisions
09 Dot Fabric Visual         ← redirect → specs/visuals/dot-fabric.md
10 Agent Card Components     ← reusable agent/API architecture card system
11 Performance Budget        ← motion limits, canvas/video/lazy-load budgets

Visuals (implementation)     ← specs/visuals/, dot fabric, ambient effects
```

---

## The product in one diagram

```text
                         ┌──────────────────────┐
                         │    Shared Data       │
                         │  portfolio-data.ts   │
                         │  graph · capabilities│
                         └──────────┬───────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
    WORK (/)                   ARCHITECTURE              ASK (side panel)
    Backbone                   Background                 Query layer
    Bento evidence             Agent runtime narrative    Explore Work
         │                          │                          │
         └──────────────────────────┴──────────────────────────┘
                                    │
                              PROJECTS (/projects)
                              Separate bento, case studies & builds
```

---

## Core principle

> **Work is the backbone. Architecture is the background. Ask is the query layer.**

| View | Route | Nav | Job |
|------|-------|-----|-----|
| **Work** | `/` | Yes | Jobs, internships, case study links, default landing |
| **Architecture** | `/architecture` | Yes | How experience became capability, agent runtime narrative |
| **Projects** | `/projects` | Yes | PM case studies + technical builds (separate from Work) |
| **Ask** | Side panel | No | Query Work, trace paths, highlight tiles |
| **Gallery** | `/gallery` | No | Linked from Architecture Community section (planned) |

---

## Spec documents

| # | Document | Contents |
|---|----------|----------|
| 01 | [Product Overview](./01-product-overview.md) | Thesis, three views, aesthetic goal, content rules |
| 02 | [Site Architecture](./02-site-architecture.md) | Routes, nav, components, global state, responsive |
| 03 | [Data Model](./03-data-model.md) | `PortfolioItem`, graph, capabilities, memory, schemas |
| 04 | [Visual System](./04-visual-system.md) | Fonts, palette, gradients, cards, light/dark rhythm, motion |
| 05 | [Work & Projects](./05-work-and-projects.md) | Bento layouts, tiles, media, detail pages, interactions |
| 06 | [Agent Architecture Page](./06-agent-architecture-page.md) | All `/architecture` sections, abstraction engine → runtime loop |
| 07 | [Ask Side Agent](./07-ask-side-agent.md) | Panel UX, query modes, grounding, cross-page behavior |
| 08 | [Build Plan](./08-build-plan.md) | Phases, checkpoints, decisions log, timeline |
| 09 | [Dot Fabric Visual](./09-dot-fabric-visual.md) | Redirect → [visuals/dot-fabric.md](./visuals/dot-fabric.md) |
| 10 | [Agent Card Components](./10-agent-card-components.md) | Reusable agent/API card variants, chips, nodes, config panels, flow connectors |
| 11 | [Performance Budget](./11-performance-budget.md) | One motion system per viewport, canvas/video caps, lazy load, mobile tiers, checklist |

### Visuals (implementation specs)

| Document | Contents |
|----------|----------|
| [Visuals index](./visuals/README.md) | Animated surfaces, dot fabric, future ambient effects |
| [Overview](./visuals/overview.md) | Visuals layer philosophy and placement rules |
| [Dot fabric](./visuals/dot-fabric.md) | Canvas dot surface, presets, API, performance |
| [Hover / context stack](./visuals/hover.md) | Agent context stack concept (Ask panel) |

---

## Implementation status

| Area | Status |
|------|--------|
| Work bento at `/` | ✅ Built |
| Projects bento at `/projects` | ✅ Built |
| Architecture page at `/architecture` | ✅ Built, Phase 2–3 content |
| Ask side panel UI | ✅ Built, pattern-matched responses |
| Ask trace → Architecture highlighting | ✅ Built |
| Unified data layer | ✅ Built |
| Graph + capabilities scaffolding | ✅ Built |
| PortfolioState context | ✅ Built |
| Custom fonts | ✅ In repo |
| Dot fabric visual on Architecture hero | ✅ Built |
| Ask mobile bottom sheet | ✅ Built |
| Architecture mobile stacked layout | ✅ Built |
| Exploration pages → `/dev/` | ✅ Moved + redirects |
| Visual system skill + rule | ✅ `.cursor/skills/portfolio-visual` |
| Performance budget spec + skill + rule | ✅ `11-performance-budget.md`, `.cursor/skills/portfolio-performance` |
| Ask AI backend (LLM) | 🔲 Phase 4 |
| Gallery → Architecture link | ✅ Linked from Memory section |
| Memory/community placeholders | 🔲 Content-dependent |
| Agent card component system | 🔲 Spec written, see `10-agent-card-components.md` |

---

## Codebase map

```
lib/portfolio/
  portfolio-data.ts      ← unified experiences + projects
  graph.ts               ← node connections
  capabilities.ts        ← 6 capability modules

components/portfolio/
  agent/AgentSidePanel.tsx
  PortfolioStateContext.tsx
  bento-workflows/       ← Work + Projects bento system

components/visuals/
  DotField/              ← dot fabric (Architecture hero)

app/
  page.tsx               ← Work (/)
  architecture/page.tsx  ← Architecture
  projects/page.tsx      ← Projects

public/fonts/            ← Bootzy, Awesome Shorten, Analogue OS
```

When implementing a feature, update the relevant spec and this status table.
