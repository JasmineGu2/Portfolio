# 03, Data Model

## Principle

**One source of truth.** Every experience ID (`tesla`, `autodesk`, etc.) must represent the same entity in Work, Architecture, Ask, filters, links, and highlighted nodes.

Primary file: `lib/portfolio/portfolio-data.ts`

Legacy files still in use during migration:
- `lib/portfolio/experience-cards-data.ts`
- `lib/portfolio/projects-bento-data.ts`
- `lib/projects-data.ts`

Goal: all views read from `portfolio-data.ts`; legacy files become thin adapters or are removed.

---

## Core type: `PortfolioItem`

```ts
type PortfolioItem = {
  id: string
  kind: 'experience' | 'project'

  // Display
  title: string
  subtitle: string
  role?: string
  period?: string
  category: string
  description: string
  tags: string[]

  // Navigation
  href: string
  external?: boolean

  // Media
  video?: string
  image?: string
  logo?: string

  // Architecture integration
  abstractionLevels: AbstractionLevel[]
  categories: PortfolioCategory[]
  capabilities: string[]       // Understand, Build, Scale, etc.
  relatedIds: string[]

  // Bento layout (when applicable)
  gridPlacement?: { col: string; row: string }
  variant?: 'dark' | 'light' | 'muted' | 'accent'
  featured?: boolean

  // Ask integration
  chatbotQuestions?: string[]
}
```

---

## Abstraction levels

```ts
type AbstractionLevel =
  | 'automation'      // Metaverse, ServiceNow
  | 'zero-to-one'     // Stealth startup, Hack Western
  | 'interface'       // Intuit
  | 'system'          // Tesla
  | 'platform'        // Autodesk SWE
  | 'product'         // Autodesk PM
```

### Experience → level mapping

| Experience | Level(s) |
|------------|----------|
| Metaverse Group | automation |
| ServiceNow / OMERS | automation |
| Stealth Startup (LaurelSpace) | zero-to-one |
| Hack Western | zero-to-one |
| Intuit | interface |
| Tesla | system |
| Autodesk SWE | platform |
| Autodesk PM | product |
| IPS Fellowship | product |
| Western / Ivey | education (no architecture stage) |

---

## Categories (for filtering & Ask context)

```ts
type PortfolioCategory =
  | 'product'
  | 'engineering'
  | 'ai'
  | 'systems'
  | 'design'
  | 'startup'
  | 'community'
  | 'project'
  | 'education'
```

---

## Graph model (`lib/portfolio/graph.ts`)

Each node:

```ts
type GraphNode = {
  id: string
  nodeType: 'experience' | 'capability' | 'tool' | 'memory' | 'project' | 'community' | 'output'
  title: string
  description: string
  connections: string[]   // IDs of related nodes
}
```

Connections visible on hover (planned). Example: hovering `Tesla` highlights Build, Scale, Systems, React, Autodesk SWE.

---

## Capability modules (`lib/portfolio/capabilities.ts`)

Six modules surrounding the central Jasmine agent node:

| ID | Title | Evidence |
|----|-------|----------|
| understand | Understand | Autodesk PM, ServiceNow, Tesla |
| build | Build | Autodesk SWE, Tesla, Intuit, projects |
| connect | Connect | Autodesk PM, CS + Business, cross-functional |
| experiment | Experiment | Autodesk prototypes, AI workflows, projects |
| scale | Scale | Autodesk Libraries, Tesla ML tooling |
| decide | Decide | ADP Studio, AI workflows, platform product |

Each module schema:

```ts
type CapabilityModule = {
  id: string
  title: string
  description: string
  inputs: string[]
  evidence: string[]
  status: 'ACTIVE' | 'INACTIVE'
}
```

---

## Experience detail schema (for `/work/[slug]` and case studies)

```ts
type ExperienceDetail = {
  id: string
  company: string
  role: string
  period: string
  type: string[]
  oneLineSummary: string
  problems: string[]
  built: string[]
  learned: string
  capabilities: string[]
  technologies: string[]
  relatedNodes: string[]
  media?: { type: 'video' | 'image'; src: string; poster?: string }[]
}
```

Tesla uses dedicated case study data in `lib/portfolio/tesla-case-study.ts`. Other experiences use `work-experience-content.ts` until full case studies are written.

---

## Project schema

```ts
type Project = {
  id: string
  name: string
  year: string
  status: 'running' | 'shipped' | 'archived' | 'experiment'
  question: string
  description: string
  technologies: string[]
  capabilitiesTrained: string[]
  relatedExperiences: string[]
  lesson: string
  links?: { demo?: string; github?: string }
}
```

Placeholder entries use `PROJECT_DATA_REQUIRED` until real data supplied.

---

## Community schema (Architecture → Community Layer)

```ts
type CommunityEntry = {
  id: string
  organization: string
  role?: string
  period?: string
  type: 'community' | 'hackathon' | 'leadership' | 'mentorship' | 'event'
  contribution: string
  whyItMattered: string
  capabilitiesTrained: string[]
  relatedNodes: string[]
}
```

Gallery content (`lib/portfolio/gallery-data.ts`) feeds this section. Do not invent organizations.

---

## Memory schema (Architecture → Memory section)

Three modules:

### Long-term memory
Communities, mentors, leadership, hackathons, formative projects. Placeholders where content not supplied.

### Working memory
Current side project, AI experiment, rabbit hole, technical question, product question. Placeholders for now.

### Context window
Static traits presented as system context:
- learns by building
- likes ambiguous problems
- likes understanding systems
- highly curious
- technical + people-oriented
- prototypes early
- asks a lot of questions

---

## Personal context cards

Reusable across Architecture and Ask answers:

| Card | Content |
|------|---------|
| HOME | Toronto, Canada |
| TRAINING | Computer Science × Business |
| CURRENT MODE | Product + AI |
| DEFAULT LOOP | Build → Learn → Zoom Out |
| STATUS | ONLINE |

---

## Content integrity rules

1. Ask may only make claims supported by structured portfolio data.
2. Do not fabricate experiences, technologies, metrics, or opinions.
3. Use `CONTENT_REQUIRED` / `PROJECT_DATA_REQUIRED` placeholders.
4. Same ID everywhere, `tesla` in Work = `tesla` in graph = `tesla` in Ask context.
