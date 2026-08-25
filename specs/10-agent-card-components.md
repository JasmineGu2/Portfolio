# 10 — Agent Card Components

> Reusable component system for showcasing API and agent architecture on `/architecture`.
> Reference inspiration: agent-builder UIs (config panels, flow nodes, provider chips, featured templates).
> **Portfolio adaptation:** warm sophisticated system cards — not neon-purple cyber aesthetic. See [04 — Visual System](./04-visual-system.md).

---

## Purpose

These components visualize **Jasmine as a generalist agent runtime** — inputs, capabilities, tools, memory, and outputs — using the same visual language as modern agent/API builders, but grounded in portfolio data.

The visitor should feel like they are looking at a **real system diagram**, not a generic AI landing page.

```text
One component family → many layout variants → all driven by shared data
```

---

## Design principles

| Principle | Rule |
|-----------|------|
| **One family** | All variants extend `AgentCard` base — same tokens, borders, typography roles |
| **Warm system aesthetic** | Charcoal surfaces, `--arch-accent` (#e8784a) glow, muted lavender/peach accents — no dominant neon purple |
| **Typography roles** | Analogue OS for labels/metadata · Bootzy for titles · Inter for body · Awesome Shorten for conversational copy |
| **Show structure, not decoration** | Fields, ports, and status badges communicate real architecture |
| **Portfolio-grounded** | Content comes from `capabilities.ts`, `abstraction-engine-data.ts`, `portfolio-data.ts` — not lorem ipsum |
| **Inspectable** | Hover reveals connections; Ask trace mode highlights related cards |

---

## Size tiers

```text
XS   Chip        — provider, tool, tag, status pill
SM   Compact     — single-field input node (User, Model)
MD   Standard    — title + description feature card
LG   Config      — multi-field agent/tool editor panel
XL   Featured    — category-labeled showcase card with accent gradient
2XL  Hub         — central runtime node (Jasmine agent)
```

---

## Component catalog

### 1. `AgentChip` (XS)

**Reference:** Anthropic, Mistral, OpenAI, NVIDIA pills in grid mockup.

**Use for:** Tool names, model providers, capability tags, status indicators, category labels.

| Field | Required | Example |
|-------|----------|---------|
| `label` | yes | `OpenAI` |
| `icon` | no | provider logo or lucide icon |
| `variant` | no | `default` · `accent` · `muted` · `status` |
| `status` | no | `online` · `idle` · `running` |
| `href` | no | link to tool docs or Work tile |

**Layout**
- Height: ~28–32px
- Horizontal pill, icon left, label center-left
- Optional trailing dot or `×` for removable context chips
- Border: 1px `--arch-dark-line`
- Selected state: warm accent outline

**Architecture usage**
- Tool Registry list items
- Capability status tags on runtime cards
- Ask context chips (already partially built)

---

### 2. `AgentInputNode` (SM)

**Reference:** User card + Model card in flow diagram (left side).

**Use for:** Single-input flow nodes — user message, model selector, trigger, context source.

| Field | Required | Example |
|-------|----------|---------|
| `type` | yes | `user` · `model` · `trigger` · `context` |
| `title` | yes | `User` |
| `content` | no | `"Explain the benefits of cloud infrastructure."` |
| `avatar` | no | icon or initials |
| `config` | no | slider rows for model params |
| `portOut` | no | right-side connection port id |

**Layout**
- Width: 200–260px
- Rounded rect, dark surface `--arch-dark-surface`
- Header row: avatar + title (Analogue OS, uppercase micro)
- Body: 1–3 lines content or config bars
- Right edge: glowing port dot for flow connectors

**Architecture usage**
- Experience Inputs section — each experience as an input node feeding Jasmine
- Optional "User question" node in runtime loop demo
- Ask panel could reuse SM variant for query preview

---

### 3. `AgentFeatureCard` (MD)

**Reference:** Content Search, Code Debugger, API Integration, Doc Assistant cards.

**Use for:** Capability summaries, tool categories, memory modules, output types.

| Field | Required | Example |
|-------|----------|---------|
| `title` | yes | `Understand` |
| `description` | yes | `Find the real problem before deciding what to build.` |
| `category` | no | `CAPABILITY` |
| `icon` | no | lucide icon |
| `href` | no | link to Work evidence |
| `status` | no | `ACTIVE` |
| `traced` | no | boolean — warm outline when Ask trace active |

**Layout**
- Width: 240–320px (flexible in grid)
- Title: Bootzy or Inter semibold
- Description: 2–3 lines max, muted ink
- Optional footer: status chip + arrow link
- Hover: subtle border brighten, no aggressive glow

**Architecture usage**
- Capability modules (replaces/extends current `arch-cap-card`)
- Memory module cards
- Output type cards
- Tool category preview cards

---

### 4. `AgentConfigPanel` (LG)

**Reference:** Agent panel with Role, Language Model, Tools, Input Message fields.

**Use for:** The "inspect the agent" view — shows how Jasmine is configured as a system.

| Field | Required | Example |
|-------|----------|---------|
| `title` | yes | `Agent` |
| `icon` | no | robot / user icon |
| `status` | no | `{ label: 'ONLINE', duration?: '13s' }` |
| `fields` | yes | array of field rows (see below) |
| `portIn` / `portOut` | no | connection port ids |

**Field row schema**

```ts
type AgentFieldRow = {
  id: string
  label: string           // "Role", "Language Model", "Tools"
  required?: boolean
  value?: string          // display text
  placeholder?: string
  action?: 'link' | 'add' | 'edit' | 'none'
  items?: string[]        // for "2 added" tool list
}
```

**Layout**
- Width: 320–400px
- Header: icon + title + status badge (green dot + duration)
- Body: stacked labeled rows, each row = label + value/input area + action icon
- Rows separated by `--arch-dark-line`
- Required fields marked with `*`
- Footer optional: Response port with accent glow

**Example content (Jasmine runtime)**

```text
Role          Product-minded generalist agent
Model         Claude · GPT (portfolio-grounded)
Tools         6 capabilities · 24 tools
Input         Experience streams + user questions
Context       CS × Business · Engineering → Product
Status        ● ONLINE
```

**Architecture usage**
- Hero optional mini agent window
- Jasmine Runtime central node (expanded view)
- Abstraction level "Agent state" blocks (replaces current `arch-agent-state`)
- Ask side panel shares field-row pattern

---

### 5. `AgentFeaturedCard` (XL)

**Reference:** Basic Prompting, Basic Agent cards with PROMPTING / AGENTS category labels and gradient corner.

**Use for:** Highlighted templates, key narrative moments, section anchors.

| Field | Required | Example |
|-------|----------|---------|
| `category` | yes | `AGENTS` · `PROMPTING` · `RUNTIME` · `MEMORY` |
| `title` | yes | `Jasmine Runtime` |
| `description` | yes | max 3 lines |
| `accent` | no | `warm` · `cool` · `mixed` — gradient corner variant |
| `href` | no | CTA link |
| `featured` | no | boolean — larger scale |

**Layout**
- Width: 360–480px
- Category label: Analogue OS, uppercase, top-left
- Title: Bootzy, large
- Description: Inter, muted
- Bottom-right: soft radial gradient blob (warm orange → peach → cream at 15% opacity)
- Optional: subtle dot fabric layer behind card

**Architecture usage**
- Section intro cards ("Limitless Control" equivalent → "I kept zooming out")
- Featured capability or project spotlight
- Memory / Community featured entries

---

### 6. `AgentHubNode` (2XL)

**Reference:** Central Agent card in flow diagram with Prompt, Model, Role, Tools, Response rows.

**Use for:** The central Jasmine node in runtime graph — the orchestrator everything connects to.

| Field | Required | Example |
|-------|----------|---------|
| `name` | yes | `JASMINE` |
| `type` | yes | `GENERALIST AGENT` |
| `description` | yes | Awesome Shorten conversational copy |
| `statusTags` | no | `['PRODUCT', 'ENGINEERING', 'AI', 'SYSTEMS']` |
| `fields` | no | condensed config rows |
| `connections` | no | array of `{ port, targetId, label }` |

**Layout**
- Width: 400–520px
- Prominent center position in graph layout
- Combines `AgentConfigPanel` header + `AgentFeatureCard` description
- Surrounded by 4–6 connection ports (top, right, bottom, left)
- Active/hovered port: `--arch-accent` glow pulse (slow, once)

**Architecture usage**
- Section 03 — Jasmine Runtime (primary)
- Flow diagram center in "Run, Share and Collaborate" style section

---

### 7. `AgentOutputNode` (MD–LG)

**Reference:** "Responding…" Researcher response card on right side of flow.

**Use for:** Agent outputs — products, decisions, experiments, responses.

| Field | Required | Example |
|-------|----------|---------|
| `role` | no | `Researcher` · `Builder` · `PM` |
| `status` | no | `responding` · `complete` · `idle` |
| `content` | yes | response text or output summary |
| `portIn` | no | left connection from hub |
| `examples` | no | bullet list |

**Layout**
- Width: 300–400px
- Status label above card: "Responding…" (Analogue OS, animated ellipsis optional)
- Avatar + role in header
- Body: Inter, 3–5 lines
- Left port dot connects from hub
- Complete state: status fades, accent glow settles

**Architecture usage**
- Outputs section
- Ask response preview (shared pattern with AgentSidePanel)
- Runtime loop "Learn" → output demonstration

---

### 8. `AgentFlowConnector`

**Reference:** Curved purple lines with glowing nodes between cards.

**Use for:** Visual connections in graph/flow layouts — not a card, but part of the system.

| Prop | Type | Notes |
|------|------|-------|
| `from` | `{ x, y, portId }` | source port |
| `to` | `{ x, y, portId }` | target port |
| `active` | boolean | trace/hover highlight |
| `animated` | boolean | slow dash offset when data "flows" |

**Visual**
- Stroke: 1.5px, `--arch-accent` at 40% opacity (inactive), 80% (active/trace)
- Port dot: 8px circle, warm glow
- Curve: cubic bezier, not straight lines
- Reduced motion: static lines, no animation

**Architecture usage**
- Experience Inputs → Jasmine hub
- Jasmine hub → Capability modules
- Jasmine hub → Outputs
- Ask trace mode animates full path

---

### 9. `AgentStateBlock` (SM, inline)

**Reference:** Agent state dl block inside abstraction level sections.

**Use for:** Per-level agent metadata at each abstraction stage.

| Field | Required | Example |
|-------|----------|---------|
| `role` | yes | `Automation Builder` |
| `abstraction` | yes | `AUTOMATION` |
| `task` | yes | `Remove repetitive friction` |
| `input` | yes | `Manual workflow` |
| `unlocked` | no | `{ keyword, meaning }` |

**Layout**
- Width: 100% of parent (sidebar column)
- Dark inset panel within light editorial section (hybrid card pattern)
- Analogue OS label + value pairs
- Compact — fits beside experience cards in abstraction scroll

**Architecture usage**
- Section 02 — each abstraction level's "Agent state" block
- Already partially built as `arch-agent-state` — migrate to component

---

## Layout compositions

These are **arrangements** of the components above, not new primitives.

### Composition A — Provider grid

```text
[Chip] [Chip] [Chip] [Chip]
[Chip] [Chip] [Featured XL] [Featured XL]
[MD]   [MD]   [MD]
```

**Use:** Tool Registry, capabilities overview gallery
**Reference:** "Limitless Control" screenshot grid

---

### Composition B — Horizontal flow

```text
[InputNode SM] ──→ [HubNode 2XL] ──→ [OutputNode LG]
[InputNode SM] ──↗
```

**Use:** Runtime loop demo, Ask query → response visualization
**Reference:** "Run, Share and Collaborate" screenshot

---

### Composition C — Radial runtime

```text
         [Cap MD]
[Cap MD] [Hub 2XL] [Cap MD]
         [Cap MD]
    [Cap MD]   [Cap MD]
```

**Use:** Jasmine Runtime section (current layout, componentized)
**Reference:** Central agent + surrounding modules

---

### Composition D — Vertical abstraction stack

```text
[Editorial exp cards] + [AgentStateBlock SM]
         ↓ connector
[Editorial exp cards] + [AgentStateBlock SM]
         ↓
       ...
```

**Use:** Abstraction engine scroll sections
**Reference:** Zoom-out narrative with agent state at each level

---

## Shared props (base interface)

```ts
type AgentCardBase = {
  id: string
  className?: string
  variant?: 'light' | 'dark' | 'hybrid'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  highlighted?: boolean   // Ask trace
  selected?: boolean
  onClick?: () => void
  href?: string
  'data-agent-id'?: string  // for trace + scroll targeting
}
```

---

## Visual tokens (system cards)

```css
--agent-surface:        var(--arch-dark-surface);   /* #1c1916 */
--agent-surface-raised: #242018;
--agent-border:         var(--arch-dark-line);
--agent-ink:            #f5f0ea;
--agent-muted:          color-mix(in srgb, #fff 45%, transparent);
--agent-accent:         var(--arch-accent);         /* #e8784a */
--agent-accent-glow:    rgba(232, 120, 74, 0.25);
--agent-status-online:  #4ade80;
--agent-radius-sm:      0.5rem;
--agent-radius-md:      0.75rem;
--agent-radius-lg:      1rem;
--agent-port-size:      8px;
```

Light/hybrid variants use `--arch-surface` + `--arch-ink` for editorial sections.

---

## File structure (implementation)

```text
components/portfolio/agent-cards/
  AgentCard.tsx              ← base wrapper + variant dispatch
  AgentChip.tsx
  AgentInputNode.tsx
  AgentFeatureCard.tsx
  AgentConfigPanel.tsx
  AgentFeaturedCard.tsx
  AgentHubNode.tsx
  AgentOutputNode.tsx
  AgentStateBlock.tsx
  AgentFlowConnector.tsx
  AgentFlowCanvas.tsx          ← composes nodes + connectors
  agent-cards.css              ← shared tokens + sizes
  types.ts                     ← shared prop interfaces
  index.ts                     ← exports
```

---

## Mapping to Architecture page

| Page section | Components | Composition |
|--------------|------------|-------------|
| Hero | `AgentConfigPanel` (mini), `AgentChip` | Optional inline agent window |
| Abstraction levels | `AgentStateBlock`, editorial exp cards | D — vertical stack |
| Jasmine Runtime | `AgentHubNode`, `AgentFeatureCard`, `AgentFlowConnector` | C — radial |
| Tool Registry | `AgentChip`, `AgentFeatureCard` | A — grid |
| Experience Inputs | `AgentInputNode`, `AgentFlowConnector` | B — inputs → hub |
| Memory | `AgentFeatureCard` (light/hybrid) | A — 3-column |
| Outputs | `AgentOutputNode`, `AgentFeatureCard` | B — hub → outputs |
| Runtime loop | `AgentChip` (steps), `AgentFlowConnector` | B — linear flow |
| Final stack | `AgentFeaturedCard` (XL) × 6 levels | Vertical list |

---

## Motion & interaction

| Interaction | Behavior |
|-------------|----------|
| Hover card | Border brightens, subtle lift (1px translateY) |
| Hover port | Accent glow, show connection preview line |
| Ask trace | Traced cards get `--traced` outline, connectors animate |
| Scroll reveal | Cards fade up 12px, stagger 80ms in grids |
| Config panel | Fields type-in effect on first viewport entry (optional, once) |
| Reduced motion | No port pulse, no flow animation, static connectors |

---

## Migration from current CSS

Current Architecture page uses bespoke classes. Migrate incrementally:

| Current | Target component |
|---------|------------------|
| `arch-cap-card` | `AgentFeatureCard` (MD, dark) |
| `arch-input-card` | `AgentInputNode` (SM) or hybrid `AgentFeatureCard` |
| `arch-jasmine-node` | `AgentHubNode` (2XL) |
| `arch-agent-state` | `AgentStateBlock` (SM) |
| `arch-output-card` | `AgentOutputNode` or `AgentFeatureCard` |
| `arch-memory-card` | `AgentFeatureCard` (light/hybrid) |
| `arch-tag` | `AgentChip` (XS) |
| `arch-tools__item` | `AgentChip` (XS) |

Keep existing CSS working until each section is migrated. New sections use components only.

---

## Build phases

| Phase | Deliverable |
|-------|-------------|
| **A** | `types.ts`, base `AgentCard`, tokens in `agent-cards.css` |
| **B** | XS + SM + MD variants (Chip, InputNode, FeatureCard) |
| **C** | LG + 2XL (ConfigPanel, HubNode) + StateBlock |
| **D** | FlowConnector + FlowCanvas |
| **E** | Migrate Runtime + Experience Inputs sections |
| **F** | Migrate Abstraction agent states + Tool Registry |
| **G** | Ask trace integration across all card variants |

---

## Do / Don't

**Do**
- Ground every field in real portfolio data
- Use Analogue OS for system labels (`ROLE`, `TOOLS`, `STATUS`)
- Keep descriptions ≤ 3 lines on MD/XL cards
- Show connection ports on flow-layout cards
- Support `highlighted` / `traced` prop from `PortfolioStateContext`

**Don't**
- Use neon purple as dominant accent
- Add glassmorphism to every card
- Show fake LLM provider logos without context
- Make cards pure decoration — every field should map to real capability/input/output
- Create separate unrelated components per section — extend the family

---

## Related specs

- [04 — Visual System](./04-visual-system.md) — typography, card families, light/dark rhythm
- [06 — Agent Architecture Page](./06-agent-architecture-page.md) — section content and narrative
- [07 — Ask Side Agent](./07-ask-side-agent.md) — trace highlighting, shared field patterns
- [Dot Fabric Visual](./visuals/dot-fabric.md) — ambient backgrounds behind featured/hub cards
