import type { CaseStudySection } from './types'

/**
 * The long-form Tesla write-up, moved word for word out of the old
 * `components/portfolio/tesla/TeslaCaseStudyClient.tsx` so the page has no copy in its components.
 * `tocLabel` is the shorter name the side list shows; `heading` is the section title in the article.
 */
export const TESLA_ARTICLE_BYLINE = "Jasmine Gu · August 2025"

export const TESLA_ARTICLE_SECTIONS: CaseStudySection[] = [
  {
    "id": "starting",
    "tocLabel": "Starting My Internship",
    "heading": "Starting My Engineering Internship",
    "blocks": [
      {
        "type": "paragraph",
        "text": "My internship at Tesla was one of the most technically interesting experiences I've had so far. I worked as a Frontend Engineering Intern on software used across Tesla's factories in Shanghai, Fremont, Austin, and Berlin."
      },
      {
        "type": "paragraph",
        "text": "The software helped teams with things like labeling, anomaly investigation, threat visualization, and live factory monitoring. I worked mostly on the frontend, where a lot of my job was turning large amounts of operational data, live updates, and protected factory footage into interfaces that people could actually investigate and use quickly."
      },
      {
        "type": "paragraph",
        "text": "What made the internship especially interesting was that I wasn't just building individual screens. A lot of the work was figuring out how to build the underlying components and patterns so that the next engineer could reuse them instead of starting from scratch."
      }
    ]
  },
  {
    "id": "building-factory",
    "tocLabel": "Building for the Factory",
    "heading": "Building for the Factory",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The people using the software had very different jobs."
      },
      {
        "type": "paragraph",
        "text": "Operators needed to find something quickly and continue an investigation without losing their place. ML engineers needed to compare model results and understand unexpected outputs. Technicians needed interfaces that matched how investigations actually happened on the factory floor. And for the engineers building on top of the system, the frontend needed to have predictable patterns and data contracts that could support new workflows."
      },
      {
        "type": "paragraph",
        "text": "That meant I had to think about more than just whether a page worked."
      },
      {
        "type": "paragraph",
        "text": "A chart might need to update in real time without disrupting what someone was looking at. A table might need to handle a large amount of information while still making the important differences easy to spot. A video might need to stay in sync with detection data while the data around it continued changing."
      },
      {
        "type": "paragraph",
        "text": "I started thinking a lot more about how the pieces of an interface worked together rather than treating each screen as its own feature."
      }
    ]
  },
  {
    "id": "workflows",
    "tocLabel": "The Workflows",
    "heading": "The Workflows",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A lot of the product ended up revolving around the same basic investigation loop:"
      },
      {
        "type": "emphasis",
        "text": "Review data → filter results → inspect details → take action → go back without losing context"
      },
      {
        "type": "paragraph",
        "text": "I worked on live charts, forms and filters, tables, modal views, video, and the metadata around each of them."
      },
      {
        "type": "paragraph",
        "text": "One of the things I liked about this work was finding places where the same interaction could be useful in multiple parts of the product. Instead of building a new component every time a workflow needed something slightly different, I tried to make the underlying pieces reusable."
      },
      {
        "type": "paragraph",
        "text": "I ended up shipping 10+ production UI components that supported different factory workflows."
      }
    ]
  },
  {
    "id": "live-data",
    "tocLabel": "Working with Live Data",
    "heading": "Working with Live Data",
    "blocks": [
      {
        "type": "paragraph",
        "text": "One of the more challenging parts of the internship was working with video and constantly changing metadata."
      },
      {
        "type": "paragraph",
        "text": "The video showed what was happening, while the metadata around it could be updating independently with things like detections, timestamps, coordinates, and other information."
      },
      {
        "type": "paragraph",
        "text": "Early on, I realized that treating all of this as one piece of state created problems. If the metadata changed, the video could unnecessarily remount or reset, which was especially frustrating when someone was in the middle of investigating something."
      },
      {
        "type": "paragraph",
        "text": "I separated the video state from the metadata state so they could update independently."
      },
      {
        "type": "paragraph",
        "text": "That sounds like a relatively small implementation detail, but it made a big difference to the experience. The information around the video could keep changing without interrupting what the user was watching."
      },
      {
        "type": "paragraph",
        "text": "It was also one of the first times I really appreciated how closely frontend architecture and UX are connected. A state-management decision that looks completely technical can end up determining whether a user loses their place in an investigation."
      }
    ]
  },
  {
    "id": "performance",
    "tocLabel": "Making Large Datasets Fast",
    "heading": "Making Large Datasets Feel Fast",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Performance was another big part of the work."
      },
      {
        "type": "paragraph",
        "text": "These interfaces were dealing with large amounts of data and media, so loading everything at once wasn't practical. I worked on lazy loading, parallel data fetching, skeleton states, memoization, and more targeted updates to avoid doing unnecessary work."
      },
      {
        "type": "paragraph",
        "text": "The goal wasn't just to make a benchmark look better. If someone is investigating something on a factory floor, waiting for a page to load or watching a screen constantly refresh gets in the way of the actual work."
      },
      {
        "type": "paragraph",
        "text": "After the changes, page load times improved by around 20%, while time-to-insight for operations workflows improved by around 40%."
      },
      {
        "type": "paragraph",
        "text": "That experience changed how I think about frontend performance. I used to think of performance mostly as an engineering metric. At Tesla, it felt much more directly connected to how quickly someone could actually get their job done."
      }
    ]
  },
  {
    "id": "apis",
    "tocLabel": "Working with APIs",
    "heading": "Working with APIs and Protected Data",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A lot of the frontend work also meant working closely with backend engineers."
      },
      {
        "type": "paragraph",
        "text": "The UI needed predictable information about things like file locations, timestamps, detection types, visual coordinates, and supporting metadata. I worked with the backend team to figure out how that information should be represented and consumed by the frontend."
      },
      {
        "type": "paragraph",
        "text": "Video introduced another layer of complexity because factory footage couldn't just be treated like a normal public video URL."
      },
      {
        "type": "paragraph",
        "text": "The requests needed authentication, credentials, custom headers, API coordination, and CORS handling. I worked on the request flow that allowed the frontend to stream protected footage while keeping the underlying data secured."
      },
      {
        "type": "paragraph",
        "text": "This was probably one of the biggest differences from the frontend projects I'd worked on before. I wasn't just consuming an API that someone else had already designed. I had to understand how the frontend, backend, authentication, and infrastructure all fit together."
      }
    ]
  },
  {
    "id": "reusable",
    "tocLabel": "Building Reusable Systems",
    "heading": "Building Something the Next Engineer Could Use",
    "blocks": [
      {
        "type": "paragraph",
        "text": "One thing I took seriously throughout the internship was that the code I wrote wasn't only for the feature I was working on."
      },
      {
        "type": "paragraph",
        "text": "Tesla has a lot of different factory workflows, and many of them need similar pieces of UI. If every new workflow required rebuilding the same table, filter, chart, or investigation pattern, the product would become harder to maintain very quickly."
      },
      {
        "type": "paragraph",
        "text": "So when I was building something, I tried to think about how it could be reused."
      },
      {
        "type": "paragraph",
        "text": "That meant making components configurable without making them unnecessarily complicated, keeping data interfaces predictable, and thinking about how another engineer would understand the code months later."
      },
      {
        "type": "paragraph",
        "text": "The result was a set of reusable frontend components that could support workflows across multiple factories rather than a collection of one-off screens."
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
        "text": "The biggest thing I took away from Tesla was that good frontend engineering is much more than making a UI look right."
      },
      {
        "type": "subhead",
        "text": "Architecture Affects User Experience"
      },
      {
        "type": "paragraph",
        "text": "Separating video and metadata state was an engineering decision, but it directly determined whether someone could continue an investigation without losing their place."
      },
      {
        "type": "subhead",
        "text": "Performance Is a Product Problem"
      },
      {
        "type": "paragraph",
        "text": "A faster page isn't useful just because the number is smaller. It's useful because someone can get to the information they need sooner."
      },
      {
        "type": "subhead",
        "text": "Reusable Systems Take More Thought Upfront"
      },
      {
        "type": "paragraph",
        "text": "It can be faster to build something specifically for one screen, but designing a component so another team or workflow can use it later often saves much more time."
      },
      {
        "type": "paragraph",
        "text": "I also became much more comfortable working across the stack. Between frontend architecture, APIs, authentication, performance, and data flows, I came away with a much better understanding of how the different pieces of a production system fit together."
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
        "text": "Looking back, Tesla was a really valuable engineering experience for me because I got to work on software where the frontend had a very direct connection to real-world operations."
      },
      {
        "type": "paragraph",
        "text": "I wasn't building an interface in isolation. The software had to handle large datasets, live updates, protected factory footage, and workflows used by people doing very different jobs."
      },
      {
        "type": "paragraph",
        "text": "I came into the internship wanting to become a better frontend engineer, and I left with a much stronger appreciation for the systems underneath the interface too."
      },
      {
        "type": "paragraph",
        "text": "I'm especially grateful that I got to work on problems where small engineering decisions could have a noticeable impact on how quickly someone could understand what was happening and act on it."
      }
    ]
  }
]
