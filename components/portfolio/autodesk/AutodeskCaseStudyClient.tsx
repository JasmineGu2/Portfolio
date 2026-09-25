'use client'

import { ArrowLeft } from 'lucide-react'
import {
  AUTODESK_CHALLENGES,
  AUTODESK_EXPORT_DECISION,
  AUTODESK_FUTURE_BLOCKS,
  AUTODESK_HERO_META,
  AUTODESK_OUTCOMES,
  AUTODESK_PROBLEM_REASONS,
  AUTODESK_ROLE_ROWS,
} from '@/lib/portfolio/autodesk-case-study'

export function AutodeskCaseStudyClient() {
  return (
    <article className="case-study">
      {/* Sidebar TOC */}
      <aside className="case-study__sidebar">
        <nav>
          <ul className="case-study__toc">
            <li><a href="#starting" className="case-study__toc-link">Starting My Internship</a></li>
            <li><a href="#getting-up-to-speed" className="case-study__toc-link">Getting Up to Speed</a></li>
            <li><a href="#understanding-users" className="case-study__toc-link">Understanding Users</a></li>
            <li><a href="#export-problem" className="case-study__toc-link">The Export Problem</a></li>
            <li><a href="#redesign" className="case-study__toc-link">Redesigning the Product</a></li>
            <li><a href="#ai-changed-work" className="case-study__toc-link">Building with AI</a></li>
            <li><a href="#ai-native-world" className="case-study__toc-link">Thinking Ahead</a></li>
            <li><a href="#learnings" className="case-study__toc-link">What I Learned</a></li>
            <li><a href="#wrapping-up" className="case-study__toc-link">Wrapping Up</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Article */}
      <div className="case-study__article">
        <a href="/" className="case-study__back">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back home
        </a>

        {/* Header */}
        <header className="case-study__header">
          <h1 className="case-study__title">{AUTODESK_HERO_META.title}</h1>
          <p className="case-study__meta">Jasmine Gu · Summer 2026</p>
        </header>

        {/* Starting Section */}
        <section className="case-study__section" id="starting">
          <h2 className="case-study__section-title">Starting My Product Internship</h2>
          <p className="case-study__body">
            My internship at Autodesk ended up being a much bigger learning experience than I expected. I joined as a Product Manager Intern on ADP Studio, an internal data product used by software engineers, business analysts, and data analysts across Autodesk. I was the only PM on the product and there wasn't a designer on the team, so I ended up working across product, UX, research, prototyping, and a lot of technical decisions.
          </p>
          <p className="case-study__body">
            The timing also made things interesting. Autodesk was moving teams off PopSQL, the SQL editor many of them were already using, and ADP Studio was one of the products they were being asked to move to. The deadline meant people had to leave PopSQL, but it didn't mean they had to like or use ADP Studio.
          </p>
          <p className="case-study__body">
            That became the main challenge I worked on throughout the internship: how do you get people to switch to a product when the migration is mandatory, but using your product isn't?
          </p>
        </section>

        {/* Getting Up to Speed */}
        <section className="case-study__section" id="getting-up-to-speed">
          <h2 className="case-study__section-title">Getting Up to Speed</h2>
          <p className="case-study__body">
            I joined in May, with the migration starting shortly after. Two weeks into my internship, my manager left for a 7-week sabbatical. The previous PM had limited availability, my director hadn't worked closely with the product, and the engineering team was based in India.
          </p>
          <p className="case-study__body">
            There wasn't really anyone who had the full picture anymore, so I had to get up to speed pretty quickly.
          </p>
          <p className="case-study__body">
            I started by trying to understand how everything fit together. ADP Studio wasn't an isolated SQL editor. It sat on top of Autodesk's broader Data Portal, which connected things like data access, batch and stream processing, pipeline observability, metadata, and other internal systems.
          </p>
          <p className="case-study__body">
            I spent a lot of time reading through old documentation, talking to users and engineers, and using AI tools to help me learn the technical stack. I even had AI quiz me on parts of the system until I could keep up in engineering conversations.
          </p>
          <p className="case-study__body">
            I also ran 12+ user interviews. I had inherited a document with more than 30 requests, but not much context around why they existed or which ones mattered most. Talking directly to users helped me build my own understanding of the product instead of simply inheriting someone else's roadmap.
          </p>
        </section>

        {/* Understanding Users */}
        <section className="case-study__section" id="understanding-users">
          <h2 className="case-study__section-title">Figuring Out What People Actually Needed</h2>
          <p className="case-study__body">
            One of the things I learned pretty quickly was that ADP Studio didn't have one type of user.
          </p>
          <p className="case-study__body">
            Some people wanted a simple place to run queries. Others needed temporary tables to stage work, access to large amounts of raw data, or more advanced workflows. Different teams had built very different habits around their data.
          </p>
          <p className="case-study__body">
            That made product decisions surprisingly difficult. I couldn't optimize for one power user and ignore everyone else, but I also didn't want to make the product so simple that it became frustrating for people doing more advanced work.
          </p>
          <p className="case-study__body">
            A lot of my work became about finding that middle ground and figuring out which problems were actually worth solving.
          </p>
        </section>

        {/* Export Problem */}
        <section className="case-study__section" id="export-problem">
          <h2 className="case-study__section-title">The Export Problem</h2>
          <p className="case-study__body">
            One of the biggest blockers to adoption was something that sounds pretty simple: exporting data.
          </p>
          <p className="case-study__body">
            Analysts wanted to take data out of ADP Studio and use it in notebooks, spreadsheets, models, and other tools. From their perspective, blocking exports made ADP Studio less useful than the tools they were already using.
          </p>
          <p className="case-study__body">
            From a security perspective, though, letting people freely export data defeated some of the purpose of having a governed data platform in the first place. Once a file leaves the platform, it no longer has the same access controls, auditing, or expiration rules.
          </p>
          <p className="case-study__body">
            At first, it felt like there were only two options: allow exports or don't allow them.
          </p>
          <p className="case-study__body">
            The more I talked to Security, Legal, Metadata Management, and our users, the more I realized that wasn't really the right question.
          </p>
          <p className="case-study__body">
            We ended up looking at the sensitivity of the data instead. Lower-sensitivity data could be exported more freely, while sensitive data could have additional controls around it.
          </p>
          <p className="case-study__body">
            I liked this decision because it turned a fairly abstract argument into something much more concrete. Instead of asking, "Should this user be allowed to export?", we could ask, "What kind of data is this, and what controls should follow it?"
          </p>
        </section>

        {/* Redesign */}
        <section className="case-study__section" id="redesign">
          <h2 className="case-study__section-title">Redesigning the Product</h2>
          <p className="case-study__body">
            Alongside the larger product decisions, I spent a lot of time redesigning the actual experience.
          </p>
          <p className="case-study__body">
            I worked directly in Figma on 7+ workflows and used Claude Code to prototype the changes I wanted to test. Since there wasn't a designer on the team, I also created a 12-component design system to keep the prototypes consistent with what engineering would eventually build.
          </p>
          <p className="case-study__body">
            I ended up building and testing 12+ prototypes myself. That helped us catch more than 20 issues before they made it into engineering and cut the time from concept to validation by around 40%.
          </p>
          <p className="case-study__body">
            For the AI features, I worked on everything from an AI chatbot to schema assistance, query discovery, autocomplete, and MCP integrations. I also created a benchmarking framework for our MCP- and LLM-powered features across 20+ representative workflows, looking at things like accuracy, latency, task completion, and trustworthiness.
          </p>
          <p className="case-study__body">
            This was one of my favorite parts of the internship because I could go from hearing a user problem, to designing a solution, to actually building something I could put in front of someone that same day.
          </p>
        </section>

        {/* Building with AI */}
        <section className="case-study__section" id="ai-changed-work">
          <h2 className="case-study__section-title">Building with AI Changed How We Worked</h2>
          <p className="case-study__body">
            One of the more interesting things I noticed during the internship was how quickly prototyping was changing.
          </p>
          <p className="case-study__body">
            With tools like Claude Code, it became much easier to turn an idea into something people could actually interact with. But that didn't necessarily make product development easier.
          </p>
          <p className="case-study__body">
            At one point, I built a prototype for tagging queries and sharing them in team folders. It looked pretty straightforward. Once engineering started looking at it, though, we immediately ran into questions the prototype didn't answer.
          </p>
          <p className="case-study__body">
            How should search work across team folders? Should team folders behave differently from personal folders? How should tagging interact with metadata?
          </p>
          <p className="case-study__body">
            The prototype showed what the feature could look like, but it didn't capture all the decisions behind it.
          </p>
          <p className="case-study__body">
            So I built something called Spec Mode. The idea was to put the working prototype alongside the user story, product details, and feedback that would normally live in a separate spec.
          </p>
          <p className="case-study__body">
            Instead of sending engineering a prototype and then another document explaining it, both lived together.
          </p>
          <p className="case-study__body">
            This ended up being useful beyond just this one feature. As more teams started building with AI, I found that the hard part wasn't always building something anymore. It was getting everyone to agree on what should actually be built.
          </p>
        </section>

        {/* AI Native World */}
        <section className="case-study__section" id="ai-native-world">
          <h2 className="case-study__section-title">Thinking About What Comes Next</h2>
          <p className="case-study__body">
            Towards the second half of my internship, I started thinking more about what ADP Studio could look like in an AI-native world.
          </p>
          <p className="case-study__body">
            I didn't think the answer was simply putting a chatbot next to a SQL editor. If agents were eventually going to work directly with company data, then the underlying query engine, metadata, permissions, and APIs all became part of the experience.
          </p>
          <p className="case-study__body">
            I wrote a product vision around that idea, and it eventually grew into a much larger cross-functional effort.
          </p>
          <p className="case-study__body">
            I was moved onto a team internally nicknamed "Avengers," which brought together 6 engineering teams and several PMs. Different teams were working on pieces of the same direction, including AI for the ML pipeline, product health and observability, and Metadata Management's data catalog.
          </p>
          <p className="case-study__body">
            The work eventually became part of Autodesk's broader agentic data strategy. I continued working on the query engine strategy for ADP Studio while contributing to the larger effort.
          </p>
          <p className="case-study__body">
            It was pretty cool to see something that started as an idea I had for one internal product turn into something much bigger.
          </p>
        </section>

        {/* Learnings */}
        <section className="case-study__section" id="learnings">
          <h2 className="case-study__section-title">What I Learned</h2>
          <p className="case-study__body">
            My biggest takeaway from the internship was probably that product work is mostly about figuring out what the real problem is.
          </p>
          <p className="case-study__body">
            The first version of a problem is rarely the whole story. The export problem looked like a yes-or-no policy question. It turned out to be a data classification problem. The prototype problem looked like a tooling problem. It turned out to be an alignment problem.
          </p>
          <p className="case-study__body">
            I also came away with a much stronger appreciation for how important trust is when you're building AI products. If an AI system is helping someone work with real company data, being confident isn't enough. The information needs to be grounded in the underlying data, and the system needs clear boundaries around what it can access and do.
          </p>
          <p className="case-study__body">
            Finally, I learned how much I enjoy being close to the actual building process. I liked being able to jump between user interviews, Figma, code, product strategy, and conversations with engineers depending on what the problem needed.
          </p>
        </section>

        {/* Wrapping Up */}
        <section className="case-study__section" id="wrapping-up">
          <h2 className="case-study__section-title">Wrapping Up</h2>
          <p className="case-study__body">
            Overall, I'm really grateful for everything I got to work on at Autodesk. I came in expecting to learn more about product management, but I ended up getting to experience much more of the product development process firsthand.
          </p>
          <p className="case-study__body">
            I got to own a product, work directly with users, prototype and design features myself, dig into technical systems, and help shape an AI strategy that grew beyond the original product.
          </p>
          <p className="case-study__body">
            What made the internship especially memorable was the amount of ownership I was given. There were definitely moments where I had no idea what the right answer was, but having the freedom to figure it out was probably the most valuable part of the experience.
          </p>
          <p className="case-study__body">
            I'm taking a lot of that with me into whatever I build next.
          </p>
        </section>
      </div>
    </article>
  )
}
