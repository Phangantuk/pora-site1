import Link from 'next/link'
import { SectionHeader, StatItem, Badge, Card } from '@/components/ui'

// ─── How It Works ─────────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    num:   '01 — Real Action',
    title: 'The Event Occurs',
    body:  'A participant performs a verified real-world humanitarian action — meal distribution, shelter provision, medical assistance, or educational support — documented with supporting evidence.',
  },
  {
    num:   '02 — Verification',
    title: 'Validators Confirm',
    body:  'An independent network of validators reviews the submitted evidence. They apply protocol standards to confirm the legitimacy, scale, and quality of the action before it proceeds to the record layer.',
  },
  {
    num:   '03 — Protocol Record',
    title: 'Permanent & Public',
    body:  'Once validated, the event becomes a permanent protocol record. It is publicly accessible, cryptographically verifiable, and contributes to a transparent global ledger of real-world impact.',
  },
]

export function HowItWorks() {
  return (
    <section className="px-12 py-24 max-w-[1200px] mx-auto">
      <SectionHeader
        tag="How it works"
        title="From action to permanent record"
        subtitle="Three steps transform a real-world event into a verified, transparent protocol record accessible to anyone."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border border-white/[0.07] rounded-2xl overflow-hidden divide-x divide-white/[0.07]">
        {HOW_STEPS.map((step) => (
          <div
            key={step.num}
            className="bg-surface hover:bg-surface-2 transition-colors p-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono-pora text-[11px] tracking-[0.1em] text-amber">
                {step.num}
              </span>
              <div className="flex-1 h-px bg-amber/20" />
            </div>
            <h3 className="font-display text-[20px] font-bold text-ink-primary mb-3">
              {step.title}
            </h3>
            <p className="text-[14px] text-ink-secondary leading-[1.65]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const STATS = [
  { num: '12', suffix: 'K+', label: 'Verified Actions' },
  { num: '840', suffix: 'K', label: 'Meals Recorded' },
  { num: '28',  suffix: '',  label: 'Countries' },
  { num: '140', suffix: '+', label: 'Organizations' },
]

export function StatsBar() {
  return (
    <div className="border-t border-b border-white/[0.07] bg-surface py-12 px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 border border-white/[0.07] rounded-xl overflow-hidden divide-x divide-y divide-white/[0.07]">
        {STATS.map((s) => (
          <StatItem key={s.label} num={s.num} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </div>
  )
}

// ─── Use Cases Preview ────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon:    '🍽',
    badge:   'live' as const,
    badgeTxt:'Live — First Implementation',
    title:   'Proof of Eat',
    desc:    'The first production implementation of the PORA protocol. Records and verifies real-world feeding events — meals served to people in need.',
    href:    '/proof-of-eat',
    accent:  true,
  },
  {
    icon:    '🏠',
    badge:   'planned' as const,
    badgeTxt:'Planned',
    title:   'Proof of Shelter',
    desc:    'Verification of shelter provision events — nights of emergency housing and displacement support.',
    href:    '/use-cases',
    accent:  false,
  },
  {
    icon:    '💊',
    badge:   'planned' as const,
    badgeTxt:'Planned',
    title:   'Proof of Medicine',
    desc:    'Recording medical assistance events — consultations, treatments, and essential medicine distribution.',
    href:    '/use-cases',
    accent:  false,
  },
  {
    icon:    '📚',
    badge:   'planned' as const,
    badgeTxt:'Planned',
    title:   'Proof of Education',
    desc:    'Verifying educational support — tutoring sessions, school provision, and training for communities in need.',
    href:    '/use-cases',
    accent:  false,
  },
]

export function UseCasesPreview() {
  return (
    <section className="px-12 py-24 max-w-[1200px] mx-auto">
      <SectionHeader
        tag="Use Cases"
        title="Proof-of-X Implementations"
        subtitle="The PORA protocol is designed to be extended. Any verifiable humanitarian action can become a Proof-of-X module."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
        {USE_CASES.map((uc) => (
          <Card key={uc.title} accent={uc.accent} hover className="p-9">
            <div className="w-11 h-11 rounded-[10px] bg-amber-dim border border-amber/20 flex items-center justify-center text-[20px] mb-5">
              {uc.icon}
            </div>
            <div className="mb-3">
              <Badge variant={uc.badge}>{uc.badgeTxt}</Badge>
            </div>
            <h3 className="font-display text-[22px] font-bold text-ink-primary mb-2.5">{uc.title}</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.65] mb-6">{uc.desc}</p>
            <Link
              href={uc.href}
              className="font-mono-pora text-[12px] text-amber tracking-[0.06em] flex items-center gap-1.5 hover:opacity-80 transition-opacity no-underline"
            >
              {uc.accent ? 'View implementation' : 'Learn more'} →
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
