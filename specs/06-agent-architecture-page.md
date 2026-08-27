/Users/guj/personal-life/personal website redesign/Branding of portfolio.canvas# 06, Agent Architecture Page

Route: `/architecture`

This is **not called Story**. It is the **architecture of the agent**, the background layer that explains why Work makes sense.

Work is the backbone (evidence). Architecture is the background (narrative + system diagram).

---

## Page job

Answer: **Why does Jasmine's diverse background make sense?**

The visitor should understand the zoom-out progression even without opening Ask.

---

## Core progression

```text
AUTOMATION        →  Can I make this easier?
ZERO → ONE        →  What do you build when nothing is defined?
INTERFACE         →  How does a system become understandable to a person?
SYSTEM            →  What has to happen underneath the interface?
PLATFORM          →  What happens when many systems depend on the same foundation?
PRODUCT           →  What should the system actually enable?
```

Final conclusion:

> **I didn't leave the earlier layers behind.**
> I learned to think across more of them at once.

---

## Page sections (build order)

### SECTION 01, Initialize (hero)

Identity card:

```text
JASMINE GU
LOCATION        Toronto, Canada
EDUCATION       Computer Science × Business
CURRENT MODE    Product + AI
BACKGROUND      Engineering → Systems → Platform → Product
DEFAULT LOOP    Build → Learn → Zoom Out
STATUS          ONLINE
```

Headline: **I kept zooming out.**

Supporting copy about building the thing in front of her, then wondering what was underneath, around it, and who decides what the whole system should do.

CTAs:
- `Explore Work` → `/`
- Side agent available via Ask panel

Small agent window optional in hero (status ONLINE, capabilities: Product, Engineering, AI, Design).

---

### SECTION 02, Abstraction levels

Six scroll sections, one per level. Each follows this pattern:

1. Abstraction level label
2. Question
3. Experience(s) at this level
4. What this unlocked (capability keyword + meaning)
5. Agent state card
6. Link to Work tile(s)

#### Level 00, AUTOMATION
- **Question:** Can I make this easier?
- **Experiences:** Metaverse Group, ServiceNow / OMERS
- **Unlocked:** `LEVERAGE`, Software can turn repetitive work into a system.

#### Level 01, ZERO TO ONE
- **Question:** What do you build when nothing is defined yet?
- **Experience:** Stealth Pre-Seed Startup (LaurelSpace)
- **Unlocked:** `AMBIGUITY`, When there is no blueprint, product and engineering decisions happen together.

#### Level 02, INTERFACE
- **Question:** How does a system become understandable to a person?
- **Experience:** Intuit, TurboTax
- **Unlocked:** `USER`, The system eventually becomes something a person has to understand.

#### Level 03, SYSTEM
- **Question:** What has to happen underneath the interface?
- **Experience:** Tesla
- **Unlocked:** `DEPENDENCIES`, Great interfaces are often systems problems underneath.

#### Level 04, PLATFORM
- **Question:** What happens when many systems depend on the same foundation?
- **Experience:** Autodesk Fusion (SWE)
- **Unlocked:** `SCALE`, A product is not a page. It is a network of dependencies.

#### Level 05, PRODUCT
- **Question:** What should the system actually enable?
- **Experience:** Autodesk, Platform Product (ADP Studio)
- **Unlocked:** `DIRECTION`, Once she understood how systems were built, she became interested in shaping what they should make possible.

---

### SECTION 03, Jasmine Runtime

**Dark system section.**

Central node:

```text
JASMINE
Type: GENERALIST AGENT
Description: A product-minded engineer who likes understanding complex systems,
             finding the real problem, and building something to test it.
Status: PRODUCT · ENGINEERING · AI · SYSTEMS
```

Six capability modules surrounding central node (from `capabilities.ts`):

| Module | Description |
|--------|-------------|
| Understand | Find the real problem before deciding what to build |
| Build | Turn ambiguity into working software, prototypes, and systems |
| Connect | Connect technical systems, user needs, and business context |
| Experiment | Build quickly to answer questions instead of debating them |
| Scale | Think beyond the immediate feature toward reliability and reuse |
| Decide | Turn research and constraints into product direction |

Each module shows: inputs, evidence (linked to Work), status `ACTIVE`.

Visual: connected agent-architecture interface with curved connector lines, glowing nodes on hover.

---

### SECTION 04, Tool Registry

Compact tool picker with expandable categories:

| Category | Tools |
|----------|-------|
| Product | Strategy, Roadmapping, User Research, Prioritization, Metrics, Product Discovery |
| Engineering | React, TypeScript, Java, Python, REST APIs, Distributed Systems, DynamoDB, Redis |
| AI | LLM Prototyping, MCP, AI Workflows, Evaluations, Prompt Systems, Agent Prototyping |
| Design | Figma, Prototyping, Information Architecture, Design Systems, Interaction Design |
| Business | Market Thinking, Stakeholder Communication, Systems Thinking, Business Models |

Also: personal tools Jasmine uses daily (Claude, Notion, Wispr Flow, Obsidian, Figma, GitHub, MCP).

---

### SECTION 05, Experience Inputs

**Editorial statement:** Every experience became an input.

Six input streams connecting into Jasmine agent:

| Input | Signal | Key lesson |
|-------|--------|------------|
| Metaverse Group | AUTOMATION | Software can turn a repetitive process into a system |
| ServiceNow / OMERS | USERS | Solving the technical problem means little if you misunderstand the human one |
| Intuit | INTERFACE | Systems eventually become something a person has to understand and use |
| Tesla | SYSTEMS | A good interface is often an infrastructure problem underneath |
| Autodesk SWE | INFRASTRUCTURE | A product is a network of services, contracts, data, teams, and decisions |
| Autodesk PM | PRODUCT | Once she understood how systems were built, she became interested in deciding which should exist |

---

### SECTION 06, Zoom-out visual

Vertical/diagonal visualization showing career as increasing abstraction.

Headline: **I kept zooming out.**

As user scrolls, camera visually zooms outward through layers. Experience nodes appear at each level.

Do not imply engineering stopped when moving to product, each role added a broader abstraction layer.

---

### SECTION 07, Memory

Three modules styled like AI memory system:

**Long-term memory**, communities, mentors, leadership, hackathons, formative projects. Placeholders where content not supplied. Links to Gallery.

**Working memory**, current side project, AI experiment, rabbit hole, technical/product questions. Placeholders.

**Context window**, static operating traits as system context (learns by building, likes ambiguous problems, prototypes early, etc.).

---

### SECTION 08, Experimental Infrastructure (projects)

Personal projects with schema:

```ts
{
  id, name, year,
  status: 'running' | 'shipped' | 'archived' | 'experiment',
  question, description, technologies,
  capabilitiesTrained, relatedExperiences, lesson,
  links?: { demo?, github? }
}
```

4 placeholder entries: `PROJECT_DATA_REQUIRED`

Links to `/projects` for full bento view.

---

### SECTION 09, Community Layer

Schema for community entries. Placeholders until data supplied. Primary content source: Gallery (`/gallery`).

Not in main nav, linked from here as "See full gallery →"

---

### SECTION 10, Outputs

Five output types connected to Jasmine agent:

| Output | Examples |
|--------|----------|
| Products | ADP Studio, Autodesk Libraries, Tesla factory tooling, Intuit UI |
| Systems | Distributed library workflows, ML video infrastructure, APIs |
| Decisions | Roadmap decisions, AI workflow strategy, platform requirements |
| Experiments | Prototypes, AI agents, personal projects |
| Communities | From community data (placeholder) |

---

### SECTION 11, Runtime loop

Animated circular process:

```text
NOTICE → UNDERSTAND → BUILD → PUT IT IN FRONT OF PEOPLE → LEARN → ZOOM OUT → repeat
```

Label: `RUNTIME LOOP`

> The project changes. The loop usually doesn't.

---

### SECTION 12, Final stack reveal

All abstraction levels displayed together:

```text
PRODUCT, What should exist?
PLATFORM, What should others be able to build on?
SYSTEM, What makes it work reliably?
INTERFACE, How does someone experience it?
ZERO → ONE, How do you make something real from ambiguity?
AUTOMATION, Can software remove friction?
```

Closing: **I didn't leave the earlier layers behind.**

---

## Visual treatment

- **Light sections:** hero, abstraction levels (editorial), memory (personal), community
- **Dark sections:** runtime, capabilities graph, tool registry, inputs (system view), outputs, agent loop
- Typography: Bootzy headlines, Awesome Shorten for pull quotes, Analogue OS for system metadata
- Organic gradient objects behind hero and runtime sections

---

## Current status

Placeholder page at `/architecture` with hero copy and CTAs to Work and Projects. Full section build is **next major phase**.
