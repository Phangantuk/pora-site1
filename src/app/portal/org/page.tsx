import type { Metadata } from 'next'
import { StatItem } from '@/components/ui'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Organization Dashboard' }

const TEAM = [
  { name: 'Amara Diallo',    role: 'Admin',       actions: 48 },
  { name: 'Chen Wei',        role: 'Participant',  actions: 32 },
  { name: 'Fatima Al-Rashid', role: 'Participant', actions: 21 },
]

export default function OrgDashboard() {
  return (
    <div className="p-8">
      {/* Org header */}
      <div className="bg-surface border border-white/[0.07] rounded-xl p-5 flex items-center gap-4 mb-8">
        <div className="w-11 h-11 rounded-xl bg-amber-dim border border-amber/30 flex items-center justify-center text-xl shrink-0">
          🏢
        </div>
        <div className="flex-1">
          <h1 className="font-display text-[20px] font-bold text-ink-primary">Community Aid Foundation</h1>
          <p className="font-mono-pora text-[11px] text-ink-tertiary">org_0xd12b…8f01 · Verified Organization</p>
        </div>
        <Button href="#" variant="ghost" size="sm">Edit Profile</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 border border-white/[0.07] rounded-xl overflow-hidden divide-x divide-white/[0.07] mb-6">
        <StatItem num="142" label="Total Actions" />
        <StatItem num="48.2K" label="Meals Verified" />
        <StatItem num="8" label="Team Members" />
        <StatItem num="12" label="Countries" />
      </div>

      {/* Chart + Team */}
      <div className="grid grid-cols-3 gap-4">
        {/* Activity chart placeholder */}
        <div className="col-span-2 bg-surface border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.07] bg-surface-2">
            <p className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">
              Monthly Activity
            </p>
          </div>
          <div className="p-5">
            <div className="bg-surface-3 rounded-lg h-32 flex items-center justify-center">
              <p className="font-mono-pora text-[10px] text-ink-tertiary tracking-[0.1em] uppercase">
                Activity Chart
              </p>
            </div>
          </div>
        </div>

        {/* Team list */}
        <div className="bg-surface border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.07] bg-surface-2 flex items-center justify-between">
            <p className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">Team</p>
            <Button href="#" variant="ghost" size="sm">+ Add</Button>
          </div>
          <div className="divide-y divide-white/[0.07]">
            {TEAM.map((member) => (
              <div key={member.name} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-surface-3 flex items-center justify-center text-[14px] shrink-0">
                  👤
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-ink-primary truncate">{member.name}</p>
                  <p className="font-mono-pora text-[10px] text-ink-tertiary">{member.role}</p>
                </div>
                <span className="font-mono-pora text-[11px] text-amber">{member.actions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
