# Terminal stories: what I need from you

The `/proto/terminal` page shows 2 published chapters (Autodesk PM, Tesla) and 8 **draft** chapters. The drafts only reword facts that are already on this site, so they read thin. A one-line answer to any of the questions below is enough for me to turn a draft into a real story (I will only use what you tell me).

## Questions per role

### autodesk-eng (`autodesk-eng`)
- Which single feature or ticket took the longest, and what was the actual blocker?
- What broke in prod or in review because of a contract or data assumption you got wrong?
- If you rebuilt that search or pagination work today, what would you do differently?

### intuit (`intuit`)
- Name one component you shipped and one design-system constraint that made it harder than expected.
- What did you push back on, or wish you had pushed back on, in the onboarding flow?
- Did any of it ship to real TurboTax users, and did you see how it performed?

### omers (`omers`)
- Which workflow did a stakeholder reject or rework after UAT, and what had you misread?
- Who was the hardest non-technical stakeholder to get requirements out of, and what finally worked?
- What would you build differently in ServiceNow now that you have written real backend code?

### metaverse (`metaverse`)
- What was the bounce rate before and after, and how did you actually bring it down?
- What kept breaking in the Selenium scraper, and how did you handle it?
- Did anyone keep using the pipeline after you left, and would you build it the same way?

### stealth-startup (`stealth-startup`)
- What did customer discovery tell you that changed the MVP scope?
- Which feature did you ship and then regret, or cut and then miss?
- Where did wearing both the PM and engineer hat actively hurt the product?

### hack-western (`hack-western`)
- What went wrong during a live event weekend, and how did the team handle it?
- What was hardest about going from writing the portal yourself to leading six people who write it?
- Which decision about the portal would you reverse if you were starting the next cycle?

### ivey-product (`ivey-product`)
- What did participants struggle with most in the 10 weeks, and how did you change the curriculum because of it?
- Did anyone from the bootcamp land a product role, and what did they say helped?
- Which week or workshop did not work, and what would you replace it with?

### western (`western`)
- Which course or project actually changed how you build, and how?
- What was the hardest part of running the CS and Ivey workloads together?
- Is there anything from the degree you now think was a waste of time, or something you wish you had taken?

## Figures that conflict in the repo (tell me which is right)

I used the live figures everywhere. These sources disagree:

- **Autodesk adoption:** 40% in `lib/workflow/story-narrative.ts` vs 60% in the live case study (used 60%).
- **Graduation:** Spring 2027 (`story-narrative.ts`) vs Fall 2027 (`workflow-layers.ts`). Only "2022 – 2027" is used.
- **LaurelSpace period:** "Fall 2023" vs "Pre-seed" (used "Pre-seed", as on the card).
- **Autodesk SWE numbers:** 40+ Pact tests and 35% fewer regressions (live sources) vs 60+ tests and 30% (an old deleted Q&A file). Neither number is used.
- **OMERS title:** "Solutions Engineer" (card, used) vs "Solutions Architect" elsewhere.
- **Intuit title:** "Frontend Engineer Intern" (card, used) vs "Software Engineer Intern" elsewhere.
- **IPS Fellowship:** "10-week" bootcamp (card, used) vs "50-person" bootcamp (other files).

## Numbers I left out because they only appear in unverified files

If any of these are accurate and you want them in the stories, say so and I will add them:

- Intuit: 35% engagement lift; 10+ React/TypeScript components; theming across 4 pages.
- OMERS: 8+ automation solutions; 60-70% faster processes.
- Metaverse: 500% outreach increase; 54% open rate.
- Autodesk SWE: four repos across three teams (North America, Europe, India).
