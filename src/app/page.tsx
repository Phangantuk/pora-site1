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
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Button ───────────────────────────────────────────────────────────────────
function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className,
}: {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  children: React.ReactNode
  className?: string
}) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer'
  const styles = {
    primary:
      'bg-[#E8855A] text-[#0D0805] hover:bg-[#f0966e] hover:shadow-[0_8px_32px_rgba(232,133,90,0.35)] hover:-translate-y-px active:translate-y-0',
    ghost:
      'border border-white/10 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/[0.04]',
  }
  const cls = cn(base, styles[variant], className)
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button onClick={onClick} className={cls}>{children}</button>
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  suffix = '',
  started,
  delay = 0,
}: {
  label: string
  value: number
  suffix?: string
  started: boolean
  delay?: number
}) {
  const [fire, setFire] = useState(false)
  useEffect(() => {
    if (started) { const t = setTimeout(() => setFire(true), delay); return () => clearTimeout(t) }
  }, [started, delay])
  const count = useCounter(value, 1600, fire)
  const display = count >= 1000 ? count.toLocaleString() : count.toString()

  return (
    <div className="relative group rounded-2xl border border-white/[0.07] bg-[#0E0E0F] p-7 overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5">
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(232,133,90,0.06), transparent 70%)' }} />

      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30 mb-3">{label}</p>
      <p className="font-semibold text-[38px] leading-none tracking-tight text-white mb-1">
        {display}<span className="text-[#E8855A]">{suffix}</span>
      </p>
    </div>
  )
}

// ─── Flow step ────────────────────────────────────────────────────────────────
function FlowStep({ num, title, desc, last = false }: {
  num: string; title: string; desc: string; last?: boolean
}) {
  return (
    <div className="relative flex gap-5">
      {/* Line */}
      {!last && (
        <div className="absolute left-[18px] top-[42px] bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(232,133,90,0.3), transparent)' }} />
      )}
      {/* Circle */}
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

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
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
function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ECAA0] opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ECAA0]" />
    </span>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {

  // Stats section reveal trigger
  const statsReveal = useReveal()

  return (
    <div className="bg-[#070707] text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,133,90,0.07) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
            style={{ background: 'radial-gradient(circle, rgba(78,202,160,0.04) 0%, transparent 70%)' }} />
        </div>

        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10"
          style={{ animation: 'fadeUp 0.6s ease forwards', animationDelay: '0.1s', opacity: 0 }}
        >
          <LiveDot />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#E8855A]">
            Protocol Live — First Implementation Active
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.04] tracking-tight text-white mb-6 max-w-3xl"
          style={{
            fontSize: 'clamp(48px, 7vw, 82px)',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.2s',
            opacity: 0,
          }}
        >
          Proof of{' '}
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #E8855A 0%, #f0a070 50%, #E8855A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Real Action
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-[18px] text-white/50 leading-relaxed max-w-xl mb-10 font-light"
          style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.35s', opacity: 0 }}
        >
          A protocol connecting real-world humanitarian actions
          with verifiable, permanent digital records.
        </p>

        {/* Flow chain */}
        <div
          className="flex items-center gap-3 mb-12 flex-wrap justify-center"
          style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.5s', opacity: 0 }}
        >
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
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.65s', opacity: 0 }}
        >
          <Button href="/protocol" variant="primary">
            Explore Protocol
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button href="/portal" variant="ghost">
            Enter Portal
          </Button>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: 'fadeUp 1s ease forwards', animationDelay: '1.2s' }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/60" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <Divider />

      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left — copy */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">
                  How it works
                </span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white mb-5">
                  From action to<br />permanent record
                </h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8 font-light max-w-md">
                  PORA is infrastructure for turning real-world humanitarian events into verifiable, tamper-proof digital records. Any action. Any organization. Anywhere.
                </p>
                <Button href="/protocol" variant="ghost">
                  Read the protocol spec
                </Button>
              </div>

              {/* Right — steps */}
              <div className="bg-[#0E0E0F] border border-white/[0.07] rounded-2xl p-8">
                <FlowStep
                  num="01"
                  title="Real Action Occurs"
                  desc="A participant performs a verifiable humanitarian action — meals distributed, shelter provided, medical assistance given."
                />
                <FlowStep
                  num="02"
                  title="Validators Confirm"
                  desc="Independent validators review submitted evidence against protocol standards before the record proceeds."
                />
                <FlowStep
                  num="03"
                  title="Permanent Record"
                  desc="The verified event is written to the PORA record layer — public, immutable, and queryable by anyone."
                  last
                />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — LIVE NETWORK STATS
      ═══════════════════════════════════════════════════ */}
      <Divider />

      <section className="py-28 px-6 bg-[#090909]" ref={statsReveal.ref}>
        <div className="max-w-5xl mx-auto">
          <div
            className={cn(
              'transition-all duration-700',
              statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">
                  Network Stats
                </span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white">
                  Protocol activity,<br />live and open
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0 pb-1">
                <LiveDot />
                <span className="font-mono text-[11px] text-[#4ECAA0] tracking-wide">Updating live</span>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Verified Actions" value={12450}  suffix="+"  started={statsReveal.visible} delay={0}   />
              <StatCard label="Meals Verified"   value={8920}   suffix=""   started={statsReveal.visible} delay={120} />
              <StatCard label="Countries"        value={17}     suffix=""   started={statsReveal.visible} delay={240} />
              <StatCard label="Validators"       value={54}     suffix=""   started={statsReveal.visible} delay={360} />
            </div>

            {/* Footnote */}
            <p className="mt-6 font-mono text-[11px] text-white/20 tracking-wide">
              All data is publicly verifiable via the PORA protocol API.{' '}
              <Link href="/transparency" className="text-[#E8855A]/60 hover:text-[#E8855A] transition-colors underline-offset-2 hover:underline">
                View full transparency ledger →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — GLOBAL ACTION MAP
      ═══════════════════════════════════════════════════ */}
      <Divider />

      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">
              Global Network
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white max-w-sm">
                Global Network of Real Actions
              </h2>
              <p className="text-[14px] text-white/40 max-w-xs leading-relaxed font-light">
                Verified actions are recorded with location data, building a transparent global ledger of humanitarian impact.
              </p>
            </div>

            {/* Map container */}
            <div className="relative rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden" style={{ height: 380 }}>

              {/* Grid lines to suggest a map */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />

              {/* Fake node dots */}
              {[
                { x: '18%',  y: '38%' },
                { x: '28%',  y: '52%' },
                { x: '45%',  y: '30%' },
                { x: '52%',  y: '48%' },
                { x: '62%',  y: '35%' },
                { x: '73%',  y: '55%' },
                { x: '80%',  y: '40%' },
              ].map((pos, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{ left: pos.x, top: pos.y }}
                >
                  <span
                    className="relative inline-flex h-2.5 w-2.5"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8855A] opacity-30"
                      style={{ animationDelay: `${i * 0.4}s` }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8855A] opacity-70" />
                  </span>
                </span>
              ))}

              {/* Overlay label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="bg-[#0E0E0F]/90 border border-white/[0.07] rounded-xl px-7 py-4 flex flex-col items-center gap-2 backdrop-blur-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#E8855A]/60">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30">
                    Interactive global map — coming soon
                  </span>
                  <span className="text-[12px] text-white/20">Verified actions will appear here in real time</span>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — PROOF OF EAT
      ═══════════════════════════════════════════════════ */}
      <Divider />

      <section className="py-28 px-6 bg-[#090909]">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — visual panel */}
              <div className="relative">
                <div className="rounded-2xl border border-[#E8855A]/20 bg-[#E8855A]/[0.04] p-8 overflow-hidden">
                  {/* Glow */}
                  <div className="absolute -top-20 -left-20 w-48 h-48 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,133,90,0.12), transparent 70%)' }} />

                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A]/60 mb-6">
                    Module 01 — Live
                  </div>

                  {/* Mock feed items */}
                  {[
                    { loc: 'Lagos, Nigeria',    n: '+320 meals' },
                    { loc: 'Karachi, Pakistan', n: '+180 meals' },
                    { loc: 'Nairobi, Kenya',    n: '+540 meals' },
                  ].map((item) => (
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

              {/* Right — text */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10 font-mono text-[10px] tracking-[0.1em] uppercase text-[#E8855A] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]" />
                  First Implementation
                </span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white mb-5">
                  Proof of Eat
                </h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8 font-light">
                  A system that verifies real-world feeding events and records them as permanent protocol actions. From local community kitchens to large-scale aid operations — every meal counts.
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  {[
                    'Submit a feeding event with photographic evidence',
                    'Validators confirm the event meets protocol standards',
                    'Event becomes a permanent, public protocol record',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-[13.5px] text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]/60 shrink-0 mt-[6px]" />
                      {point}
                    </div>
                  ))}
                </div>

                <Button href="/proof-of-eat" variant="primary">
                  Learn More
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — ENTER THE PORTAL
      ═══════════════════════════════════════════════════ */}
      <Divider />

      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="relative rounded-3xl border border-white/[0.07] bg-[#0E0E0F] overflow-hidden px-8 py-20 text-center">

              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 40%, rgba(232,133,90,0.07), transparent 65%)' }} />

              {/* Grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />

              <div className="relative">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-5 block">
                  Portal Access
                </span>
                <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.05] tracking-tight text-white mb-5 max-w-lg mx-auto">
                  Enter the PORA Portal
                </h2>
                <p className="text-[16px] text-white/40 max-w-md mx-auto mb-10 font-light leading-relaxed">
                  Connect your wallet, submit verified actions, validate events, or simply explore the global record. Participation is open to everyone.
                </p>

                {/* Role pills */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {['Participant', 'Validator', 'Organization', 'Observer'].map((role) => (
                    <span
                      key={role}
                      className="px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] font-mono text-[11px] tracking-wide text-white/40"
                    >
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

      {/* ─── Keyframes ─────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
