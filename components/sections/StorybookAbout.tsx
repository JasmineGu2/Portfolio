'use client'

import { Card, CardContent } from '@/components/ui/card'

const cardContent = [
  {
    id: '1',
    text: "I've always been the kind of engineer who can't stop asking why and needed to know every piece of the puzzle.",
  },
  {
    id: '2',
    text: 'Every role I\'ve taken, I\'ve slowly shifted closer to the user → and hence worked on Sales, PM, Business Analyst and Data teams',
  },
]

export default function StorybookAbout() {
  return (
    <section className="relative w-full">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-[#2A2A2A] dark:text-white mb-16 animate-fade-in transition-colors">
          About Me
        </h2>

        <div className="rounded-xl border-2 border-white dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-6 transition-colors">
          <div className="space-y-4">
            {cardContent.map((card, idx) => (
              <Card
                key={card.id}
                className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
                    {card.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

