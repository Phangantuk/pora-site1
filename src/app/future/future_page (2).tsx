'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = 'live' | 'planned' | 'research'

interface Module {
  id:      string
  icon:    React.ReactNode
  title:   string
  desc:    string
  detail:  string
  status:  Status
  meta:    string[]
  progress?: number   // 0–100, shown for planned/research
}

// ─── Per-status design tokens ─────────────────────────────────────────────────
const STATUS_TOKENS: Record<Status, {
  label:       string
  dot:         string   // tailwind bg color
  badge:       string   // badge classes
  iconBg:      string
  iconBorder:  string
  iconText:    string
  glow:        string   // radial gradient rgba
  borderGlow:  string   // card border gradient
  barColor:    string   // progress bar
  topAccent:   string   // thin top stripe color
}> = {
  live: {
    label:      'Live',
    dot:        'bg-[#E8855A]',
    badge:      'text-[#E8855A] bg-[#E8855A]/12 border border-[#E8855A]/30',
    iconBg:     'bg-[#E8855A]/10',
    iconBorder: 'border border-[#E8855A]/30',
    iconText:   'text-[#E8855A]',
    glow:       'rgba(232,133,90,0.09)',
    borderGlow: 'rgba(232,133,90,0.35)',
    barColor:   '#E8855A',
    topAccent:  'rgba(232,133,90,0.6)',
  },
  planned: {
    label:      'Planned',
    dot:        'bg-[#4ECAA0]',
    badge:      'text-[#4ECAA0] bg-[#4ECAA0]/10 border border-[#4ECAA0]/25',
    iconBg:     'bg-[#4ECAA0]/08',
    iconBorder: 'border border-[#4ECAA0]/20',
    iconText:   'text-[#4ECAA0]',
    glow:       'rgba(78,202,160,0.07)',
    borderGlow: 'rgba(78,202,160,0.3)',
    barColor:   '#4ECAA0',
    topAccent:  'rgba(78,202,160,0.45)',
  },
  research: {
    label:      'Research',
    dot:        'bg-[#7BA7F5]',
    badge:      'text-[#7BA7F5] bg-[#7BA7F5]/10 border border-[#7BA7F5]/25',
    iconBg:     'bg-[#7BA7F5]/08',
    iconBorder: 'border border-[#7BA7F5]/20',
    iconText:   'text-[#7BA7F5]',
    glow:       'rgba(123,167,245,0.07)',
    borderGlow: 'rgba(123,167,245,0.3)',
    barColor:   '#7BA7F5',
    topAccent:  'rgba(123,167,245,0.45)',
  },
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconMeal = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
)
const IconShelter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconMedicine = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="14" rx="2"/>
    <line x1="12" y1="10" x2="12" y2="18"/><line x1="8" y1="14" x2="16" y2="14"/>
  </svg>
)
const IconEducation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)
const IconWater = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
  </svg>
)
const IconLegal = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

// ─── Module data ──────────────────────────────────────────────────────────────
const MODULES: Module[] = [
  {
    id:     'POM-001',
    icon:   <IconMeal />,
    title:  'Proof of Meal',
    desc:   'Verify meals served to people in need and record feeding events transparently.',
    detail: 'The first production implementation of the PORA protocol — operational and live.',
    status: 'live',
    meta:   ['28 countries', '840K+ meals', '140 orgs'],
  },
  {
    id:       'POS-002',
    icon:     <IconShelter />,
    title:    'Proof of Shelter',
    desc:     'Confirm temporary or long-term shelter provided to displaced individuals.',
    detail:   'Designed for emergency housing providers, displacement response teams, and long-term housing NGOs.',
    status:   'planned',
    meta:     ['Est. Q3 2025', 'Spec drafted'],
    progress: 42,
  },
  {
    id:       'MED-003',
    icon:     <IconMedicine />,
    title:    'Proof of Medicine',
    desc:     'Track medicine distribution and healthcare support actions on-chain.',
    detail:   'Applicable to mobile health units, field clinics, and medicine aid programmes.',
    status:   'planned',
    meta:     ['Est. Q4 2025', 'Spec in review'],
    progress: 28,
  },
  {
    id:       'EDU-004',
    icon:     <IconEducation />,
    title:    'Proof of Education',
    desc:     'Record educational sessions, training programs, and learning events.',
    detail:   'Exploring verification frameworks for community schools and vocational training.',
    status:   'research',
    meta:     ['Early research', 'RFC open'],
    progress: 12,
  },
  {
    id:       'WAT-005',
    icon:     <IconWater />,
    title:    'Proof of Water',
    desc:     'Verify clean water distribution and sanitation efforts in underserved areas.',
    detail:   'Defining standards for water delivery verification in humanitarian contexts.',
    status:   'research',
    meta:     ['Early research'],
    progress: 8,
  },
  {
    id:       'PRO-006',
    icon:     <IconLegal />,
    title:    'Proof of Protection',
    desc:     'Document protection services and legal aid provided to vulnerable populations.',
    detail:   'Early-stage exploration for legal aid organisations and monitoring programmes.',
    status:   'research',
    meta:     ['Conceptual'],
    progress: 5,
  },
]

// ─── Live pulse dot ───────────────────────────────────────────────────────────
function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5"
        style={{ backgroundColor: color }} />
    </span>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  const tk = STATUS_TOKENS[status]
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-lg ${tk.badge}`}>
      <PulseDot color={tk.barColor} />
      {tk.label}
    </span>
  )
}

// ─── Module card ──────────────────────────────────────────────────────────────
function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  const tk      = STATUS_TOKENS[mod.status]
  const isLive  = mod.status === 'live'

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        // Gradient border via box shadow + background layering
        background: `linear-gradient(#0C0C0E, #0C0C0E) padding-box,
                     linear-gradient(135deg, ${tk.borderGlow}, transparent 50%, transparent 80%, ${tk.borderGlow}) border-box`,
        border: '1px solid transparent',
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* ── Corner grid texture ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at 100% 0%, black 20%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 100% 0%, black 20%, transparent 65%)',
        }}
      />

      {/* ── Ambient glow (hover) ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${tk.glow}, transparent 65%)` }}
      />

      {/* ── Top accent stripe ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{
          background: isLive
            ? `linear-gradient(to right, ${tk.topAccent}, transparent)`
            : `linear-gradient(to right, ${tk.topAccent}, transparent 60%)`,
          opacity: isLive ? 1 : 0.6,
        }}
      />

      {/* ── Card inner content ── */}
      <div className="relative p-7 flex flex-col h-full">

        {/* Header row: module ID chip + badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[10px] tracking-[0.12em] text-white/20 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md">
            {mod.id}
          </span>
          <StatusBadge status={mod.status} />
        </div>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-105 ${tk.iconBg} ${tk.iconBorder} ${tk.iconText}`}
          style={{ boxShadow: `0 0 20px ${tk.glow}` }}
        >
          {mod.icon}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[17px] text-white/90 mb-2 tracking-tight leading-snug">
          {mod.title}
        </h3>

        {/* Description */}
        <p className="text-[13.5px] text-white/45 leading-[1.65] mb-3 font-light flex-1">
          {mod.desc}
        </p>

        {/* Detail */}
        <p className="text-[12px] text-white/22 leading-relaxed mb-5">
          {mod.detail}
        </p>

        {/* Progress bar (planned / research) */}
        {mod.progress !== undefined && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/20">Development</span>
              <span className="font-mono text-[10px] text-white/30">{mod.progress}%</span>
            </div>
            <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${mod.progress}%`, background: tk.barColor, opacity: 0.7 }}
              />
            </div>
          </div>
        )}

        {/* Meta tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {mod.meta.map(tag => (
            <span key={tag}
              className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded-md text-white/30 bg-white/[0.04] border border-white/[0.06]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom scan line (live only) ── */}
      {isLive && (
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${tk.topAccent}, transparent)` }} />
      )}
    </div>
  )
}

// ─── Section group ────────────────────────────────────────────────────────────
function ModuleGroup({ status, modules }: { status: Status; modules: Module[] }) {
  const tk = STATUS_TOKENS[status]
  const { ref, visible } = useReveal()

  return (
    <div ref={ref}>
      {/* Group label row */}
      <div className="flex items-center gap-4 mb-7">
        <div className="flex items-center gap-2.5">
          <PulseDot color={tk.barColor} />
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: tk.barColor }}>
            {tk.label}
          </span>
          <span className="font-mono text-[10px] text-white/20 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">
            {modules.length}
          </span>
        </div>
        <div className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, ${tk.borderGlow}, transparent)` }} />
      </div>

      {/* Cards grid with staggered entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <div
            key={mod.id}
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <ModuleCard mod={mod} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero stat mini-cards ─────────────────────────────────────────────────────
function HeroStat({ n, label, color }: { n: number; label: string; color: string }) {
  return (
    <div className="relative bg-[#0C0C0E] rounded-xl px-5 py-4 text-center overflow-hidden"
      style={{ border: `1px solid ${color}20` }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}08, transparent 70%)` }} />
      <p className="font-mono text-[24px] font-semibold leading-none mb-1" style={{ color }}>{n}</p>
      <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">{label}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FutureModulesPage() {
  const live     = MODULES.filter(m => m.status === 'live')
  const planned  = MODULES.filter(m => m.status === 'planned')
  const research = MODULES.filter(m => m.status === 'research')

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#070707] border-b border-white/[0.07] px-6 pt-32 pb-16 overflow-hidden">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,133,90,0.06), transparent 65%)' }} />
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/20 mb-8 tracking-wide">
            <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
            <span className="text-white/15">/</span>
            <span className="text-[#E8855A]/60">Future Modules</span>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-5">
            <PulseDot color="#E8855A" />
            Protocol roadmap
          </div>

          {/* Title + sub */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
            <div>
              <h1 className="font-bold text-[clamp(36px,5vw,58px)] leading-[1.04] tracking-tight text-white mb-4">
                Future PORA Modules
              </h1>
              <p className="text-[15px] text-white/40 font-light leading-relaxed max-w-[520px]">
                Real-world actions that can be verified and recorded using the PORA protocol.
                The core infrastructure is shared — only the action type changes.
              </p>
            </div>

            {/* Legend pills */}
            <div className="flex flex-wrap gap-2 shrink-0 lg:pb-1">
              {(['live','planned','research'] as Status[]).map(s => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </div>

          {/* Stat trio */}
          <div className="grid grid-cols-3 gap-3 max-w-xs">
            <HeroStat n={live.length}     label="Live"     color="#E8855A" />
            <HeroStat n={planned.length}  label="Planned"  color="#4ECAA0" />
            <HeroStat n={research.length} label="Research" color="#7BA7F5" />
          </div>
        </div>
      </section>

      {/* ── Module sections ── */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          <ModuleGroup status="live"     modules={live}     />
          <ModuleGroup status="planned"  modules={planned}  />
          <ModuleGroup status="research" modules={research} />
        </div>
      </section>

      {/* ── Build CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(#0C0C0E, #0C0C0E) padding-box, linear-gradient(135deg, rgba(232,133,90,0.3), transparent 50%, transparent 80%, rgba(232,133,90,0.15)) border-box',
              border: '1px solid transparent',
            }}
          >
            {/* Glow + grid */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(232,133,90,0.06), transparent 60%)' }} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {/* Top stripe */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(to right, transparent, rgba(232,133,90,0.5) 40%, rgba(232,133,90,0.5) 60%, transparent)' }} />

            <div className="relative px-10 py-14 text-center">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-5 block">
                Open protocol
              </span>
              <h2 className="font-bold text-[clamp(24px,3vw,36px)] text-white mb-4 tracking-tight leading-tight">
                Build a Proof-of-X module
              </h2>
              <p className="text-[15px] text-white/40 max-w-[460px] mx-auto mb-8 font-light leading-relaxed">
                Any verifiable humanitarian action can become a PORA module. The protocol provides the verification and record layer — you define the action standards.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/developers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm tracking-wide bg-[#E8855A] text-[#0D0805] hover:bg-[#f0966e] hover:shadow-[0_8px_32px_rgba(232,133,90,0.3)] hover:-translate-y-px transition-all duration-200">
                  Read developer docs
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/protocol"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm tracking-wide border border-white/10 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/[0.04] transition-all duration-200">
                  View protocol spec
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
