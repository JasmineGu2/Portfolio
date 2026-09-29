import type { CaseStudySection } from './types'

/**
 * The long-form Autodesk write-up, moved word for word out of the old
 * `components/portfolio/autodesk/AutodeskCaseStudyClient.tsx` so the page has no copy in its components.
 * `tocLabel` is the shorter name the side list shows; `heading` is the section title in the article.
 */
export const AUTODESK_ARTICLE_BYLINE = "Jasmine Gu · Summer 2026"

export const AUTODESK_ARTICLE_SECTIONS: CaseStudySection[] = [
  {
    "id": "starting",
    "tocLabel": "Starting My Internship",
    "heading": "Starting My Product Internship",
    "blocks": [
      {
        "type": "paragraph",
        "text": "My internship at Autodesk ended up being a much bigger learning experience than I expected. I joined as a Product Manager Intern on ADP Studio, an internal data product used by software engineers, business analysts, and data analysts across Autodesk. I was the only PM on the product and there wasn't a designer on the team, so I ended up working across product, UX, research, prototyping, and a lot of technical decisions."
      },
      {
        "type": "paragraph",
        "text": "The timing also made things interesting. Autodesk was moving teams off PopSQL, the SQL editor many of them were already using, and ADP Studio was one of the products they were being asked to move to. The deadline meant people had to leave PopSQL, but it didn't mean they had to like or use ADP Studio."
      },
      {
        "type": "paragraph",
        "text": "That became the main challenge I worked on throughout the internship: how do you get people to switch to a product when the migration is mandatory, but using your product isn't?"
      }
    ]
  },
  {
    "id": "getting-up-to-speed",
    "tocLabel": "Getting Up to Speed",
    "heading": "Getting Up to Speed",
    "blocks": [
      {
        "type": "paragraph",
        "text": "I joined in May, with the migration starting shortly after. Two weeks into my internship, my manager left for a 7-week sabbatical. The previous PM had limited availability, my director hadn't worked closely with the product, and the engineering team was based in India."
      },
      {
        "type": "paragraph",
        "text": "There wasn't really anyone who had the full picture anymore, so I had to get up to speed pretty quickly."
      },
      {
        "type": "paragraph",
        "text": "I started by trying to understand how everything fit together. ADP Studio wasn't an isolated SQL editor. It sat on top of Autodesk's broader Data Portal, which connected things like data access, batch and stream processing, pipeline observability, metadata, and other internal systems."
      },
      {
        "type": "paragraph",
        "text": "I spent a lot of time reading through old documentation, talking to users and engineers, and using AI tools to help me learn the technical stack. I even had AI quiz me on parts of the system until I could keep up in engineering conversations."
      },
      {
        "type": "paragraph",
        "text": "I also ran 12+ user interviews. I had inherited a document with more than 30 requests, but not much context around why they existed or which ones mattered most. Talking directly to users helped me build my own understanding of the product instead of simply inheriting someone else's roadmap."
      }
    ]
  },
  {
    "id": "understanding-users",
    "tocLabel": "Understanding Users",
    "heading": "Figuring Out What People Actually Needed",
    "blocks": [
      {
        "type": "paragraph",
        "text": "One of the things I learned pretty quickly was that ADP Studio didn't have one type of user."
      },
      {
        "type": "paragraph",
        "text": "Some people wanted a simple place to run queries. Others needed temporary tables to stage work, access to large amounts of raw data, or more advanced workflows. Different teams had built very different habits around their data."
      },
      {
        "type": "paragraph",
        "text": "That made product decisions surprisingly difficult. I couldn't optimize for one power user and ignore everyone else, but I also didn't want to make the product so simple that it became frustrating for people doing more advanced work."
      },
      {
        "type": "paragraph",
        "text": "A lot of my work became about finding that middle ground and figuring out which problems were actually worth solving."
      }
    ]
  },
  {
    "id": "export-problem",
    "tocLabel": "The Export Problem",
    "heading": "The Export Problem",
    "blocks": [
      {
        "type": "paragraph",
        "text": "One of the biggest blockers to adoption was something that sounds pretty simple: exporting data."
      },
      {
        "type": "paragraph",
        "text": "Analysts wanted to take data out of ADP Studio and use it in notebooks, spreadsheets, models, and other tools. From their perspective, blocking exports made ADP Studio less useful than the tools they were already using."
      },
      {
        "type": "paragraph",
        "text": "From a security perspective, though, letting people freely export data defeated some of the purpose of having a governed data platform in the first place. Once a file leaves the platform, it no longer has the same access controls, auditing, or expiration rules."
      },
      {
        "type": "paragraph",
        "text": "At first, it felt like there were only two options: allow exports or don't allow them."
      },
      {
        "type": "paragraph",
        "text": "The more I talked to Security, Legal, Metadata Management, and our users, the more I realized that wasn't really the right question."
      },
      {
        "type": "paragraph",
        "text": "We ended up looking at the sensitivity of the data instead. Lower-sensitivity data could be exported more freely, while sensitive data could have additional controls around it."
      },
      {
        "type": "paragraph",
        "text": "I liked this decision because it turned a fairly abstract argument into something much more concrete. Instead of asking, \"Should this user be allowed to export?\", we could ask, \"What kind of data is this, and what controls should follow it?\""
      }
    ]
  },
  {
    "id": "redesign",
    "tocLabel": "Redesigning the Product",
    "heading": "Redesigning the Product",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Alongside the larger product decisions, I spent a lot of time redesigning the actual experience."
      },
      {
        "type": "paragraph",
        "text": "I worked directly in Figma on 7+ workflows and used Claude Code to prototype the changes I wanted to test. Since there wasn't a designer on the team, I also created a 12-component design system to keep the prototypes consistent with what engineering would eventually build."
      },
      {
        "type": "paragraph",
        "text": "I ended up building and testing 12+ prototypes myself. That helped us catch more than 20 issues before they made it into engineering and cut the time from concept to validation by around 40%."
      },
      {
        "type": "paragraph",
        "text": "For the AI features, I worked on everything from an AI chatbot to schema assistance, query discovery, autocomplete, and MCP integrations. I also created a benchmarking framework for our MCP- and LLM-powered features across 20+ representative workflows, looking at things like accuracy, latency, task completion, and trustworthiness."
      },
      {
        "type": "paragraph",
        "text": "This was one of my favorite parts of the internship because I could go from hearing a user problem, to designing a solution, to actually building something I could put in front of someone that same day."
      }
    ]
  },
  {
    "id": "ai-changed-work",
    "tocLabel": "Building with AI",
    "heading": "Building with AI Changed How We Worked",
    "blocks": [
      {
        "type": "paragraph",
        "text": "One of the more interesting things I noticed during the internship was how quickly prototyping was changing."
      },
      {
        "type": "paragraph",
        "text": "With tools like Claude Code, it became much easier to turn an idea into something people could actually interact with. But that didn't necessarily make product development easier."
      },
      {
        "type": "paragraph",
        "text": "At one point, I built a prototype for tagging queries and sharing them in team folders. It looked pretty straightforward. Once engineering started looking at it, though, we immediately ran into questions the prototype didn't answer."
      },
      {
        "type": "paragraph",
        "text": "How should search work across team folders? Should team folders behave differently from personal folders? How should tagging interact with metadata?"
      },
      {
        "type": "paragraph",
        "text": "The prototype showed what the feature could look like, but it didn't capture all the decisions behind it."
      },
      {
        "type": "paragraph",
        "text": "So I built something called Spec Mode. The idea was to put the working prototype alongside the user story, product details, and feedback that would normally live in a separate spec."
      },
      {
        "type": "paragraph",
        "text": "Instead of sending engineering a prototype and then another document explaining it, both lived together."
      },
      {
        "type": "paragraph",
        "text": "This ended up being useful beyond just this one feature. As more teams started building with AI, I found that the hard part wasn't always building something anymore. It was getting everyone to agree on what should actually be built."
      }
    ]
  },
  {
    "id": "ai-native-world",
    "tocLabel": "Thinking Ahead",
    "heading": "Thinking About What Comes Next",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Towards the second half of my internship, I started thinking more about what ADP Studio could look like in an AI-native world."
      },
      {
        "type": "paragraph",
        "text": "I didn't think the answer was simply putting a chatbot next to a SQL editor. If agents were eventually going to work directly with company data, then the underlying query engine, metadata, permissions, and APIs all became part of the experience."
      },
      {
        "type": "paragraph",
        "text": "I wrote a product vision around that idea, and it eventually grew into a much larger cross-functional effort."
      },
      {
        "type": "paragraph",
        "text": "I was moved onto a team internally nicknamed \"Avengers,\" which brought together 6 engineering teams and several PMs. Different teams were working on pieces of the same direction, including AI for the ML pipeline, product health and observability, and Metadata Management's data catalog."
      },
      {
        "type": "paragraph",
        "text": "The work eventually became part of Autodesk's broader agentic data strategy. I continued working on the query engine strategy for ADP Studio while contributing to the larger effort."
      },
      {
        "type": "paragraph",
        "text": "It was pretty cool to see something that started as an idea I had for one internal product turn into something much bigger."
      }
    ]
  },
  {
    "id": "learnings",
    "tocLabel": "What I Learned",
    "heading": "What I Learned",
    "blocks": [
      {
        "type": "paragraph",
        "text": "My biggest takeaway from the internship was probably that product work is mostly about figuring out what the real problem is."
      },
      {
        "type": "paragraph",
        "text": "The first version of a problem is rarely the whole story. The export problem looked like a yes-or-no policy question. It turned out to be a data classification problem. The prototype problem looked like a tooling problem. It turned out to be an alignment problem."
      },
      {
        "type": "paragraph",
        "text": "I also came away with a much stronger appreciation for how important trust is when you're building AI products. If an AI system is helping someone work with real company data, being confident isn't enough. The information needs to be grounded in the underlying data, and the system needs clear boundaries around what it can access and do."
      },
      {
        "type": "paragraph",
        "text": "Finally, I learned how much I enjoy being close to the actual building process. I liked being able to jump between user interviews, Figma, code, product strategy, and conversations with engineers depending on what the problem needed."
      }
    ]
  },
  {
    "id": "wrapping-up",
    "tocLabel": "Wrapping Up",
    "heading": "Wrapping Up",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Overall, I'm really grateful for everything I got to work on at Autodesk. I came in expecting to learn more about product management, but I ended up getting to experience much more of the product development process firsthand."
      },
      {
        "type": "paragraph",
        "text": "I got to own a product, work directly with users, prototype and design features myself, dig into technical systems, and help shape an AI strategy that grew beyond the original product."
      },
      {
        "type": "paragraph",
        "text": "What made the internship especially memorable was the amount of ownership I was given. There were definitely moments where I had no idea what the right answer was, but having the freedom to figure it out was probably the most valuable part of the experience."
      },
      {
        "type": "paragraph",
        "text": "I'm taking a lot of that with me into whatever I build next."
      }
    ]
  }
]
