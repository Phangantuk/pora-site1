import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About',
  description: 'Why the PORA protocol exists — mission, philosophy, and vision.',
}

const PRINCIPLES = [
  {
    title: 'Radical transparency',
    desc:  'Every action record, validator decision, and aggregate statistic is permanently public. There are no private impact reports.',
  },
  {
    title: 'Action over speculation',
    desc:  'The protocol creates no tokens, generates no yield, and makes no price promises. Value comes from real-world impact — nothing else.',
  },
  {
    title: 'Open infrastructure',
    desc:  'PORA is a protocol, not a platform. Anyone can build on it, validate on it, or participate in it. The foundation is public.',
  },
  {
    title: 'Minimal by design',
    desc:  'The protocol core is intentionally simple. Complexity lives in implementations. The standard is permanent and stable.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="About"
            title="Why this protocol exists"
            subtitle='PORA is built on a simple conviction: real impact should be legible, permanent, and verifiable by anyone.'
          />
        </div>
      </section>

      {/* Mission + Principles */}
      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-start">

          {/* Mission text */}
          <div className="lg:col-span-3">
            <p className="text-[15px] text-ink-secondary leading-[1.8] mb-5 font-light">
              Billions of humanitarian actions happen every day — meals served, shelter provided, care given, education supported. Most of these actions are invisible. They go unrecorded, or are recorded in siloed, private databases that no one can independently verify.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.8] mb-5 font-light">
              This matters. When impact is invisible, accountability is impossible. Donors cannot verify what their contributions funded. Governments cannot make evidence-based policy. Communities cannot advocate with data. Aid organizations cannot coordinate efficiently.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.8] mb-5 font-light">
              PORA was built to change this. Not by creating a new charity, or a new funding mechanism, or a new token. Simply by providing open infrastructure for recording real-world actions with the same rigor, permanence, and verifiability that blockchain technology brought to financial records.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.8] font-light">
              The protocol is minimal by design. It defines what makes an action verifiable, not what actions to take. It provides the record layer — communities, organizations, and individuals provide the action.
            </p>
          </div>

          {/* Principles */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="bg-surface border border-white/[0.07] rounded-xl p-6"
              >
                <h4 className="font-display text-[15px] font-semibold text-ink-primary mb-2">{p.title}</h4>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-white/[0.07] bg-surface/50 px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[24px] font-bold text-ink-primary mb-10 tracking-tight">Founder</h2>
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 w-fit max-w-[260px]">
            <div className="w-16 h-16 rounded-full bg-surface-3 border border-white/[0.07] flex items-center justify-center text-2xl mb-4">
              👤
            </div>
            <h3 className="font-display text-[17px] font-bold text-ink-primary mb-1">Founder Name</h3>
            <p className="font-mono-pora text-[11px] text-ink-tertiary mb-4">PORA Protocol Foundation</p>
            <p className="text-[13px] text-ink-secondary leading-[1.65]">
              Building open infrastructure for a world where every humanitarian action is counted, verified, and permanently on the record.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
