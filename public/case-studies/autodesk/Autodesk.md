OUTCOMES

Impact across ADP Studio and Autodesk's Data Portal

* 380+ users, 60% increase in internal adoption, ~50% improvement in usability
* 7+ redesigned workflows with clearer information architecture, and a 3x expansion of usable workspace
* ~30% faster AI-assisted data workflows across schema assistance, query discovery, autocomplete, and MCP integrations
* 12+ user interviews, partnering with Engineering, Trust, Metadata Management, and AI teams on product vision, roadmap, and governance principles
* Led UX strategy, feature ideation, and prototyping, including on an AI chatbot feature. Dogfooded 12+ prototypes, catching 20+ issues before engineering implementation, cutting concept-to-validation time by ~40%.
* Created a 12-component scalable design system to support accurate prototyping
* Built a benchmarking framework for MCP- and LLM-powered features across 20+ representative workflows, establishing thresholds for accuracy, latency, task completion, and trustworthiness
* Led a 6-team, multi-PM cross-functional effort that became Autodesk's agentic data strategy
* Reduced my own process overhead by ~35% with an AI-enabled PM workflow built on Claude, Obsidian, and Jira MCP

---

OVERVIEW

# Owning product strategy for a governed SQL and data-exploration platform on Autodesk's data lake

ADP Studio was a modern SQL editor. It was the query and exploration interface into Autodesk's Data Portal, the company's broader strategy for storing, governing, and processing every category of data the business produces.

Autodesk built the lake so all of that data could be harnessed in one place instead of team by team. One governed store, with access control, classification, and auditing built into how you reach it. That is safer than the same data spread across a dozen tools nobody can see into, and more useful, because analysis can finally cross sources that never used to meet.

I owned product strategy and execution for it, positioned against DBeaver, Hive, and direct Snowflake access as the enterprise alternative. That covered the roadmap, the redesigned query workflows, and the rollout strategy for AI-assisted data work. It also covered the UX for all of it, since the team had no embedded designer.

---

THE DATA PORTAL

# What ADP Studio actually sat inside

Before the rest of this makes sense: my product was one layer of something much larger. The Data Portal is Autodesk's strategy for storing, governing, and processing every category of data the business produces, structured and unstructured alike. ADP Studio was the SQL and exploration layer inside it, the part people typed into.

The rest of the Data Portal

These are the neighbouring systems a query eventually touches. ADP Studio had to interoperate with all of them, which is most of what made the boundaries worth knowing.

* **AMP.** The AI/ML model portal: project and model registration, data management, notebook and IDE integration, experiment tracking, training, storage, deployment.
* **Access Management.** Requesting access to ADP data for yourself, a team, or a service account.
* **Batch Ingestion.** Secure, reliable data ingestion and publishing.
* **Batch Processing.** Scheduled batch tasks over large datasets.
* **Stream Processing.** Real-time ingestion and processing.
* **Pipeline Observability.** Pipeline monitoring, insight, and faster resolution.
* **Cost Dashboard.** Usage and cost broken out by tenant.
* **Content Authoring.** Authoring content for in-product messaging, including Personalized Insights.

Why Autodesk was investing here:

* Interoperability was the actual goal. Real analysis crosses tools, teams, and organizations, so the value of a governed entry point comes from how well it connects to the rest of the stack, not from how much of it we could replace.
* AI is only as good as the data it can reach, which makes interoperability infrastructure rather than a feature.
* Data capabilities had grown fast across a lot of teams and left real architectural fragmentation behind. Leadership aligned the org structure to reduce it.
* There was no internal consensus on where the space was headed, so I read outward: Snowflake on agentic development, Databricks on handling data at scale.

Who I was building with:

My customers
Software engineers, business analysts, and data analysts. Never one persona, and no two teams used ADP Studio the same way.

Engineering
Needed specs and direction clear enough to build against with no in-person overlap and a full time-zone gap.

Trust, Metadata Management, and AI teams
Needed security, access control, and governance built in from the start of a decision, not layered on after.

As a platform PM, most decisions were really two decisions: the enterprise-wide, one-size-fits-most choice, and the expert or power-user choice a one-size answer usually shortchanges. I tried to keep both represented. Some teams needed middle tables to stage their work, some needed raw access, and some needed guardrails they would never ask for by name.

---

THE TRANSITION

# ADP Studio existed because PopSQL was going away

| | |
|---|---|
| **Why it existed** | PopSQL, the SQL editor a lot of data teams had standardized on, was acquired and sunset. Shutdown was September 1, 2026, with migration recommended to start that June. ADP Studio was the replacement. |
| **My timing** | I joined in May, the month before the migration window opened. |
| **The job** | A migration, not a zero-to-one. Analysts already had a tool that worked for them, with a deadline on it. |
| **The catch** | The deadline made moving mandatory. It did not make moving to us mandatory, so I spent the internship on adoption rather than features. |
| **Mentorship** | Very little. My manager left for a 7-week sabbatical two weeks in, the previous PM was hard to reach, and my director had not worked closely with the product. |

---

MY ROLE

# Being the PM representative for ADP Studio

Sole PM meant autonomy, and autonomy meant a lot of hats. Engineering was in India with no in-person overlap, there was no embedded designer, normal for an enterprise platform and still a gap, so I covered UX myself, and for most of the internship there was no manager above me on the product.

Having worked in corporate environments, startups, leadership roles, and across multiple tech teams, I already knew what corporate standards looked like. That made me better prepared for the ambiguity of this role than the title suggests.

| | |
|---|---|
| **Role** | Solo PM on an enterprise data platform. No dedicated designer, no consistent manager for most of the internship. |
| **Team** | Engineering team based in India. All collaboration remote-first, across a full time-zone gap. |
| **Transition** | My manager led the product for 2 weeks, then left for a 7-week sabbatical. The previous PM was senior, busy, and largely uninvolved. My director hadn't worked closely with the product either. No one person held full context. |
| **Scope** | 380+ users, spanning data analysts, engineering, Trust, Metadata Management, and AI teams |
| **Tenure** | 3rd product/frontend internship, 2nd at Autodesk, 6th internship overall across startups and big tech. The frontend work was Intuit and Tesla; the first Autodesk internship was full-stack. |

KEY INSIGHT

> A lot of ambiguity and a lot of autonomy turned out to be the same condition. I ended up the sole representative for this product and the person setting its direction and vision. It also meant an enormous amount of onboarding before I could do any of that credibly.

---

AMBIGUITY

# Three types of ambiguity, and what I did about each

**01 Technical.** What the system should do, and how it should be built.
* Leaned on three years of engineering, including a lot of hours with AI coding tools, so technical decisions felt workable instead of stuck.
* Did the research to actually learn the stack, and used AI to quiz me on it until I could hold my own.
* Started with a micro feature, took it to users, then built it rather than writing it up.

**02 Product direction.** Leadership, the previous PM, engineering, and users all had different answers, with no source of truth to settle it.
* Inherited direction as one long document with 30+ requests in it, and no context for which mattered or why.
* Read up on how Snowflake and Databricks were framing their own data strategy, instead of waiting for internal agreement.
* Ran 12+ structured interviews so I had my own signal rather than whoever was reachable.

**03 Process.** Nobody had defined how specs got written, how feedback got collected, or where AI fit into either. My manager left two weeks in, so nobody was going to teach me either.
* Built my own AI stack to onboard myself: a OneDrive plugin to mass-search every document into my AI brain, then the same across Confluence and Slack, so past decisions were answerable.
* Connected Claude, Obsidian, Cursor, and Jira MCP into one system with voice interaction, which cut my process overhead by an estimated 35%.
* Treated managing up as its own project, since the cadence and context-sharing above me was undefined.
* We moved from Sprints into Kanban, so work shipped when it was actually ready.

---

THE EXPORTING DECISION

# Should a governed data tool let you take the data out?

Export was the single biggest blocker to adoption, and the obvious fixes both cost something real. Here is how the two sides actually stacked up.

**The case for allowing it**
* Analysts needed volumes the tool could not serve, and without export their teams stayed on the tools they already had.
* Export was the single biggest blocker to adoption, so blocking it cost us the migration we were built for.
* Refusing export does not keep data inside. It moves the copying somewhere nobody can see it.
* Some analysis genuinely happens outside the warehouse, in a notebook or a model or a spreadsheet.

**The case against**
* Once data leaves a governed system, the risk of loss is real and permanent.
* An exported file carries no access controls, no audit trail, and no expiry.
* Security and Legal had obligations that did not bend to one team being inconvenienced.
* Large exports have a cost and a scale problem of their own.

**Neither yes nor no.** Allowing export wholesale gave up the governance the platform existed for. Banning it gave up adoption. Both answers lost something we could not afford to lose, which is usually the sign the question is framed wrong.

**Gate it by classification.** The mechanism was a data-classification system: sensitivity decides what can leave and under what controls, instead of one rule applied to every table. Low-sensitivity data moves freely, sensitive data carries the controls with it, and the decision is a property of the data rather than of who is asking.

**Then set the limits from real usage.** I re-engaged Security, Legal, and the Metadata Management team directly to re-derive why the thresholds were where they were, and rebuilt the plan around the volumes analysts actually needed rather than the ones we had assumed. The classification answer is only useful if the numbers attached to it match the work.

KEY INSIGHT

> A platform question that only has two answers is usually the wrong question. Classifying the data turned one policy argument into a property of each table, which is the version Security, Legal, and analysts could all live with.

---

WINNING IN AN AI-FIRST WORLD

# I hit this problem building in an AI-first world, so I made Spec Mode

When anyone can generate a working prototype in an afternoon, building stops being the constraint and agreement becomes it. That shows up as a very specific failure: a demo that looks finished and settles nothing.

**The problem.** It is trivially easy now to send someone a very long prototype. That is the trap. A prototype shows one path working; it does not define the edge cases, the states, the data contract, or the decision behind any of it. Team tagging was the example that taught me: tag a query with a team, share it in a folder, and it turned into weeks of engineering questions about search across team folders, whether team folders look different from personal ones, and how any of it touches metadata. A demo answered none of those.

**Spec Mode.** So I built a spec styler. It runs the working prototype alongside what the spec would have contained: the user story, the product details, the feedback already collected. The prototype carries the demo and the spec carries the decisions, in one artifact, so engineering could act instead of guess. Being specific mattered more than producing more output.

KEY INSIGHT

> Building was never really the hard part, even before AI. It just used to hide how hard it was to get everyone aligned. Now that hiding place is gone.

---

FROM A VISION TO THE AVENGERS TEAM

# My vision for ADP Studio turned into Autodesk's Data Portal strategy

**The vision.** What it would mean to work with SQL differently in an AI-native world, not a chat box bolted onto a query editor, but a real rethink of the query engine strategy. Built around a directional hypothesis for where data work was heading a year out, rather than just reacting to the roadmap already in front of the team.

**The team.** In the second half of my internship, that vision resonated enough with engineering that I got moved onto a cross-functional team, internally nicknamed "Avengers." It spanned 6 engineering teams and several other PMs, each building one piece of a shared direction instead of five separate roadmaps. I kept leading query engine strategy on ADP Studio itself the whole time too.

**What it pulled together.** Capabilities that had been sitting in separate teams, AI for the ML pipeline, product health and observability, and Metadata Management's data catalog, combined into one agentic-first experience.

**What carried over.** Spec Mode, the same specific-over-long, prototype-as-spec discipline that shipped team tagging, became the working method across this much bigger, more cross-functional effort.

---

THE FUTURE OF PRODUCT

# What I believe about data products going forward

Stickiness
It's rarely about a missing feature. It's the cost of leaving what already works: the switching cost of tools people already know, and the real cost of migrating data and workflows over. Any product trying to unseat a Snowflake or a DBeaver is competing with familiarity first, not capability. The cheap wins I found: usability changes made directly in Figma, and using Claude Code to prototype and vision faster on the changes that mattered most.

User trust
It's earned slowly and lost fast, and that gets more true, not less, as AI takes on more of the workflow. Users will forgive a slow feature. They won't forgive a confidently wrong one, part of what the AI chatbot launch taught me directly. Trustworthy AI recommendations have to be grounded in real data, not just model confidence, if you want to win against AI bias.

Security
It can't be an afterthought layered onto a platform product. It has to be something a platform PM is optimizing for from the start, even when that means saying no to what a team is asking for this week. That's a harder position to hold as a young PM than it sounds, because the ask in front of you is always louder than the principle behind saying no to it.

MCPs & agentic behavior
They're changing what "using a tool" even means. When an agent can act directly on structured, permissioned data instead of a person clicking through a UI, the product surface shifts from screens to APIs and access boundaries. I think the platforms that win that shift won't be the ones with the most features. They'll be the ones whose data was trustworthy enough to hand to an agent in the first place.

KEY INSIGHT

> Every one of these comes back to the same thing: whether someone can act on your data without checking it first. That used to be a nice property. Once an agent is the one acting, it is the whole product.
