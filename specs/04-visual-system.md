# 04, Visual System

## Typography hierarchy

Four typefaces. Each has a clear job, do not force custom typography everywhere.

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

**Feel:** optimistic, tactile, creative, slightly nostalgic, warm, sophisticated, technological without looking "cyber." Editorial postcard vibe: warm off-white/cream canvas, soft charcoal ink, muted botanical glow.

Avoid highly saturated neon. Avoid purple as dominant accent. No flat beige résumé blocks.

### Canonical botanical palette (`app/portfolio-tokens.css`)

Reference direction: warm golden yellow → pale peach/cream → light icy blue airbrushed gradients; tiny scattered red speckle dots as ambient texture.

| Token | Hex | Role |
|-------|-----|------|
| `--pf-canvas` | `#f5f0e8` | Warm cream/beige page canvas |
| `--pf-surface` | `#faf7f2` | Soft cream cards |
| `--pf-ink` | `#2a2520` | Soft charcoal text |
| `--pf-muted` | `#7a726a` | Warm gray metadata |
| `--pf-gold` | `#e8c547` | Golden yellow accent |
| `--pf-peach` | `#f4b896` | Orange-peach |
| `--pf-orange` | `#e89850` | Warm orange |
| `--pf-cream` | `#faf3e8` | Pale cream |
| `--pf-blue` | `#a8d4e8` | Pale icy blue |
| `--pf-mint` | `#b8e8d4` | Mint green |
| `--pf-green` | `#98d4a8` | Soft green |
| `--pf-accent` | `#e8784a` | Warm amber-orange CTA |
| `--pf-dot` | `rgba(200, 80, 60, 0.35)` | Red speckle dot texture |

Use colors softly rather than as hard blocks.

### Gradient presets

Layered radial gradients, airbrushed blobs, not linear bands:

- `--pf-gradient-warm`, gold → peach → cream
- `--pf-gradient-cool`, blue → mint → green
- `--pf-gradient-botanical`, gold + peach + blue + mint (default atmosphere)
- `--pf-gradient-postcard`, vertical rainbow strip feel for hero/editorial

### Work bento pages

Production Work / Projects use `portfolio-warm` scheme (`PORTFOLIO_DEFAULT_SCHEME`) mapped to `--pf-*` tokens via `--sch-*` aliases in `portfolio-tokens.css`.

---

## Gradients

Should look like ambient light or blurred translucent forms, not conventional linear CSS gradients.

### Qualities
- Very soft edges
- No obvious linear direction
- Overlapping blobs, blurry transitions, organic asymmetry
- Partially transparent layers, subtle grain/noise
- Colors bleeding into one another

### Preferred combinations

| Name | Colors |
|------|--------|
| Warm | gold → peach → pale cream |
| Cool | icy blue → mint → soft green |
| Mixed | gold → peach → cream → pale blue |
| Postcard | peach → gold → mint → icy blue (vertical strip feel) |

### Implementation

Layered radial gradients, not single `linear-gradient()`:

```css
background: var(--pf-gradient-botanical);
/* or manually: */
background:
  radial-gradient(circle at 70% 20%, color-mix(in srgb, var(--pf-gold) 42%, transparent), transparent 40%),
  radial-gradient(circle at 20% 45%, color-mix(in srgb, var(--pf-peach) 36%, transparent), transparent 45%),
  radial-gradient(circle at 60% 80%, color-mix(in srgb, var(--pf-blue) 30%, transparent), transparent 50%),
  radial-gradient(circle at 35% 70%, color-mix(in srgb, var(--pf-mint) 24%, transparent), transparent 40%);
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

Work bento tiles are a fourth variant, existing themed work-exp tiles. Keep for Work and Projects pages.

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

For Architecture hero backgrounds, abstraction stages, Work bento canvas, and optional Ask panel texture, see the **[visuals specs](./visuals/README.md)**, especially [dot-fabric.md](./visuals/dot-fabric.md).

Red speckle dots (`--pf-dot`) appear as CSS radial-gradient texture on canvases; animated DotField uses botanical gold/peach/blue/mint with deterministic red speckles via noise threshold.

---

## Ask panel visual treatment

Uses portfolio design system:
- Warm ivory/cream base for panel background
- Analogue OS for metadata (`JASMINE AGENT`, `ONLINE`, suggested labels)
- Awesome Shorten for conversational description
- Inter for input and body
- Charcoal floating action button
- Not neon-purple cyber styling
