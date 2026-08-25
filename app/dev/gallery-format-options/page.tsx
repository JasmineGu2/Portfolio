'use client'

import { GridPatternSpotlight } from '@/components/background/GridPatternSpotlight'

interface FormatOption {
  id: number
  name: string
  description: string
  component: React.ReactNode
  code: string
}

// Reusable content sections
const ImpactRolesSection = ({ className = "" }: { className?: string }) => (
  <div className={`mb-12 ${className}`}>
    <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
      Impact Roles
    </h2>
    <ul className="space-y-3" style={{ fontFamily: "Inter" }}>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>VP, Ivey Product Society Fellowship</span> — redesigned a 50-person product bootcamp
      </li>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Hub Leader, Rewriting the Code</span>
      </li>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Orientation Residence Leader</span>
      </li>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>President, Mississauga Youth Action Council</span> — grew membership 300%
      </li>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>President, Social Justice Club</span>
      </li>
    </ul>
  </div>
)

const SideQuestingSection = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <h2 className="text-3xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
      Side-Questing At…
    </h2>
    <ul className="space-y-3" style={{ fontFamily: "Inter" }}>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Poker Club</span> — Top 9 finalist
      </li>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Hip Hop Western</span> — dancer
      </li>
      <li className="text-lg text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-[#2A2A2A] dark:text-white" style={{ fontFamily: "Editorial Old" }}>Fashion Lifestyle Society</span> — stylist & creative director
      </li>
    </ul>
  </div>
)

export default function GalleryFormatOptionsPage() {
  const formatOptions: FormatOption[] = [
    {
      id: 1,
      name: 'Centered Large',
      description: 'Centered header and subheader, large sizes',
      component: (
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors max-w-3xl mx-auto mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <div className="text-left max-w-3xl mx-auto">
            <ImpactRolesSection />
            <SideQuestingSection />
          </div>
        </div>
      ),
      code: 'text-center, large sizes, max-w-3xl mx-auto',
    },
    {
      id: 2,
      name: 'Left Aligned',
      description: 'Left-aligned text with generous spacing',
      component: (
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors max-w-2xl mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'Left aligned, max-w-2xl',
    },
    {
      id: 3,
      name: 'Split Layout',
      description: 'Header on left, subheader on right',
      component: (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white transition-colors" style={{ fontFamily: "Editorial Old" }}>
                Powered by community (and a lot of love)
              </h1>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
                A small collection of the people, communities, and projects I've gotten to help shape along the way.
              </p>
            </div>
          </div>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'grid grid-cols-1 md:grid-cols-2, split layout',
    },
    {
      id: 4,
      name: 'Stacked with Divider',
      description: 'Header and subheader with visual divider',
      component: (
        <div className="mb-12">
          <div className="pb-8 border-b border-gray-200 dark:border-gray-700 mb-12">
            <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-4 transition-colors" style={{ fontFamily: "Editorial Old" }}>
              Powered by community (and a lot of love)
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
              A small collection of the people, communities, and projects I've gotten to help shape along the way.
            </p>
          </div>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'Border-bottom divider, stacked',
    },
    {
      id: 5,
      name: 'Overlapping',
      description: 'Subheader overlaps header slightly',
      component: (
        <div className="mb-12">
          <div className="relative mb-12">
            <h1 className="text-6xl md:text-7xl font-light text-[#2A2A2A] dark:text-white mb-0 transition-colors" style={{ fontFamily: "Editorial Old" }}>
              Powered by community (and a lot of love)
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors -mt-4 ml-0 md:ml-8 max-w-xl" style={{ fontFamily: "Inter" }}>
              A small collection of the people, communities, and projects I've gotten to help shape along the way.
            </p>
          </div>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'Negative margin overlap, -mt-4',
    },
    {
      id: 6,
      name: 'Minimal Spacing',
      description: 'Tight spacing between elements',
      component: (
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-2 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 transition-colors mb-8" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <ImpactRolesSection className="mb-8" />
          <SideQuestingSection />
        </div>
      ),
      code: 'mb-2, tight spacing',
    },
    {
      id: 7,
      name: 'Large Header, Small Subheader',
      description: 'Dramatic size contrast',
      component: (
        <div className="mb-12">
          <h1 className="text-7xl md:text-8xl font-light text-[#2A2A2A] dark:text-white mb-3 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors uppercase tracking-wider mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'text-7xl header, text-sm uppercase subheader',
    },
    {
      id: 8,
      name: 'Quote Style',
      description: 'Subheader styled as a quote',
      component: (
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors italic border-l-4 border-gray-300 dark:border-gray-600 pl-6 max-w-2xl mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'Italic, border-left quote style',
    },
    {
      id: 9,
      name: 'Wide Subheader',
      description: 'Subheader spans full width',
      component: (
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors max-w-3xl" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors w-full mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'Header max-w-3xl, subheader full width',
    },
    {
      id: 10,
      name: 'Vertical Stack with Gap',
      description: 'Large gap between header and subheader',
      component: (
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-12 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors max-w-2xl mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'mb-12 gap between elements',
    },
    {
      id: 11,
      name: 'Right Aligned',
      description: 'Text aligned to the right',
      component: (
        <div className="mb-12 text-right">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-6 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Powered by community (and a lot of love)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors ml-auto max-w-2xl mb-12" style={{ fontFamily: "Inter" }}>
            A small collection of the people, communities, and projects I've gotten to help shape along the way.
          </p>
          <div className="text-left">
            <ImpactRolesSection />
            <SideQuestingSection />
          </div>
        </div>
      ),
      code: 'text-right, ml-auto',
    },
    {
      id: 12,
      name: 'Card Style',
      description: 'Text in a card-like container',
      component: (
        <div className="mb-12">
          <div className="p-8 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 mb-12">
            <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-4 transition-colors" style={{ fontFamily: "Editorial Old" }}>
              Powered by community (and a lot of love)
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
              A small collection of the people, communities, and projects I've gotten to help shape along the way.
            </p>
          </div>
          <ImpactRolesSection />
          <SideQuestingSection />
        </div>
      ),
      code: 'Card container with padding and border',
    },
  ]

  return (
    <main className="w-full min-h-screen transition-colors pt-16 md:pt-20">
      <div className="w-full px-4 md:px-8 space-y-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-[#2A2A2A] dark:text-white mb-4 transition-colors" style={{ fontFamily: "Editorial Old" }}>
            Gallery Text Format Options
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors" style={{ fontFamily: "Inter" }}>
            Different formatting and layout options for gallery page text
          </p>
        </div>

        {formatOptions.map((option) => (
          <div
            key={option.id}
            className="w-full rounded-2xl bg-[#F2F2F2] dark:bg-[rgb(23,22,23)] transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 -z-0">
              <GridPatternSpotlight />
            </div>
            <div className="relative z-10 px-6 md:px-12 py-8 md:py-12">
              <div className="mb-4">
                <h3 className="text-2xl font-light text-[#2A2A2A] dark:text-white mb-1 transition-colors" style={{ fontFamily: "Editorial Old" }}>
                  Option {option.id}: {option.name}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 transition-colors mb-6" style={{ fontFamily: "Inter" }}>
                  {option.description}
                </p>
              </div>

              {/* Preview */}
              <div className="mb-6">
                {option.component}
              </div>

              {/* Code */}
              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono" style={{ fontFamily: "Inter" }}>
                  {option.code}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
