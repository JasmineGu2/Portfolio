/**
 * Skills Map Configuration
 * 
 * Each skill represents a puzzle piece in the 3D visualization.
 * Add new skills by adding entries to this array.
 */

export interface Skill {
  skill: string
  icon: string // Path to icon in /public/icons (e.g., "react.svg")
  targetId: string // DOM id to scroll to (e.g., "#projects")
  description: string // Short description for tooltip
}

export const skills: Skill[] = [
  {
    skill: 'React ⚛️',
    icon: '/puzzle/react.png',
    targetId: 'technical-projects',
    description: 'Building interactive user interfaces',
  },
  {
    skill: 'TypeScript',
    icon: '/puzzle/typescript.png',
    targetId: 'technical-projects',
    description: 'Type-safe JavaScript development',
  },
  {
    skill: 'Python',
    icon: '/puzzle/python.png',
    targetId: 'technical-projects',
    description: 'Versatile programming language',
  },
  {
    skill: 'C++',
    icon: '/puzzle/c++.png',
    targetId: 'technical-projects',
    description: 'High-performance systems programming',
  },
  {
    skill: 'Node.js',
    icon: '/puzzle/nodejs.png',
    targetId: 'technical-projects',
    description: 'Server-side JavaScript runtime',
  },
  {
    skill: 'Go',
    icon: '/puzzle/go.png',
    targetId: 'technical-projects',
    description: 'Go programming language',
  },
  {
    skill: 'Django',
    icon: '/puzzle/django.png',
    targetId: 'technical-projects',
    description: 'Python web framework',
  },
  {
    skill: 'Redis',
    icon: '/puzzle/redis.png',
    targetId: 'technical-projects',
    description: 'In-memory data structure store',
  },
  {
    skill: 'Llama 🦙',
    icon: '/puzzle/llama.png',
    targetId: 'technical-projects',
    description: 'Meta Llama language models',
  },
  {
    skill: 'Figma',
    icon: '/puzzle/figma.png',
    targetId: 'pm-case-studies',
    description: 'Design and prototyping tool',
  },
  {
    skill: 'Tesla',
    icon: '/puzzle/tesla.png',
    targetId: 'work-experience',
    description: 'Tesla experience',
  },
  {
    skill: 'Intuit',
    icon: '/puzzle/intuit.png',
    targetId: 'work-experience',
    description: 'Intuit experience',
  },
]

/**
 * Get skill by index (for mapping to puzzle pieces)
 */
export function getSkillByIndex(index: number): Skill | null {
  return skills[index % skills.length] || null
}

/**
 * Get total number of skills
 */
export function getSkillCount(): number {
  return skills.length
}

