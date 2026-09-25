'use client'

import { ArrowLeft } from 'lucide-react'
import {
  TESLA_HERO_META,
  TESLA_OUTCOMES,
} from '@/lib/portfolio/tesla-case-study'

export function TeslaCaseStudyClient() {
  return (
    <article className="case-study">
      {/* Sidebar TOC */}
      <aside className="case-study__sidebar">
        <nav>
          <ul className="case-study__toc">
            <li><a href="#starting" className="case-study__toc-link">Starting My Internship</a></li>
            <li><a href="#building-factory" className="case-study__toc-link">Building for the Factory</a></li>
            <li><a href="#workflows" className="case-study__toc-link">The Workflows</a></li>
            <li><a href="#live-data" className="case-study__toc-link">Working with Live Data</a></li>
            <li><a href="#performance" className="case-study__toc-link">Making Large Datasets Fast</a></li>
            <li><a href="#apis" className="case-study__toc-link">Working with APIs</a></li>
            <li><a href="#reusable" className="case-study__toc-link">Building Reusable Systems</a></li>
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
          <h1 className="case-study__title">{TESLA_HERO_META.title}</h1>
          <p className="case-study__meta">Jasmine Gu · August 2025</p>
        </header>

        {/* Starting Section */}
        <section className="case-study__section" id="starting">
          <h2 className="case-study__section-title">Starting My Engineering Internship</h2>
          <p className="case-study__body">
            My internship at Tesla was one of the most technically interesting experiences I've had so far. I worked as a Frontend and Infrastructure Engineering Intern on software used across Tesla's factories in Shanghai, Fremont, Austin, and Berlin.
          </p>
          <p className="case-study__body">
            The software helped teams with things like labeling, anomaly investigation, threat visualization, and live factory monitoring. I worked mostly on the frontend, where a lot of my job was turning large amounts of operational data, live updates, and protected factory footage into interfaces that people could actually investigate and use quickly.
          </p>
          <p className="case-study__body">
            What made the internship especially interesting was that I wasn't just building individual screens. A lot of the work was figuring out how to build the underlying components and patterns so that the next engineer could reuse them instead of starting from scratch.
          </p>
        </section>

        {/* Building for Factory */}
        <section className="case-study__section" id="building-factory">
          <h2 className="case-study__section-title">Building for the Factory</h2>
          <p className="case-study__body">
            The people using the software had very different jobs.
          </p>
          <p className="case-study__body">
            Operators needed to find something quickly and continue an investigation without losing their place. ML engineers needed to compare model results and understand unexpected outputs. Technicians needed interfaces that matched how investigations actually happened on the factory floor. And for the engineers building on top of the system, the frontend needed to have predictable patterns and data contracts that could support new workflows.
          </p>
          <p className="case-study__body">
            That meant I had to think about more than just whether a page worked.
          </p>
          <p className="case-study__body">
            A chart might need to update in real time without disrupting what someone was looking at. A table might need to handle a large amount of information while still making the important differences easy to spot. A video might need to stay in sync with detection data while the data around it continued changing.
          </p>
          <p className="case-study__body">
            I started thinking a lot more about how the pieces of an interface worked together rather than treating each screen as its own feature.
          </p>
        </section>

        {/* Workflows */}
        <section className="case-study__section" id="workflows">
          <h2 className="case-study__section-title">The Workflows</h2>
          <p className="case-study__body">
            A lot of the product ended up revolving around the same basic investigation loop:
          </p>
          <p className="case-study__emphasis">
            Review data → filter results → inspect details → take action → go back without losing context
          </p>
          <p className="case-study__body">
            I worked on live charts, forms and filters, tables, modal views, video, and the metadata around each of them.
          </p>
          <p className="case-study__body">
            One of the things I liked about this work was finding places where the same interaction could be useful in multiple parts of the product. Instead of building a new component every time a workflow needed something slightly different, I tried to make the underlying pieces reusable.
          </p>
          <p className="case-study__body">
            I ended up shipping 10+ production UI components that supported different factory workflows.
          </p>
        </section>

        {/* Live Data */}
        <section className="case-study__section" id="live-data">
          <h2 className="case-study__section-title">Working with Live Data</h2>
          <p className="case-study__body">
            One of the more challenging parts of the internship was working with video and constantly changing metadata.
          </p>
          <p className="case-study__body">
            The video showed what was happening, while the metadata around it could be updating independently with things like detections, timestamps, coordinates, and other information.
          </p>
          <p className="case-study__body">
            Early on, I realized that treating all of this as one piece of state created problems. If the metadata changed, the video could unnecessarily remount or reset, which was especially frustrating when someone was in the middle of investigating something.
          </p>
          <p className="case-study__body">
            I separated the video state from the metadata state so they could update independently.
          </p>
          <p className="case-study__body">
            That sounds like a relatively small implementation detail, but it made a big difference to the experience. The information around the video could keep changing without interrupting what the user was watching.
          </p>
          <p className="case-study__body">
            It was also one of the first times I really appreciated how closely frontend architecture and UX are connected. A state-management decision that looks completely technical can end up determining whether a user loses their place in an investigation.
          </p>
        </section>

        {/* Performance */}
        <section className="case-study__section" id="performance">
          <h2 className="case-study__section-title">Making Large Datasets Feel Fast</h2>
          <p className="case-study__body">
            Performance was another big part of the work.
          </p>
          <p className="case-study__body">
            These interfaces were dealing with large amounts of data and media, so loading everything at once wasn't practical. I worked on lazy loading, parallel data fetching, skeleton states, memoization, and more targeted updates to avoid doing unnecessary work.
          </p>
          <p className="case-study__body">
            The goal wasn't just to make a benchmark look better. If someone is investigating something on a factory floor, waiting for a page to load or watching a screen constantly refresh gets in the way of the actual work.
          </p>
          <p className="case-study__body">
            After the changes, page load times improved by around 20%, while time-to-insight for operations workflows improved by around 40%.
          </p>
          <p className="case-study__body">
            That experience changed how I think about frontend performance. I used to think of performance mostly as an engineering metric. At Tesla, it felt much more directly connected to how quickly someone could actually get their job done.
          </p>
        </section>

        {/* APIs and Protected Data */}
        <section className="case-study__section" id="apis">
          <h2 className="case-study__section-title">Working with APIs and Protected Data</h2>
          <p className="case-study__body">
            A lot of the frontend work also meant working closely with backend engineers.
          </p>
          <p className="case-study__body">
            The UI needed predictable information about things like file locations, timestamps, detection types, visual coordinates, and supporting metadata. I worked with the backend team to figure out how that information should be represented and consumed by the frontend.
          </p>
          <p className="case-study__body">
            Video introduced another layer of complexity because factory footage couldn't just be treated like a normal public video URL.
          </p>
          <p className="case-study__body">
            The requests needed authentication, credentials, custom headers, API coordination, and CORS handling. I worked on the request flow that allowed the frontend to stream protected footage while keeping the underlying data secured.
          </p>
          <p className="case-study__body">
            This was probably one of the biggest differences from the frontend projects I'd worked on before. I wasn't just consuming an API that someone else had already designed. I had to understand how the frontend, backend, authentication, and infrastructure all fit together.
          </p>
        </section>

        {/* Building Reusable */}
        <section className="case-study__section" id="reusable">
          <h2 className="case-study__section-title">Building Something the Next Engineer Could Use</h2>
          <p className="case-study__body">
            One thing I took seriously throughout the internship was that the code I wrote wasn't only for the feature I was working on.
          </p>
          <p className="case-study__body">
            Tesla has a lot of different factory workflows, and many of them need similar pieces of UI. If every new workflow required rebuilding the same table, filter, chart, or investigation pattern, the product would become harder to maintain very quickly.
          </p>
          <p className="case-study__body">
            So when I was building something, I tried to think about how it could be reused.
          </p>
          <p className="case-study__body">
            That meant making components configurable without making them unnecessarily complicated, keeping data interfaces predictable, and thinking about how another engineer would understand the code months later.
          </p>
          <p className="case-study__body">
            The result was a set of reusable frontend components that could support workflows across multiple factories rather than a collection of one-off screens.
          </p>
        </section>

        {/* Learnings */}
        <section className="case-study__section" id="learnings">
          <h2 className="case-study__section-title">What I Learned</h2>
          <p className="case-study__body">
            The biggest thing I took away from Tesla was that good frontend engineering is much more than making a UI look right.
          </p>
          <p className="case-study__subhead">Architecture Affects User Experience</p>
          <p className="case-study__body">
            Separating video and metadata state was an engineering decision, but it directly determined whether someone could continue an investigation without losing their place.
          </p>
          <p className="case-study__subhead">Performance Is a Product Problem</p>
          <p className="case-study__body">
            A faster page isn't useful just because the number is smaller. It's useful because someone can get to the information they need sooner.
          </p>
          <p className="case-study__subhead">Reusable Systems Take More Thought Upfront</p>
          <p className="case-study__body">
            It can be faster to build something specifically for one screen, but designing a component so another team or workflow can use it later often saves much more time.
          </p>
          <p className="case-study__body">
            I also became much more comfortable working across the stack. Between frontend architecture, APIs, authentication, performance, and data flows, I came away with a much better understanding of how the different pieces of a production system fit together.
          </p>
        </section>

        {/* Wrapping Up */}
        <section className="case-study__section" id="wrapping-up">
          <h2 className="case-study__section-title">Wrapping Up</h2>
          <p className="case-study__body">
            Looking back, Tesla was a really valuable engineering experience for me because I got to work on software where the frontend had a very direct connection to real-world operations.
          </p>
          <p className="case-study__body">
            I wasn't building an interface in isolation. The software had to handle large datasets, live updates, protected factory footage, and workflows used by people doing very different jobs.
          </p>
          <p className="case-study__body">
            I came into the internship wanting to become a better frontend engineer, and I left with a much stronger appreciation for the systems underneath the interface too.
          </p>
          <p className="case-study__body">
            I'm especially grateful that I got to work on problems where small engineering decisions could have a noticeable impact on how quickly someone could understand what was happening and act on it.
          </p>
        </section>
      </div>
    </article>
  )
}
