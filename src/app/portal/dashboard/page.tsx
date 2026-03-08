import type { Metadata } from 'next'
import { StatItem } from '@/components/ui'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Dashboard' }

// In production: data fetched server-side based on wallet address
const MOCK_ACTIONS = [
  { id: 'poe_0x3f8a',  type: 'Proof of Eat',  date: '2024-01-14', meals: 320, status: 'verified' },
  { id: 'poe_0xd12b',  type: 'Proof of Eat',  date: '2024-01-10', meals: 180, status: 'verified' },
  { id: 'poe_0x71ca',  type: 'Proof of Eat',  date: '2024-01-06', meals: 540, status: 'pending'  },
]

export default function ParticipantDashboard() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[24px] font-bold text-ink-primary mb-1">Dashboard</h1>
          <p className="font-mono-pora text-[11px] text-ink-tertiary">0x3f8a...2c9e</p>
        </div>
        <Button href="#" variant="primary">Submit New Action +</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border border-white/[0.07] rounded-xl overflow-hidden divide-x divide-white/[0.07] mb-6">
        <StatItem num="12" label="Actions Submitted" />
        <StatItem num="10" label="Verified" />
        <StatItem num="3,840" label="Total Meals" />
      </div>

      {/* Prompt card */}
      <div className="bg-surface border border-amber/30 rounded-xl p-5 flex items-center justify-between mb-6">
        <div>
          <p className="text-[14px] font-semibold text-ink-primary mb-1">Submit a new Proof of Eat event</p>
          <p className="text-[13px] text-ink-secondary">Upload evidence of a real feeding event to add it to the protocol.</p>
        </div>
        <Button href="#" variant="outline" size="sm">Submit Action</Button>
      </div>

      {/* Actions table */}
      <div className="bg-surface border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.07] bg-surface-2">
          <p className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">
            Recent Submissions
          </p>
        </div>
        <div className="divide-y divide-white/[0.07]">
          {/* Header row */}
          <div className="grid grid-cols-5 px-5 py-2.5 bg-surface-3">
            {['ID', 'Type', 'Date', 'Meals', 'Status'].map((h) => (
              <span key={h} className="font-mono-pora text-[10px] tracking-[0.08em] uppercase text-ink-tertiary">
                {h}
              </span>
            ))}
          </div>
          {MOCK_ACTIONS.map((action) => (
            <div key={action.id} className="grid grid-cols-5 px-5 py-4 hover:bg-surface-2 transition-colors">
              <span className="font-mono-pora text-[12px] text-ink-secondary">{action.id}</span>
              <span className="text-[13px] text-ink-secondary">{action.type}</span>
              <span className="font-mono-pora text-[12px] text-ink-tertiary">{action.date}</span>
              <span className="font-mono-pora text-[12px] text-amber">{action.meals}</span>
              <span className={`font-mono-pora text-[11px] uppercase tracking-[0.06em] ${
                action.status === 'verified' ? 'text-green' : 'text-ink-tertiary'
              }`}>
                {action.status === 'verified' ? '✓ ' : '○ '}{action.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
