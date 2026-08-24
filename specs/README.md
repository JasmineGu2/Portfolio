# Portfolio Specs

Product specifications for Jasmine's portfolio — one connected system, three views, one data layer.

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
09 Dot Fabric Visual         ← optional animated surface (reference impl)
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
                              Separate bento — case studies & builds
```

---

## Core principle

> **Work is the backbone. Architecture is the background. Ask is the query layer.**

| View | Route | Nav | Job |
|------|-------|-----|-----|
| **Work** | `/` | Yes | Jobs, internships, case study links — default landing |
| **Architecture** | `/architecture` | Yes | How experience became capability — agent runtime narrative |
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
| 06 | [Agent Architecture Page](./06-agent-architecture-page.md) | All `/architecture` sections — abstraction engine → runtime loop |
| 07 | [Ask Side Agent](./07-ask-side-agent.md) | Panel UX, query modes, grounding, cross-page behavior |
| 08 | [Build Plan](./08-build-plan.md) | Phases, checkpoints, decisions log, timeline |
| 09 | [Dot Fabric Visual](./09-dot-fabric-visual.md) | Animated dot surface — implementation reference |

---

## Implementation status

| Area | Status |
|------|--------|
| Work bento at `/` | ✅ Built |
| Projects bento at `/projects` | ✅ Built |
| Architecture placeholder at `/architecture` | ✅ Built — content TBD |
| Ask side panel UI | ✅ Built — AI responses TBD |
| Unified data layer | ✅ Built |
| Graph + capabilities scaffolding | ✅ Built |
| PortfolioState context | ✅ Built |
| Custom fonts | ✅ In repo |
| Full Architecture page | 🔲 Phase 2–3 |
| Ask AI backend | 🔲 Phase 4 |
| Dot fabric visual on Architecture | 🔲 Optional — see `09-dot-fabric-visual.md` |
| Gallery → Architecture link | 🔲 Planned |

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

app/
  page.tsx               ← Work (/)
  architecture/page.tsx  ← Architecture
  projects/page.tsx      ← Projects

public/fonts/            ← Bootzy, Awesome Shorten, Analogue OS
```

When implementing a feature, update the relevant spec and this status table.
