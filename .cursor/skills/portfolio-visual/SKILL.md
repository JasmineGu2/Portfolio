---
name: portfolio-visual
description: >-
  Applies the Jasmine Gu portfolio visual system, typography roles, warm
  palette, light/dark section rhythm, card families, gradients, and motion.
  Use when styling portfolio pages, bento tiles, Architecture sections, Ask
  panel, case studies, CSS, or when the user asks about visual look, design,
  fonts, colors, or polish.
---

# Portfolio Visual System

Read `specs/04-visual-system.md` for full spec. Animated surfaces: `specs/visuals/` (dot fabric: `specs/visuals/dot-fabric.md`).

## Quick reference

```text
Bootzy           = story / editorial titles
Awesome Shorten  = personality / conversational copy
Analogue OS      = system UI / metadata / status
Inter            = utility / body / nav / buttons
```

Utility classes in `app/portfolio-fonts.css`: `.font-bootzy`, `.font-awesome-shorten`, `.font-analogue`.

## Feel

Optimistic, tactile, creative, slightly nostalgic, warm, sophisticated, technological without looking "cyber."

**Never:** neon-purple AI aesthetic, saturated neon, purple as dominant accent, glassmorphism everywhere, generic portfolio animations.

## Page scope

| Area | Visual treatment |
|------|------------------|
| **Architecture** (`app/architecture/`, `architecture.css`) | Full visual system, warm palette, light/dark rhythm, editorial + system cards |
| **Work / Projects bento** | `portfolio-warm` scheme, botanical `--pf-*` tokens via `--sch-*` |
| **Ask panel** | Warm ivory/cream base, Analogue OS metadata, Awesome Shorten description, Inter input, charcoal FAB |
| **Case studies** | Editorial cards + hybrid cards where story meets system |

Do not restyle Work bento to a different palette unless the user explicitly requests migration.

## Color tokens

Canonical tokens in `app/portfolio-tokens.css`:

```text
--pf-canvas     #f5f0e8   warm cream/beige canvas
--pf-surface    #faf7f2   soft cream cards
--pf-ink        #2a2520   soft charcoal
--pf-muted      #7a726a   warm gray
--pf-gold       #e8c547   golden yellow
--pf-peach      #f4b896   orange-peach
--pf-orange     #e89850   warm orange
--pf-cream      #faf3e8   pale cream
--pf-blue       #a8d4e8   pale icy blue
--pf-mint       #b8e8d4   mint green
--pf-green      #98d4a8   soft green
--pf-accent     #e8784a   warm amber-orange
--pf-dot        rgba(200, 80, 60, 0.35)  red speckle texture
```

Architecture page also uses `--arch-*` aliases in `app/architecture/architecture.css` (mapped to `--pf-*`).

Use colors softly, translucent lines via `color-mix(in srgb, ...)`, not hard saturated blocks. **No purple/cyber accents.**

## Light vs dark rhythm (Architecture)

Alternate to avoid "developer tool" monotony:

| Light | Dark (inside the runtime) |
|-------|---------------------------|
| Hero, zoom-out narrative, memory, community | Jasmine Runtime, capabilities graph, tool registry, experience inputs, agent loop, outputs |

Apply via `.arch-section--light` / `.arch-section--dark`.

## Card families

1. **Editorial**, warm white/cream, subtle border, generous spacing, Bootzy titles, Inter body. For stories, photos, narrative.
2. **System**, charcoal/near-black, thin gray borders, Analogue OS, status metadata (`ONLINE`, `RUNNING`), restrained accent glow. For agents, tools, runtime.
3. **Hybrid**, warm off-white card with a system metadata block inside. Motif: human experience → system capability.
4. **Work bento tiles**, existing themed work-exp tiles; do not replace with Architecture cards.

## Gradients

Layered radial gradients, ambient light blobs, not obvious `linear-gradient()`:

```css
background: var(--pf-gradient-botanical);
```

Qualities: soft edges, low opacity, subtle grain, slow movement. Never obscure text readability.

## Motion

**Use:** scroll reveals, graph line drawing, subtle hover highlights, gentle gradient drift, Ask cross-page tile highlight, agent panel slide-in.

**Avoid:** aggressive parallax, constant pulsing, giant gradients everywhere, bright neon.

Motion should feel slow, deliberate, and system-like.

## Implementation checklist

When adding or editing visual UI:

1. Pick the correct font role, do not use Bootzy for body copy or Inter for system status labels.
2. Match page scope, Architecture tokens vs bento `--sch-*` tokens.
3. Pick card family, editorial, system, hybrid, or bento tile.
4. Respect light/dark rhythm on Architecture sections.
5. Use existing CSS files before inventing new token names:
   - `app/portfolio-fonts.css`, font faces + utilities
   - `app/architecture/architecture.css`, Architecture page
   - `app/portfolio-theme.css`, shared theme, agent panel, bento shell
6. Reuse component patterns from `components/portfolio/architecture/ArchitecturePageClient.tsx` and `components/portfolio/agent/AgentSidePanel.tsx`.

## Ask panel styling

Classes in `app/portfolio-theme.css` under `.agent-*`:

- Warm ivory/cream panel background
- `.font-analogue` for eyebrow, status, metadata
- `.font-awesome-shorten` for conversational description
- Inter for input and response body
- Charcoal FAB, not neon purple

## Photography & media (Work / Projects)

Mix interfaces, photos, sketches, artifacts, not every tile should be a UI screenshot.

Videos: autoplay muted when visible, pause off-screen (Intersection Observer), poster + lazy load, limit simultaneous autoplay.

## Dot fabric (optional)

Architecture hero, abstraction stages, Work bento canvas (CSS speckle), Ask panel (subtle CSS). Animated surface: `components/visuals/DotField/`, botanical colors + red speckles. See `specs/visuals/dot-fabric.md`. Use sparingly.
