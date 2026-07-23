import {
  Zap,
  Compass,
  Users,
  Layout,
  Code,
  Settings,
  GitBranch,
  Merge,
  Network,
  CheckCircle,
  Sparkles,
  Shield,
  Truck,
  Brain,
  Palette,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  compass: Compass,
  users: Users,
  layout: Layout,
  code: Code,
  settings: Settings,
  'git-branch': GitBranch,
  merge: Merge,
  orchestrator: Network,
  'check-circle': CheckCircle,
  sparkles: Sparkles,
  shield: Shield,
  truck: Truck,
  brain: Brain,
  palette: Palette,
}

interface NodeIconProps {
  name: string
  className?: string
  color?: string
}

export function NodeIcon({ name, className = 'w-5 h-5', color }: NodeIconProps) {
  const Icon = ICON_MAP[name] ?? Sparkles
  return <Icon className={className} style={color ? { color } : undefined} aria-hidden />
}

export function getAgentIcon(agentType: string): string {
  const map: Record<string, string> = {
    context: 'compass',
    user: 'users',
    product: 'layout',
    engineering: 'code',
    operations: 'settings',
    experience: 'palette',
    intelligence: 'brain',
    reliability: 'shield',
    delivery: 'truck',
  }
  return map[agentType] ?? 'sparkles'
}
