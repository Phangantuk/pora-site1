import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Transparency',
  description: 'The PORA public ledger — every verified action, open to anyone.',
}

// In production: fetched from API
const PUBLIC_STATS = [
  { key: 'total_verified_actions',   value: '12,481' },
  { key: 'total_meals_recorded',     value: '840,320' },
  { key: 'countries_active',         value: '28' },
  { key: 'organizations_onboarded',  value: '142' },
  { key: 'active_validators',        value: '89' },
  { key: 'last_block_recorded',      value: '#481,920' },
]

const VALIDATOR_ACTIVITY = [
  { id: 'validator_0x3a…', status: 'approved', time: '2m ago',  ok: true },
  { id: 'validator_0x9f…', status: 'approved', time: '8m ago',  ok: true },
  { id: 'validator_0x1d…', status: 'approved', time: '14m ago', ok: true },
  { id: 'validator_0xb7…', status: 'rejected', time: '21m ago', ok: false },
]

export default function TransparencyPage() {
  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="Transparency"
            title="Everything is public"
            subtitle="Transparency is not a feature — it is the foundation of the protocol. Every record is open, every validator action is logged, every statistic is verifiable."
          />
        </div>
      </section>

      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Public ledger */}
            <div>
              <p className="font-mono-pora text-[10px] tracking-[0.12em] uppercase text-ink-tertiary mb-5">
                // public ledger · live
              </p>
              <div className="divide-y divide-white/[0.07]">
                {PUBLIC_STATS.map((s) => (
                  <div key={s.key} className="flex items-center justify-between py-4">
                    <span className="font-mono-pora text-[13px] text-ink-secondary">{s.key}</span>
                    <span className="font-mono-pora text-[13px] text-green font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Validator activity */}
            <div>
              <p className="font-mono-pora text-[10px] tracking-[0.12em] uppercase text-ink-tertiary mb-5">
                // recent validator activity
              </p>
              <div className="divide-y divide-white/[0.07]">
                {VALIDATOR_ACTIVITY.map((v) => (
                  <div key={v.id} className="flex items-center justify-between py-4">
                    <span className="font-mono-pora text-[12px] text-ink-secondary">{v.id}</span>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono-pora text-[12px] ${v.ok ? 'text-green' : 'text-red-400'}`}>
                        {v.ok ? '✓' : '✗'} {v.status}
                      </span>
                      <span className="font-mono-pora text-[11px] text-ink-tertiary">{v.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-amber/[0.08] border border-amber/15 rounded-xl">
                <p className="text-[13px] text-ink-secondary leading-[1.65]">
                  All validator decisions, rejection reasons, and record history are permanently stored and publicly queryable via the protocol API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
