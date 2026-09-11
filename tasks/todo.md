# Rebuild "Ask Jasmine" as a Guided Portfolio Agent

Plan: `C:\Users\Jasmine Gu\.claude\plans\curious-pondering-blum.md`
Spec: `specs/07-ask-Jasmine-Guided Portfolio.md`

## Phase A — Data layer (`lib/portfolio/agent/`)
- [x] `types.ts` — AgentIntent, Relationship, Reference, AgentAction, AgentAnswer, AgentMessage, ResolvedAnswer, AgentContext, Theme
- [x] `intents.ts` — AGENT_INTENTS, QUESTION_CATEGORIES (4 groups, exact chip text), INTENT_QUESTIONS, INTENT_RETRIEVAL
- [x] `writing.ts` — WritingEntry type + empty WRITING_ENTRIES + resolvers
- [x] `knowledge-graph.ts` — GraphEdge, AGENT_GRAPH_EDGES (hand spine + derived), getRelated, neighborhood, graphScore
- [x] `context.ts` — deriveContext(pathname), CONTEXT_INTENT_PRIORITY
- [x] `answers.ts` — AGENT_ANSWERS: the 14 curated guide-voice answers
- [x] `retrieval.ts` — resolveIntent, scoring fn, buildFollowUps, buildReadNext, referenceToAction
- [x] `actions.ts` — useAgentActionDispatch, experienceHref
- [x] `grounding.ts` — validateAgentContent()
- [~] `people.ts` — **skipped**: team/community facts drawn directly from `autodesk-facts.ts` +
  `experience-cards-data.ts` in the answer prose; no separate module needed (simpler).

## Phase B — Conversation state
- [x] Hoisted `AskAgentProvider` in `BentoWorkspaceRoot.tsx` to wrap the workspace row
- [x] Rewrote `useAskAgent.ts` (askIntent, currentContext, exploredIds/askedIntents derived from messages, suggestedIntents)
- [x] `PortfolioStateContext.tsx` — deprecated `selectedContexts`, flipped `agentOpen` default to `false`
- [x] `AskAgentProvider.tsx` — dev grounding guard

## Phase C — UI components
- [x] AgentIntro, QuestionCategories, ReferenceCard, WritingPreview, FollowUpChips, ContextActions, UserQuestion, AgentAnswerCard
- [x] Rewrote `AskAgentContent.tsx` (chip-only opening state, 4-layer answers, "pick a question" pill, categories sheet)
- [x] `AgentSidePanel.tsx` — new body, new-chat button only when hasMessages
- [x] `ChatFloatingWidget.tsx` — drives shared side panel on content routes, own dialog on `/`, full categories
- [x] `ChatHeroSection.tsx` — unchanged (already composer-free once AskAgentContent rewritten)
- [x] Deleted `AnimatedQuestionPlaceholder.tsx` + `useTypewriterCycle.ts`

## Phase D — Mounting / routing
- [x] `workspace-nav.ts` — isAgentPanelRoute: `/work/*`, `/tesla`, `/autodesk`, `/projects`, `/architecture`, `/gallery`
- [x] `BentoWorkspaceRoot.tsx` — unconditional `<AgentSidePanel/>` mount
- [x] `ArchitecturePageClient.tsx` — added `id="arch-experience-matrix"` (fixes dead `#arch-experience-inputs` scroll target)
- [x] `.agent-tab` / `.agent-slot` CSS — fixed the tab being clipped by the 0-width closed slot (never rendered before this work)

## Phase E — CSS (`app/portfolio-theme.css`)
- [x] Deleted dead agent rules (composer, typewriter, autocomplete, picker, context-bar, topic-chip, ml-notice, topic-groups, send-notice, old message bubble/avatar) — ~700 lines
- [x] Added new classes (intro, disclaimer, categories, question-chip, ref-card, writing-preview, followups, context-actions, deadend, user-question, opening/thread/footer-bar)
- [x] Theming: extended `data-ai-background='work'` overrides, added `data-ai-background='architecture'` panel block
- [x] Retuned chat-hero + floating widget for the composer-free layout

## Phase F — Grounding + cleanup
- [x] Dev-console guard in AskAgentProvider (`/dev/agent-audit` page — **not built**, see Review)
- [x] Deleted `ask-agent.ts` + `recruiter-qa.ts` (grep-confirmed no importers)
- [x] Removed orphaned `chatbotQuestions` fields from `portfolio-data.ts`

## Phase G — Verification
- [x] `pnpm install --frozen-lockfile` (node_modules not committed)
- [x] `npx tsc --noEmit` — clean
- [x] `next build` — clean, all 74 static pages generate
- [x] `next lint` — **not run**: no ESLint config exists in the project (never set up)
- [x] Headless Playwright sweep (scratchpad scripts) — 30/30 checks pass:
      opening state, 4 categories, 14 chips, no free-text input, confident disclaimer,
      context-aware chip ordering, 4-layer answers with reasons, follow-ups advance thread,
      context ranking (Tesla first on /tesla; identical summary across pages),
      panel on all 6 route types, trace highlights the Journey matrix, dead-end note appears
      when a narrow topic is exhausted (never an empty state), grounding validator clean,
      floating widget on `/`, mobile hero.

---

## Review

**What shipped:** A retrieval-first, no-LLM guided portfolio agent per spec 07. New
self-contained data layer in `lib/portfolio/agent/` (9 modules), 8 new UI components,
rewritten conversation hook, wider panel mounting, and a full CSS pass. The agent now
speaks as a third-person guide ("She built…"), answers 14 curated intents grouped into 4
categories, ranks evidence by page context + knowledge-graph relationships + conversation
history, and never dead-ends. `ask-agent.ts` / `recruiter-qa.ts` / the typewriter files are
deleted.

**Deviations from the approved plan:**
- `people.ts` skipped — team/community facts live in the answer prose, drawn from existing
  data files. One fewer module, no behaviour change.
- `/dev/agent-audit` page not built — the dev-console guard in `AskAgentProvider` already
  surfaces grounding problems, and the validator passed clean. Add the page later if useful.
- `next lint` not run — the project has no ESLint config (pre-existing).

**Needs Jasmine's review:**
- **`lib/portfolio/agent/answers.ts`** — the 14 answer summaries were re-authored from the
  old first-person `recruiter-qa.ts` prose into guide voice (with a humanizer pass). Every
  factual claim traces to `experience-cards-data` / `autodesk-facts` / `abstraction-engine-data`
  / `gallery-data`; the validator confirms all references resolve, but it can't check tone or
  over-claiming. Worth a side-by-side read against the old prose (recoverable from git).
- `collaborators` and `impact` answers are deliberately short and follow-up-heavy — their
  grounding is genuinely thin (spec §21 still requires all 14 chips).

**Follow-ups (not blocking):**
- Writing collection is empty; "Read next" points to case studies / Journey / Gallery until
  real essays land in `lib/portfolio/agent/writing.ts` (type + resolvers already handle them).
- `specs/03-data-model.md` still documents the removed `chatbotQuestions` field (spec doc,
  left untouched — user has other uncommitted spec edits).
- Dependencies are not committed; run `pnpm install --frozen-lockfile` before building.
