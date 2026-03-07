import type { Metadata } from 'next'
import { SectionHeader, StatItem, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Proof of Eat',
  description: 'The first live PORA module — verifying real-world feeding events globally.',
}

const STATS = [
  { num: '840K', suffix: '', label: 'Meals Verified' },
  { num: '6,200', suffix: '', label: 'Events Recorded' },
  { num: '28',   suffix: '', label: 'Countries' },
  { num: '140+', suffix: '', label: 'Organizations' },
]

// In production this would be fetched from the API
const RECENT_EVENTS = [
  { location: 'Community Kitchen — Lagos, Nigeria',       hash: '0x3f8a...2c9e', meals: '+320 meals', time: '2h ago' },
  { location: 'Shelter Canteen — Karachi, Pakistan',      hash: '0xd12b...8f01', meals: '+180 meals', time: '5h ago' },
  { location: 'Food Aid Distribution — Nairobi, Kenya',   hash: '0x71ca...4d55', meals: '+540 meals', time: '8h ago' },
  { location: 'Street Feeding Program — Manila, PH',      hash: '0xaa3f...9b22', meals: '+210 meals', time: '12h ago' },
  { location: 'Relief Kitchen — Istanbul, Turkey',        hash: '0x5e7d...3c88', meals: '+460 meals', time: '16h ago' },
]

const VERIFICATION_STEPS = [
  {
    num:   '01',
    title: 'Submit Event',
    desc:  'A participant logs a feeding event through the PORA portal, uploading date, location, meal count, and photographic evidence.',
  },
  {
    num:   '02',
    title: 'Validator Review',
    desc:  'Two independent validators review the submission against the Proof of Eat standards. Both must approve for the event to proceed.',
  },
  {
    num:   '03',
    title: 'Protocol Record',
    desc:  'Approved events are written to the PORA record layer. The record is permanent, public, and queryable via the API.',
  },
]

export default function ProofOfEatPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-tag mb-0">First Implementation</span>
            <Badge variant="live">Live</Badge>
          </div>
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.05] tracking-tight text-ink-primary mb-4">
            Proof of Eat
          </h1>
          <p className="text-[16px] text-ink-secondary max-w-[600px] font-light leading-relaxed">
            The first live PORA module. Every meal distribution event is submitted, verified, and permanently recorded on the protocol.
          </p>
        </div>
      </section>

      {/* Main content + live feed */}
      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-5 font-light">
              Proof of Eat verifies real-world feeding events. An organization or individual serves meals to people in need, documents the event with evidence, and submits it to the PORA protocol for verification.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-5 font-light">
              Independent validators review the submission. Once confirmed, the feeding event becomes a permanent, public protocol record — including the date, location, number of meals, and the organization responsible.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-8 font-light">
              Anyone can participate — from large NGOs to local community kitchens. The protocol is open, permissionless, and designed to scale globally.
            </p>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 border border-white/[0.07] rounded-2xl overflow-hidden divide-x divide-y divide-white/[0.07]">
              {STATS.map((s) => (
                <StatItem key={s.label} num={s.num} label={s.label} />
              ))}
            </div>
          </div>

          {/* Right — live feed */}
          <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.07] bg-surface-2 flex items-center justify-between">
              <span className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">
                Recent Protocol Events
              </span>
              <span className="flex items-center gap-1.5 font-mono-pora text-[10px] text-green">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
                Live
              </span>
            </div>
            {RECENT_EVENTS.map((ev) => (
              <div
                key={ev.hash}
                className="px-6 py-4 border-b border-white/[0.07] last:border-0 flex items-center justify-between"
              >
                <div>
                  <p className="text-[13px] text-ink-secondary mb-1">{ev.location}</p>
                  <p className="font-mono-pora text-[11px] text-ink-tertiary">{ev.hash} · Verified · {ev.time}</p>
                </div>
                <span className="font-mono-pora text-[12px] text-amber shrink-0 ml-4">{ev.meals}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How verification works */}
      <section className="bg-surface/50 border-t border-white/[0.07] px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[28px] font-bold text-ink-primary mb-12 tracking-tight">
            How verification works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERIFICATION_STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-surface border border-white/[0.07] rounded-xl p-7"
              >
                <div className="w-[30px] h-[30px] rounded-lg bg-amber-dim border border-amber/30 flex items-center justify-center font-mono-pora text-[11px] text-amber mb-4">
                  {step.num}
                </div>
                <h4 className="font-display text-[17px] font-bold text-ink-primary mb-2.5">{step.title}</h4>
                <p className="text-[13.5px] text-ink-secondary leading-[1.65]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
