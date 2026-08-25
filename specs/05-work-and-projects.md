# 05 — Work & Projects

## Overview

Two separate bento pages. Same visual language, different content.

| Page | Route | Content |
|------|-------|---------|
| **Work** | `/` | Jobs, internships, professional experiences |
| **Projects** | `/projects` | PM case studies, hackathon builds, technical projects |

**Work is the default landing page and the backbone of the portfolio.**

Projects are NOT nested under Work. No filter chips combining them.

---

## Work page (`/`)

### Layout
Uses `home-wireframe` bento grid — same as previous homepage.

```text
┌──────────────────┐  ┌──────────┐
│  Autodesk PM     │  │  Tesla   │   row 1 — featured
└──────────────────┘  └──────────┘
┌──────┐ ┌──────────────────────────┐
│ SWE  │ │  OMERS                    │   row 2
└──────┘ └──────────────────────────┘
... staggered mosaic rows 3–4
```

### Component
`WorkflowBentoCanvas` with `home-wireframe` layout from `lib/portfolio/bento-workflows/layouts.ts`.

### Tile content
Each tile shows:
- Category chip (e.g. `ML SYSTEMS`, `DATA PRODUCTS`)
- Video autoplay or company logo
- Company name, role, subtitle, period
- 3 skill tags

### Links
| Experience | Destination |
|------------|-------------|
| Tesla | `/tesla` (full case study) |
| Others | `/work/[slug]` |
| Hack Western, Ivey | `/work/[slug]` |

### Hero panel
`HeroBentoPanel` with identity strip (Jasmine Gu, location, mode). No layout/color switcher in production.

**Core Strengths** uses a compact isometric layer stack (`CapabilityLayerStack` + `CAPABILITY_LAYERS` from `lib/portfolio/capability-layers-data.ts`) — four floating slabs (Product, Software Engineering, Business, Community) with Analogue OS labels and connector lines on the right. Hover or keyboard focus pulls the active layer outward ~12px, dims other slabs, and reveals 2–4 capability micro-chips per layer. Warm botanical palette with orange accent on the active layer; `prefers-reduced-motion` disables the pull animation. An sr-only list exposes full layer + capability text to screen readers.

### Connectors
Workflow connector lines between experience tiles (duo-bucket chains). Optional — preserve from current bento.

---

## Projects page (`/projects`)

### Layout
`bw-grid--projects-wireframe` — separate 4-row mosaic.

### Component
`ProjectsBentoGrid` → `ProjectsPageClient`

### Tile content
- Track chip (Product / Technical / Other)
- Project thumbnail image
- Title + description
- External link arrow for Figma, Devpost, GitHub, etc.

### Content sources
- PM case studies: UberEats, RBC LEAP, Compass Food Bank, Fellowship
- Technical: HackWestern, TLDW, BrewMates, Email Scraping Bot, Personal Website

Data: `lib/projects-data.ts` → `lib/portfolio/projects-bento-data.ts`

---

## Experience detail pages

### Generic: `/work/[slug]`
Template: `WorkExperiencePageClient`
- Summary, highlights, skills from `work-experience-content.ts`
- Tesla redirects to `/tesla`

### Full case study: `/tesla`
Dedicated page with sections: Overview, Context, Problem, Process, Outcomes, etc.
Data: `lib/portfolio/tesla-case-study.ts`

### Future detail page structure
```text
Title
Role / date / tags
Hero media
Story
What I built
Challenges
Process
Artifacts
What I learned
Related experiences
```

Populate later from separate content. Do not generate full writing here.

---

## Experience card overlay (Work tiles)

Compact caption pattern for future rich cards:

```text
Tesla
Frontend + ML Systems
"When an interface became an infrastructure problem."
Tags: SYSTEMS · ML · ENGINEERING
Abstraction: LEVEL 03 — SYSTEM
```

Each card should show its place in the Architecture abstraction engine with **View in Architecture →** link (planned).

---

## Filters (future — not on Work page currently)

If an Experience Explorer is added later (Architecture or separate section):

```text
ALL · PRODUCT · ENGINEERING · AI · SYSTEMS · DESIGN · COMMUNITY · PROJECTS
```

Also: **ABSTRACTION LEVEL** filter (automation → product).

Work page itself stays unfiltered — full bento always visible.

---

## Media assets

Videos in `public/work/`:
- `autodesk-pm.mp4`, `teslagif.mp4`, `autodesk-eng.mp4`, `Intuit.mp4`, `ServiceNowGif.mp4`, `metaversegroup.mp4`

Registry: `lib/portfolio/experience-videos-data.ts`

Project images in `public/projects/pm/` and `public/projects/technical/`

---

## Interaction model (every experience)

| Action | Behavior |
|--------|----------|
| OPEN | Navigate to detail page or case study |
| ASK | Add experience as Ask context, open side panel |
| VIEW IN ARCHITECTURE | Navigate to relevant abstraction stage |
| RELATED | Highlight connected nodes in graph |

Consistent everywhere: Work tiles, Architecture nodes, Ask reference chips.

---

## Responsive

Desktop: primary experience — full bento grid.

Mobile:
- Convert grid to stacked connected cards
- Preserve vertical connector lines between roles
- Videos remain autoplay muted where supported
- Ask panel → full-width overlay (planned)

---

## What NOT to do

- Do not merge Projects into Work page
- Do not add filter chips to Work page (user decision)
- Do not redesign bento tiles — keep current vibe
- Do not load all videos immediately
