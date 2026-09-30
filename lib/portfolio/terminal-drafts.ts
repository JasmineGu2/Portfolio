/**
 * DRAFT stories for the roles that have no published case study, for `/proto/terminal`.
 *
 * Generated from a fact sheet + drafts pair. Every fact is a verbatim quote from a live source file, and every
 * number in a draft must appear in that role's facts (both checked by script). Drafts reword those facts; they
 * add none. They render with a DRAFT badge until Jasmine has read them, and `sources` names where each draft's
 * facts live so they can be checked.
 */

export interface TerminalDraftBeat {
  label: string
  text: string
}

export interface TerminalDraft {
  title: string
  beats: TerminalDraftBeat[]
  /** `file › location` of the facts the draft was reworded from. */
  sources: string[]
}

export const TERMINAL_DRAFTS: Partial<Record<string, TerminalDraft>> = {
  "autodesk-eng": {
    "title": "Backend work on the Libraries Platform",
    "beats": [
      {
        "label": "context",
        "text": "I spent Jan to May 2026 at Autodesk as a Full-Stack Engineering Intern, on the Libraries Platform. The work was distributed asset-library services for Autodesk Fusion, so most of it sat on the backend."
      },
      {
        "label": "what I built",
        "text": "I built features that let Fusion users and internal teams store, search, organize, and reuse shared design assets, with workflows running across microservices. I improved search, pagination, validation, and API reliability. The stack included Java, Spring Boot, DynamoDB, Redis, REST APIs, contract testing, and async workflows."
      },
      {
        "label": "what I took from it",
        "text": "A product is not a page. It is a network of services, contracts, data, teams, and decisions. This is also where I went deeper on distributed systems and contracts."
      },
      {
        "label": "what came next",
        "text": "From there I moved to the product side at Autodesk: building the platform to deciding what it should be."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS['autodesk-eng']",
      "abstraction-engine-data.ts › EXPERIENCE_INPUTS autodesk-eng",
      "knowledge-graph.ts › SPINE_EDGES"
    ]
  },
  "intuit": {
    "title": "Onboarding UI for TurboTax",
    "beats": [
      {
        "label": "context",
        "text": "I was a Frontend Engineer Intern at Intuit in Summer 2024, building onboarding experiences for TurboTax.com. I came in from enterprise workflows, so this was the move to building the interface itself."
      },
      {
        "label": "what I built",
        "text": "I shipped reusable UI components, animations, tables, and themed experiences for TurboTax USA. I worked inside a large-scale component system and integrated the frontend with REST APIs. React and TypeScript, with design systems, component libraries, theming, and testing around them."
      },
      {
        "label": "what I took from it",
        "text": "Systems eventually become something a person has to understand and use."
      },
      {
        "label": "what came next",
        "text": "Tesla came next: frontend work to the systems underneath it."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS.intuit",
      "abstraction-engine-data.ts › EXPERIENCE_INPUTS intuit",
      "knowledge-graph.ts › SPINE_EDGES",
      "Hero.tsx › \"what i've been building\" list item"
    ]
  },
  "omers": {
    "title": "ServiceNow workflows at OMERS",
    "beats": [
      {
        "label": "context",
        "text": "In Summer 2023 I was a Solutions Engineer on ServiceNow at OMERS. The job was digitizing enterprise workflows and internal service experiences, inside enterprise systems, for internal business teams."
      },
      {
        "label": "what I built",
        "text": "I designed and delivered ServiceNow workflows, intake forms, notifications, and process automations. Alongside that I ran requirements analysis, stakeholder discovery, QA, and user-acceptance testing with technical and non-technical stakeholders."
      },
      {
        "label": "what I took from it",
        "text": "Solving the technical problem means very little if you misunderstand the human one."
      },
      {
        "label": "what came next",
        "text": "Intuit followed: enterprise workflows to building the interface itself. Metaverse Group sits next to this one too, since both were about turning manual work into a system."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS.omers",
      "abstraction-engine-data.ts › EXPERIENCE_INPUTS omers",
      "knowledge-graph.ts › SPINE_EDGES"
    ]
  },
  "metaverse": {
    "title": "A Python outreach pipeline",
    "beats": [
      {
        "label": "context",
        "text": "From 2022 to 2023 I was a Developer and Data Analyst Intern at Metaverse Group. The brief was automating B2B prospecting and improving outreach performance, and what I walked into was repetitive manual workflows and data collection."
      },
      {
        "label": "what I built",
        "text": "I built a Python and Selenium outreach pipeline that generated more than 900 leads. It expanded B2B outreach, reduced email bounce rates, and improved campaign performance. Web scraping and email analytics were part of it."
      },
      {
        "label": "what I took from it",
        "text": "Software can turn a repetitive process into a system."
      },
      {
        "label": "what came next",
        "text": "OMERS sits right next to it: both were about turning manual work into a system."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS.metaverse",
      "abstraction-engine-data.ts › EXPERIENCE_INPUTS metaverse",
      "knowledge-graph.ts › SPINE_EDGES"
    ]
  },
  "stealth-startup": {
    "title": "A childcare CRM from discovery to MVP",
    "beats": [
      {
        "label": "context",
        "text": "I was a Full-Stack Engineer Intern at a pre-seed stealth startup. The work was taking a childcare operations platform from customer discovery to MVP, so product strategy and full-stack development were the same job."
      },
      {
        "label": "what I built",
        "text": "I led product and engineering for the childcare CRM MVP, shipping payments, email automation, database infrastructure, and administrative workflows. On the product side I defined the roadmap, customer personas, MVP capabilities, success metrics, and go-to-market strategy through user research and competitive analysis. PostgreSQL, the Stripe API, A/B testing, and product roadmapping were part of the work."
      },
      {
        "label": "what came next",
        "text": "Hack Western relates to it, since both are zero-to-one builds. It also demonstrates owning product and engineering end to end."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS['stealth-startup']",
      "knowledge-graph.ts › SPINE_EDGES",
      "experience-cards-data.ts › EXPERIENCE_CARDS['hack-western']"
    ]
  },
  "hack-western": {
    "title": "Leading Hack Western's engineering team",
    "beats": [
      {
        "label": "context",
        "text": "I've been Product and Engineering Lead at Hack Western since 2023, on a six-person engineering team building the platform experience."
      },
      {
        "label": "what I built",
        "text": "I've been lead dev on Hack Western's dev team for 2 years: CI/CD, PR standards, and the full-stack app, shipping the live site for 2,000 students. I own product vision, technical direction, and delivery, and work across design, operations, sponsorship, and event leadership."
      },
      {
        "label": "what came next",
        "text": "It relates to the product bootcamp I led: product leadership inside the Ivey community. The stealth startup connects too, since both are zero-to-one builds. And this is where leading engineers toward a product vision happened."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS['hack-western']",
      "knowledge-graph.ts › SPINE_EDGES",
      "experience-cards-data.ts › EXPERIENCE_CARDS['ivey-product']"
    ]
  },
  "ivey-product": {
    "title": "A 10-week product bootcamp",
    "beats": [
      {
        "label": "context",
        "text": "From 2023 to 2024 I was Product Bootcamp Lead for the IPS Fellowship. It overlapped with Hack Western, and both were product leadership inside the Ivey community."
      },
      {
        "label": "what I built",
        "text": "I designed and led an intensive 10-week product management bootcamp focused on hands-on learning: curriculum design, workshop facilitation, program leadership, mentorship. Participants built side projects, gained practical product experience, learned from product mentors, and connected with peers preparing for their first product role. Community building and career development were part of it too."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS['ivey-product']",
      "knowledge-graph.ts › SPINE_EDGES",
      "experience-cards-data.ts › EXPERIENCE_CARDS['hack-western']"
    ]
  },
  "western": {
    "title": "CS and Business at Western and Ivey",
    "beats": [
      {
        "label": "context",
        "text": "I'm doing a dual degree in Computer Science and Business at Western University and Ivey Business School, 2022 to 2027. The Ivey HBA runs alongside the computer science degree."
      },
      {
        "label": "what I took from it",
        "text": "It built the technical and product foundation for everything that followed. Its focus areas were computer science, business, product strategy, software engineering, and operations."
      }
    ],
    "sources": [
      "experience-cards-data.ts › EXPERIENCE_CARDS.western"
    ]
  }
}
