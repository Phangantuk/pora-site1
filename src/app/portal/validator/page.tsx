import type { Metadata } from 'next'
import { StatItem } from '@/components/ui'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Validator Dashboard' }

const PENDING = [
  {
    id:       'poe_0x3f8a2c9e',
    org:      'Community Kitchen Lagos',
    location: 'Lagos, Nigeria',
    meals:    320,
    submitted:'2024-01-14',
    evidence: 3,
  },
  {
    id:       'poe_0xd12b8f01',
    org:      'Shelter Canteen Karachi',
    location: 'Karachi, Pakistan',
    meals:    180,
    submitted:'2024-01-14',
    evidence: 2,
  },
  {
    id:       'poe_0x71ca4d55',
    org:      'Food Aid Nairobi',
    location: 'Nairobi, Kenya',
    meals:    540,
    submitted:'2024-01-13',
    evidence: 4,
  },
]

export default function ValidatorDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-[24px] font-bold text-ink-primary mb-1">Validator Dashboard</h1>
        <p className="font-mono-pora text-[11px] text-ink-tertiary">validator_0x9f…</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border border-white/[0.07] rounded-xl overflow-hidden divide-x divide-white/[0.07] mb-6">
        <StatItem num="7" label="Pending Review" />
        <StatItem num="248" label="Total Verified" />
        <StatItem num="99.2%" label="Approval Rate" />
      </div>

      {/* Pending queue */}
      <div className="bg-surface border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.07] bg-surface-2 flex items-center justify-between">
          <p className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">
            Pending Verifications
          </p>
          <span className="w-5 h-5 rounded-full bg-amber text-[#0D0805] flex items-center justify-center font-mono-pora text-[10px] font-bold">
            7
          </span>
        </div>

        <div className="divide-y divide-white/[0.07]">
          {PENDING.map((item) => (
            <div key={item.id} className="p-5 flex items-start gap-4">
              {/* Thumbnail placeholder */}
              <div className="w-12 h-12 rounded-lg bg-surface-3 border border-white/[0.07] shrink-0 flex items-center justify-center text-2xl">
                🍽
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-[14px] font-semibold text-ink-primary mb-0.5">{item.org}</p>
                <p className="text-[13px] text-ink-secondary mb-2">
                  {item.location} · {item.meals} meals · {item.evidence} evidence files
                </p>
                <div className="flex gap-3">
                  <span className="font-mono-pora text-[11px] text-ink-tertiary">{item.id}</span>
                  <span className="font-mono-pora text-[11px] text-ink-tertiary">Submitted {item.submitted}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="sm">Reject</Button>
                <Button variant="primary" size="sm">Approve ✓</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
