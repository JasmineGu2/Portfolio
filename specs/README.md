# Portfolio Specs — Index

This folder contains the product specifications for Jasmine's portfolio system.

The portfolio is **one connected product** with three ways to understand the same underlying data:

| View | Route | Job |
|------|-------|-----|
| **Work** | `/` | Show the evidence — jobs, case studies, bento tiles |
| **Architecture** | `/architecture` | Explain the background — how experience became capability |
| **Ask** | Side panel (global) | Query the portfolio — explore, compare, trace |

Projects live at `/projects` as a separate bento page (not nested under Work).

---

## Spec documents

| # | Document | Contents |
|---|----------|----------|
| 01 | [Product Overview](./01-product-overview.md) | Core concept, thesis, visitor goals |
| 02 | [Site Architecture](./02-site-architecture.md) | Routes, nav, page relationships, what's built vs planned |
| 03 | [Data Model](./03-data-model.md) | Shared schema, graph, capabilities, content integrity |
| 04 | [Visual System](./04-visual-system.md) | Typography, color, gradients, card families, light/dark rhythm |
| 05 | [Work & Projects](./05-work-and-projects.md) | Bento pages, tiles, filters, media, detail pages |
| 06 | [Agent Architecture Page](./06-agent-architecture-page.md) | The `/architecture` narrative — abstraction engine, runtime sections |
| 07 | [Ask Side Agent](./07-ask-side-agent.md) | Floating panel UX, query modes, grounding, cross-page behavior |
| 08 | [Build Plan](./08-build-plan.md) | Phased implementation, checkpoints, decisions log |

---

## Core principle

> **Work is the backbone. Architecture is the background. Ask is the query layer.**

The visitor should understand Jasmine's career progression even if they never open Ask. Ask lowers the effort to explore once they care about specifics.

---

## Implementation status (Aug 2026)

| Area | Status |
|------|--------|
| Work bento at `/` | ✅ Built |
| Projects bento at `/projects` | ✅ Built (existing) |
| Architecture page placeholder at `/architecture` | ✅ Built (content TBD) |
| Ask side panel UI | ✅ Built (AI responses TBD) |
| Unified data layer (`portfolio-data.ts`) | ✅ Built |
| Graph + capabilities scaffolding | ✅ Built |
| PortfolioState context | ✅ Built |
| Custom fonts (Bootzy, Awesome Shorten, Analogue OS) | ✅ Added to repo |
| Full Architecture page content | 🔲 Next |
| Ask AI backend + grounding | 🔲 Next |
| Gallery → Architecture community section | 🔲 Planned |

---

## Related files in codebase

```
lib/portfolio/portfolio-data.ts   — unified experience + project data
lib/portfolio/graph.ts            — node connections
lib/portfolio/capabilities.ts     — 6 capability modules
components/portfolio/PortfolioStateContext.tsx
components/portfolio/agent/AgentSidePanel.tsx
public/fonts/                     — Bootzy, Awesome Shorten, Analogue OS
```
