import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader, Card } from '@/components/ui'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Portal',
  description: 'Enter the PORA ecosystem — submit actions, verify events, or explore the record.',
}

const ROLES = [
  {
    role:  'Participant',
    title: 'Submit an Action',
    desc:  'Connect a wallet, create a profile, and submit real-world humanitarian actions to the protocol for verification and permanent recording.',
    href:  '/portal/dashboard',
    cta:   'Enter as Participant',
    primary: true,
    actions: [
      'Connect wallet',
      'Create participant profile',
      'Submit action with evidence',
      'Track verification status',
      'View personal impact dashboard',
    ],
  },
  {
    role:  'Validator',
    title: 'Verify Actions',
    desc:  'Join the validator network, review submitted actions, and contribute to the integrity of the global PORA ledger.',
    href:  '/portal/validator',
    cta:   'Enter as Validator',
    primary: false,
    actions: [
      'View pending verifications',
      'Review evidence and metadata',
      'Approve or reject submissions',
      'Track verification history',
      'Monitor network activity',
    ],
  },
  {
    role:  'Organization',
    title: 'Scale Impact',
    desc:  'Onboard your organization, manage team members, and integrate at scale with the PORA protocol.',
    href:  '/portal/org',
    cta:   'Enter as Organization',
    primary: false,
    actions: [
      'Organization profile & verification',
      'Team member management',
      'Bulk action submission',
      'Organization-level analytics',
      'API credential management',
    ],
  },
  {
    role:  'Observer',
    title: 'Explore the Record',
    desc:  'No account required. Access the full public ledger, browse protocol events, and independently verify any record.',
    href:  '/transparency',
    cta:   'Browse the Ledger',
    primary: false,
    actions: [
      'Browse all verified actions',
      'Search by country, org, type',
      'Inspect individual records',
      'Download open datasets',
      'Access live statistics',
    ],
  },
]

export default function PortalPage() {
  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16 text-center">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="Portal"
            title="Enter the ecosystem"
            subtitle="The PORA Portal is the primary web interface for interacting with the protocol — for participants, validators, organizations, and observers."
            center
          />
        </div>
      </section>

      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Card key={role.role} accent={role.primary} className="p-9 flex flex-col">
              <p className="font-mono-pora text-[10px] tracking-[0.12em] uppercase text-amber mb-3">
                Role — {role.role}
              </p>
              <h3 className="font-display text-[20px] font-bold text-ink-primary mb-2.5">{role.title}</h3>
              <p className="text-[14px] text-ink-secondary leading-[1.65] mb-6">{role.desc}</p>

              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {role.actions.map((action) => (
                  <li key={action} className="flex items-center gap-2.5 text-[13px] text-ink-secondary">
                    <span className="w-1 h-1 rounded-full bg-amber shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>

              <Button
                href={role.href}
                variant={role.primary ? 'primary' : 'ghost'}
                className="w-full justify-center"
              >
                {role.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Wallet connect section */}
      <section className="bg-surface/50 border-t border-white/[0.07] px-12 py-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <h3 className="font-display text-[22px] font-bold text-ink-primary mb-3">
            Connect your wallet to get started
          </h3>
          <p className="text-[14px] text-ink-secondary mb-8">
            PORA uses wallet-based identity. No account or email required.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {['MetaMask', 'WalletConnect', 'Coinbase Wallet'].map((wallet) => (
              <button
                key={wallet}
                className="bg-surface border border-white/[0.07] hover:border-white/[0.14] rounded-xl px-6 py-3.5 flex items-center gap-3 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-surface-3" />
                <span className="text-[14px] text-ink-secondary font-medium">{wallet}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
