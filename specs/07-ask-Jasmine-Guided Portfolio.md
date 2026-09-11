
#Ask Jasmine — Guided Portfolio Agent

## 1. Purpose

**Ask Jasmine** is an interactive way to explore Jasmine's portfolio beyond a traditional website navigation.

It should feel like a lightweight AI/agent experience: a visitor asks a question, gets a concise answer grounded in Jasmine's actual work, and is then guided toward relevant projects, experiences, writing, people, ideas, or parts of the site.

There is **no LLM** behind the experience. The system intentionally uses curated retrieval and structured relationships rather than generative AI.

The goal is not to simulate an AI model perfectly. The goal is to create the **experience of talking to a knowledgeable guide who knows Jasmine's work extremely well**.

### Core principle

> **Don't just answer the question. Help the visitor discover something interesting.**

---

# 2. Visitor Experience

The agent appears in two places:

### Main experience

A larger **Ask Jasmine** panel near the top of the homepage.

This is the primary entry point for visitors who want to explore the portfolio.

### Floating experience

A floating Ask Jasmine button opens the same conversational experience in a side panel.

The visitor should be able to enter the conversation from anywhere on the portfolio and retain their current context.

For example:

- On `/projects` → questions prioritize projects
    
- On `/architecture` → questions prioritize systems, relationships, and technical work
    
- On `/tesla` → questions prioritize Tesla-related work
    
- On `/work/[slug]` → questions prioritize that experience
    
- On `/` → broad portfolio questions
    

---

# 3. Opening State

The agent should never open to an empty chat box.

Instead:

### ASK JASMINE

**Explore my work, projects, experiences, and the ideas behind them.**

Choose a question to start.

**Engineering**

- What kind of engineering has she done?
    
- What teams has she worked on?
    
- Has she worked with AI?
    
- What has she built?
    

**Product**

- What products has she worked on?
    
- Has she actually owned product?
    
- How technical is she as a PM?
    

**People & Places**

- Where has she worked?
    
- Who has she worked with?
    
- What is she like to work with?
    

**Core Values & Ambitions**

- What does she care about?
    
- What does she believe?
    
- What kind of impact does she want to have?
    
- What does she want to build next?
    

Small disclaimer:

> **No LLM here — intentionally.** Every answer is grounded in Jasmine's actual portfolio and writing.

The disclaimer should feel confident and intentional, not apologetic.

---

# 4. Question Model

Visitors do **not** have unrestricted free-form chat.

The experience is conversational, but questions are constrained to known intents.

A question is represented internally as an intent:

```ts
type AgentIntent =
  | "engineering_type"
  | "engineering_teams"
  | "ai_experience"
  | "things_built"
  | "products"
  | "product_ownership"
  | "technical_pm"
  | "workplaces"
  | "collaborators"
  | "working_style"
  | "values"
  | "beliefs"
  | "impact"
  | "future_building";
```

The visible question is mapped to one of these intents.

The visitor can continue asking follow-up questions, but every follow-up ultimately resolves to a known retrieval intent.

---

# 5. Retrieval Architecture

This is **retrieval-first**, not generation-first.

The agent should retrieve information from the portfolio's structured knowledge base and assemble a curated response.

### Sources

The knowledge base can contain:

- Experiences
    
- Companies
    
- Teams
    
- Projects
    
- Technologies
    
- Responsibilities
    
- Outcomes
    
- People / collaborators
    
- Writing
    
- Gallery pieces
    
- Architecture nodes
    
- Themes
    
- Values
    
- Ambitions
    
- Relationships between pieces of work
    

Existing portfolio data should remain the source of truth.

---

# 6. Knowledge Graph

The portfolio should be treated as a connected graph rather than a collection of independent pages.

Example:

```text
Tesla
  ├── team
  ├── technology
  ├── project
  ├── engineering
  ├── AI
  └── theme

Autodesk
  ├── SWE
  ├── PM
  ├── product
  ├── engineering
  └── project

Writing
  ├── AI Doc
  ├── values
  ├── AI
  └── ambition
```

Relationships should be explicit.

```ts
type Relationship =
  | "worked_on"
  | "worked_with"
  | "built"
  | "owned"
  | "influenced"
  | "demonstrates"
  | "elaborates"
  | "relates_to"
  | "continues"
  | "contrasts_with";
```

This allows the agent to answer a question and then naturally point somewhere else.

---

# 7. Answer Structure

Every response should have four possible layers:

### 1. Answer

A concise, human-written explanation.

### 2. Evidence

Relevant experiences, projects, or writing supporting the answer.

### 3. Read / Explore Next

One or more pieces of the portfolio that deepen the answer.

### 4. Follow-up Questions

Up to three relevant questions.

Example:

> **Yes — Jasmine has substantial engineering experience, particularly across frontend, systems, and product-facing technical work.**
> 
> Her engineering work spans **Tesla**, **Autodesk**, and several independent projects.
> 
> **Related work**
> 
> `[ Tesla ]` `[ Autodesk SWE ]` `[ Project X ]`
> 
> **Read next**
> 
> `[ The AI Doc ]` — A piece of writing that gives more context on how she approaches technical problems.
> 
> **Keep exploring**
> 
> `[ What has she built? ]`  
> `[ Has she worked with AI? ]`  
> `[ How technical is she as a PM? ]`

---

# 8. Answers Should Be Curated, Not Generic

The system should not simply retrieve matching résumé bullets.

Each intent should have a curated answer structure.

For example:

```ts
type AgentAnswer = {
  intent: AgentIntent;

  summary: string;

  references: Reference[];

  readNext?: Reference[];

  followUps?: AgentIntent[];

  actions?: AgentAction[];
};
```

Where:

```ts
type Reference = {
  type: "experience" | "project" | "writing" | "gallery" | "architecture";
  id: string;
  reason?: string;
};
```

The `reason` is important.

Instead of:

> Related: The AI Doc

Use:

> **The AI Doc** — worth reading because it shows how Jasmine thinks about AI beyond the projects she's built.

---

# 9. Context Awareness

The agent should know where the visitor currently is.

For example, if the visitor is viewing Tesla:

```text
Current context:
Tesla
```

Then:

**What has she built?**

should prioritize Tesla-related work before showing unrelated projects.

Likewise, on Architecture:

**Has she worked with AI?**

should prioritize AI-related architecture nodes and projects.

Context should influence ranking, not change the underlying answer.

---

# 10. Navigation Actions

The agent should be able to move visitors through the portfolio.

Possible actions:

```ts
type AgentAction =
  | {
      type: "navigate";
      href: string;
    }
  | {
      type: "scroll";
      targetId: string;
    }
  | {
      type: "highlight";
      targetId: string;
    }
  | {
      type: "openWriting";
      id: string;
    }
  | {
      type: "openExperience";
      id: string;
    }
  | {
      type: "trace";
      nodeIds: string[];
    };
```

This makes the agent feel more like an interface to the portfolio rather than a search box.

For example:

**“Show me her engineering work.”**

→ retrieves relevant work  
→ highlights those nodes in Architecture  
→ offers `[ Explore architecture → ]`

---

# 11. Conversation State

The agent should maintain lightweight state:

```ts
type AgentState = {
  messages: Message[];

  currentIntent?: AgentIntent;

  currentContext?: {
    page?: string;
    experience?: string;
    project?: string;
    node?: string;
  };

  exploredIds: string[];

  suggestedIntents: AgentIntent[];
};
```

This allows the conversation to feel continuous.

Example:

**Visitor:** What kind of engineering has she done?

**Agent:** [engineering answer]

**Visitor:** What about AI?

The system understands that "AI" refers to Jasmine's engineering experience rather than starting from scratch.

---

# 12. Discovery Behavior

The agent should actively encourage exploration.

After answering, it should generally provide:

### Related work

Things directly connected to the answer.

### Read next

A piece of writing or Gallery item that provides a different perspective.

### Continue

Questions that naturally deepen the current thread.

The recommendations should not be random.

They should be based on graph relationships and the current conversation.

---

# 13. “Surprise Me” / Guided Exploration

The system can optionally provide higher-level exploration actions:

- **Give me the 5-minute tour**
    
- **Show me something unexpected**
    
- **Show me her most technical work**
    
- **Show me her AI work**
    
- **Show me something she cares about**
    
- **Show me something she built**
    
- **Show me something that explains how she thinks**
    

These are not independent search modes.

They are predefined retrieval strategies.

For example:

```ts
"five_minute_tour"
"surprise_me"
"technical_highlight"
"ai_highlight"
"values_highlight"
"best_build"
"thinking_highlight"
```

---

# 14. Writing / Gallery Integration

Writing should be treated as first-class portfolio evidence.

The agent should be able to say:

> **There's a piece in the Gallery that gets at this better than a résumé bullet does.**

Then surface the relevant writing.

Writing can support questions about:

- Values
    
- AI
    
- Creativity
    
- Product thinking
    
- Engineering
    
- Ambition
    
- Collaboration
    
- Technology
    
- Personal philosophy
    

This creates a path:

**Question → Work → Writing → Idea → Another piece of work**

rather than:

**Question → Résumé bullet**

---

# 15. Human Voice

Responses should follow Jasmine's existing writing style and humanizer principles.

They should feel:

- Conversational
    
- Specific
    
- Curious
    
- Direct
    
- Slightly opinionated when supported by the source material
    
- Human
    
- Not corporate
    
- Not résumé-like
    
- Not artificially enthusiastic
    

Avoid:

> “Jasmine demonstrates exceptional cross-functional leadership and technical expertise.”

Prefer:

> “She has worked on both sides of the table: building the thing and figuring out what should get built.”

Only make claims like this when supported by the portfolio data.

---

# 16. Grounding Rules

**The agent must never invent information.**

Every factual claim must be traceable to portfolio data, writing, or structured relationships.

If information isn't available:

> **I don't have that in Jasmine's portfolio yet.**

Do not infer:

- Technologies
    
- Responsibilities
    
- Team structures
    
- Company details
    
- Outcomes
    
- Skills
    
- Values
    
- Opinions
    
- Career motivations
    

unless they are represented in the source material.

The agent can make a **curated connection** between pieces of existing material, but it cannot invent new facts.

---

# 17. Retrieval Ranking

Results should be ranked approximately by:

1. Current page/context
    
2. Exact intent match
    
3. Explicit graph relationship
    
4. Relevance to the current conversation
    
5. Importance / quality of the underlying work
    
6. Diversity of evidence
    

The agent should avoid repeatedly recommending the same experience.

If the visitor has already explored Tesla extensively, gradually surface Autodesk, projects, writing, or other connected material.

---

# 18. No Empty States

There should never be a dead end.

If a visitor reaches the end of a topic:

> **That's most of what I have on this in the portfolio.**

Then offer:

`Explore related work`  
`Read something related`  
`Try another question`

If there is genuinely no grounded answer:

> **I don't have that in Jasmine's portfolio yet.**

Then offer nearby questions that _are_ supported.

---

# 19. Visual Design

The interface should feel like a **conversation layered over the portfolio**, not a generic AI chat application.

Avoid:

- Generic ChatGPT-style UI
    
- Giant empty chat input
    
- “AI assistant” branding
    
- Robotic loading states
    
- Excessive chat bubbles
    
- Fake typing animations
    
- Model names
    
- AI-generated-looking responses
    

Prefer:

- Question chips
    
- Rich cards
    
- Experience references
    
- Writing previews
    
- Architecture node links
    
- Inline navigation
    
- “Read next”
    
- “Explore this thread”
    
- Visual relationships
    

The portfolio itself should remain the primary interface.

The agent is the **guide through it**.

---

# 20. Technical Implementation

### Frontend

```text
AskJasmine
├── AgentIntro
├── QuestionCategories
├── Conversation
│   ├── UserMessage
│   ├── AgentResponse
│   ├── ReferenceCards
│   ├── ReadNext
│   └── FollowUpQuestions
└── ContextActions
```

### Data

```text
portfolio-data.ts
experiences
projects
writing
gallery
architecture
people
themes
relationships
agent-intents
agent-answers
```

### Retrieval

Start simple:

1. Intent → retrieval filters
    
2. Retrieve relevant entities
    
3. Follow explicit relationships
    
4. Rank results
    
5. Select curated answer
    
6. Render references + next actions
    

Semantic embeddings can be added later if useful, but they are **not required for v1**.

---

# 21. V1 Scope

The first version should prioritize the experience over sophisticated retrieval.

### Required

- Main Ask Jasmine panel
    
- Floating Ask Jasmine panel
    
- Four question categories
    
- All defined chip questions
    
- Intent-based retrieval
    
- Curated answers
    
- Related work
    
- Read Next
    
- Follow-up questions
    
- Page context
    
- Navigation into portfolio
    
- Grounding / no fabrication
    
- Conversation history
    

### Later

- Semantic embeddings
    
- More sophisticated graph traversal
    
- Personalized exploration paths
    
- “5-minute tour”
    
- “Surprise me”
    
- Architecture highlighting
    
- Conversation analytics
    
- More dynamic question generation from available relationships
    

---

# 22. North Star

Ask Jasmine should make someone think:

> **“I came here to look at her résumé, and somehow I ended up understanding how she thinks.”**

It is not meant to replace the portfolio.

It is the **conversational layer connecting the portfolio's work, experiences, writing, people, values, and ideas.**

This gives you a pretty clean separation: **the portfolio is the knowledge base, the graph is the connective tissue, retrieval finds the evidence, and the agent UI guides the person through it.** No API bill, no model hosting, and no pretending that a deterministic system is an LLM.