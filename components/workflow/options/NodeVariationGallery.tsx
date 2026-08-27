'use client'

import Link from 'next/link'
import { ArrowLeft, GitBranch, Zap } from 'lucide-react'
import type { StoryStep } from '@/lib/workflow/story-narrative'
import {
  N8nConfigurationNode,
  N8nDefaultNode,
  N8nStickyNode,
} from '@/components/workflow/n8n/N8nNodes'
import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'

const DEMO_MILESTONE: StoryStep = {
  id: 'intuit',
  company: 'Intuit',
  role: 'Frontend Engineer Intern',
  period: 'Summer 2024',
  tag: 'TurboTax top-of-funnel UX',
  flowRole: 'Software Engineer Intern',
  flowSubtitle: 'Intuit · Summer 2024',
  logo: COMPANY_LOGOS.intuit,
  accent: '#ff6d5a',
  story: '10+ React/TS components for TurboTax.',
  outcome: 'Product engineering at scale',
}

const DEMO_CURRENT: StoryStep = {
  id: 'autodesk-pm',
  company: 'Autodesk',
  role: 'Technical Platform PM Intern',
  period: 'May 2026 – Present',
  tag: 'Data products · AI features',
  flowRole: 'Platform PM Intern',
  flowSubtitle: 'Autodesk · Present',
  logo: COMPANY_LOGOS.autodesk,
  accent: '#ff6d5a',
  story: 'Owned ADP Studio query platform.',
  outcome: 'Shape platform direction',
}

const DEMO_PROJECT = {
  label: 'TurboTax top-of-funnel UX',
  category: 'Engineering' as const,
  parent: 'Intuit',
}

function PreviewFrame({
  title,
  description,
  children,
  wide,
}: {
  title: string
  description: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div
      className={`rounded-xl border border-n8n-border bg-n8n-panel overflow-hidden ${
        wide ? 'col-span-2' : ''
      }`}
    >
      <div className="px-4 py-3 border-b border-n8n-border">
        <p className="text-sm font-medium text-n8n-text">{title}</p>
        <p className="text-xs text-n8n-muted mt-0.5">{description}</p>
      </div>
      <div className="canvas-grid-n8n p-8 flex items-center justify-center min-h-[140px]">
        {children}
      </div>
    </div>
  )
}

function Port({ side }: { side: 'l' | 'r' | 't' | 'b' }) {
  const cls =
    side === 'l'
      ? 'input'
      : side === 'r'
        ? 'output'
        : side === 't'
          ? 'top'
          : 'bottom'
  return <span className={`node-port ${cls} opacity-90`} aria-hidden />
}

function Logo({ step, size = 32 }: { step: StoryStep; size?: number }) {
  if (step.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={step.logo}
        alt=""
        width={size}
        height={size}
        className="object-contain shrink-0 rounded bg-white p-0.5"
      />
    )
  }
  return (
    <span className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded bg-n8n-node border border-n8n-border">
      {step.company.slice(0, 1)}
    </span>
  )
}

/* ── Milestone variations ── */

function MilestoneA({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[168px] rounded-md border-2 border-n8n-border bg-n8n-node px-2.5 py-2 group">
      <Port side="l" />
      <Port side="r" />
      <div className="flex items-center gap-2">
        <Logo step={step} />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-n8n-text truncate">
            {step.flowRole}
          </p>
          <p className="text-[10px] text-n8n-muted truncate">{step.company}</p>
        </div>
      </div>
      <span className="mt-1.5 inline-block text-[8px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300">
        Engineering
      </span>
    </div>
  )
}

function MilestoneB({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[168px] rounded-md border border-n8n-border bg-n8n-node overflow-hidden group">
      <Port side="l" />
      <Port side="r" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-n8n-accent" />
      <div className="pl-3 pr-2.5 py-2 flex items-center gap-2">
        <Logo step={step} />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-n8n-text truncate">
            {step.flowRole}
          </p>
          <p className="text-[10px] text-n8n-muted truncate">{step.company}</p>
        </div>
      </div>
    </div>
  )
}

function MilestoneC({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[140px] rounded-lg border border-n8n-border bg-n8n-node px-3 py-3 text-center group">
      <Port side="l" />
      <Port side="r" />
      <div className="flex justify-center mb-2">
        <Logo step={step} size={36} />
      </div>
      <p className="text-[11px] font-semibold text-n8n-text leading-tight">
        {step.flowRole}
      </p>
      <p className="text-[10px] text-n8n-muted mt-1">{step.company}</p>
    </div>
  )
}

function MilestoneD({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[200px] rounded border border-n8n-border bg-n8n-node px-3 py-2 group">
      <Port side="l" />
      <Port side="r" />
      <p className="text-[11px] font-medium text-n8n-text truncate">
        {step.flowRole} · {step.company}
      </p>
    </div>
  )
}

function MilestoneE({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[176px] rounded-md border border-n8n-border bg-n8n-node px-2.5 py-2 group">
      <Port side="l" />
      <Port side="r" />
      <div className="flex items-center gap-2">
        <Logo step={step} />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-n8n-text truncate">
            {step.flowRole}
          </p>
          <p className="text-[10px] text-n8n-muted truncate">{step.company}</p>
          <p className="text-[9px] text-n8n-dim font-mono mt-0.5">
            {step.period}
          </p>
        </div>
      </div>
    </div>
  )
}

function MilestoneF({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[168px] rounded-md border-2 border-dashed border-n8n-border/80 bg-transparent px-2.5 py-2 group">
      <Port side="l" />
      <Port side="r" />
      <div className="flex items-center gap-2 opacity-80">
        <Logo step={step} />
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-n8n-muted truncate">
            {step.flowRole}
          </p>
          <p className="text-[10px] text-n8n-dim truncate">{step.company}</p>
        </div>
      </div>
    </div>
  )
}

function MilestoneG({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[188px] rounded-lg border border-n8n-border bg-[#32384a] px-3 py-2.5 shadow-xl shadow-black/30 group">
      <Port side="l" />
      <Port side="r" />
      <div className="flex items-center gap-2.5">
        <Logo step={step} size={36} />
        <div>
          <p className="text-[13px] font-semibold text-n8n-text">
            {step.flowRole}
          </p>
          <p className="text-[11px] text-n8n-muted">{step.company}</p>
        </div>
      </div>
    </div>
  )
}

function MilestoneH({ step }: { step: StoryStep }) {
  return (
    <div className="relative rounded-full border border-n8n-border bg-n8n-node pl-2 pr-4 py-1.5 group inline-flex items-center gap-2">
      <Port side="l" />
      <Port side="r" />
      <Logo step={step} size={28} />
      <div>
        <p className="text-[11px] font-semibold text-n8n-text whitespace-nowrap">
          {step.flowRole}
        </p>
        <p className="text-[9px] text-n8n-muted">{step.company}</p>
      </div>
    </div>
  )
}

function MilestoneCurrent({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[176px] rounded-md border-2 border-n8n-accent bg-[#32384a] px-2.5 py-2 flow-node-current group">
      <span className="absolute -top-2 left-2 px-1.5 py-px rounded-full bg-n8n-accent text-[8px] font-mono text-white">
        Now
      </span>
      <Port side="l" />
      <Port side="r" />
      <div className="flex items-center gap-2">
        <Logo step={step} />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-n8n-text truncate">
            {step.flowRole}
          </p>
          <p className="text-[10px] text-n8n-muted truncate">{step.company}</p>
        </div>
      </div>
      <span className="mt-1 inline-block text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-n8n-accent/15 text-n8n-accent">
        Product
      </span>
    </div>
  )
}

function MilestoneK({ step }: { step: StoryStep }) {
  return (
    <div className="relative w-[132px] rounded-md border-2 border-n8n-border overflow-hidden group">
      <Port side="l" />
      <Port side="r" />
      <div className="flex items-center justify-center bg-white p-3 min-h-[52px]">
        <Logo step={step} size={40} />
      </div>
      <div className="bg-n8n-node px-2.5 py-2 border-t border-n8n-border">
        <p className="text-[12px] font-semibold text-n8n-text truncate">
          {step.flowRole}
        </p>
        <p className="text-[10px] text-n8n-muted truncate">{step.company}</p>
      </div>
    </div>
  )
}

function MilestoneTrigger({ step }: { step: StoryStep }) {
  return (
    <div className="relative flex items-center gap-1">
      <Zap className="w-4 h-4 text-n8n-trigger fill-n8n-trigger shrink-0" />
      <div className="relative w-[160px] rounded-md border-2 border-n8n-trigger/60 bg-n8n-node px-2.5 py-2 group">
        <Port side="r" />
        <p className="text-[12px] font-semibold text-n8n-text truncate">
          {step.flowRole ?? step.role}
        </p>
        <p className="text-[10px] text-n8n-muted truncate">{step.company}</p>
      </div>
    </div>
  )
}

/* ── Project / branch variations ── */

function ProjectA() {
  return (
    <div className="relative w-[136px] rounded-full border border-n8n-border/50 bg-n8n-panel/90 px-2.5 py-1.5 group">
      <Port side="t" />
      <p className="text-[10px] text-n8n-muted line-clamp-2">
        {DEMO_PROJECT.label}
      </p>
      <span className="mt-1 inline-block text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300">
        {DEMO_PROJECT.category}
      </span>
    </div>
  )
}

function ProjectB() {
  return (
    <div className="relative w-[148px] rounded-md border border-n8n-border bg-n8n-panel px-2 py-1.5 group">
      <Port side="t" />
      <p className="text-[10px] text-n8n-muted">{DEMO_PROJECT.label}</p>
    </div>
  )
}

function ProjectC() {
  return (
    <div className="relative rounded-full border border-n8n-border/40 bg-n8n-panel/70 px-3 py-1 group">
      <Port side="t" />
      <p className="text-[10px] text-n8n-dim whitespace-nowrap">
        {DEMO_PROJECT.label}
      </p>
    </div>
  )
}

function ProjectD() {
  return (
    <div className="relative w-[152px] rounded-md border border-dashed border-n8n-border/60 bg-transparent px-2 py-1.5 group">
      <Port side="t" />
      <p className="text-[8px] text-n8n-dim font-mono">{DEMO_PROJECT.parent}</p>
      <p className="text-[10px] text-n8n-muted mt-0.5">{DEMO_PROJECT.label}</p>
    </div>
  )
}

function ProjectE() {
  return (
    <div className="relative flex items-center gap-2 px-1 group">
      <Port side="t" />
      <span className="w-1.5 h-1.5 rounded-full bg-n8n-accent shrink-0" />
      <p className="text-[10px] text-n8n-muted">{DEMO_PROJECT.label}</p>
    </div>
  )
}

function ProjectF() {
  return (
    <div className="relative border-b border-n8n-border/50 pb-1 group">
      <Port side="t" />
      <p className="text-[10px] text-n8n-muted">{DEMO_PROJECT.label}</p>
    </div>
  )
}

function ProjectG() {
  return (
    <div className="relative w-[120px] rounded-lg border border-n8n-border bg-n8n-node px-2 py-2 text-center group">
      <Port side="t" />
      <p className="text-[9px] font-mono text-n8n-dim uppercase">Side project</p>
      <p className="text-[10px] text-n8n-text mt-1 leading-snug">
        Stealth CRM
      </p>
    </div>
  )
}

function ProjectH() {
  return (
    <div className="relative w-[130px] rounded-full border border-violet-400/30 bg-violet-400/10 px-2.5 py-1 group">
      <Port side="t" />
      <p className="text-[10px] text-violet-300">Multilingual AI pipelines</p>
      <span className="text-[8px] font-mono text-violet-400/80">Data</span>
    </div>
  )
}

/* ── Router variations ── */

function RouterA() {
  return (
    <div className="relative w-16 h-16 rounded-lg border-2 border-n8n-border bg-[#2e3140] flex flex-col items-center justify-center group">
      <Port side="l" />
      <Port side="t" />
      <Port side="b" />
      <GitBranch className="w-4 h-4 text-n8n-muted" />
      <span className="text-[7px] font-mono text-n8n-dim mt-0.5">Eng / PM</span>
    </div>
  )
}

function RouterB() {
  return (
    <div
      className="relative w-14 h-14 border-2 border-n8n-border bg-n8n-node flex items-center justify-center group"
      style={{ transform: 'rotate(45deg)' }}
    >
      <GitBranch
        className="w-4 h-4 text-n8n-muted"
        style={{ transform: 'rotate(-45deg)' }}
      />
    </div>
  )
}

function RouterC() {
  return (
    <div className="relative rounded-md border border-n8n-border bg-n8n-panel px-3 py-2 text-center group">
      <Port side="l" />
      <Port side="t" />
      <Port side="b" />
      <p className="text-[10px] font-semibold text-n8n-text">Autodesk</p>
      <p className="text-[8px] text-n8n-dim font-mono mt-0.5">
        Engineering / Product
      </p>
    </div>
  )
}

function RouterD() {
  return (
    <div className="relative w-10 h-10 rounded-full border-2 border-n8n-border bg-n8n-node flex items-center justify-center group">
      <Port side="l" />
      <Port side="t" />
      <Port side="b" />
      <span className="text-[10px] text-n8n-muted font-mono">◇</span>
    </div>
  )
}

function RouterE() {
  return (
    <div className="relative flex flex-col items-center gap-1 group">
      <div className="w-[100px] rounded border border-n8n-border bg-n8n-node px-2 py-1 text-center">
        <Port side="l" />
        <p className="text-[9px] text-n8n-muted">Tesla</p>
      </div>
      <div className="w-px h-3 bg-n8n-border" />
      <div className="flex gap-3">
        <div className="w-[72px] rounded border border-n8n-border bg-n8n-panel px-1.5 py-1 text-center">
          <p className="text-[8px] text-n8n-dim">Eng</p>
        </div>
        <div className="w-[72px] rounded border border-n8n-accent/50 bg-n8n-accent/10 px-1.5 py-1 text-center">
          <p className="text-[8px] text-n8n-accent">PM</p>
        </div>
      </div>
    </div>
  )
}

function RouterF() {
  return (
    <div className="relative w-20 h-12 rounded-lg border-2 border-dashed border-n8n-accent/40 bg-n8n-accent/5 flex items-center justify-center group">
      <Port side="l" />
      <Port side="t" />
      <Port side="b" />
      <p className="text-[9px] font-mono text-n8n-accent">SPLIT</p>
    </div>
  )
}

export function NodeVariationGallery() {
  return (
    <div className="min-h-screen bg-n8n-canvas text-n8n-text">
      <header className="border-b border-n8n-border px-6 md:px-10 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-n8n-muted hover:text-n8n-accent mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>
        <h1 className="text-2xl font-semibold text-n8n-text">
          Workflow node variations
        </h1>
        <p className="text-sm text-n8n-muted mt-2 max-w-2xl">
          Compare milestone, project/branch, and router node styles. The live
          homepage uses the official <strong className="text-n8n-text">n8n canvas</strong>{' '}
          design system.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-14">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-n8n-dim mb-1">
            Milestone nodes
          </h2>
          <p className="text-sm text-n8n-muted mb-6">
            Major roles on the main career path, compact, icon-led, operational.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PreviewFrame
              title="Live · Official n8n canvas node"
              description="96×96 icon box, label below, 16px handles, matches the editor."
            >
              <N8nDefaultNode step={DEMO_MILESTONE} active />
            </PreviewFrame>
            <PreviewFrame
              title="A · Compact inline (legacy)"
              description="Earlier inline logo + text card style."
            >
              <MilestoneA step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="B · Accent stripe"
              description="n8n-style left color bar."
            >
              <MilestoneB step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="C · Icon hero"
              description="Logo-centered, stacked text."
            >
              <MilestoneC step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="D · Single line"
              description="Ultra-compact one-liner."
            >
              <MilestoneD step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="E · With period"
              description="Shows date range on the node."
            >
              <MilestoneE step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="F · Ghost outline"
              description="Muted, dashed, for older entries."
            >
              <MilestoneF step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="G · Elevated card"
              description="Larger, higher contrast for emphasis."
            >
              <MilestoneG step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="H · Pill milestone"
              description="Rounded capsule instead of rectangle."
            >
              <MilestoneH step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="I · Current role"
              description="Now badge + accent border + pulse."
            >
              <MilestoneCurrent step={DEMO_CURRENT} />
            </PreviewFrame>
            <PreviewFrame
              title="K · Logo hero"
              description="Full logo on top, white text below on dark strip."
            >
              <MilestoneK step={DEMO_MILESTONE} />
            </PreviewFrame>
            <PreviewFrame
              title="J · Trigger / start"
              description="Zap icon for journey entry point."
            >
              <MilestoneTrigger
                step={{
                  ...DEMO_MILESTONE,
                  id: 'education',
                  company: 'Western / Ivey',
                  flowRole: 'CS + Business',
                }}
              />
            </PreviewFrame>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-n8n-dim mb-1">
            Project / branch nodes
          </h2>
          <p className="text-sm text-n8n-muted mb-6">
            Smaller nodes attached above or below milestones, side projects,
            skills, context.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PreviewFrame
              title="Live · Official n8n sticky note"
              description="Yellow sticky branch node, matches the editor."
            >
              <N8nStickyNode label={DEMO_PROJECT.label} active />
            </PreviewFrame>
            <PreviewFrame
              title="A · Current pill (legacy)"
              description="Rounded branch with category tag."
            >
              <ProjectA />
            </PreviewFrame>
            <PreviewFrame
              title="B · Rectangular chip"
              description="Slightly more box-like secondary node."
            >
              <ProjectB />
            </PreviewFrame>
            <PreviewFrame
              title="C · Tag only"
              description="Minimal, no category, lowest weight."
            >
              <ProjectC />
            </PreviewFrame>
            <PreviewFrame
              title="D · Parent label"
              description="Shows which milestone it branches from."
            >
              <ProjectD />
            </PreviewFrame>
            <PreviewFrame
              title="E · Dot prefix"
              description="Inline list-item feel."
            >
              <ProjectE />
            </PreviewFrame>
            <PreviewFrame
              title="F · Underline"
              description="Ultra-light annotation style."
            >
              <ProjectF />
            </PreviewFrame>
            <PreviewFrame
              title="G · Side project card"
              description="Named project type label."
            >
              <ProjectG />
            </PreviewFrame>
            <PreviewFrame
              title="H · Category tinted"
              description="Color encodes Data / Eng / Product."
            >
              <ProjectH />
            </PreviewFrame>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-n8n-dim mb-1">
            Router / split nodes
          </h2>
          <p className="text-sm text-n8n-muted mb-6">
            Where the story branches, e.g. Engineering vs Product at Autodesk.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PreviewFrame
              title="Live · Official n8n configuration node"
              description="80px circle with route icon, matches the editor."
            >
              <N8nConfigurationNode label="Autodesk split" active />
            </PreviewFrame>
            <PreviewFrame
              title="A · Switch box (legacy)"
              description="Compact n8n-style router with icon."
            >
              <RouterA />
            </PreviewFrame>
            <PreviewFrame
              title="B · Diamond"
              description="Rotated square, classic flowchart fork."
            >
              <RouterB />
            </PreviewFrame>
            <PreviewFrame
              title="C · Labeled fork"
              description="Readable text instead of icon-only."
            >
              <RouterC />
            </PreviewFrame>
            <PreviewFrame
              title="D · Minimal circle"
              description="Smallest footprint split point."
            >
              <RouterD />
            </PreviewFrame>
            <PreviewFrame
              title="E · Expanded fork"
              description="Shows both branches inline."
              wide
            >
              <RouterE />
            </PreviewFrame>
            <PreviewFrame
              title="F · Dashed split"
              description="Accent-highlighted transition point."
            >
              <RouterF />
            </PreviewFrame>
          </div>
        </section>
      </div>
    </div>
  )
}
