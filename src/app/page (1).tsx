'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Utility ──────────────────────────────────────────────────────────────────
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return value
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Button ───────────────────────────────────────────────────────────────────
function Button({
  href, onClick, variant = 'primary', children, className,
}: {
  href?: string; onClick?: () => void; variant?: 'primary' | 'ghost'
  children: React.ReactNode; className?: string
}) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer no-underline'
  const styles = {
    primary: 'bg-[#E8855A] text-[#0D0805] hover:bg-[#f0966e] hover:shadow-[0_8px_32px_rgba(232,133,90,0.35)] hover:-translate-y-px active:translate-y-0',
    ghost:   'border border-white/10 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/[0.04]',
  }
  const cls = cn(base, styles[variant], className)
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}

// ─── Hero stat card ───────────────────────────────────────────────────────────
function StatCard({ label, value, suffix = '', started, delay = 0 }: {
  label: string; value: number; suffix?: string; started: boolean; delay?: number
}) {
  const [fire, setFire] = useState(false)
  useEffect(() => {
    if (started) { const t = setTimeout(() => setFire(true), delay); return () => clearTimeout(t) }
  }, [started, delay])
  const count = useCounter(value, 1600, fire)
  const display = count >= 1000 ? count.toLocaleString() : count.toString()
  return (
    <div className="relative group rounded-2xl border border-white/[0.07] bg-[#0E0E0F] p-7 overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(232,133,90,0.06), transparent 70%)' }} />
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30 mb-3">{label}</p>
      <p className="font-semibold text-[38px] leading-none tracking-tight text-white mb-1">
        {display}<span className="text-[#E8855A]">{suffix}</span>
      </p>
    </div>
  )
}

// ─── Dashboard stat card (compact, with icon + trend) ────────────────────────
function DashStatCard({ icon, label, value, suffix = '', trend, started, delay = 0 }: {
  icon: React.ReactNode; label: string; value: number; suffix?: string
  trend: string; started: boolean; delay?: number
}) {
  const [fire, setFire] = useState(false)
  useEffect(() => {
    if (started) { const t = setTimeout(() => setFire(true), delay); return () => clearTimeout(t) }
  }, [started, delay])
  const count = useCounter(value, 1400, fire)
  const display = count >= 1000 ? count.toLocaleString() : count.toString()
  return (
    <div className="relative group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.13] hover:-translate-y-0.5">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(232,133,90,0.05), transparent 65%)' }} />
      <div className="flex items-start justify-between mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#E8855A]/10 border border-[#E8855A]/20 flex items-center justify-center text-[#E8855A]">
          {icon}
        </div>
        <span className="font-mono text-[10px] tracking-wide text-[#4ECAA0] bg-[#4ECAA0]/10 border border-[#4ECAA0]/20 px-2 py-0.5 rounded-md">
          {trend}
        </span>
      </div>
      <p className="font-semibold text-[32px] leading-none tracking-tight text-white mb-2">
        {display}<span className="text-[#E8855A] text-[22px]">{suffix}</span>
      </p>
      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30">{label}</p>
    </div>
  )
}

// ─── Flow step ────────────────────────────────────────────────────────────────
function FlowStep({ num, title, desc, last = false }: {
  num: string; title: string; desc: string; last?: boolean
}) {
  return (
    <div className="relative flex gap-5">
      {!last && (
        <div className="absolute left-[18px] top-[42px] bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(232,133,90,0.3), transparent)' }} />
      )}
      <div className="w-9 h-9 rounded-xl border border-[#E8855A]/30 bg-[#E8855A]/10 flex items-center justify-center shrink-0 mt-0.5">
        <span className="font-mono text-[11px] text-[#E8855A] font-medium">{num}</span>
      </div>
      <div className={last ? '' : 'pb-8'}>
        <h4 className="text-[15px] font-semibold text-white mb-1.5">{title}</h4>
        <p className="text-[13.5px] text-white/50 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

// ─── Section reveal wrapper ───────────────────────────────────────────────────
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={cn(
      'transition-all duration-700',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      className
    )}>
      {children}
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(232,133,90,0.2), transparent)' }} />
    </div>
  )
}

// ─── Live pulse dot ───────────────────────────────────────────────────────────
function LiveDot({ color = '#4ECAA0' }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  )
}

// ─── Dashboard panel wrapper ──────────────────────────────────────────────────
function DashPanel({ title, subtitle, badge, children, className }: {
  title: string; subtitle?: string; badge?: React.ReactNode
  children: React.ReactNode; className?: string
}) {
  return (
    <div className={cn('bg-[#0C0C0E] border border-white/[0.07] rounded-2xl overflow-hidden', className)}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-[13.5px] font-semibold text-white/90 leading-tight">{title}</h3>
          {subtitle && <p className="font-mono text-[10px] text-white/25 mt-0.5 tracking-wide">{subtitle}</p>}
        </div>
        {badge}
      </div>
      {children}
    </div>
  )
}

// ─── Activity feed data + item ────────────────────────────────────────────────
const ACTION_META: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  meal: { label: 'Meal Verified', color: '#E8855A', bg: 'rgba(232,133,90,0.1)', icon: '🍽' },
}

interface FeedEvent {
  id: number; type: 'meal'; location: string; amount: string; time: string; hash: string
}

const FEED_EVENTS: FeedEvent[] = [
  { id: 1, type: 'meal', location: 'Bangkok, Thailand',   amount: '24 meals', time: '2m ago',  hash: '0x3f8a…2c9e' },
  { id: 2, type: 'meal', location: 'Nairobi, Kenya',      amount: '18 meals', time: '7m ago',  hash: '0xd12b…8f01' },
  { id: 3, type: 'meal', location: 'Berlin, Germany',     amount: '12 meals', time: '14m ago', hash: '0x71ca…4d55' },
  { id: 4, type: 'meal', location: 'São Paulo, Brazil',   amount: '30 meals', time: '21m ago', hash: '0xaa3f…9b22' },
  { id: 5, type: 'meal', location: 'Lagos, Nigeria',      amount: '42 meals', time: '35m ago', hash: '0x5e7d…3c88' },
  { id: 6, type: 'meal', location: 'Manila, Philippines', amount: '16 meals', time: '48m ago', hash: '0xb2f1…7a04' },
]

function FeedItem({ event, delay }: { event: FeedEvent; delay: number }) {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t) }, [delay])
  const meta = ACTION_META[event.type]
  return (
    <div className={cn(
      'flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.04] last:border-0',
      'hover:bg-white/[0.02] transition-all duration-500 cursor-default',
      show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
    )}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[14px] shrink-0"
        style={{ background: meta.bg }}>
        {meta.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-medium text-white/80 truncate">{event.location}</span>
          <span className="font-mono text-[10px] px-1.5 py-px rounded shrink-0"
            style={{ color: meta.color, background: meta.bg }}>
            {meta.label}
          </span>
        </div>
        <p className="font-mono text-[10px] text-white/25 tracking-wide">{event.hash} · {event.time}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-mono text-[12px] font-medium" style={{ color: meta.color }}>+{event.amount}</p>
        <p className="font-mono text-[9px] text-[#4ECAA0]/60 tracking-wide mt-0.5">✓ verified</p>
      </div>
    </div>
  )
}

// ─── Sparkline bar chart ──────────────────────────────────────────────────────
const SPARK_DATA = [18, 32, 24, 45, 38, 52, 41, 60, 47, 58, 43, 67]

function Sparkline() {
  const max = Math.max(...SPARK_DATA)
  return (
    <div className="flex items-end gap-1 h-10">
      {SPARK_DATA.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm transition-all duration-700"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === SPARK_DATA.length - 1
              ? '#E8855A'
              : `rgba(232,133,90,${0.15 + (i / SPARK_DATA.length) * 0.3})`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Protocol health row ──────────────────────────────────────────────────────
function HealthRow({ label, value, status }: { label: string; value: string; status: 'ok' | 'warn' | 'idle' }) {
  const dots = { ok: '#4ECAA0', warn: '#F5C542', idle: '#7BA7F5' }
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <span className="text-[13px] text-white/45">{label}</span>
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
            style={{ backgroundColor: dots[status] }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: dots[status] }} />
        </span>
        <span className="font-mono text-[12px] text-white/70">{value}</span>
      </div>
    </div>
  )
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 8h14M8 2s-3 2-3 6 3 6 3 6M8 2s3 2 3 6-3 6-3 6" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2a3 3 0 100 6 3 3 0 000-6zM2 14s0-4 6-4 6 4 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// ─── MAP NODE dots data ───────────────────────────────────────────────────────
const MAP_NODES = [
  { x: '15%', y: '45%' }, { x: '30%', y: '55%' }, { x: '50%', y: '35%' },
  { x: '65%', y: '50%' }, { x: '78%', y: '42%' }, { x: '45%', y: '60%' },
]

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const heroStatsReveal = useReveal()
  const dashReveal      = useReveal()
  const feedReveal      = useReveal()

  return (
    <div className="bg-[#070707] text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">

        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,133,90,0.07) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
            style={{ background: 'radial-gradient(circle, rgba(78,202,160,0.04) 0%, transparent 70%)' }} />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }} />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10"
          style={{ animation: 'fadeUp 0.6s ease forwards', animationDelay: '0.1s', opacity: 0 }}>
          <LiveDot />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#E8855A]">
            Protocol Live — First Implementation Active
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-bold leading-[1.04] tracking-tight text-white mb-6 max-w-3xl"
          style={{ fontSize: 'clamp(48px,7vw,82px)', animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.2s', opacity: 0 }}>
          Proof of{' '}
          <span style={{ background: 'linear-gradient(135deg,#E8855A 0%,#f0a070 50%,#E8855A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Real Action
          </span>
        </h1>

        {/* Sub */}
        <p className="text-[18px] text-white/50 leading-relaxed max-w-xl mb-10 font-light"
          style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.35s', opacity: 0 }}>
          A protocol connecting real-world humanitarian actions with verifiable, permanent digital records.
        </p>

        {/* Flow chain */}
        <div className="flex items-center gap-3 mb-12 flex-wrap justify-center"
          style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.5s', opacity: 0 }}>
          {['Real Action', 'Verification', 'Protocol Record'].map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-[#0E0E0F] border border-white/[0.07] font-mono text-[12px] tracking-wide text-white/70">
                {step}
              </span>
              {i < 2 && <span className="text-[#E8855A]/50 text-lg">→</span>}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center"
          style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.65s', opacity: 0 }}>
          <Button href="/protocol" variant="primary">
            Explore Protocol
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button href="/portal" variant="ghost">Enter Portal</Button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: 'fadeUp 1s ease forwards', animationDelay: '1.2s' }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/60" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">How it works</span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white mb-5">
                  From action to<br />permanent record
                </h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8 font-light max-w-md">
                  PORA is infrastructure for turning real-world humanitarian events into verifiable, tamper-proof digital records. Any action. Any organization. Anywhere.
                </p>
                <Button href="/protocol" variant="ghost">Read the protocol spec</Button>
              </div>
              <div className="bg-[#0E0E0F] border border-white/[0.07] rounded-2xl p-8">
                <FlowStep num="01" title="Real Action Occurs"
                  desc="A participant performs a verifiable humanitarian action — meals distributed, shelter provided, medical assistance given." />
                <FlowStep num="02" title="Validators Confirm"
                  desc="Independent validators review submitted evidence against protocol standards before the record proceeds." />
                <FlowStep num="03" title="Permanent Record"
                  desc="The verified event is written to the PORA record layer — public, immutable, and queryable by anyone." last />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — HERO STATS BAR
      ══════════════════════════════════════════════ */}
      <Divider />
      <section className="py-28 px-6 bg-[#090909]" ref={heroStatsReveal.ref}>
        <div className="max-w-5xl mx-auto">
          <div className={cn('transition-all duration-700', heroStatsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">Network Stats</span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white">
                  Protocol activity,<br />live and open
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0 pb-1">
                <LiveDot />
                <span className="font-mono text-[11px] text-[#4ECAA0] tracking-wide">Updating live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Verified Actions" value={12450} suffix="+"  started={heroStatsReveal.visible} delay={0}   />
              <StatCard label="Meals Verified"   value={8920}  started={heroStatsReveal.visible} delay={120} />
              <StatCard label="Countries"        value={17}    started={heroStatsReveal.visible} delay={240} />
              <StatCard label="Validators"       value={54}    started={heroStatsReveal.visible} delay={360} />
            </div>
            <p className="mt-6 font-mono text-[11px] text-white/20 tracking-wide">
              All data is publicly verifiable via the PORA protocol API.{' '}
              <Link href="/transparency" className="text-[#E8855A]/60 hover:text-[#E8855A] transition-colors">
                View full transparency ledger →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — GLOBAL MAP CONCEPT
      ══════════════════════════════════════════════ */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">Global Network</span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white max-w-sm">
                Global Network of Real Actions
              </h2>
              <p className="text-[14px] text-white/40 max-w-xs leading-relaxed font-light">
                Verified actions are recorded with location data, building a transparent global ledger of humanitarian impact.
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden" style={{ height: 380 }}>
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
              {[{x:'18%',y:'38%'},{x:'28%',y:'52%'},{x:'45%',y:'30%'},{x:'52%',y:'48%'},{x:'62%',y:'35%'},{x:'73%',y:'55%'},{x:'80%',y:'40%'}].map((pos, i) => (
                <span key={i} className="absolute" style={{ left: pos.x, top: pos.y }}>
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8855A] opacity-30" style={{ animationDelay: `${i*0.4}s` }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8855A] opacity-70" />
                  </span>
                </span>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-[#0E0E0F]/90 border border-white/[0.07] rounded-xl px-7 py-4 flex flex-col items-center gap-2 backdrop-blur-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#E8855A]/60">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30">Interactive global map — coming soon</span>
                  <span className="text-[12px] text-white/20">Verified actions will appear here in real time</span>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — PROOF OF EAT
      ══════════════════════════════════════════════ */}
      <Divider />
      <section className="py-28 px-6 bg-[#090909]">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="rounded-2xl border border-[#E8855A]/20 bg-[#E8855A]/[0.04] p-8 overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-48 h-48 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,133,90,0.12), transparent 70%)' }} />
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A]/60 mb-6">Module 01 — Live</div>
                  {[{loc:'Lagos, Nigeria',n:'+320 meals'},{loc:'Karachi, Pakistan',n:'+180 meals'},{loc:'Nairobi, Kenya',n:'+540 meals'}].map((item) => (
                    <div key={item.loc} className="flex items-center justify-between py-3.5 border-b border-white/[0.06] last:border-0">
                      <div>
                        <p className="text-[13px] text-white/70 mb-0.5">{item.loc}</p>
                        <p className="font-mono text-[10px] text-white/25 tracking-wide">Verified · just now</p>
                      </div>
                      <span className="font-mono text-[12px] text-[#E8855A] shrink-0 ml-4">{item.n}</span>
                    </div>
                  ))}
                  <div className="mt-5 flex items-center gap-2">
                    <LiveDot />
                    <span className="font-mono text-[11px] text-[#4ECAA0] tracking-wide">Live protocol events</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10 font-mono text-[10px] tracking-[0.1em] uppercase text-[#E8855A] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]" />
                  First Implementation
                </span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white mb-5">Proof of Eat</h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8 font-light">
                  A system that verifies real-world feeding events and records them as permanent protocol actions. From local community kitchens to large-scale aid operations — every meal counts.
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {['Submit a feeding event with photographic evidence','Validators confirm the event meets protocol standards','Event becomes a permanent, public protocol record'].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-[13.5px] text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]/60 shrink-0 mt-[6px]" />
                      {point}
                    </div>
                  ))}
                </div>
                <Button href="/proof-of-eat" variant="primary">Learn More</Button>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — PROTOCOL ACTIVITY DASHBOARD  ← NEW
      ══════════════════════════════════════════════ */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Section heading */}
          <Section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">
                  Protocol Activity
                </span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white">
                  Live dashboard
                </h2>
              </div>
              <div className="flex items-center gap-3 pb-1">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4ECAA0]/10 border border-[#4ECAA0]/20">
                  <LiveDot />
                  <span className="font-mono text-[10px] text-[#4ECAA0] tracking-wide">All systems active</span>
                </div>
                <Link href="/transparency" className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors">
                  View full →
                </Link>
              </div>
            </div>
          </Section>

          {/* ── Row 1: 4 compact stat cards ─────────────── */}
          <div ref={dashReveal.ref}>
            <div className={cn(
              'grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 transition-all duration-700',
              dashReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <DashStatCard
                icon={<IconCheck />}
                label="Verified Actions" value={12450} suffix="+"
                trend="↑ 8.2%"
                started={dashReveal.visible} delay={0}
              />
              <DashStatCard
                icon={<IconClock />}
                label="Meals Verified" value={8920}
                trend="↑ 12%"
                started={dashReveal.visible} delay={100}
              />
              <DashStatCard
                icon={<IconGlobe />}
                label="Countries" value={17}
                trend="↑ 2 new"
                started={dashReveal.visible} delay={200}
              />
              <DashStatCard
                icon={<IconUser />}
                label="Validators" value={54}
                trend="↑ 5"
                started={dashReveal.visible} delay={300}
              />
            </div>

            {/* ── Row 2: Feed (left 3) + Map + Health (right 2) ── */}
            <div className={cn(
              'grid grid-cols-1 lg:grid-cols-5 gap-4 transition-all duration-700 delay-150',
              dashReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>

              {/* Recent Actions Feed — 3 cols */}
              <div className="lg:col-span-3" ref={feedReveal.ref}>
                <DashPanel
                  title="Recent Actions"
                  subtitle="Last verified protocol events"
                  badge={
                    <div className="flex items-center gap-2">
                      <LiveDot />
                      <span className="font-mono text-[10px] text-[#4ECAA0] tracking-wide">Live</span>
                    </div>
                  }
                  className="h-full"
                >
                  <div>
                    {FEED_EVENTS.map((event, i) => (
                      <FeedItem
                        key={event.id}
                        event={event}
                        delay={feedReveal.visible ? i * 80 : 99999}
                      />
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-white/[0.05]">
                    <Link href="/transparency"
                      className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors tracking-wide">
                      View all events →
                    </Link>
                  </div>
                </DashPanel>
              </div>

              {/* Right column — 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Global Action Map panel */}
                <DashPanel
                  title="Global Action Map"
                  subtitle="Verified action locations"
                  badge={
                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 border border-white/[0.07] px-2 py-0.5 rounded-md">
                      Coming soon
                    </span>
                  }
                >
                  {/* Mini map */}
                  <div className="relative m-4 rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/[0.05]" style={{ height: 178 }}>
                    <div className="absolute inset-0 opacity-[0.05]"
                      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                    {MAP_NODES.map((pos, i) => (
                      <span key={i} className="absolute" style={{ left: pos.x, top: pos.y }}>
                        <span className="relative inline-flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8855A] opacity-25"
                            style={{ animationDelay: `${i*0.5}s` }} />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8855A] opacity-60" />
                        </span>
                      </span>
                    ))}
                    {/* Center label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#0C0C0E]/90 backdrop-blur-sm border border-white/[0.06] rounded-lg px-4 py-2.5 text-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#E8855A]/50 mx-auto mb-1.5">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-white/25 leading-relaxed">
                          Interactive global action<br />map will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Top countries */}
                  <div className="px-4 pb-4 grid grid-cols-2 gap-1.5">
                    {[{country:'Nigeria',count:142},{country:'Kenya',count:98},{country:'Thailand',count:76},{country:'Brazil',count:64}].map((c) => (
                      <div key={c.country} className="flex items-center justify-between bg-[#0A0A0C] border border-white/[0.05] rounded-lg px-3 py-2">
                        <span className="text-[11px] text-white/40">{c.country}</span>
                        <span className="font-mono text-[11px] text-[#E8855A]/70">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </DashPanel>

                {/* Protocol Health panel */}
                <DashPanel
                  title="Protocol Health"
                  subtitle="Real-time system status"
                  badge={
                    <div className="flex items-center gap-1.5">
                      <LiveDot color="#4ECAA0" />
                      <span className="font-mono text-[10px] text-[#4ECAA0]">Healthy</span>
                    </div>
                  }
                >
                  <div className="px-5 py-1">
                    <HealthRow label="Network Status"     value="Active"     status="ok"   />
                    <HealthRow label="Validators Online"  value="54 / 54"    status="ok"   />
                    <HealthRow label="Verification Queue" value="12 pending" status="warn" />
                    <HealthRow label="Last Block"         value="#481,920"   status="ok"   />
                    <HealthRow label="API"                value="Nominal"    status="ok"   />
                  </div>
                  {/* Sparkline chart */}
                  <div className="mx-5 mb-4 mt-2 bg-[#0A0A0C] border border-white/[0.05] rounded-xl p-3">
                    <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 mb-2.5">
                      Verifications / 12h
                    </p>
                    <Sparkline />
                    <div className="flex justify-between mt-1.5">
                      <span className="font-mono text-[9px] text-white/20">12h ago</span>
                      <span className="font-mono text-[9px] text-[#E8855A]/60">+67 now</span>
                    </div>
                  </div>
                </DashPanel>

              </div>{/* /right col */}
            </div>{/* /row 2 grid */}
          </div>{/* /dashReveal */}

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — ENTER THE PORTAL
      ══════════════════════════════════════════════ */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="relative rounded-3xl border border-white/[0.07] bg-[#0E0E0F] overflow-hidden px-8 py-20 text-center">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 40%, rgba(232,133,90,0.07), transparent 65%)' }} />
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
              <div className="relative">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-5 block">Portal Access</span>
                <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.05] tracking-tight text-white mb-5 max-w-lg mx-auto">
                  Enter the PORA Portal
                </h2>
                <p className="text-[16px] text-white/40 max-w-md mx-auto mb-10 font-light leading-relaxed">
                  Connect your wallet, submit verified actions, validate events, or simply explore the global record. Participation is open to everyone.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {['Participant','Validator','Organization','Observer'].map((role) => (
                    <span key={role} className="px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] font-mono text-[11px] tracking-wide text-white/40">
                      {role}
                    </span>
                  ))}
                </div>
                <Button href="/portal" variant="primary" className="px-10 py-3.5 text-[15px]">
                  Open Portal
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
