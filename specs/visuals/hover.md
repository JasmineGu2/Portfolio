Inspo: ![[Screenshot 2026-08-24 at 6.57.59 AM.png]]

The stack can represent what the agent is currently “holding in context.” Each slab is one layer of context, and hovering a slab highlights the corresponding tiles/cards elsewhere in the Ask experience.

Think of it as:

> **Agent Context Stack**

A small visual object that says: “These are the layers the agent is reasoning across right now.”

### Visual structure

Use 4–6 stacked isometric slabs, compact enough to sit directly above the chat input.

For your portfolio, the slabs could be:

```text
PRODUCT
PLATFORM
SYSTEM
INTERFACE
EXPERIENCE
PERSONAL CONTEXT
```

Or, if you want it tied more directly to the current query:

```text
CURRENT TASK
EXPERIENCES
SYSTEM CONCEPTS
TOOLS
PERSONAL CONTEXT
MEMORY / CONTEXT
```

I think the second version is stronger for the agent.

The stack is not chronology. It is **active context**.

---

### How it should behave

Default state:

```text
small isometric stack
all layers visible
slight vertical separation
one layer subtly active
```

Above or beside it:

```text
JASMINE AGENT
CONTEXT: 5 SOURCES
MODE: COMPARE
```

When nothing is hovered, the full stack feels unified.

When the user hovers one slab, that layer pulls outward horizontally by about `10–14px`.

Example:

```text
      CURRENT TASK
     EXPERIENCES
        SYSTEMS   ← pulled outward
          TOOLS
 PERSONAL CONTEXT
```

At the same time, all UI tiles associated with `SYSTEMS` become highlighted.

So if the page currently has tiles like:

```text
APIs
Data Pipelines
Contracts
Dependencies
AI Evaluation
Prototypes
```

hovering the **SYSTEMS** layer might highlight:

```text
APIs
Data Pipelines
Contracts
Dependencies
```

Everything else dims slightly.

That is the important interaction.

The stack acts like a **legend + filter + agent state visualization**.

---

## Above-chat composition

I’d structure the Ask area like this:

```text
┌─────────────────────────────────────────────┐

               JASMINE AGENT
         ROLE        PRODUCT / AI
         MODE        EXPLAIN
         CONTEXT     7 ITEMS

              [ context stack ]

        EXPERIENCE      SYSTEMS
       [ Tesla ]        [ APIs ]
       [ Intuit ]       [ Data ]
       [ Autodesk ]     [ Contracts ]

        TOOLS           TOPICS
       [ Figma ]        [ AI ]
       [ React ]        [ Platform ]

┌─────────────────────────────────────────────┐
│ Ask about my work...                    +  │
└─────────────────────────────────────────────┘

  Explain      Compare      Trace      Show Me
```

The stack is the visual centerpiece immediately above the context tiles.

---

# Context stack spec

Keep it compact.

```text
width: 150–210px
height: 120–160px
slab width: 120–160px
slab depth: 36–48px
slab thickness: 10–14px
vertical separation: 5–7px
```

You should be able to understand it at a glance without it becoming an illustration.

No realistic 3D.

No shadows beyond perhaps a very soft ambient one.

It should feel like a system diagram.

---

## Layer model

Each slab maps to actual context data.

```ts
type AgentContextLayer = {
  id: string;
  label: string;
  count: number;

  itemIds: string[];

  active?: boolean;
};
```

Example:

```ts
const layers = [
  {
    id: "task",
    label: "TASK",
    count: 1,
    itemIds: ["compare-tesla-autodesk"]
  },

  {
    id: "experiences",
    label: "EXPERIENCES",
    count: 3,
    itemIds: [
      "tesla",
      "autodesk-swe",
      "autodesk-pm"
    ]
  },

  {
    id: "systems",
    label: "SYSTEMS",
    count: 4,
    itemIds: [
      "apis",
      "contracts",
      "data-pipelines",
      "dependencies"
    ]
  },

  {
    id: "tools",
    label: "TOOLS",
    count: 5,
    itemIds: [
      "react",
      "typescript",
      "figma",
      "python",
      "chatgpt"
    ]
  },

  {
    id: "personal",
    label: "CONTEXT",
    count: 2,
    itemIds: [
      "toronto",
      "cs-business"
    ]
  }
];
```

This is what makes the graphic meaningful rather than decorative.

---

# Hover interaction

On layer hover