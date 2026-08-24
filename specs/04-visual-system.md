# 04 — Visual System

## Typography hierarchy

Four typefaces. Each has a clear job — do not force custom typography everywhere.

| Font | Role | Use for |
|------|------|---------|
| **Bootzy** | Story / editorial | Major section titles, hero statements, oversized labels (`JASMINE RUNTIME`, `MEMORY`, `OUTPUTS`) |
| **Awesome Shorten** | Human / personality | Conversational copy, pull quotes, memory sections, playful microcopy |
| **Analogue OS** | System / agent UI | Agent cards, node titles, metadata, status (`ONLINE`, `RUNNING`), timestamps, tool names |
| **Inter** | Utility / default | Body copy, nav, buttons, filters, longer descriptions, accessibility-sensitive UI |

```text
Bootzy           = story
Awesome Shorten  = personality
Analogue OS      = system
Inter            = utility
```

### Font files

Located in `public/fonts/`:
- `BootzyTM.woff2`
- `AnalogueOS-Regular.woff2`
- `Awesome-Shorten-BF6781e4db99e2b.ttf`

Wired in `app/portfolio-fonts.css` with utility classes: `.font-bootzy`, `.font-awesome-shorten`, `.font-analogue`

---

## Color direction

Move away from black + neon-purple AI aesthetic.

**Feel:** optimistic, tactile, creative, slightly nostalgic, warm, sophisticated — technological without looking "cyber."

Avoid highly saturated neon. Avoid purple as dominant accent.

### Base palette tokens

```text
canvas        warm ivory / off-white
surface       soft cream
surfaceAlt    very pale gray-lilac
ink           near-black
mutedInk      warm gray
line          translucent gray
peach         soft peach-pink
orange        warm amber-orange
lavender      muted lavender
sky           powder blue
yellow        pale warm yellow
```

Use colors softly rather than as hard blocks.

### Work bento pages

Currently use existing bento color scheme system (`PORTFOLIO_PAGE_SCHEME`, `--sch-*` tokens). Visual system upgrade applies to Architecture page first; Work bento keeps current scheme until intentionally migrated.

---

## Gradients

Should look like ambient light or blurred translucent forms — not conventional linear CSS gradients.

### Qualities
- Very soft edges
- No obvious linear direction
- Overlapping blobs, blurry transitions, organic asymmetry
- Partially transparent layers, subtle grain/noise
- Colors bleeding into one another

### Preferred combinations

| Name | Colors |
|------|--------|
| Warm | orange → peach → pale cream |
| Cool | powder blue → lavender → soft gray |
| Mixed | warm orange → dusty pink → lavender → pale blue |
| Sunset | yellow-orange → salmon → soft pink → cream |

### Implementation

Layered radial gradients, not single `linear-gradient()`:

```css
background:
  radial-gradient(circle at 70% 20%, warm orange, transparent 40%),
  radial-gradient(circle at 20% 45%, dusty pink, transparent 45%),
  radial-gradient(circle at 60% 80%, pale blue, transparent 50%),
  radial-gradient(circle at 35% 70%, lavender, transparent 40%);
```

Then: large blur, low opacity, subtle grain, slow movement.

### Organic gradient objects

Floating soft abstract 3D light forms as visual anchors:
- Behind Architecture hero, Jasmine agent node, capability cards, memory sections
- Never make text difficult to read
- Sparingly placed

---

## Light vs dark sections

Majority of portfolio uses **light editorial canvas**. Selectively enter **dark system sections** when visitor is "inside the runtime."

| Light sections | Dark sections |
|----------------|---------------|
| Architecture hero | Jasmine Runtime |
| Zoom-out narrative | Capabilities graph |
| Memory (personal) | Tool Registry |
| Community | Experience inputs (system view) |
| Work bento (current) | Agent loop, outputs |

Rhythm prevents the whole page from feeling like a developer tool.

---

## Card families

### Editorial cards
**Use for:** experiences as stories, photos, personal content, Architecture narrative sections.

- Warm white / cream
- Very subtle border, rounded corners, generous spacing
- Large photography or visual element
- Bootzy / Inter typography

### System cards
**Use for:** agents, capabilities, tools, runtime information.

- Charcoal / near-black
- Thin gray borders, Analogue OS typography
- Tiny status metadata, subtle glow, restrained color accents

### Hybrid cards
**Use for:** where human story meets system (important motif).

Example: warm off-white card containing `TESLA` with a technical agent-style metadata block inside.

Represents: **human experience → system capability**

Work bento tiles are a fourth variant — existing themed work-exp tiles. Keep for Work and Projects pages.

---

## Photography & media

Mix interfaces, photos, editorial cards, colors, objects, and text.

Experiences can include: screenshots, prototypes, diagrams, photographs, environments, notebook sketches, physical objects, project artifacts.

**Do not** make every experience a UI screenshot.

### Video behavior (Work / Projects)
- Autoplay muted when visible
- Pause when off-screen (Intersection Observer)
- Poster images, lazy loading
- Limited simultaneous autoplay
- Mobile fallbacks

---

## Motion

### Use
- Scroll-based reveals
- Line drawing between graph nodes
- Subtle node highlights on hover
- Gentle gradient movement
- Cross-page highlighting from Ask
- Agent panel slide-in
- Filter transitions

### Avoid
- Aggressive parallax
- Constant pulsing
- Giant gradients everywhere
- Bright neon
- Glassmorphism on every card
- Generic portfolio animations

Motion should feel **slow, deliberate, and system-like**.

---

## Dot fabric visual (optional)

For Architecture hero backgrounds and ambient system surfaces, see **[09 — Dot Fabric Visual](./09-dot-fabric-visual.md)**.

A reusable animated surface made from small circular pixels as a continuous deforming fabric — computational, spatial, not random particles. Used sparingly behind Architecture and runtime sections.

---

## Ask panel visual treatment

Uses portfolio design system:
- Warm ivory/cream base for panel background
- Analogue OS for metadata (`JASMINE AGENT`, `ONLINE`, suggested labels)
- Awesome Shorten for conversational description
- Inter for input and body
- Charcoal floating action button
- Not neon-purple cyber styling
