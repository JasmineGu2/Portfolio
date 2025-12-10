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
    skill: 'React',
    icon: '/icons/react.svg',
    targetId: 'projects',
    description: 'Building interactive user interfaces',
  },
  {
    skill: 'System Design',
    icon: '/icons/system-design.svg',
    targetId: 'projects',
    description: 'Architecting scalable systems',
  },
  {
    skill: 'Product Strategy',
    icon: '/icons/product.svg',
    targetId: 'story',
    description: 'Defining product vision and roadmap',
  },
  {
    skill: 'UX Research',
    icon: '/icons/research.svg',
    targetId: 'story',
    description: 'Understanding user needs and behaviors',
  },
  {
    skill: 'Machine Learning',
    icon: '/icons/machine-learning.svg',
    targetId: 'projects',
    description: 'Building intelligent systems with AI',
  },
  {
    skill: 'Frontend Architecture',
    icon: '/icons/frontend-architecture.svg',
    targetId: 'projects',
    description: 'Designing scalable frontend systems',
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

