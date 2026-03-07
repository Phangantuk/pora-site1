'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getT, isValidLang, type Lang } from '@/lib/i18n'

// ─── Utility ──────────────────────────────────────────────────────────────────
function cn(...c: (string | false | undefined | null)[]) { return c.filter(Boolean).join(' ') }

function useCounter(target: number, duration = 1800, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return value
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function Btn({ href, variant='primary', children, className }: {
  href?: string; variant?: 'primary'|'ghost'; children: React.ReactNode; className?: string
}) {
  const base  = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer no-underline'
  const v     = { primary: 'bg-[#E8855A] text-[#0D0805] hover:bg-[#f0966e] hover:shadow-[0_8px_32px_rgba(232,133,90,0.35)] hover:-translate-y-px', ghost: 'border border-white/10 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/[0.04]' }
  if (href) return <Link href={href} className={cn(base, v[variant], className)}>{children}</Link>
  return <button className={cn(base, v[variant], className)}>{children}</button>
}

function LiveDot({ color='#4ECAA0' }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  )
}

function Divider() {
  return <div className="mx-auto max-w-5xl px-6"><div style={{ height:1, background:'linear-gradient(to right, transparent, rgba(232,133,90,0.2), transparent)' }} /></div>
}

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={cn('transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8', className)}>
      {children}
    </div>
  )
}

function StatCard({ label, value, suffix='', started, delay=0 }: { label:string; value:number; suffix?:string; started:boolean; delay?:number }) {
  const [fire, setFire] = useState(false)
  useEffect(() => { if (started) { const t = setTimeout(() => setFire(true), delay); return () => clearTimeout(t) } }, [started, delay])
  const count = useCounter(value, 1600, fire)
  return (
    <div className="relative group rounded-2xl border border-white/[0.07] bg-[#0E0E0F] p-7 overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background:'radial-gradient(circle at 50% 0%, rgba(232,133,90,0.06), transparent 70%)' }} />
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30 mb-3">{label}</p>
      <p className="font-semibold text-[38px] leading-none tracking-tight text-white mb-1">
        {count >= 1000 ? count.toLocaleString() : count}<span className="text-[#E8855A]">{suffix}</span>
      </p>
    </div>
  )
}

function DashStatCard({ icon, label, value, suffix='', trend, started, delay=0 }: {
  icon:React.ReactNode; label:string; value:number; suffix?:string; trend:string; started:boolean; delay?:number
}) {
  const [fire, setFire] = useState(false)
  useEffect(() => { if (started) { const t = setTimeout(() => setFire(true), delay); return () => clearTimeout(t) } }, [started, delay])
  const count = useCounter(value, 1400, fire)
  return (
    <div className="relative group bg-[#0C0C0E] border border-white/[0.07] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.13] hover:-translate-y-0.5">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% -10%, rgba(232,133,90,0.05), transparent 65%)' }} />
      <div className="flex items-start justify-between mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#E8855A]/10 border border-[#E8855A]/20 flex items-center justify-center text-[#E8855A]">{icon}</div>
        <span className="font-mono text-[10px] tracking-wide text-[#4ECAA0] bg-[#4ECAA0]/10 border border-[#4ECAA0]/20 px-2 py-0.5 rounded-md">{trend}</span>
      </div>
      <p className="font-semibold text-[32px] leading-none tracking-tight text-white mb-2">
        {count >= 1000 ? count.toLocaleString() : count}<span className="text-[#E8855A] text-[22px]">{suffix}</span>
      </p>
      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30">{label}</p>
    </div>
  )
}

function FlowStep({ num, title, desc, last=false }: { num:string; title:string; desc:string; last?:boolean }) {
  return (
    <div className="relative flex gap-5">
      {!last && <div className="absolute left-[18px] top-[42px] bottom-0 w-px" style={{ background:'linear-gradient(to bottom, rgba(232,133,90,0.3), transparent)' }} />}
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

function DashPanel({ title, subtitle, badge, children, className }: {
  title:string; subtitle?:string; badge?:React.ReactNode; children:React.ReactNode; className?:string
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

const FEED_EVENTS = [
  { id:1, location:'Bangkok, Thailand',   amount:'24', time:'2m ago',  hash:'0x3f8a…2c9e' },
  { id:2, location:'Nairobi, Kenya',      amount:'18', time:'7m ago',  hash:'0xd12b…8f01' },
  { id:3, location:'Berlin, Germany',     amount:'12', time:'14m ago', hash:'0x71ca…4d55' },
  { id:4, location:'São Paulo, Brazil',   amount:'30', time:'21m ago', hash:'0xaa3f…9b22' },
  { id:5, location:'Lagos, Nigeria',      amount:'42', time:'35m ago', hash:'0x5e7d…3c88' },
  { id:6, location:'Manila, Philippines', amount:'16', time:'48m ago', hash:'0xb2f1…7a04' },
]

const SPARK_DATA = [18,32,24,45,38,52,41,60,47,58,43,67]
const MAP_NODES  = [{x:'15%',y:'45%'},{x:'30%',y:'55%'},{x:'50%',y:'35%'},{x:'65%',y:'50%'},{x:'78%',y:'42%'},{x:'45%',y:'60%'}]

function HealthRow({ label, value, status }: { label:string; value:string; status:'ok'|'warn'|'idle' }) {
  const dots = { ok:'#4ECAA0', warn:'#F5C542', idle:'#7BA7F5' }
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <span className="text-[13px] text-white/45">{label}</span>
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: dots[status] }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: dots[status] }} />
        </span>
        <span className="font-mono text-[12px] text-white/70">{value}</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LangHomePage({ params }: { params: { lang: string } }) {
  const lang = isValidLang(params.lang) ? params.lang as Lang : 'en'
  const t    = getT(lang)
  const h    = t.home
  const lp   = (path: string) => `/${lang}${path}`

  const heroStats = useReveal()
  const dashReveal = useReveal()
  const feedReveal = useReveal()

  return (
    <div className="bg-[#070707] text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{ background:'radial-gradient(circle, rgba(232,133,90,0.07) 0%, transparent 65%)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize:'64px 64px' }} />

        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10" style={{ animation:'fadeUp 0.6s ease forwards', animationDelay:'0.1s', opacity:0 }}>
          <LiveDot />
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#E8855A]">{h.eyebrow}</span>
        </div>

        <h1 className="font-bold leading-[1.04] tracking-tight text-white mb-6 max-w-3xl" style={{ fontSize:'clamp(48px,7vw,82px)', animation:'fadeUp 0.7s ease forwards', animationDelay:'0.2s', opacity:0 }}>
          {h.heroTitle}{' '}
          <span style={{ background:'linear-gradient(135deg,#E8855A 0%,#f0a070 50%,#E8855A 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            {h.heroTitleAccent}
          </span>
        </h1>

        <p className="text-[18px] text-white/50 leading-relaxed max-w-xl mb-10 font-light" style={{ animation:'fadeUp 0.7s ease forwards', animationDelay:'0.35s', opacity:0 }}>
          {h.heroSub}
        </p>

        <div className="flex items-center gap-3 mb-12 flex-wrap justify-center" style={{ animation:'fadeUp 0.7s ease forwards', animationDelay:'0.5s', opacity:0 }}>
          {[h.flowStep1, h.flowStep2, h.flowStep3].map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-[#0E0E0F] border border-white/[0.07] font-mono text-[12px] tracking-wide text-white/70">{step}</span>
              {i < 2 && <span className="text-[#E8855A]/50 text-lg">→</span>}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center" style={{ animation:'fadeUp 0.7s ease forwards', animationDelay:'0.65s', opacity:0 }}>
          <Btn href={lp('/protocol')} variant="primary">
            {h.ctaExplore}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Btn>
          <Btn href={lp('/portal')} variant="ghost">{h.ctaPortal}</Btn>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style={{ animation:'fadeUp 1s ease forwards', animationDelay:'1.2s' }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/60" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase">{h.scroll}</span>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">{h.howTag}</span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white mb-5">{h.howTitle}</h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8 font-light max-w-md">{h.howSub}</p>
                <Btn href={lp('/protocol')} variant="ghost">{h.howCta}</Btn>
              </div>
              <div className="bg-[#0E0E0F] border border-white/[0.07] rounded-2xl p-8">
                <FlowStep num="01" title={h.step1Title} desc={h.step1Desc} />
                <FlowStep num="02" title={h.step2Title} desc={h.step2Desc} />
                <FlowStep num="03" title={h.step3Title} desc={h.step3Desc} last />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── STATS ── */}
      <Divider />
      <section className="py-28 px-6 bg-[#090909]" ref={heroStats.ref}>
        <div className="max-w-5xl mx-auto">
          <div className={cn('transition-all duration-700', heroStats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">{h.statsTag}</span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white">{h.statsTitle}</h2>
              </div>
              <div className="flex items-center gap-2 shrink-0 pb-1"><LiveDot /><span className="font-mono text-[11px] text-[#4ECAA0] tracking-wide">{h.statsLive}</span></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label={h.statVerified}   value={12450} suffix="+"  started={heroStats.visible} delay={0}   />
              <StatCard label={h.statMeals}       value={8920}              started={heroStats.visible} delay={120} />
              <StatCard label={h.statCountries}   value={17}                started={heroStats.visible} delay={240} />
              <StatCard label={h.statValidators}  value={54}                started={heroStats.visible} delay={360} />
            </div>
            <p className="mt-6 font-mono text-[11px] text-white/20 tracking-wide">
              {h.statsFootnote}{' '}
              <Link href={lp('/transparency')} className="text-[#E8855A]/60 hover:text-[#E8855A] transition-colors">{h.statsLink}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── GLOBAL MAP ── */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">{h.globalTag}</span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white max-w-sm">{h.globalTitle}</h2>
              <p className="text-[14px] text-white/40 max-w-xs leading-relaxed font-light">{h.globalSub}</p>
            </div>
            <div className="relative rounded-2xl border border-white/[0.07] bg-[#0C0C0E] overflow-hidden" style={{ height:380 }}>
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize:'48px 48px' }} />
              {[{x:'18%',y:'38%'},{x:'28%',y:'52%'},{x:'45%',y:'30%'},{x:'52%',y:'48%'},{x:'62%',y:'35%'},{x:'73%',y:'55%'},{x:'80%',y:'40%'}].map((p,i)=>(
                <span key={i} className="absolute" style={{ left:p.x, top:p.y }}>
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8855A] opacity-30" style={{ animationDelay:`${i*0.4}s` }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8855A] opacity-70" />
                  </span>
                </span>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-[#0E0E0F]/90 border border-white/[0.07] rounded-xl px-7 py-4 flex flex-col items-center gap-2 backdrop-blur-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#E8855A]/60"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="1.5"/></svg>
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/30">{h.mapLabel}</span>
                  <span className="text-[12px] text-white/20">{h.mapSub}</span>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── PROOF OF MEAL ── */}
      <Divider />
      <section className="py-28 px-6 bg-[#090909]">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="rounded-2xl border border-[#E8855A]/20 bg-[#E8855A]/[0.04] p-8 overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-48 h-48 pointer-events-none" style={{ background:'radial-gradient(circle, rgba(232,133,90,0.12), transparent 70%)' }} />
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A]/60 mb-6">Module 01 — Live</div>
                  {[{loc:'Lagos, Nigeria',n:'+320'},{loc:'Karachi, Pakistan',n:'+180'},{loc:'Nairobi, Kenya',n:'+540'}].map(item=>(
                    <div key={item.loc} className="flex items-center justify-between py-3.5 border-b border-white/[0.06] last:border-0">
                      <div>
                        <p className="text-[13px] text-white/70 mb-0.5">{item.loc}</p>
                        <p className="font-mono text-[10px] text-white/25 tracking-wide">{t.common.verified} · just now</p>
                      </div>
                      <span className="font-mono text-[12px] text-[#E8855A] shrink-0 ml-4">{item.n} meals</span>
                    </div>
                  ))}
                  <div className="mt-5 flex items-center gap-2"><LiveDot /><span className="font-mono text-[11px] text-[#4ECAA0] tracking-wide">Live protocol events</span></div>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8855A]/25 bg-[#E8855A]/10 font-mono text-[10px] tracking-[0.1em] uppercase text-[#E8855A] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]" />{h.porTag}
                </span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white mb-5">{h.porTitle}</h2>
                <p className="text-[15px] text-white/45 leading-relaxed mb-8 font-light">{h.porSub}</p>
                <div className="flex flex-col gap-3 mb-8">
                  {[h.porPoint1,h.porPoint2,h.porPoint3].map(p=>(
                    <div key={p} className="flex items-start gap-3 text-[13.5px] text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8855A]/60 shrink-0 mt-[6px]" />{p}
                    </div>
                  ))}
                </div>
                <Btn href={lp('/proof-of-eat')} variant="primary">{t.common.learnMore}</Btn>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── DASHBOARD ── */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-4 block">{h.dashTag}</span>
                <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.1] tracking-tight text-white">{h.dashTitle}</h2>
              </div>
              <div className="flex items-center gap-3 pb-1">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4ECAA0]/10 border border-[#4ECAA0]/20">
                  <LiveDot /><span className="font-mono text-[10px] text-[#4ECAA0] tracking-wide">{h.dashAllActive}</span>
                </div>
                <Link href={lp('/transparency')} className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors">{h.dashViewFull}</Link>
              </div>
            </div>
          </Section>

          <div ref={dashReveal.ref}>
            {/* Dash stat cards */}
            <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 transition-all duration-700', dashReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <DashStatCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} label={h.statVerified} value={12450} suffix="+" trend="↑ 8.2%" started={dashReveal.visible} delay={0}   />
              <DashStatCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} label={h.statMeals} value={8920} trend="↑ 12%" started={dashReveal.visible} delay={100} />
              <DashStatCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M1 8h14M8 2s-3 2-3 6 3 6 3 6M8 2s3 2 3 6-3 6-3 6" stroke="currentColor" strokeWidth="1.5"/></svg>} label={h.statCountries} value={17} trend="↑ 2 new" started={dashReveal.visible} delay={200} />
              <DashStatCard icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a3 3 0 100 6 3 3 0 000-6zM2 14s0-4 6-4 6 4 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} label={h.statValidators} value={54} trend="↑ 5" started={dashReveal.visible} delay={300} />
            </div>

            {/* Feed + map/health */}
            <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-4 transition-all duration-700 delay-150', dashReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>

              {/* Feed */}
              <div className="lg:col-span-3" ref={feedReveal.ref}>
                <DashPanel title={h.dashFeedTitle} subtitle={h.dashFeedSub} badge={<div className="flex items-center gap-2"><LiveDot /><span className="font-mono text-[10px] text-[#4ECAA0] tracking-wide">{h.dashFeedLive}</span></div>} className="h-full">
                  <div>
                    {FEED_EVENTS.map((ev, i) => {
                      const [show, setShow] = useState(false) // eslint-disable-line
                      useEffect(() => { // eslint-disable-line
                        const t = setTimeout(() => setShow(true), feedReveal.visible ? i * 80 : 99999)
                        return () => clearTimeout(t)
                      }, [feedReveal.visible])
                      return (
                        <div key={ev.id} className={cn('flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-all duration-500', show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3')}>
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[14px] shrink-0" style={{ background:'rgba(232,133,90,0.1)' }}>🍽</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[13px] font-medium text-white/80 truncate">{ev.location}</span>
                              <span className="font-mono text-[10px] px-1.5 py-px rounded shrink-0" style={{ color:'#E8855A', background:'rgba(232,133,90,0.1)' }}>Meal</span>
                            </div>
                            <p className="font-mono text-[10px] text-white/25 tracking-wide">{ev.hash} · {ev.time}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-mono text-[12px] font-medium text-[#E8855A]">+{ev.amount} meals</p>
                            <p className="font-mono text-[9px] text-[#4ECAA0]/60 tracking-wide mt-0.5">{t.common.verifiedShort}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="px-5 py-3 border-t border-white/[0.05]">
                    <Link href={lp('/transparency')} className="font-mono text-[11px] text-white/25 hover:text-[#E8855A] transition-colors tracking-wide">{t.common.viewAll}</Link>
                  </div>
                </DashPanel>
              </div>

              {/* Right col */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <DashPanel title={h.dashMapTitle} subtitle={h.dashMapSub} badge={<span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 border border-white/[0.07] px-2 py-0.5 rounded-md">{t.common.comingSoon}</span>}>
                  <div className="relative m-4 rounded-xl overflow-hidden bg-[#0A0A0C] border border-white/[0.05]" style={{ height:178 }}>
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize:'28px 28px' }} />
                    {MAP_NODES.map((p,i)=>(
                      <span key={i} className="absolute" style={{ left:p.x, top:p.y }}>
                        <span className="relative inline-flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8855A] opacity-25" style={{ animationDelay:`${i*0.5}s` }} />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8855A] opacity-60" />
                        </span>
                      </span>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#0C0C0E]/90 backdrop-blur-sm border border-white/[0.06] rounded-lg px-4 py-2.5 text-center">
                        <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-white/25 leading-relaxed">{h.mapLabel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 grid grid-cols-2 gap-1.5">
                    {[{c:'Nigeria',n:142},{c:'Kenya',n:98},{c:'Thailand',n:76},{c:'Brazil',n:64}].map(r=>(
                      <div key={r.c} className="flex items-center justify-between bg-[#0A0A0C] border border-white/[0.05] rounded-lg px-3 py-2">
                        <span className="text-[11px] text-white/40">{r.c}</span>
                        <span className="font-mono text-[11px] text-[#E8855A]/70">{r.n}</span>
                      </div>
                    ))}
                  </div>
                </DashPanel>

                <DashPanel title={h.dashHealthTitle} subtitle={h.dashHealthSub} badge={<div className="flex items-center gap-1.5"><LiveDot /><span className="font-mono text-[10px] text-[#4ECAA0]">Healthy</span></div>}>
                  <div className="px-5 py-1">
                    <HealthRow label={h.healthNetwork}    value={h.healthActive}     status="ok"   />
                    <HealthRow label={h.healthValidators} value={h.healthOnline}     status="ok"   />
                    <HealthRow label={h.healthQueue}      value={h.healthPending}    status="warn" />
                    <HealthRow label={h.healthBlock}      value="#481,920"           status="ok"   />
                    <HealthRow label={h.healthApi}        value={h.healthNominal}    status="ok"   />
                  </div>
                  <div className="mx-5 mb-4 mt-2 bg-[#0A0A0C] border border-white/[0.05] rounded-xl p-3">
                    <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 mb-2.5">{h.sparkLabel}</p>
                    <div className="flex items-end gap-1 h-10">
                      {SPARK_DATA.map((v,i)=>(
                        <div key={i} className="flex-1 rounded-sm" style={{ height:`${(v/67)*100}%`, background: i===SPARK_DATA.length-1 ? '#E8855A' : `rgba(232,133,90,${0.15+(i/SPARK_DATA.length)*0.3})` }} />
                      ))}
                    </div>
                  </div>
                </DashPanel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTAL CTA ── */}
      <Divider />
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="relative rounded-3xl border border-white/[0.07] bg-[#0E0E0F] overflow-hidden px-8 py-20 text-center">
              <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(circle at 50% 40%, rgba(232,133,90,0.07), transparent 65%)' }} />
              <div className="relative">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#E8855A] mb-5 block">{h.portalTag}</span>
                <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.05] tracking-tight text-white mb-5 max-w-lg mx-auto">{h.portalTitle}</h2>
                <p className="text-[16px] text-white/40 max-w-md mx-auto mb-10 font-light leading-relaxed">{h.portalSub}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {[h.roleParticipant,h.roleValidator,h.roleOrg,h.roleObserver].map(role=>(
                    <span key={role} className="px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] font-mono text-[11px] tracking-wide text-white/40">{role}</span>
                  ))}
                </div>
                <Btn href={lp('/portal')} variant="primary" className="px-10 py-3.5 text-[15px]">
                  {t.common.openPortal}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Btn>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  )
}
