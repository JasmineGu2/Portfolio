import { experiences } from '@/lib/experience'

export default function ExperienceList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 justify-center gap-2 md:gap-3 max-w-full mx-auto pb-2 overflow-hidden">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 px-2 py-2 md:px-3 md:py-2.5 text-center w-full min-w-0 overflow-hidden"
        >
          {/* Company */}
          <div className="font-semibold text-xs md:text-sm lg:text-base text-[#2A2A2A] dark:text-white mb-0.5 truncate" style={{ fontFamily: "Inter" }}>
            {exp.company}
          </div>
          {/* Year and Role */}
          <div className="text-[9px] md:text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 truncate" style={{ fontFamily: "Inter" }}>
            {exp.year} • {exp.role}
          </div>
        </div>
      ))}
    </div>
  )
}

