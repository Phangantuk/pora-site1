import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Network',
  description: 'The global PORA validator and participant network.',
}

const ROLES = [
  {
    num:   'Role 01',
    title: 'Validators',
    body:  'Independent individuals and organizations responsible for reviewing submitted actions and confirming their validity according to protocol standards. Validators form the trust layer of the network.',
  },
  {
    num:   'Role 02',
    title: 'Participants',
    body:  'Anyone who performs and submits a verifiable real-world action. From individual volunteers to large NGOs, any participant can contribute to the global PORA ledger.',
  },
  {
    num:   'Role 03',
    title: 'Organizations',
    body:  'Formal entities — humanitarian organizations, foundations, and aid groups — who operate at scale and integrate directly with the PORA protocol through our API and SDK.',
  },
]

export default function NetworkPage() {
  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="Network"
            title="A global verification network"
            subtitle="PORA operates through a distributed network of validators, participants, and organizations across the world."
          />
        </div>
      </section>

      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        {/* Roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {ROLES.map((role) => (
            <div key={role.num} className="bg-surface border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.14] transition-colors">
              <p className="font-mono-pora text-[10px] tracking-[0.12em] uppercase text-ink-tertiary mb-4">{role.num}</p>
              <h3 className="font-display text-[18px] font-bold text-ink-primary mb-3">{role.title}</h3>
              <p className="text-[13.5px] text-ink-secondary leading-[1.65]">{role.body}</p>
            </div>
          ))}
        </div>

        {/* Scaling + Observer */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-[20px] font-bold text-ink-primary mb-3">How the network scales</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.7]">
              New validators join through an onboarding process. New organizations integrate via the API. New action types are added as Proof-of-X modules. The protocol core remains minimal — only implementations grow.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[20px] font-bold text-ink-primary mb-3">Observer access</h3>
            <p className="text-[14px] text-ink-secondary leading-[1.7]">
              Anyone can observe the network without participating. All protocol records, validator activity, and aggregate statistics are publicly accessible to journalists, researchers, donors, and governments.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
