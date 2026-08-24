# 01 — Product Overview

## One-line concept

**Jasmine is the agent. Her experiences are the training data, tools, memory, and runtime that shape how she works.**

The portfolio visualizes:

```text
experience → capabilities → reasoning → outputs
```

The AI chat is **secondary**. The pages themselves tell the story without requiring the visitor to type anything.

---

## The thesis

> **I kept zooming out.**

Career progression as increasing levels of abstraction:

```text
AUTOMATION
    ↓
ZERO → ONE
    ↓
INTERFACE
    ↓
SYSTEM
    ↓
PLATFORM
    ↓
PRODUCT
```

Each experience expanded the level at which Jasmine understands and builds products — not a random collection of roles.

---

## What the visitor should leave understanding

1. Jasmine started as a builder.
2. She became interested in the systems underneath interfaces.
3. She progressively worked at deeper and broader abstraction layers.
4. That led toward platform product and AI.
5. Engineering is still part of how she thinks.
6. Projects, communities, curiosity, and personality are part of the infrastructure behind her work.
7. The side agent lets visitors query this system after they understand the main story.

---

## Three views, one data layer

```text
                    ┌─────────────────┐
                    │  Shared Data    │
                    │  experiences    │
                    │  projects       │
                    │  graph          │
                    │  capabilities   │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
     WORK (/)          ARCHITECTURE       ASK (side panel)
     Evidence          Background          Query
     Bento tiles       Agent runtime       Explore Work
```

### Work — the backbone
Jobs, internships, case study links. What recruiters scan first. Default landing at `/`.

### Architecture — the background
The agent architecture narrative. Why the diverse background makes sense. Lives at `/architecture`. Not called "Story" — it is the **architecture of the agent**.

### Ask — the query layer
Floating side panel to explore Work (and reference Architecture paths). Not a primary nav destination.

### Projects — separate evidence
PM case studies and technical builds at `/projects`. Same bento vibe as Work but its own page.

---

## Two worlds merging

The site should feel like two worlds overlapping:

| Human world | System world |
|-------------|--------------|
| Warm, editorial, photographic | Structured, technical, precise |
| Playful, curious, imperfect | Connected, agent-like |
| Bootzy + Awesome Shorten | Analogue OS metadata |

**Goal aesthetic:** a creative studio designed an AI operating system for one person — not a developer recreated an AI SaaS dashboard.

---

## Important constraint

Do **not** make this a website about an AI agent.

The agent architecture is a **metaphor for Jasmine's story**. Ask helps exploration; it does not replace Work or Architecture as the primary storytelling mechanism.

---

## Content integrity

Do not invent:

- Work experiences
- Metrics
- Technologies not in data
- Personal projects (use `PROJECT_DATA_REQUIRED` placeholders)
- Community roles (use placeholders)
- Opinions or hobbies not in structured data

If information is unavailable, respond naturally: *"I don't have that in Jasmine's portfolio yet."*
