/**
 * Ask Jasmine — page context.
 *
 * The agent knows where the visitor currently is (spec §9). Context influences
 * ranking and which questions are shown first — it never changes the underlying
 * answer text.
 */

import { getPortfolioItem } from '@/lib/portfolio/portfolio-data'
import type { AgentContext, AgentIntent, ContextPage } from './types'

export function deriveContext(pathname: string): AgentContext {
  if (pathname === '/tesla') return { page: 'tesla', experience: 'tesla' }
  if (pathname === '/autodesk') return { page: 'autodesk', experience: 'autodesk' }

  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '').split('/')[0]
    const item = getPortfolioItem(slug)
    if (item?.kind === 'experience') return { page: 'work', experience: slug }
    return { page: 'work' }
  }

  if (pathname === '/projects' || pathname.startsWith('/projects/')) {
    return { page: 'projects' }
  }
  if (pathname === '/architecture' || pathname.startsWith('/architecture/')) {
    return { page: 'architecture' }
  }
  if (pathname === '/gallery') return { page: 'gallery' }

  return { page: 'home' }
}

/**
 * Per-page question priority (spec §2). The first entry of the matching page's
 * list is surfaced first in the opening state and the "ask another" sheet.
 */
export const CONTEXT_INTENT_PRIORITY: Record<ContextPage, AgentIntent[]> = {
  home: ['things_built', 'technical_pm', 'ai_experience', 'workplaces'],
  projects: ['things_built', 'products', 'ai_experience', 'engineering_type'],
  architecture: ['engineering_type', 'technical_pm', 'working_style', 'workplaces'],
  gallery: ['collaborators', 'impact', 'working_style', 'values'],
  tesla: ['engineering_type', 'things_built', 'ai_experience', 'engineering_teams'],
  autodesk: ['products', 'product_ownership', 'technical_pm', 'ai_experience'],
  work: ['engineering_type', 'things_built', 'technical_pm', 'workplaces'],
}
