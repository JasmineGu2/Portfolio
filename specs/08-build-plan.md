# 08 — Build Plan

## Current state (Aug 2026)

### ✅ Done
- Work bento at `/` (default landing)
- Projects bento at `/projects` (separate page)
- Architecture placeholder at `/architecture`
- Ask side panel UI (no AI backend yet)
- Unified data layer: `portfolio-data.ts`, `graph.ts`, `capabilities.ts`
- `PortfolioStateContext` for shared UI state
- Custom fonts in `public/fonts/`
- Nav: Work · Architecture · Projects · Resume
- Redirects: `/work` → `/`, `/ask` → `/`
- Exploration pages removed from nav

### 🔲 Next priorities
1. Full Architecture page (abstraction levels + runtime sections)
2. Ask AI backend with portfolio grounding
3. Cross-page highlighting (Ask → Work tiles, Architecture paths)
4. Gallery linked from Architecture Community section

---

## Phase 1 — Foundation ✅ COMPLETE

| Task | Status |
|------|--------|
| Copy fonts to `public/fonts/` | ✅ |
| Create `portfolio-data.ts` | ✅ |
| Create `graph.ts`, `capabilities.ts` | ✅ |
| `PortfolioStateContext` | ✅ |
| Work at `/` | ✅ |
| Projects stays at `/projects` | ✅ |
| Ask side panel shell | ✅ |
| Update nav | ✅ |

**Checkpoint:** Work bento loads at `/`, Projects separate, Ask panel opens.

---

## Phase 2 — Architecture page

**Goal:** The zoom-out narrative is readable without Ask.

| Task | Estimate |
|------|----------|
| Hero identity card + Initialize section | 1 day |
| 6 abstraction level scroll sections | 2 days |
| Agent state cards per level | 0.5 day |
| Final stack reveal | 0.5 day |
| Cross-links to Work tiles | 0.5 day |
| Warm visual system on Architecture (gradients, typography) | 1 day |

**Checkpoint:** Does the zoom-out story land? Do Work links work?

---

## Phase 3 — Runtime sections (Architecture)

**Goal:** Agent metaphor as infrastructure diagram.

| Task | Estimate |
|------|----------|
| Jasmine central node + 6 capability modules | 1–2 days |
| Connection lines + hover highlighting | 1 day |
| Tool Registry (compact picker) | 0.5 day |
| Experience inputs (6 streams → agent) | 1 day |
| Zoom-out visual timeline | 1 day |
| Memory section (3 modules, placeholders) | 1 day |
| Outputs + agent loop | 0.5 day |
| Light/dark section rhythm | 0.5 day |
| Mobile stacked fallback | 1 day |

**Checkpoint:** Graph feel, hover relationships, dark runtime sections.

---

## Phase 4 — Ask intelligence

**Goal:** Useful query layer grounded in portfolio data.

| Task | Estimate |
|------|----------|
| Context chips + context picker | 1 day |
| Autocomplete from portfolio data | 1 day |
| Query modes (Explain, Compare, Trace, Show Me) | 1 day |
| AI backend (Vercel AI SDK or similar) | 1 day |
| Response formatting (direct answer + refs + follow-ups) | 0.5 day |
| Node highlighting on Work page | 1 day |
| Trace animation on Architecture page | 1 day |
| Mobile bottom sheet | 0.5 day |

**Checkpoint:** Ask UX with real queries. Trace and Show Me work across pages.

---

## Phase 5 — Polish & content

| Task | Estimate |
|------|----------|
| Gallery → Architecture Community link | 0.5 day |
| Project placeholders → real data (as supplied) | Content-dependent |
| Community placeholders → real data | Content-dependent |
| Experience detail page template expansion | 1 day per experience |
| Performance pass (videos, gradients) | 1 day |
| Archive/delete exploration pages | 0.5 day |
| Migrate legacy data files to `portfolio-data.ts` only | 1 day |

---

## Decisions log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Default landing | `/` = Work | Work is backbone; recruiters scan evidence first |
| Architecture vs Story naming | **Architecture** | It's the agent runtime background, not a generic story page |
| Ask placement | Side panel, not nav | Secondary query layer over Work |
| Projects placement | Separate `/projects` | Different content type; user requested no nesting under Work |
| Work filters | None on Work page | User requested no filter chips |
| Gallery in nav | No — link from Architecture | Personal/community content belongs in Architecture memory layer |
| Exploration pages | Hidden from nav, delete later | Internal design tooling, not product |
| Tesla route | `/tesla` dedicated case study | Full writing exists; Work tile links here |
| Visual system on Work | Keep current bento scheme | Upgrade Architecture first; migrate Work intentionally later |

---

## Open questions

| Question | Options | Recommendation |
|----------|---------|----------------|
| AI provider | Vercel AI SDK + Claude / OpenAI | Decide when starting Phase 4 |
| `/gallery` fate | Keep separate vs fold into Architecture | Keep separate, link from Community section |
| Exploration pages | Delete vs `/dev/` prefix | `/dev/` if any layouts worth keeping as reference |
| Work visual migration | Keep bento scheme vs warm palette | Keep until Architecture visual system proven |

---

## Review checkpoints

| # | Deliverable | Question to ask |
|---|-------------|-----------------|
| 1 | Work at `/` | Same bento vibe? All tiles link correctly? |
| 2 | Architecture scroll | Does zoom-out story make sense? |
| 3 | Runtime graph | Agent metaphor vs dashboard feel? |
| 4 | Ask with AI | Would a recruiter actually use this? |
| 5 | Full system | Do Work, Architecture, Ask feel like one product? |

---

## Timeline estimate

| Phase | Duration |
|-------|----------|
| Phase 1 (Foundation) | ✅ Done |
| Phase 2 (Architecture narrative) | ~5 days |
| Phase 3 (Runtime sections) | ~7 days |
| Phase 4 (Ask intelligence) | ~7 days |
| Phase 5 (Polish) | Ongoing |

**Total remaining:** ~3–4 weeks focused work for full spec implementation.

---

## File reference

```
specs/                          ← this folder
lib/portfolio/portfolio-data.ts ← source of truth (growing)
lib/portfolio/graph.ts
lib/portfolio/capabilities.ts
components/portfolio/agent/AgentSidePanel.tsx
components/portfolio/PortfolioStateContext.tsx
app/page.tsx                    ← Work
app/architecture/page.tsx       ← Architecture (placeholder)
app/projects/page.tsx           ← Projects
public/fonts/                   ← Bootzy, Awesome Shorten, Analogue OS
```

When implementing any feature, update the relevant spec and the status table in `specs/README.md`.
