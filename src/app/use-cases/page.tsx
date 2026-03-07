import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader, Badge, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Use Cases',
  description: 'Explore the Proof-of-X implementations built on the PORA protocol.',
}

const USE_CASES = [
  {
    icon:    '🍽',
    badge:   'live' as const,
    badgeTxt:'Live — First Implementation',
    title:   'Proof of Eat',
    desc:    'The first production implementation of the PORA protocol. Records and verifies real-world feeding events — meals served to people in need — creating a transparent, auditable record of food aid impact.',
    detail:  'Any organization or individual can submit a feeding event with supporting evidence. Once verified, it becomes a permanent protocol record.',
    href:    '/proof-of-eat',
    accent:  true,
  },
  {
    icon:    '🏠',
    badge:   'planned' as const,
    badgeTxt:'Planned',
    title:   'Proof of Shelter',
    desc:    'Verification of shelter provision events — nights of emergency housing, displacement support, and long-term accommodation for vulnerable populations.',
    detail:  'Will support shelters, emergency housing organizations, and displacement response teams.',
    href:    '#',
    accent:  false,
  },
  {
    icon:    '💊',
    badge:   'planned' as const,
    badgeTxt:'Planned',
    title:   'Proof of Medicine',
    desc:    'A protocol module for recording medical assistance events — consultations, treatments, and essential medicine distribution in underserved communities.',
    detail:  'Designed for clinics, mobile health units, and NGO health programs operating in resource-constrained settings.',
    href:    '#',
    accent:  false,
  },
  {
    icon:    '📚',
    badge:   'planned' as const,
    badgeTxt:'Planned',
    title:   'Proof of Education',
    desc:    'Recording and verifying educational support actions — tutoring sessions, school provision, material distribution, and training programs for communities in need.',
    detail:  'Applicable to NGOs, community schools, and volunteer tutoring programs globally.',
    href:    '#',
    accent:  false,
  },
]

export default function UseCasesPage() {
  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="Use Cases"
            title="Proof-of-X Implementations"
            subtitle="The PORA protocol is designed to be extended. Any verifiable humanitarian action can become a Proof-of-X module built on the same verification and record infrastructure."
          />
        </div>
      </section>

      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {USE_CASES.map((uc) => (
            <Card key={uc.title} accent={uc.accent} className="p-9 flex flex-col">
              <div className="w-11 h-11 rounded-[10px] bg-amber-dim border border-amber/20 flex items-center justify-center text-[20px] mb-5">
                {uc.icon}
              </div>
              <Badge variant={uc.badge}>{uc.badgeTxt}</Badge>
              <h3 className="font-display text-[22px] font-bold text-ink-primary mt-3 mb-2.5">
                {uc.title}
              </h3>
              <p className="text-[14px] text-ink-secondary leading-[1.65] mb-4">{uc.desc}</p>
              <p className="text-[13px] text-ink-tertiary leading-[1.6] mb-6 flex-1">{uc.detail}</p>
              {uc.href !== '#' ? (
                <Link
                  href={uc.href}
                  className="font-mono-pora text-[12px] text-amber tracking-[0.06em] flex items-center gap-1.5 hover:opacity-80 transition-opacity no-underline"
                >
                  View implementation →
                </Link>
              ) : (
                <span className="font-mono-pora text-[12px] text-ink-tertiary tracking-[0.06em]">
                  Coming soon
                </span>
              )}
            </Card>
          ))}
        </div>

        {/* Build your own CTA */}
        <div className="mt-10 border border-dashed border-white/[0.14] rounded-2xl p-10 text-center">
          <h3 className="font-display text-[22px] font-bold text-ink-primary mb-3">
            Build a Proof-of-X
          </h3>
          <p className="text-[15px] text-ink-secondary max-w-[520px] mx-auto mb-6 font-light">
            Any verifiable humanitarian action can be a PORA module. The protocol provides the verification and record layer — you define the action standards.
          </p>
          <Link
            href="/developers"
            className="font-mono-pora text-[12px] text-amber tracking-[0.06em] hover:opacity-80 transition-opacity"
          >
            Read the developer docs →
          </Link>
        </div>
      </section>
    </>
  )
}
