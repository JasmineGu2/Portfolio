/**
 * Ask Jasmine — curated answers.
 *
 * One hand-written answer per intent, in guide voice: the agent describes Jasmine
 * in the third person ("She built…"), never speaks as her (spec §15). Every
 * factual claim traces to portfolio data — see the `grounding:` note on each
 * entry. Nothing here states a number that isn't in one of those sources
 * (spec §16). Prose ported from the first-person `recruiter-qa.ts` and cleaned to
 * read like a person, not a résumé.
 *
 * `retrieval.ts` takes these `references` as the backbone and adds graph-ranked
 * evidence around them; `readNext` here is the fallback used until real writing
 * entries exist in `writing.ts`.
 */

import type { AgentAnswer, AgentIntent } from './types'

export const AGENT_ANSWERS: Record<AgentIntent, AgentAnswer> = {
  // grounding: experience-cards-data (intuit/tesla/autodesk-eng), recruiter-qa
  // ("strongest technical experience", "What did you build at Tesla"), EXPERIENCE_INPUTS
  engineering_type: {
    intent: 'engineering_type',
    summary:
      'Three engineering internships, each a layer down from the last. At Intuit she built onboarding UI inside TurboTax’s existing component system. At Tesla she owned the video data infrastructure behind factory-camera ML (API architecture, lazy loading, secure playback) and shipped production React components. At Autodesk she went full-stack on Fusion’s library platform: features across microservices in Java and C++, DynamoDB- and Redis-backed workflows, and contract testing that other teams adopted.',
    references: [
      { type: 'experience', id: 'tesla', reason: 'She owned the whole video pipeline here, down to the infrastructure under the screen.' },
      { type: 'experience', id: 'autodesk-eng', reason: 'Her deepest systems work: distributed services, caching, and cross-team API contracts.' },
      { type: 'experience', id: 'intuit', reason: 'Engineering as integration: fitting new UI into a component library and APIs other teams owned.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'Her side projects sit on The Journey, if you want to see what she builds on her own.' },
    ],
    followUps: ['ai_experience', 'technical_pm', 'engineering_teams'],
  },

  // grounding: recruiter-qa ("distributed systems", "remote teams"), autodesk-facts
  // ("Stakeholders", "The Avengers team")
  engineering_teams: {
    intent: 'engineering_teams',
    summary:
      'Mostly distributed, across time zones. At Autodesk’s Libraries Platform she worked across four repositories and three engineering teams split between North America, Europe, and India. On the PM side her engineering partners were in India with no in-person overlap, which is part of why she moved to handing over working prototypes instead of specs. Later she was pulled onto a cross-functional group of six engineering teams building toward one shared direction.',
    references: [
      { type: 'experience', id: 'autodesk-eng', reason: 'Coordinating one change across services no single person owned.' },
      { type: 'experience', id: 'autodesk', reason: 'Remote-first product work with engineering a full time zone away.' },
      { type: 'experience', id: 'tesla', reason: 'Worked across design, backend, and ML in four factory time zones.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The Journey has photos from the teams and communities she has been part of.' },
    ],
    followUps: ['collaborators', 'engineering_type', 'technical_pm'],
  },

  // grounding: recruiter-qa ("use AI in your own work", "evaluate an AI feature"),
  // autodesk-facts ("Spec Mode"), AUTODESK_METRICS, projects-data (tldw, brewmates)
  ai_experience: {
    intent: 'ai_experience',
    summary:
      'Yes, on both sides of it. At Autodesk she owned the roadmap for AI-assisted data work (schema assistance, query discovery, SQL autocomplete, MCP integrations), which cut task time about 30%, and she built a benchmarking framework across 20+ workflows to hold those features to accuracy and trust thresholds before launch. She also wired Claude, Cursor, Obsidian, and Jira MCP into one setup that cut her own process overhead roughly 35%. Outside work, TLDW and BrewMates were fast hackathon builds with a language model at the core.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'Where she owned AI-assisted query experiences for a governed data platform.' },
      { type: 'project', id: 'tldw', reason: 'Summarized and classified YouTube videos, an LLM build shipped end to end.' },
      { type: 'project', id: 'brewmates', reason: 'Networking help for students, built fast around a language model.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'TLDW and BrewMates sit with the rest of her side projects on The Journey.' },
    ],
    followUps: ['beliefs', 'technical_pm', 'things_built'],
  },

  // grounding: recruiter-qa ("built zero to one", Tesla/Hack Western answers),
  // experience-cards-data, AUTODESK_METRICS ("7+ redesigned workflows")
  things_built: {
    intent: 'things_built',
    summary:
      'A lot, at different sizes. The biggest is LaurelSpace, a childcare CRM where she owned product and engineering end to end: payments, email automation, the database, the go-to-market plan. At Tesla she built factory-camera ML tooling and the video infrastructure under it; at Autodesk, distributed library services and later 7+ redesigned workflows for a governed SQL platform. Smaller and faster: TLDW, BrewMates, and the Hack Western hacker portal for 300+ students.',
    references: [
      { type: 'experience', id: 'stealth-startup', reason: 'LaurelSpace, the clearest case of her owning both halves, product and code.' },
      { type: 'experience', id: 'tesla', reason: 'Operator-facing ML tooling, backed by real video infrastructure.' },
      { type: 'experience', id: 'hack-western', reason: 'Built the portal first, then led the dev team of 8 behind it.' },
      { type: 'project', id: 'tldw', reason: 'A weekend build that summarized and classified YouTube videos.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The Journey collects the smaller builds and case studies.' },
    ],
    followUps: ['product_ownership', 'ai_experience', 'engineering_type'],
  },

  // grounding: autodesk-facts ("What ADP Studio is", roleReality), recruiter-qa
  // ("What did you own at Autodesk", "What is LaurelSpace"), experience-cards-data
  products: {
    intent: 'products',
    summary:
      'Two she owned, plus product leadership elsewhere. At Autodesk she ran product for ADP Studio, the governed SQL and data-exploration layer on the company’s data lake, used by 380+ analysts and engineers. Before that, LaurelSpace, a pre-seed childcare CRM where she set the roadmap, personas, MVP scope, and go-to-market herself. She also led product for the Hack Western portal, and led the Product Fellowship at Ivey for 2 years, hosting 28 product educationals.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'ADP Studio, an enterprise data platform she was effectively the solo PM for.' },
      { type: 'experience', id: 'stealth-startup', reason: 'LaurelSpace, product and engineering owned from discovery to MVP.' },
      { type: 'experience', id: 'hack-western', reason: 'Product vision and delivery for a portal serving 300+ students.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The product case studies she did on the side are on The Journey.' },
    ],
    followUps: ['product_ownership', 'technical_pm', 'ai_experience'],
  },

  // grounding: autodesk-facts (roleReality), recruiter-qa ("What did you own at
  // Autodesk", "influencing without authority"), AUTODESK_METRICS
  product_ownership: {
    intent: 'product_ownership',
    summary:
      'Yes, and under unusually thin cover. At Autodesk she was the de facto solo PM for ADP Studio, with no embedded designer and no manager above her on the product for most of the internship. She increased adoption 60%, improved usability about 50%, and launched 7+ redesigned workflows. At LaurelSpace she owned product and engineering together, from customer discovery through MVP.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'Sole product representative for an enterprise data platform mid-transition.' },
      { type: 'experience', id: 'stealth-startup', reason: 'The other end of the spectrum: 0→1, both halves, no spec to start from.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'More of her product work, in the side projects on The Journey.' },
    ],
    followUps: ['technical_pm', 'collaborators', 'future_building'],
  },

  // grounding: recruiter-qa ("How technical are you as a PM", "still write code as
  // a PM"), autodesk-facts ("Platform PM reflections"), AUTODESK_METRICS
  technical_pm: {
    intent: 'technical_pm',
    summary:
      'Technical enough to build what she’s asking for. She came up through engineering, frontend at Intuit and Tesla, full-stack at Autodesk, so instead of writing a spec and waiting, she prototypes in Claude and hands engineering something they can click through. That caught 20+ usability and technical issues before implementation and cut concept-to-validation time about 40%. She also built the 12-component design system the prototypes were made from, since the team had no designer.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'Prototyping instead of spec-writing, plus a design system built to support it.' },
      { type: 'experience', id: 'autodesk-eng', reason: 'The full-stack internship that makes reading a service boundary routine.' },
      { type: 'experience', id: 'tesla', reason: 'ML and video infrastructure, systems under a user-facing surface.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The Journey has the things she built outside a job.' },
    ],
    followUps: ['engineering_type', 'ai_experience', 'working_style'],
  },

  // grounding: experience-cards-data, recruiter-qa ("When do you graduate?"),
  // abstraction-engine-data (AGENT_IDENTITY)
  workplaces: {
    intent: 'workplaces',
    summary:
      'Seven internships across big tech, startups, and enterprise IT, alongside a Computer Science and Business dual degree at Western and Ivey. Autodesk twice, full-stack engineering, then platform PM. Tesla and Intuit on the frontend. LaurelSpace, the childcare CRM she built 0→1. OMERS and Metaverse Group earlier, on enterprise automation and growth. She’s based in Toronto and graduates in 2027.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'Her most recent role, platform product for a governed data lake.' },
      { type: 'experience', id: 'tesla', reason: 'Factory ML systems and the infrastructure behind them.' },
      { type: 'experience', id: 'autodesk-eng', reason: 'The full-stack internship immediately before the PM one.' },
      { type: 'experience', id: 'omers', reason: 'Her first enterprise role, building ServiceNow workflows.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The Journey has her side projects and photos from outside work.' },
    ],
    followUps: ['engineering_type', 'products', 'collaborators'],
    actions: [{ type: 'navigate', href: '/' }],
  },

  // grounding: autodesk-facts ("Stakeholders", "The Avengers team"), recruiter-qa
  // ("influencing without authority"), experience-cards-data (hack-western),
  // gallery-data (GALLERY_IMPACT_ROLES)
  collaborators: {
    intent: 'collaborators',
    summary:
      'At the team and community level rather than name-dropping. At Autodesk her partners were software engineers and data analysts, plus the Trust, Metadata Management, and AI teams she needed governance sign-off from, and eventually a six-team cross-functional group. At Hack Western she leads a dev team of 8. Outside work she’s been Product VP of the Ivey Product Society, a hub leader for Rewriting the Code, and president of a municipal youth council.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'Cross-functional by necessity: governance teams, engineering, and other PMs.' },
      { type: 'experience', id: 'hack-western', reason: 'Her first time responsible for other people’s work.' },
      { type: 'experience', id: 'ivey-product', reason: 'Where she led a product community rather than a project.' },
    ],
    readNext: [
      { type: 'gallery', id: 'gallery', reason: 'Photos of the communities and teams she’s been part of, on The Journey.' },
    ],
    followUps: ['working_style', 'impact', 'engineering_teams'],
  },

  // grounding: abstraction-engine-data (MEMORY "Context Window", RUNTIME_LOOP_STEPS),
  // autodesk-facts (working pattern, sabbatical), recruiter-qa ("handle ambiguity")
  working_style: {
    intent: 'working_style',
    summary:
      'She learns by building and asks a lot of questions. Her default is to start with a small piece of the problem, take it to whoever will actually use it, then prototype it rather than write it up. She’s drawn to ambiguous problems and to understanding the system underneath a request. When her manager left for a seven-week sabbatical two weeks into her taking the product over, her response was to define the process nobody had written down.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'Owned the ambiguity and the autonomy at once, sole rep for the product.' },
      { type: 'experience', id: 'stealth-startup', reason: 'Comfortable when nobody has written the spec yet.' },
      { type: 'experience', id: 'hack-western', reason: 'Where leading other people’s work started.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The Journey is where the side projects ended up.' },
    ],
    followUps: ['values', 'collaborators', 'technical_pm'],
  },

  // grounding: EXPERIENCE_INPUTS (omers.learned), autodesk-facts ("What I believe
  // about data products"), recruiter-qa ("a mistake you made", "looking for next")
  values: {
    intent: 'values',
    summary:
      'Getting the real problem right before building, and not spending user trust to move faster. Her ServiceNow work taught her that solving the technical problem means little if you’ve misread the human one. At Autodesk she treated security and governance as product concerns rather than things bolted on at the end, partly because she once shipped an AI feature before it was ready and watched it cost confidence. She’s most engaged when a problem is technically deep and the direction isn’t settled.',
    references: [
      { type: 'experience', id: 'omers', reason: 'Where the gap between the technical problem and the human one became obvious.' },
      { type: 'experience', id: 'autodesk', reason: 'Security and trust treated as product decisions, not compliance.' },
      { type: 'experience', id: 'tesla', reason: 'The constraint is usually a layer below where the complaint shows up.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The side projects and case studies she took on outside a job.' },
    ],
    followUps: ['beliefs', 'impact', 'working_style'],
  },

  // grounding: autodesk-facts ("What I believe about data products", "Spec Mode"),
  // recruiter-qa ("your take on AI replacing software"), EXPERIENCE_INPUTS (autodesk-eng.learned)
  beliefs: {
    intent: 'beliefs',
    summary:
      'A few things she’ll argue for. Stickiness is rarely a missing feature. It’s the cost of leaving what already works, so anything trying to unseat an established tool competes with familiarity first. User trust is earned slowly and lost fast, more so as AI takes over the workflow; people forgive a slow feature, not a confidently wrong one. And when anyone can build fast, building stops being the bottleneck and agreement becomes it.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'These come straight out of the ADP Studio adoption problem.' },
      { type: 'experience', id: 'autodesk-eng', reason: 'The platform view underneath: a product is a network of services and contracts.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'Her side projects and case studies are on The Journey.' },
    ],
    followUps: ['ai_experience', 'future_building', 'values'],
  },

  // grounding: recruiter-qa ("looking for next"), autodesk-facts ("What I believe
  // about data products" last point), gallery-data (GALLERY_IMPACT_ROLES),
  // experience-cards-data (ivey-product), spec §22
  impact: {
    intent: 'impact',
    summary:
      'She hasn’t written a mission statement, but the pattern is clear enough. Professionally she wants to work where the problem is technically deep and the direction isn’t settled: platform and data products where trust and access are real constraints. Alongside that she keeps building communities: she grew a municipal youth council’s membership 300%, led a social justice club, and led her school’s Product Fellowship for 2 years, hosting 28 product educationals to help students build PM skills.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'The kind of problem she’s drawn to: judgment over throughput.' },
      { type: 'experience', id: 'ivey-product', reason: 'Teaching product to people trying to break in.' },
      { type: 'gallery', id: 'myac', reason: 'President of a municipal youth council, membership grew 300%.' },
    ],
    readNext: [
      { type: 'gallery', id: 'gallery', reason: 'The community and leadership photos sit on The Journey.' },
    ],
    followUps: ['future_building', 'beliefs', 'values'],
  },

  // grounding: recruiter-qa ("looking for next"), autodesk-facts ("The Avengers
  // team", "Spec Mode", "What I believe about data products" last point)
  future_building: {
    intent: 'future_building',
    summary:
      'More of what the cross-functional “Avengers” team was pointed at: data tools built for an AI-native world rather than a chat box bolted onto a query editor. Her hypothesis is that as agents act on permissioned, structured data instead of people clicking through a UI, the product surface moves from screens to APIs and access boundaries, and the platforms that win are the ones whose data was trustworthy enough to hand to an agent. She wants to keep working where the problem is technically deep and the direction isn’t decided yet.',
    references: [
      { type: 'experience', id: 'autodesk', reason: 'The “Avengers” bet came from a hypothesis about where data work was heading.' },
      { type: 'experience', id: 'autodesk-eng', reason: 'The platform engineering that makes “the surface moves to APIs” concrete.' },
    ],
    readNext: [
      { type: 'architecture', id: 'architecture', reason: 'The AI side projects sit on The Journey with the rest.' },
    ],
    followUps: ['beliefs', 'ai_experience', 'impact'],
  },
}
