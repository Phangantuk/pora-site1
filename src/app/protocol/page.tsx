import type { Metadata } from 'next'
import { SectionHeader, Card } from '@/components/ui'
import { GradientLine } from '@/components/ui/GradientLine'

export const metadata: Metadata = {
  title: 'Protocol',
  description: 'Learn how the Proof of Real Action protocol works — from action submission to permanent on-chain record.',
}

const COMPONENTS = [
  {
    name: 'Actions',
    desc: 'Real-world humanitarian events submitted by participants with supporting evidence.',
  },
  {
    name: 'Verification',
    desc: 'The review process that confirms an action meets protocol standards before recording.',
  },
  {
    name: 'Validators',
    desc: 'Independent participants who review evidence and approve or reject submitted actions.',
  },
  {
    name: 'Protocol Record',
    desc: 'A permanent, public, tamper-proof entry in the PORA global ledger for each verified action.',
  },
]

const ARCH_LAYERS = [
  { label: 'PARTICIPANT LAYER',  sub: 'Action submission & evidence upload' },
  { label: 'VERIFICATION LAYER', sub: 'Validator network review & consensus' },
  { label: 'PROTOCOL LAYER',     sub: 'Core PORA record standards & logic' },
  { label: 'RECORD LAYER',       sub: 'Permanent on-chain protocol events', accent: true },
]

export default function ProtocolPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16 max-w-none">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="Protocol"
            title="What is Proof of Real Action"
            subtitle="PORA is infrastructure for turning real-world humanitarian events into verifiable, transparent digital records — creating value from action."
          />
        </div>
      </section>

      {/* Main content */}
      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Text + component list */}
          <div>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-5 font-light">
              Traditional digital systems track activity — but rarely verify real-world impact. PORA is a protocol layer that bridges this gap. It provides a structured, verifiable, and transparent way to record that a real action occurred, was validated, and is now permanently part of the public record.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-5 font-light">
              The protocol does not create value through speculation. It creates value by making real-world impact legible, auditable, and permanent. Any organization, individual, or system that performs verifiable humanitarian actions can participate.
            </p>
            <p className="text-[15px] text-ink-secondary leading-[1.75] mb-8 font-light">
              The design is intentionally minimal. PORA defines what makes an action valid, how it is verified, and how it is recorded. Everything else is left to implementations — which we call <span className="inline-tag">Proof-of-X</span> modules.
            </p>

            {/* Component list */}
            <div className="rounded-xl border border-white/[0.07] overflow-hidden divide-y divide-white/[0.07]">
              {COMPONENTS.map((c) => (
                <div
                  key={c.name}
                  className="bg-surface hover:bg-surface-2 transition-colors px-6 py-5 flex items-center gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-amber shrink-0" />
                  <span className="font-display text-[14px] font-semibold text-ink-primary w-36 shrink-0">
                    {c.name}
                  </span>
                  <span className="text-[13px] text-ink-secondary">{c.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture diagram */}
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-9">
            <p className="font-mono-pora text-[10px] tracking-[0.14em] uppercase text-ink-tertiary mb-6">
              // system architecture
            </p>

            <div className="flex flex-col gap-1">
              {ARCH_LAYERS.map((layer, i) => (
                <div key={layer.label}>
                  <div
                    className={`rounded-lg border px-4 py-3.5 ${
                      layer.accent
                        ? 'border-amber/30 bg-amber-dim'
                        : 'border-white/[0.07] bg-surface-2'
                    }`}
                  >
                    <p className={`font-mono-pora text-[11px] tracking-[0.08em] mb-1 ${layer.accent ? 'text-amber' : 'text-ink-tertiary'}`}>
                      {layer.label}
                    </p>
                    <p className="text-[12px] text-ink-tertiary">{layer.sub}</p>
                  </div>
                  {i < ARCH_LAYERS.length - 1 && (
                    <p className="text-center text-amber/40 text-lg py-0.5">↓</p>
                  )}
                </div>
              ))}

              {/* Bottom: API / Portal / SDK */}
              <p className="text-center text-amber/40 text-lg py-0.5">↓</p>
              <div className="grid grid-cols-3 gap-2">
                {['API', 'Portal', 'SDK'].map((item) => (
                  <div
                    key={item}
                    className="bg-surface-2 border border-white/[0.07] rounded-lg px-3 py-3 text-center"
                  >
                    <p className="font-mono-pora text-[11px] text-ink-tertiary mb-1">{item}</p>
                    <p className="text-[11px] text-ink-tertiary opacity-60">
                      {item === 'API' ? 'Public access' : item === 'Portal' ? 'Web interface' : 'Dev integration'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
