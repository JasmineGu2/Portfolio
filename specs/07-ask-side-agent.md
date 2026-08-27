# 07, Ask Side Agent

Ask is a **floating side panel**, not a primary page. It queries Work (and references Architecture paths). It must NOT feel like a generic ChatGPT clone.

Route `/ask` redirects to `/`, use the side panel.

---

## Placement

| State | Behavior |
|-------|----------|
| Collapsed | Fixed **"Ask Jasmine"** button, bottom-right |
| Expanded | Right side panel (~24rem), backdrop dim |
| Mobile (planned) | Full-width bottom sheet |

### Visible on
- `/` (Work)
- `/architecture`
- `/projects`
- `/tesla`
- `/work/[slug]`

### Hidden on
- `/ask` (redirects)
- Dev/exploration pages (`*-options`, `/bento-workflows`, etc.)

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `⌘K` | Toggle panel |
| `Esc` | Close panel |
| `Enter` | Submit query (when implemented) |
| Arrow keys | Navigate autocomplete (when implemented) |

---

## Panel structure

```text
┌────────────────────────────────────┐
│ JASMINE AGENT                   ✕  │
│ Ask about my work                  │
│ ● ONLINE                           │
│                                    │
│ Ask about a project, experience,   │
│ decision, skill, or part of the    │
│ system.                            │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ What are you curious about?    │ │
│ └────────────────────────────────┘ │
│                                    │
│ SUGGESTED                          │
│ · Why did you move to product?     │
│ · What did Tesla teach you?        │
│ · What are you building at ADSK?   │
│                                    │
│ AI responses coming soon           │
└────────────────────────────────────┘
```

---

## Context-aware suggestions

Suggestions change based on current page:

| Page | Example suggestions |
|------|---------------------|
| `/` (Work) | Why engineering → product? · What did Tesla teach you? · How technical are you as PM? |
| `/architecture` | How do experiences connect? · Trace frontend → product · What is the abstraction engine? |
| `/projects` | What have you built zero to one? · Most technical project? |
| `/tesla` | What did you actually build? · Why infrastructure problem? · What came next? |
| `/work/autodesk-eng` | What distributed systems work? · How did this influence PM thinking? |

After selecting an experience in Ask, suggestions become experience-specific.

---

## Context chips (planned)

Below composer, selectable filters, NOT prompts:

```text
[ Tesla × ] [ Autodesk × ] [ Projects ] [ + ]
```

- Clicking `Tesla` adds context, changes placeholder to "Ask something about Tesla..."
- Multiple chips enable comparison prompts
- `+` opens searchable context picker grouped by: Work, Projects, Community, About Jasmine

---

## Query modes (subtle, not dominant)

| Mode | Behavior |
|------|----------|
| **Explain** | Normal conversational answer |
| **Compare** | Requires multiple contexts, compare scope, depth, lessons |
| **Trace** | Narrative across experiences, highlight path on Architecture |
| **Show Me** | Portfolio navigation, filter/highlight Work tiles, scroll to section |

---

## Autocomplete (planned)

Intent-aware, not sentence completion.

Typing `why` → Why move to product? · Why interested in AI? · Why work across layers?

Typing `Tesla` → What did you build? · Hardest problem? · How did it lead to Autodesk?

Responds to selected context chips as well.

---

## Response format

Default: concise. Not giant AI paragraphs.

```text
### Direct answer
2–5 sentences.

### Referenced experiences
[ Tesla ↗ ] [ Autodesk SWE ↗ ]  ← clickable, scroll to Work tile

### Related path (when relevant)
INTERFACE → SYSTEM → PLATFORM → PRODUCT

### You might also ask (max 3 follow-ups)
· What stayed technical after moving to PM?
· Show me the projects that influenced this.
```

Provide **Go deeper** for longer explanations. Do not dump full case study content immediately.

---

## Portfolio-aware behavior

Ask is NOT just text generation. It triggers UI state:

| Query | System action |
|-------|---------------|
| "Show me infrastructure work" | Highlight Tesla + Autodesk SWE on Work |
| "How did you go from frontend to PM?" | Highlight path Intuit → Tesla → Autodesk SWE → Autodesk PM; optionally navigate Architecture |
| "What have you built at startups?" | Select startup context, highlight Stealth Startup |

Clicking a reference chip scrolls to or opens that experience.

---

## Progressive disclosure

Initial context chips: `Engineering` · `Product` · `AI` · `Startups` · `Outside Work` · `+`

After selecting Engineering: `Tesla` · `Autodesk SWE` · `Intuit` · `Projects` · `+`

After selecting Tesla: `What I Built` · `Hardest Problem` · `What I Learned` · `What Came Next`

Optional: `✦ Surprise me`, surfaces less obvious story from available data only.

---

## Grounding rules

1. Only claims supported by `portfolio-data.ts` and related structured files.
2. If unavailable: *"I don't have that in Jasmine's portfolio yet."*
3. Do not fabricate experiences, technologies, metrics, projects, or opinions.
4. Personal tool questions (Claude, Notion, Wispr Flow, MCP) pull from actual portfolio data when available.

---

## Answer length

- Initial: 2–5 sentences + experience references + 2–3 follow-ups
- `Go deeper` expands with more detail from case study data
- Never immediate wall of text

---

## Core UX principle

The visitor should never face an empty box and wonder *"What am I supposed to type?"*

At every point provide one or more of:
- Contextual chips
- Autocomplete
- Example questions
- Selected context
- Suggested follow-ups
- Actions (Trace, Show Me)

**Feel like:** the fastest way to understand Jasmine, not a chatbot embedded in a portfolio.

---

## Current status

| Feature | Status |
|---------|--------|
| Floating button | ✅ Built |
| Side panel UI | ✅ Built |
| Context-aware suggestions | ✅ Built (static per route) |
| ⌘K / Esc | ✅ Built |
| Context chips | 🔲 Planned |
| Autocomplete | 🔲 Planned |
| Query modes | 🔲 Planned |
| AI backend + grounding | 🔲 Planned |
| Node highlighting | 🔲 Planned |
| Mobile bottom sheet | 🔲 Planned |

Component: `components/portfolio/agent/AgentSidePanel.tsx`
