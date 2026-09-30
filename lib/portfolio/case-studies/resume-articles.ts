import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import type { CaseStudySection } from './types'

/**
 * Short write-ups for roles whose full case study isn't written yet, taken only from the résumé
 * (context/Jasmine_SWE.pdf). `role` and `period` are the résumé's title and dates for the meta line.
 * Never name the stealth startup: the résumé's company name stays off the site.
 */
export interface ResumeArticle {
  role: string
  period: string
  sections: CaseStudySection[]
}

export const RESUME_ARTICLES: Partial<Record<WorkId, ResumeArticle>> = {
  'autodesk-eng': {
    role: 'Full-Stack Engineering Intern',
    period: 'Jan to May 2026',
    sections: [
      {
        id: 'role',
        heading: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: "I worked on Autodesk Fusion's library platform, which has 4.6M+ users. It helps users and engineering teams store, search, organize and reuse shared materials, textures, components and metadata.",
          },
          {
            type: 'paragraph',
            text: 'I worked across 4 repositories with 3 engineering teams in North America, Europe and India. I took part in architecture reviews, PR feedback, API design and system design in Miro and Confluence.',
          },
        ],
      },
      {
        id: 'built',
        heading: 'What I built',
        blocks: [
          {
            type: 'paragraph',
            text: 'I built 6+ end-to-end features across several microservices. That meant backend databases and services in Java and C++, and frontend UI in React and TypeScript.',
          },
          {
            type: 'paragraph',
            text: 'I built data workflows backed by DynamoDB and Redis, with query patterns, refresh and invalidation logic, and caching. They cut redundant database reads and kept metadata fresher and faster across services.',
          },
          {
            type: 'paragraph',
            text: 'I also fixed reliability issues in distributed services and asynchronous message-broker workflows. These were concurrency, locking and cross-service integration bugs that affected long-running operations.',
          },
        ],
      },
      {
        id: 'impact',
        heading: 'Impact',
        blocks: [
          {
            type: 'paragraph',
            text: 'I led an API integration initiative that improved cross-service reliability by 30%. I set up reusable standards with Pact contract testing and wrote 60+ automated tests.',
          },
          {
            type: 'paragraph',
            text: 'Then I documented the testing architecture so 6 other engineering teams could adopt it too.',
          },
        ],
      },
      {
        id: 'stack',
        heading: 'Stack',
        blocks: [
          { type: 'tags', items: ['Java', 'C++', 'React', 'TypeScript', 'DynamoDB', 'Redis', 'Pact', 'Miro', 'Confluence'] },
        ],
      },
    ],
  },
  intuit: {
    role: 'Frontend Engineer Intern',
    period: 'May to Aug 2024',
    sections: [
      {
        id: 'role',
        heading: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'I built the TurboTax sign-up experience at Intuit. I cared about design craft, small details and responsiveness, all to help fewer people drop off before they finished signing up.',
          },
        ],
      },
      {
        id: 'built',
        heading: 'What I built',
        blocks: [
          {
            type: 'paragraph',
            text: 'I built 10+ reusable UI components, 3 animations and 4 pages, including interactive cards, accordions and banners.',
          },
          {
            type: 'paragraph',
            text: 'I also supported A/B testing across onboarding. We iterated on UI variations based on how people actually behaved.',
          },
        ],
      },
      {
        id: 'impact',
        heading: 'Impact',
        blocks: [
          {
            type: 'paragraph',
            text: 'I coded the digital experience for the Credit Karma × TurboTax campaign, which raised user engagement by 35%.',
          },
        ],
      },
      {
        id: 'stack',
        heading: 'Stack',
        blocks: [{ type: 'tags', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] }],
      },
    ],
  },
  'stealth-startup': {
    role: 'Full-Stack Engineer Intern',
    period: 'Sep to Dec 2023',
    sections: [
      {
        id: 'role',
        heading: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'I built CRM software for childcare providers at a stealth startup. It ran as a hybrid web and mobile app, and we worked in Agile Scrum.',
          },
        ],
      },
      {
        id: 'built',
        heading: 'What I built',
        blocks: [
          {
            type: 'paragraph',
            text: 'I created the user authentication process and set up the database for 3 user types with PostgreSQL, Axios and Django. That covered data fetching, URL mapping and session handling.',
          },
          {
            type: 'paragraph',
            text: 'I also integrated an email automation system and the Stripe Payment API.',
          },
        ],
      },
      {
        id: 'impact',
        heading: 'Impact',
        blocks: [
          {
            type: 'paragraph',
            text: 'The email automation and Stripe integration cut administrative effort by 40%.',
          },
        ],
      },
      {
        id: 'stack',
        heading: 'Stack',
        blocks: [{ type: 'tags', items: ['PostgreSQL', 'Django', 'Axios', 'Stripe Payment API', 'Agile Scrum'] }],
      },
    ],
  },
  omers: {
    role: 'Solutions Engineer, ServiceNow',
    period: 'May to Aug 2023',
    sections: [
      {
        id: 'role',
        heading: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'I was a ServiceNow solutions engineer at OMERS, working on enterprise processes with stakeholders and non-technical end users.',
          },
        ],
      },
      {
        id: 'built',
        heading: 'What I built',
        blocks: [
          {
            type: 'paragraph',
            text: 'I designed the UX and programmed the functionality for 8+ software and automation solutions, including intake forms, email notifications and process flows.',
          },
          {
            type: 'paragraph',
            text: 'I ran requirements analysis with stakeholders and non-technical end users to understand what they and the business needed. Then I ran QA and user acceptance testing (UAT) sessions with them.',
          },
        ],
      },
      {
        id: 'impact',
        heading: 'Impact',
        blocks: [
          {
            type: 'paragraph',
            text: 'The solutions improved enterprise processes by 60 to 70%. Testing reached a 90% success rate, and 6+ features shipped.',
          },
        ],
      },
      {
        id: 'stack',
        heading: 'Stack',
        blocks: [{ type: 'tags', items: ['ServiceNow', 'Intake forms', 'Email notifications', 'Process flows', 'QA', 'UAT'] }],
      },
    ],
  },
  metaverse: {
    role: 'Developer and Data Analyst Intern',
    period: 'Nov 2022 to May 2023',
    sections: [
      {
        id: 'role',
        heading: 'The role',
        blocks: [
          {
            type: 'paragraph',
            text: 'I was a developer and data analyst intern at Metaverse Group, working on B2B email outreach.',
          },
        ],
      },
      {
        id: 'built',
        heading: 'What I built',
        blocks: [
          {
            type: 'paragraph',
            text: 'I programmed a bot scraper in Python and Selenium that found leads for our email outreach.',
          },
        ],
      },
      {
        id: 'impact',
        heading: 'Impact',
        blocks: [
          {
            type: 'paragraph',
            text: 'The bot increased B2B outreach by 500% and generated 900+ email leads.',
          },
          {
            type: 'paragraph',
            text: 'As I refined the emails, the bounce-back rate dropped from 80% to 20%, and the open rate reached 54%.',
          },
        ],
      },
      {
        id: 'stack',
        heading: 'Stack',
        blocks: [{ type: 'tags', items: ['Python', 'Selenium'] }],
      },
    ],
  },
}
