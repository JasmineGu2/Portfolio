type Sw = [string, string, string]
type PillColors = [string, string, string, string, string]

export type PaletteVariant = 'light' | 'tint' | 'bold' | 'duo'

export interface PaletteGround {
  shell: string
  canvas: string
  dot: string
  soft: string
  fg?: string
  border?: string
}

export interface HeroCardColors {
  bg: string
  fg: string
  sub?: string
  border?: string
  label?: string
  emGreen?: string
  emBlue?: string
  emMagenta?: string
}

export interface HeroCardTheme {
  intro: HeroCardColors
  nav: HeroCardColors
  pills: HeroCardColors
  actions: HeroCardColors
}

/** Three work-tile background fills only — hero/shell use the full palette elsewhere */
export interface DuoBucketPalette {
  warm: string
  cool: string
  neutral: string
}

export type PaletteNeutralKey =
  | 'pop'
  | 'tangerine'
  | 'tangerineSea'
  | 'lee'
  | 'leeForest'
  | 'electric'
  | 'apricot'
  | 'market'
  | 'marketNavy'
  | 'peony'
  | 'leeBrand'
  | 'amour'
  | 'coast'
  | 'play'
  | 'tuned'
  | 'cultura'
  | 'trail'
  | 'eggshell'
  | 'sunset'
  | 'midnight'
  | 'sage'
  | 'berry'
  | 'slate'
  | 'coral'
  | 'indigo'
  | 'rosewood'
  | 'moss'
  | 'neonPastel'
  | 'sandChartreuse'
  | 'coastGreige'
  | 'coastBlush'
  | 'signalOrange'

function buildDuoTheme(
  accents: Sw,
  pairs: {
    intro: [string, string]
    pills: [string, string]
    actions: [string, string]
    nav?: [string, string]
    ems?: Sw
  }
): HeroCardTheme {
  const [a1, a2, a3] = accents
  const [introBg, introFg] = pairs.intro
  const [pillsBg, pillsFg] = pairs.pills
  const [actionsBg, actionsFg] = pairs.actions
  const [navBg, navFg] = pairs.nav ?? ['#ffffff', '#1a1a1a']
  const [emGreen, emBlue, emMagenta] = pairs.ems ?? [a3, a2, a1]
  const lightText = introFg.toLowerCase() === '#ffffff' || introFg.toLowerCase() === '#fff'

  return {
    intro: {
      bg: introBg,
      fg: introFg,
      sub: lightText ? 'rgba(255,255,255,0.72)' : 'rgba(28,25,23,0.62)',
      emGreen,
      emBlue,
      emMagenta,
      border: lightText ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)',
    },
    nav: {
      bg: navBg,
      fg: navFg,
      sub: '#6b7280',
      border: 'rgba(0,0,0,0.06)',
    },
    pills: {
      bg: pillsBg,
      fg: pillsFg,
      label: pillsFg,
      sub: pillsFg,
      border: `color-mix(in srgb, ${pillsFg} 20%, transparent)`,
    },
    actions: {
      bg: actionsBg,
      fg: actionsFg,
      sub:
        actionsFg.toLowerCase() === '#ffffff' || actionsFg.toLowerCase() === '#fff'
          ? 'rgba(255,255,255,0.72)'
          : 'rgba(28,25,23,0.62)',
      border:
        actionsFg.toLowerCase() === '#ffffff' || actionsFg.toLowerCase() === '#fff'
          ? 'rgba(255,255,255,0.14)'
          : 'rgba(0,0,0,0.08)',
    },
  }
}

export interface PaletteLightSpec {
  id: string
  label: string
  description: string
  swatches: [string, string, string]
  neutralKey: PaletteNeutralKey
  accents: Sw
  pills: PillColors
  tint: PaletteGround
  bold: PaletteGround
  duo: HeroCardTheme
  /** Optional explicit bucket colors for work experience duo tiles */
  duoBuckets?: DuoBucketPalette
}

export const PALETTE_LIGHT_SPECS: PaletteLightSpec[] = [
  {
    id: 'palette-pop-cycle',
    label: 'Pop Cycle',
    description: 'White canvas · red · purple · chartreuse accents',
    swatches: ['#ffffff', '#EB4213', '#826DEE'],
    neutralKey: 'pop',
    accents: ['#EB4213', '#826DEE', '#D8F382'],
    pills: ['#EB4213', '#FF99DC', '#826DEE', '#D8F382', '#FF99DC'],
    tint: { shell: '#fff1ed', canvas: '#ffe6de', dot: '#f5c9bc', soft: '#ffffff' },
    bold: { shell: '#EB4213', canvas: '#c93510', dot: 'rgba(255,255,255,0.18)', soft: '#f04a1c' },
    duo: buildDuoTheme(['#EB4213', '#826DEE', '#D8F382'], {
      intro: ['#826DEE', '#D8F382'],
      pills: ['#D8F382', '#EB4213'],
      actions: ['#EB4213', '#ffffff'],
    }),
  },
  {
    id: 'palette-pop-punch',
    label: 'Pop Punch',
    description: 'White canvas · hot red · lime · pink accents',
    swatches: ['#ffffff', '#EB4213', '#D8F382'],
    neutralKey: 'pop',
    accents: ['#EB4213', '#D8F382', '#FF99DC'],
    pills: ['#EB4213', '#D8F382', '#FF99DC', '#826DEE', '#FF99DC'],
    tint: { shell: '#fff4fb', canvas: '#ffe8f4', dot: '#f5c8e0', soft: '#ffffff' },
    bold: { shell: '#826DEE', canvas: '#6a52d4', dot: 'rgba(255,255,255,0.18)', soft: '#9580f2' },
    duo: buildDuoTheme(['#EB4213', '#D8F382', '#FF99DC'], {
      intro: ['#EB4213', '#D8F382'],
      pills: ['#FF99DC', '#826DEE'],
      actions: ['#826DEE', '#ffffff'],
    }),
  },
  {
    id: 'palette-tangerine',
    label: 'Tangerine',
    description: 'Warm white · tangerine · sea · blush accents',
    swatches: ['#faf9f7', '#F08C21', '#6698CC'],
    neutralKey: 'tangerine',
    accents: ['#F08C21', '#6698CC', '#E36888'],
    pills: ['#F08C21', '#F2D88F', '#6698CC', '#E36888', '#B4B534'],
    tint: { shell: '#fdf6e8', canvas: '#f5ecd6', dot: '#e8dcc0', soft: '#F2D88F', fg: '#292524' },
    bold: { shell: '#F08C21', canvas: '#d97706', dot: 'rgba(255,255,255,0.2)', soft: '#f59a33' },
    duo: buildDuoTheme(['#F08C21', '#6698CC', '#E36888'], {
      intro: ['#F08C21', '#ffffff'],
      pills: ['#F2D88F', '#6698CC'],
      actions: ['#6698CC', '#ffffff'],
    }),
  },
  {
    id: 'palette-tangerine-sea',
    label: 'Tangerine Sea',
    description: 'Cool pearl · sea blue · tangerine · matcha accents',
    swatches: ['#f8f9fb', '#6698CC', '#F08C21'],
    neutralKey: 'tangerineSea',
    accents: ['#6698CC', '#F08C21', '#B4B534'],
    pills: ['#6698CC', '#F08C21', '#E36888', '#B4B534', '#F2D88F'],
    tint: { shell: '#eef4fa', canvas: '#dfeaf5', dot: '#c8d8e8', soft: '#ffffff' },
    bold: { shell: '#6698CC', canvas: '#4f7fb3', dot: 'rgba(255,255,255,0.18)', soft: '#7aa8d4' },
    duo: buildDuoTheme(['#6698CC', '#F08C21', '#B4B534'], {
      intro: ['#6698CC', '#ffffff'],
      pills: ['#F2D88F', '#F08C21'],
      actions: ['#F08C21', '#ffffff'],
    }),
  },
  {
    id: 'palette-lee',
    label: 'Lee',
    description: 'Warm white · orange · steel blue · lime accents',
    swatches: ['#faf9f7', '#E74D1A', '#4089BC'],
    neutralKey: 'lee',
    accents: ['#E74D1A', '#4089BC', '#C8D540'],
    pills: ['#E74D1A', '#F6B5D3', '#4089BC', '#C8D540', '#0D6B36'],
    tint: { shell: '#fff0ea', canvas: '#ffe3d6', dot: '#f5c7b0', soft: '#ffffff' },
    bold: { shell: '#E74D1A', canvas: '#c73f12', dot: 'rgba(255,255,255,0.18)', soft: '#ed5828' },
    duo: buildDuoTheme(['#E74D1A', '#4089BC', '#C8D540'], {
      intro: ['#E74D1A', '#F6B5D3'],
      pills: ['#4089BC', '#ffffff'],
      actions: ['#0D6B36', '#C8D540'],
    }),
  },
  {
    id: 'palette-lee-forest',
    label: 'Lee Forest',
    description: 'Cool pearl · forest · lime · pink accents',
    swatches: ['#f8f9fb', '#0D6B36', '#C8D540'],
    neutralKey: 'leeForest',
    accents: ['#0D6B36', '#C8D540', '#F6B5D3'],
    pills: ['#0D6B36', '#C8D540', '#4089BC', '#F6B5D3', '#E74D1A'],
    tint: { shell: '#eef6f0', canvas: '#dceee2', dot: '#c0dcc8', soft: '#ffffff' },
    bold: { shell: '#0D6B36', canvas: '#0a5630', dot: 'rgba(255,255,255,0.16)', soft: '#118042' },
    duo: buildDuoTheme(['#0D6B36', '#C8D540', '#F6B5D3'], {
      intro: ['#0D6B36', '#C8D540'],
      pills: ['#F6B5D3', '#E74D1A'],
      actions: ['#4089BC', '#ffffff'],
    }),
  },
  {
    id: 'palette-electric',
    label: 'Electric',
    description: 'Cool pearl · dare devil · electric blue · arctic accents',
    swatches: ['#f8f9fb', '#FF5B22', '#3939FF'],
    neutralKey: 'electric',
    accents: ['#FF5B22', '#3939FF', '#AEE6ED'],
    pills: ['#FF5B22', '#3939FF', '#AEE6ED', '#DBB8FF', '#F2B805'],
    tint: { shell: '#eef2ff', canvas: '#dfe6ff', dot: '#c5d0f5', soft: '#ffffff' },
    bold: { shell: '#3939FF', canvas: '#2a2ad4', dot: 'rgba(255,255,255,0.18)', soft: '#4f4fff' },
    duo: buildDuoTheme(['#FF5B22', '#3939FF', '#AEE6ED'], {
      intro: ['#3939FF', '#AEE6ED'],
      pills: ['#DBB8FF', '#3939FF'],
      actions: ['#FF5B22', '#ffffff'],
    }),
  },
  {
    id: 'palette-electric-gold',
    label: 'Electric Gold',
    description: 'Cool pearl · lavender · gold · orange accents',
    swatches: ['#f8f9fb', '#DBB8FF', '#F2B805'],
    neutralKey: 'electric',
    accents: ['#DBB8FF', '#F2B805', '#FF5B22'],
    pills: ['#DBB8FF', '#3939FF', '#F2B805', '#FF5B22', '#AEE6ED'],
    tint: { shell: '#f7f0ff', canvas: '#ede2ff', dot: '#d8c8f0', soft: '#ffffff' },
    bold: {
      shell: '#F2B805',
      canvas: '#d9a004',
      dot: 'rgba(28,25,23,0.14)',
      soft: '#f5c933',
      fg: '#1c1917',
    },
    duo: buildDuoTheme(['#DBB8FF', '#F2B805', '#FF5B22'], {
      intro: ['#DBB8FF', '#3939FF'],
      pills: ['#F2B805', '#1c1917'],
      actions: ['#FF5B22', '#ffffff'],
    }),
  },
  {
    id: 'palette-apricot',
    label: 'Apricot',
    description: 'Cream white · tomato · chartreuse · vista blue accents',
    swatches: ['#faf8f5', '#F06038', '#D6F74C'],
    neutralKey: 'apricot',
    accents: ['#F06038', '#D6F74C', '#8C9EFF'],
    pills: ['#F06038', '#D6F74C', '#8C9EFF', '#FCD9BE', '#F06038'],
    tint: { shell: '#fff8f2', canvas: '#fcefe4', dot: '#e8d5c4', soft: '#FCD9BE', fg: '#292524' },
    bold: { shell: '#F06038', canvas: '#d94f2c', dot: 'rgba(255,255,255,0.18)', soft: '#f26f47' },
    duo: buildDuoTheme(['#F06038', '#D6F74C', '#8C9EFF'], {
      intro: ['#F06038', '#D6F74C'],
      pills: ['#FCD9BE', '#F06038'],
      actions: ['#8C9EFF', '#ffffff'],
    }),
  },
  {
    id: 'palette-apricot-vista',
    label: 'Apricot Vista',
    description: 'Cream white · vista blue · tomato · chartreuse accents',
    swatches: ['#faf8f5', '#8C9EFF', '#F06038'],
    neutralKey: 'apricot',
    accents: ['#8C9EFF', '#F06038', '#D6F74C'],
    pills: ['#8C9EFF', '#F06038', '#D6F74C', '#FCD9BE', '#26ade4'],
    tint: { shell: '#f2f4ff', canvas: '#e4e9ff', dot: '#c8d0f5', soft: '#ffffff' },
    bold: { shell: '#8C9EFF', canvas: '#7080e6', dot: 'rgba(255,255,255,0.18)', soft: '#9aa8ff' },
    duo: buildDuoTheme(['#8C9EFF', '#F06038', '#D6F74C'], {
      intro: ['#8C9EFF', '#ffffff'],
      pills: ['#D6F74C', '#F06038'],
      actions: ['#F06038', '#ffffff'],
    }),
  },
  {
    id: 'palette-market',
    label: 'Market Fresh',
    description: 'Warm white · tomato · citrus · lettuce accents',
    swatches: ['#faf9f7', '#b81817', '#e5a300'],
    neutralKey: 'market',
    accents: ['#b81817', '#e5a300', '#607b29'],
    pills: ['#b81817', '#ea7202', '#e5a300', '#a6b132', '#607b29'],
    tint: { shell: '#faf7f0', canvas: '#f0ebe0', dot: '#d9d0c0', soft: '#ffffff' },
    bold: { shell: '#b81817', canvas: '#961210', dot: 'rgba(255,255,255,0.16)', soft: '#c81f1e' },
    duo: buildDuoTheme(['#b81817', '#e5a300', '#607b29'], {
      intro: ['#b81817', '#e5a300'],
      pills: ['#607b29', '#ffffff'],
      actions: ['#e5a300', '#1c1917'],
    }),
  },
  {
    id: 'palette-market-navy',
    label: 'Market Navy',
    description: 'Cool pearl · navy · green · citrus accents',
    swatches: ['#f8f9fb', '#293379', '#607b29'],
    neutralKey: 'marketNavy',
    accents: ['#293379', '#607b29', '#e5a300'],
    pills: ['#293379', '#b81817', '#607b29', '#e5a300', '#ea7202'],
    tint: { shell: '#f4f6fa', canvas: '#e8ecf4', dot: '#c4cce0', soft: '#ffffff' },
    bold: { shell: '#293379', canvas: '#1f265c', dot: 'rgba(255,255,255,0.16)', soft: '#313d8f' },
    duo: buildDuoTheme(['#293379', '#607b29', '#e5a300'], {
      intro: ['#293379', '#e5a300'],
      pills: ['#607b29', '#ffffff'],
      actions: ['#b81817', '#ffffff'],
    }),
  },
  {
    id: 'palette-peony',
    label: 'Peony',
    description: 'Cream white · fuchsia · blood orange · pistachio accents',
    swatches: ['#faf8f5', '#D81A67', '#DD4E28'],
    neutralKey: 'peony',
    accents: ['#D81A67', '#DD4E28', '#D0D996'],
    pills: ['#D81A67', '#DD4E28', '#D0D996', '#FAD2E1', '#770523'],
    tint: { shell: '#fff5f8', canvas: '#fceef3', dot: '#e8d4dc', soft: '#FAD2E1', fg: '#292524' },
    bold: { shell: '#D81A67', canvas: '#b81558', dot: 'rgba(255,255,255,0.18)', soft: '#e02472' },
    duo: buildDuoTheme(['#D81A67', '#DD4E28', '#D0D996'], {
      intro: ['#D81A67', '#FAD2E1'],
      pills: ['#D0D996', '#770523'],
      actions: ['#DD4E28', '#ffffff'],
    }),
  },
  {
    id: 'palette-peony-wine',
    label: 'Peony Wine',
    description: 'Cream white · burgundy · peony · pistachio accents',
    swatches: ['#faf8f5', '#770523', '#D0D996'],
    neutralKey: 'peony',
    accents: ['#770523', '#D0D996', '#D81A67'],
    pills: ['#770523', '#D81A67', '#DD4E28', '#D0D996', '#FAD2E1'],
    tint: { shell: '#fdf2f5', canvas: '#f8e4ea', dot: '#e8c8d2', soft: '#ffffff' },
    bold: { shell: '#770523', canvas: '#5c0419', dot: 'rgba(255,255,255,0.14)', soft: '#8f0629' },
    duo: buildDuoTheme(['#770523', '#D0D996', '#D81A67'], {
      intro: ['#770523', '#D0D996'],
      pills: ['#FAD2E1', '#D81A67'],
      actions: ['#D81A67', '#ffffff'],
    }),
  },
  {
    id: 'palette-lee-brand',
    label: 'Lee Brand',
    description: 'Cream white · red · blue · green brand accents',
    swatches: ['#faf8f5', '#F20815', '#155FCC'],
    neutralKey: 'leeBrand',
    accents: ['#F20815', '#155FCC', '#11A253'],
    pills: ['#F20815', '#FCA4E0', '#155FCC', '#11A253', '#FDEDD4'],
    tint: { shell: '#fdf6ec', canvas: '#f5ead8', dot: '#e8dcc8', soft: '#FDEDD4', fg: '#1c1917' },
    bold: { shell: '#F20815', canvas: '#cc0611', dot: 'rgba(255,255,255,0.18)', soft: '#ff1a27' },
    duo: buildDuoTheme(['#F20815', '#155FCC', '#11A253'], {
      intro: ['#F20815', '#FCA4E0'],
      pills: ['#155FCC', '#ffffff'],
      actions: ['#11A253', '#FDEDD4'],
    }),
  },
  {
    id: 'palette-lee-brand-cream',
    label: 'Lee Cream',
    description: 'Cream white · green · pink · blue accents',
    swatches: ['#faf8f5', '#11A253', '#FCA4E0'],
    neutralKey: 'leeBrand',
    accents: ['#11A253', '#FCA4E0', '#155FCC'],
    pills: ['#11A253', '#FCA4E0', '#155FCC', '#F20815', '#FDEDD4'],
    tint: { shell: '#f3fbf6', canvas: '#e3f5ea', dot: '#c8e6d4', soft: '#ffffff' },
    bold: { shell: '#11A253', canvas: '#0d8442', dot: 'rgba(255,255,255,0.16)', soft: '#14b85d' },
    duo: buildDuoTheme(['#11A253', '#FCA4E0', '#155FCC'], {
      intro: ['#11A253', '#FCA4E0'],
      pills: ['#155FCC', '#ffffff'],
      actions: ['#F20815', '#FDEDD4'],
    }),
  },
  {
    id: 'palette-amour',
    label: 'Amour',
    description: 'Warm white · spice · lynx blue · violet accents',
    swatches: ['#faf9f7', '#f43e4a', '#26ade4'],
    neutralKey: 'amour',
    accents: ['#f43e4a', '#26ade4', '#806dc6'],
    pills: ['#f43e4a', '#ff9742', '#26ade4', '#806dc6', '#3abd6f'],
    tint: { shell: '#fffbf7', canvas: '#f7f0e8', dot: '#e5ddd2', soft: '#ffffff' },
    bold: { shell: '#f43e4a', canvas: '#d93440', dot: 'rgba(255,255,255,0.18)', soft: '#f64f5a' },
    duo: buildDuoTheme(['#f43e4a', '#26ade4', '#806dc6'], {
      intro: ['#f43e4a', '#ffffff'],
      pills: ['#806dc6', '#ff9742'],
      actions: ['#26ade4', '#ffffff'],
    }),
  },
  {
    id: 'palette-amour-sun',
    label: 'Amour Sun',
    description: 'Warm white · apricot · yellow · green accents',
    swatches: ['#faf9f7', '#ff9742', '#3abd6f'],
    neutralKey: 'amour',
    accents: ['#ff9742', '#ffca3c', '#3abd6f'],
    pills: ['#ff9742', '#ffca3c', '#3abd6f', '#26ade4', '#f43e4a'],
    tint: { shell: '#fff8ef', canvas: '#ffeeda', dot: '#f5dcc0', soft: '#ffffff' },
    bold: { shell: '#ff9742', canvas: '#e88430', dot: 'rgba(28,25,23,0.12)', soft: '#ffa85a', fg: '#1c1917' },
    duo: buildDuoTheme(['#ff9742', '#ffca3c', '#3abd6f'], {
      intro: ['#ff9742', '#1c1917'],
      pills: ['#ffca3c', '#3abd6f'],
      actions: ['#3abd6f', '#ffffff'],
    }),
  },
  {
    id: 'palette-coast',
    label: 'Coast',
    description: 'Cream canvas · navy · terracotta · sea mist accents',
    swatches: ['#F2EEE9', '#00408C', '#E85234'],
    neutralKey: 'coast',
    accents: ['#00408C', '#E85234', '#96ADD6'],
    pills: ['#00408C', '#E85234', '#96ADD6', '#F9B8AF', '#F2EEE9'],
    tint: { shell: '#F9B8AF', canvas: '#f5d0cb', dot: '#e8b8b0', soft: '#F2EEE9', fg: '#00408C' },
    bold: { shell: '#00408C', canvas: '#003070', dot: 'rgba(255,255,255,0.16)', soft: '#0a4a9a' },
    duo: buildDuoTheme(['#00408C', '#E85234', '#96ADD6'], {
      intro: ['#00408C', '#ffffff'],
      pills: ['#F9B8AF', '#00408C'],
      actions: ['#E85234', '#F2EEE9'],
      nav: ['#F2EEE9', '#00408C'],
    }),
  },
  {
    id: 'palette-play',
    label: 'Play Blocks',
    description: 'Cream canvas · sky · coral · grass bento accents',
    swatches: ['#FAF8F4', '#3B82F6', '#F06038'],
    neutralKey: 'play',
    accents: ['#3B82F6', '#F06038', '#22C55E'],
    pills: ['#F5D046', '#3B82F6', '#F06038', '#EC4899', '#22C55E'],
    tint: { shell: '#FFF8E8', canvas: '#F5EDD0', dot: '#e8dcb8', soft: '#FAF8F4' },
    bold: { shell: '#3B82F6', canvas: '#2563eb', dot: 'rgba(255,255,255,0.18)', soft: '#4f8ff8' },
    duo: buildDuoTheme(['#3B82F6', '#F06038', '#22C55E'], {
      intro: ['#F5D046', '#F06038'],
      pills: ['#EC4899', '#FAF8F4'],
      actions: ['#3B82F6', '#ffffff'],
    }),
  },
  {
    id: 'palette-tuned',
    label: 'Tuned',
    description: 'Warm neutral · orange · cobalt · lavender accents',
    swatches: ['#FAF8F5', '#EA580C', '#2563EB'],
    neutralKey: 'tuned',
    accents: ['#EA580C', '#2563EB', '#C4B5FD'],
    pills: ['#EA580C', '#2563EB', '#C4B5FD', '#ffffff', '#1c1917'],
    tint: { shell: '#FFF4EB', canvas: '#FFE8D6', dot: '#f5d0b0', soft: '#ffffff' },
    bold: { shell: '#2563EB', canvas: '#1d4ed8', dot: 'rgba(255,255,255,0.18)', soft: '#3b72f0' },
    duo: buildDuoTheme(['#EA580C', '#2563EB', '#C4B5FD'], {
      intro: ['#EA580C', '#C4B5FD'],
      pills: ['#2563EB', '#ffffff'],
      actions: ['#2563EB', '#C4B5FD'],
      nav: ['#ffffff', '#2563EB'],
    }),
  },
  {
    id: 'palette-cultura',
    label: 'Cultúra',
    description: 'Cream canvas · red · blue · forest type accents',
    swatches: ['#F5F0E8', '#DC2626', '#1D4ED8'],
    neutralKey: 'cultura',
    accents: ['#DC2626', '#1D4ED8', '#15803D'],
    pills: ['#DC2626', '#FDA4AF', '#FDE047', '#F97316', '#15803D'],
    tint: { shell: '#FDA4AF', canvas: '#f5c4cb', dot: '#e8a0a8', soft: '#F5F0E8', fg: '#DC2626' },
    bold: { shell: '#DC2626', canvas: '#b91c1c', dot: 'rgba(255,255,255,0.16)', soft: '#e32e2e' },
    duo: buildDuoTheme(['#DC2626', '#1D4ED8', '#15803D'], {
      intro: ['#FDA4AF', '#DC2626'],
      pills: ['#FDE047', '#F97316'],
      actions: ['#15803D', '#F5F0E8'],
    }),
  },
  {
    id: 'palette-trail',
    label: 'Trail',
    description: 'Off-white canvas · blue · orange · green path accents',
    swatches: ['#F4F4F2', '#3B82F6', '#F97316'],
    neutralKey: 'trail',
    accents: ['#3B82F6', '#F97316', '#22C55E'],
    pills: ['#A78BFA', '#3B82F6', '#DB2777', '#F97316', '#22C55E'],
    tint: { shell: '#EEF2FF', canvas: '#E0E7FF', dot: '#c7d2fe', soft: '#ffffff' },
    bold: { shell: '#7C3AED', canvas: '#6d28d9', dot: 'rgba(255,255,255,0.18)', soft: '#8b5cf6' },
    duo: buildDuoTheme(['#3B82F6', '#F97316', '#22C55E'], {
      intro: ['#3B82F6', '#ffffff'],
      pills: ['#F97316', '#ffffff'],
      actions: ['#22C55E', '#ffffff'],
    }),
  },
  {
    id: 'palette-eggshell',
    label: 'Eggshell',
    description: 'Eggshell canvas · ultramarine · tiger · chartreuse accents',
    swatches: ['#EFE7D4', '#1A0088', '#FF5E32'],
    neutralKey: 'eggshell',
    accents: ['#1A0088', '#FF5E32', '#B8CE4F'],
    pills: ['#1A0088', '#FF5E32', '#B8CE4F', '#EFE7D4', '#ffffff'],
    tint: { shell: '#EFE7D4', canvas: '#e5dcc8', dot: '#cfc4ae', soft: '#ffffff', fg: '#1A0088' },
    bold: { shell: '#1A0088', canvas: '#130066', dot: 'rgba(255,255,255,0.14)', soft: '#2200a8' },
    duo: buildDuoTheme(['#1A0088', '#FF5E32', '#B8CE4F'], {
      intro: ['#1A0088', '#B8CE4F'],
      pills: ['#B8CE4F', '#FF5E32'],
      actions: ['#FF5E32', '#EFE7D4'],
      nav: ['#EFE7D4', '#1A0088'],
    }),
  },
  {
    id: 'palette-sunset',
    label: 'Sunset',
    description: 'Peach canvas · coral · violet · gold accents',
    swatches: ['#FFF4EC', '#FF6B4A', '#7C3AED'],
    neutralKey: 'sunset',
    accents: ['#FF6B4A', '#7C3AED', '#FBBF24'],
    pills: ['#FF6B4A', '#FBBF24', '#7C3AED', '#FFD4C4', '#ffffff'],
    tint: { shell: '#FFF4EC', canvas: '#FFE8D8', dot: '#f5cdb8', soft: '#ffffff', fg: '#292524' },
    bold: { shell: '#FF6B4A', canvas: '#e85a3a', dot: 'rgba(255,255,255,0.18)', soft: '#ff7d5f' },
    duo: buildDuoTheme(['#FF6B4A', '#7C3AED', '#FBBF24'], {
      intro: ['#FF6B4A', '#ffffff'],
      pills: ['#7C3AED', '#FBBF24'],
      actions: ['#FBBF24', '#292524'],
    }),
  },
  {
    id: 'palette-midnight',
    label: 'Midnight',
    description: 'Cool pearl · navy · cyan · silver accents',
    swatches: ['#F0F4FA', '#1E3A8A', '#06B6D4'],
    neutralKey: 'midnight',
    accents: ['#1E3A8A', '#06B6D4', '#94A3B8'],
    pills: ['#1E3A8A', '#06B6D4', '#94A3B8', '#E2E8F0', '#ffffff'],
    tint: { shell: '#EEF2FF', canvas: '#E0E7FF', dot: '#c7d2fe', soft: '#ffffff' },
    bold: { shell: '#1E3A8A', canvas: '#172554', dot: 'rgba(255,255,255,0.16)', soft: '#2563eb' },
    duo: buildDuoTheme(['#1E3A8A', '#06B6D4', '#94A3B8'], {
      intro: ['#1E3A8A', '#06B6D4'],
      pills: ['#94A3B8', '#ffffff'],
      actions: ['#06B6D4', '#ffffff'],
    }),
  },
  {
    id: 'palette-sage',
    label: 'Sage',
    description: 'Sage cream · terracotta · olive · sky accents',
    swatches: ['#F4F6F0', '#C2410C', '#84A98C'],
    neutralKey: 'sage',
    accents: ['#C2410C', '#84A98C', '#52796F'],
    pills: ['#C2410C', '#84A98C', '#CAD2C5', '#52796F', '#ffffff'],
    tint: { shell: '#F4F6F0', canvas: '#E8EDE4', dot: '#d4ddd0', soft: '#ffffff', fg: '#1c1917' },
    bold: { shell: '#52796F', canvas: '#3f5f56', dot: 'rgba(255,255,255,0.16)', soft: '#6b9080' },
    duo: buildDuoTheme(['#C2410C', '#84A98C', '#52796F'], {
      intro: ['#84A98C', '#ffffff'],
      pills: ['#C2410C', '#CAD2C5'],
      actions: ['#52796F', '#ffffff'],
    }),
  },
  {
    id: 'palette-berry',
    label: 'Berry',
    description: 'Blush canvas · raspberry · plum · lilac accents',
    swatches: ['#FFF5F8', '#BE185D', '#7E22CE'],
    neutralKey: 'berry',
    accents: ['#BE185D', '#7E22CE', '#E879F9'],
    pills: ['#BE185D', '#E879F9', '#7E22CE', '#FBCFE8', '#ffffff'],
    tint: { shell: '#FFF5F8', canvas: '#FCE7F3', dot: '#f5c4d8', soft: '#ffffff' },
    bold: { shell: '#BE185D', canvas: '#9d174d', dot: 'rgba(255,255,255,0.18)', soft: '#db2777' },
    duo: buildDuoTheme(['#BE185D', '#7E22CE', '#E879F9'], {
      intro: ['#BE185D', '#FBCFE8'],
      pills: ['#7E22CE', '#ffffff'],
      actions: ['#E879F9', '#ffffff'],
    }),
  },
  {
    id: 'palette-slate',
    label: 'Slate',
    description: 'Blue-gray canvas · steel · amber · mist accents',
    swatches: ['#F1F5F9', '#475569', '#F59E0B'],
    neutralKey: 'slate',
    accents: ['#475569', '#F59E0B', '#64748B'],
    pills: ['#475569', '#F59E0B', '#64748B', '#CBD5E1', '#ffffff'],
    tint: { shell: '#F1F5F9', canvas: '#E2E8F0', dot: '#cbd5e1', soft: '#ffffff' },
    bold: { shell: '#475569', canvas: '#334155', dot: 'rgba(255,255,255,0.16)', soft: '#64748b' },
    duo: buildDuoTheme(['#475569', '#F59E0B', '#64748B'], {
      intro: ['#475569', '#CBD5E1'],
      pills: ['#F59E0B', '#ffffff'],
      actions: ['#64748B', '#ffffff'],
    }),
  },
  {
    id: 'palette-coral',
    label: 'Coral Reef',
    description: 'Sand canvas · coral · teal · seafoam accents',
    swatches: ['#FFF8F3', '#FF7F6A', '#0D9488'],
    neutralKey: 'coral',
    accents: ['#FF7F6A', '#0D9488', '#99F6E4'],
    pills: ['#FF7F6A', '#0D9488', '#99F6E4', '#FFE4D6', '#ffffff'],
    tint: { shell: '#FFF8F3', canvas: '#FFEDE0', dot: '#f5d5c4', soft: '#ffffff', fg: '#292524' },
    bold: { shell: '#0D9488', canvas: '#0f766e', dot: 'rgba(255,255,255,0.16)', soft: '#14b8a6' },
    duo: buildDuoTheme(['#FF7F6A', '#0D9488', '#99F6E4'], {
      intro: ['#FF7F6A', '#ffffff'],
      pills: ['#0D9488', '#99F6E4'],
      actions: ['#0D9488', '#ffffff'],
    }),
  },
  {
    id: 'palette-indigo',
    label: 'Indigo',
    description: 'Lavender white · indigo · peach · mint accents',
    swatches: ['#F5F3FF', '#4338CA', '#FB923C'],
    neutralKey: 'indigo',
    accents: ['#4338CA', '#FB923C', '#34D399'],
    pills: ['#4338CA', '#FB923C', '#34D399', '#C7D2FE', '#ffffff'],
    tint: { shell: '#F5F3FF', canvas: '#EDE9FE', dot: '#ddd6fe', soft: '#ffffff' },
    bold: { shell: '#4338CA', canvas: '#3730a3', dot: 'rgba(255,255,255,0.18)', soft: '#4f46e5' },
    duo: buildDuoTheme(['#4338CA', '#FB923C', '#34D399'], {
      intro: ['#4338CA', '#C7D2FE'],
      pills: ['#FB923C', '#ffffff'],
      actions: ['#34D399', '#4338CA'],
    }),
  },
  {
    id: 'palette-rosewood',
    label: 'Rosewood',
    description: 'Linen canvas · rosewood · sky · cream accents',
    swatches: ['#FAF6F3', '#9F1239', '#0284C7'],
    neutralKey: 'rosewood',
    accents: ['#9F1239', '#0284C7', '#FDE68A'],
    pills: ['#9F1239', '#0284C7', '#FDE68A', '#F5E6DC', '#ffffff'],
    tint: { shell: '#FAF6F3', canvas: '#F0E8E0', dot: '#dccfc4', soft: '#ffffff', fg: '#292524' },
    bold: { shell: '#9F1239', canvas: '#881337', dot: 'rgba(255,255,255,0.16)', soft: '#be123c' },
    duo: buildDuoTheme(['#9F1239', '#0284C7', '#FDE68A'], {
      intro: ['#9F1239', '#F5E6DC'],
      pills: ['#0284C7', '#ffffff'],
      actions: ['#FDE68A', '#292524'],
    }),
  },
  {
    id: 'palette-moss',
    label: 'Moss',
    description: 'Fog canvas · moss · rust · stone accents',
    swatches: ['#F3F4F1', '#4D7C0F', '#C2410C'],
    neutralKey: 'moss',
    accents: ['#4D7C0F', '#C2410C', '#78716C'],
    pills: ['#4D7C0F', '#C2410C', '#78716C', '#D6D3D1', '#ffffff'],
    tint: { shell: '#F3F4F1', canvas: '#E7E5E4', dot: '#d6d3d1', soft: '#ffffff', fg: '#1c1917' },
    bold: { shell: '#4D7C0F', canvas: '#3f6212', dot: 'rgba(255,255,255,0.16)', soft: '#65a30d' },
    duo: buildDuoTheme(['#4D7C0F', '#C2410C', '#78716C'], {
      intro: ['#4D7C0F', '#D6D3D1'],
      pills: ['#C2410C', '#ffffff'],
      actions: ['#78716C', '#ffffff'],
    }),
  },
  {
    id: 'palette-neon-pastel',
    label: 'Neon Pastel',
    description: 'White canvas · hot pink · electric blue · lime accents',
    swatches: ['#ffffff', '#FF4D8D', '#4F46E5'],
    neutralKey: 'neonPastel',
    accents: ['#FF4D8D', '#4F46E5', '#A3E635'],
    pills: ['#FF4D8D', '#4F46E5', '#A3E635', '#FDE047', '#ffffff'],
    tint: { shell: '#FFFBFE', canvas: '#FFF0F6', dot: '#f5d0e0', soft: '#ffffff' },
    bold: { shell: '#4F46E5', canvas: '#4338ca', dot: 'rgba(255,255,255,0.18)', soft: '#6366f1' },
    duo: buildDuoTheme(['#FF4D8D', '#4F46E5', '#A3E635'], {
      intro: ['#FF4D8D', '#A3E635'],
      pills: ['#4F46E5', '#ffffff'],
      actions: ['#FDE047', '#1c1917'],
    }),
  },
  {
    id: 'palette-sand-chartreuse',
    label: 'Sand Chartreuse',
    description: 'Sand shell · ultramarine · tiger · chartreuse accents',
    swatches: ['#E2DAC5', '#1A0089', '#FF5E32'],
    neutralKey: 'sandChartreuse',
    accents: ['#FF5E32', '#1A0089', '#FCF893'],
    pills: ['#FF5E32', '#1A0089', '#FCF893', '#E2DAC5', '#ffffff'],
    tint: { shell: '#E2DAC5', canvas: '#d8cfba', dot: '#c9bfaa', soft: '#ffffff', fg: '#1A0089' },
    bold: { shell: '#1A0089', canvas: '#130066', dot: 'rgba(255,255,255,0.14)', soft: '#2200a8' },
    duo: buildDuoTheme(['#FF5E32', '#1A0089', '#FCF893'], {
      intro: ['#1A0089', '#FCF893'],
      pills: ['#FCF893', '#1A0089'],
      actions: ['#FF5E32', '#FFFFFF'],
      nav: ['#FFFFFF', '#1A0089'],
      ems: ['#FCF893', '#FF5E32', '#FFFFFF'],
    }),
    duoBuckets: {
      warm: '#FF5E32',
      cool: '#1A0089',
      neutral: '#FFFFFF',
    },
  },
  {
    id: 'palette-coast-greige',
    label: 'Coast Greige',
    description: 'Greige canvas · navy · terracotta · chartreuse accents',
    swatches: ['#E5DFD9', '#00408C', '#E85234'],
    neutralKey: 'coastGreige',
    accents: ['#E85234', '#00408C', '#FCF893'],
    pills: ['#E85234', '#00408C', '#FCF893', '#E5DFD9', '#ffffff'],
    tint: { shell: '#E5DFD9', canvas: '#ddd6cf', dot: '#ccc4bc', soft: '#ffffff', fg: '#00408C' },
    bold: { shell: '#00408C', canvas: '#003070', dot: 'rgba(255,255,255,0.16)', soft: '#0a4a9a' },
    duo: buildDuoTheme(['#E85234', '#00408C', '#FCF893'], {
      intro: ['#00408C', '#FCF893'],
      pills: ['#FCF893', '#00408C'],
      actions: ['#E85234', '#FFFFFF'],
      nav: ['#FFFFFF', '#00408C'],
      ems: ['#FCF893', '#E85234', '#FFFFFF'],
    }),
    duoBuckets: {
      warm: '#E85234',
      cool: '#00408C',
      neutral: '#E5DFD9',
    },
  },
  {
    id: 'palette-coast-blush',
    label: 'Coast Blush',
    description: 'Greige canvas · navy · terracotta · blush accents',
    swatches: ['#E5DFD9', '#00408C', '#E85234'],
    neutralKey: 'coastBlush',
    accents: ['#E85234', '#00408C', '#F9B8B0'],
    pills: ['#E85234', '#00408C', '#F9B8B0', '#E5DFD9', '#ffffff'],
    tint: { shell: '#F9B8B0', canvas: '#f5d0cb', dot: '#e8b8b0', soft: '#E5DFD9', fg: '#00408C' },
    bold: { shell: '#00408C', canvas: '#003070', dot: 'rgba(255,255,255,0.16)', soft: '#0a4a9a' },
    duo: buildDuoTheme(['#E85234', '#00408C', '#F9B8B0'], {
      intro: ['#00408C', '#FFFFFF'],
      pills: ['#F9B8B0', '#00408C'],
      actions: ['#E85234', '#FFFFFF'],
      nav: ['#F9B8B0', '#00408C'],
      ems: ['#F9B8B0', '#E85234', '#00408C'],
    }),
    duoBuckets: {
      warm: '#E85234',
      cool: '#00408C',
      neutral: '#E5DFD9',
    },
  },
  {
    id: 'palette-signal-orange',
    label: 'Signal Orange',
    description: 'Warm cream · electric orange · navy · sky blue accents',
    swatches: ['#F0EBE5', '#3D4F6B', '#F1711B'],
    neutralKey: 'signalOrange',
    accents: ['#F1711B', '#5B8EC4', '#3D4F6B'],
    pills: ['#F1711B', '#E8A04A', '#5B8EC4', '#C8DDF0', '#F0EBE5'],
    tint: { shell: '#F0EBE5', canvas: '#e8e2db', dot: '#d5cec4', soft: '#ffffff', fg: '#3D4F6B' },
    bold: { shell: '#3D4F6B', canvas: '#2f3d54', dot: 'rgba(255,255,255,0.16)', soft: '#4a6280' },
    duo: buildDuoTheme(['#F1711B', '#5B8EC4', '#3D4F6B'], {
      intro: ['#3D4F6B', '#E8A04A'],
      pills: ['#C8DDF0', '#3D4F6B'],
      actions: ['#F1711B', '#FFFFFF'],
      nav: ['#FFFFFF', '#3D4F6B'],
      ems: ['#E8A04A', '#5B8EC4', '#C8DDF0'],
    }),
    duoBuckets: {
      warm: '#F1711B',
      cool: '#3D4F6B',
      neutral: '#F0EBE5',
    },
  },
]

function variantId(baseId: string, variant: Exclude<PaletteVariant, 'light'>) {
  return `${baseId}-${variant}`
}

function variantLabel(baseLabel: string, variant: Exclude<PaletteVariant, 'light'>) {
  if (variant === 'bold') return `${baseLabel} Bold`
  if (variant === 'duo') return `${baseLabel} Duo`
  return `${baseLabel} Tint`
}

export interface PaletteSchemeEntry {
  id: string
  label: string
  description: string
  swatches: [string, string, string]
  variant: PaletteVariant
  accents: Sw
  pills: PillColors
  neutralKey?: PaletteLightSpec['neutralKey']
  ground?: PaletteGround
  duo?: HeroCardTheme
  duoBuckets?: DuoBucketPalette
}

export const ALL_PALETTE_SCHEME_ENTRIES: PaletteSchemeEntry[] = PALETTE_LIGHT_SPECS.flatMap((spec) => [
  {
    id: spec.id,
    label: spec.label,
    description: spec.description,
    swatches: spec.swatches,
    variant: 'light' as const,
    accents: spec.accents,
    pills: spec.pills,
    neutralKey: spec.neutralKey,
  },
  {
    id: variantId(spec.id, 'tint'),
    label: variantLabel(spec.label, 'tint'),
    description: `${spec.label} palette wash · dark text · vivid accents`,
    swatches: [spec.tint.soft, spec.accents[0], spec.accents[1]] as [string, string, string],
    variant: 'tint' as const,
    accents: spec.accents,
    pills: spec.pills,
    ground: spec.tint,
  },
  {
    id: variantId(spec.id, 'duo'),
    label: variantLabel(spec.label, 'duo'),
    description: `${spec.label} colored bento cards · paired type + fill colors`,
    swatches: [spec.duo.intro.bg, spec.duo.intro.fg, spec.accents[0]] as [string, string, string],
    variant: 'duo' as const,
    accents: spec.accents,
    pills: spec.pills,
    neutralKey: spec.neutralKey,
    duo: spec.duo,
    duoBuckets: spec.duoBuckets,
  },
])

export const PALETTE_LIGHT_SCHEME_IDS = PALETTE_LIGHT_SPECS.map((spec) => spec.id)
export const PALETTE_TINT_SCHEME_IDS = PALETTE_LIGHT_SPECS.map((spec) => variantId(spec.id, 'tint'))
/** Legacy bold IDs resolve to their duo counterpart via normalizePaletteSchemeId */
export const PALETTE_DUO_SCHEME_IDS = PALETTE_LIGHT_SPECS.map((spec) => variantId(spec.id, 'duo'))
export const PALETTE_SCHEME_IDS = ALL_PALETTE_SCHEME_ENTRIES.map((entry) => entry.id)

export type PaletteSchemeId = (typeof ALL_PALETTE_SCHEME_ENTRIES)[number]['id']

export function normalizePaletteSchemeId(id: string): string {
  if (id.endsWith('-bold')) return id.replace(/-bold$/, '-duo')
  return id
}

export function getPaletteVariant(id: string): PaletteVariant {
  const normalized = normalizePaletteSchemeId(id)
  if (normalized.endsWith('-duo')) return 'duo'
  if (normalized.endsWith('-tint')) return 'tint'
  return 'light'
}

export function isPaletteSchemeId(id: string): id is PaletteSchemeId {
  return id.startsWith('palette-')
}
