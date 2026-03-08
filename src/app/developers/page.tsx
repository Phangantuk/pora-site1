import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Developers',
  description: 'Build on the PORA protocol — API, SDK, and Proof-of-X documentation.',
}

const CODE_EXAMPLE = `// PORA SDK — Submit a verified action
import { PORA } from '@pora/sdk'

const client = new PORA({
  apiKey: process.env.PORA_API_KEY,
  network: 'mainnet'
})

const action = await client.submitAction({
  type: 'proof-of-eat',
  data: {
    meals: 320,
    location: 'Lagos, NG',
    timestamp: Date.now(),
    evidence: [imageHash, metadataHash]
  }
})

console.log(action.recordId)
// → 'poe_0x3f8a2c9e_1706...'`

const FEATURES = [
  {
    title:  'Protocol Overview',
    desc:   'Read the full PORA specification. Understand the record format, verification standards, and event schema before building.',
    status: 'available',
  },
  {
    title:  'REST API',
    desc:   'Query the public PORA record layer. Access verified actions, validator data, and network statistics. Full OpenAPI spec available.',
    status: 'available',
  },
  {
    title:  'JavaScript SDK',
    desc:   'The official @pora/sdk package provides a typed client for submitting actions, querying records, and integrating verification flows.',
    status: 'available',
  },
  {
    title:  'Build a Proof-of-X',
    desc:   'Create a new PORA module for a new type of humanitarian action. The protocol provides the verification and record layer — you define the action standards.',
    status: 'available',
  },
  {
    title:  'Webhooks',
    desc:   'Subscribe to protocol events in real time. Receive notifications when actions in your namespace are verified, rejected, or updated.',
    status: 'planned',
  },
]

const DOC_SECTIONS = [
  { title: 'Getting Started', desc: 'Install the SDK and make your first API call in under 5 minutes.' },
  { title: 'API Reference',   desc: 'Full OpenAPI documentation for all public endpoints.' },
  { title: 'SDK Reference',   desc: 'TypeScript/JavaScript client library documentation.' },
  { title: 'Proof-of-X Guide', desc: 'How to build a new protocol module. Schema, validation, and record format.', planned: true },
]

export default function DevelopersPage() {
  return (
    <>
      <section className="bg-surface/50 border-b border-white/[0.07] px-12 pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            tag="Developers"
            title="Build on PORA"
            subtitle="The PORA protocol is open. Developers can interact with the record layer, integrate the verification system, and build new Proof-of-X implementations."
          />
        </div>
      </section>

      {/* Code + checklist */}
      <section className="px-12 py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Code block */}
          <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-[#0A0A0C]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.07]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="font-mono-pora text-[11px] text-ink-tertiary ml-2">submit-action.js</span>
            </div>
            <pre className="p-6 font-mono-pora text-[13px] leading-[1.8] overflow-x-auto text-ink-secondary whitespace-pre">
              {CODE_EXAMPLE}
            </pre>
          </div>

          {/* Feature checklist */}
          <div className="divide-y divide-white/[0.07]">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4 py-5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  f.status === 'available'
                    ? 'bg-green-dim border border-green/30 text-green text-[10px]'
                    : 'bg-surface-3 border border-white/[0.07] text-ink-tertiary text-[10px]'
                }`}>
                  {f.status === 'available' ? '✓' : '○'}
                </div>
                <div>
                  <p className={`font-display text-[14px] font-semibold mb-1 ${f.status === 'available' ? 'text-ink-primary' : 'text-ink-secondary'}`}>
                    {f.title}
                    {f.status === 'planned' && (
                      <span className="font-mono-pora text-[10px] text-ink-tertiary font-normal ml-2 tracking-[0.06em]">
                        — Planned
                      </span>
                    )}
                  </p>
                  <p className="text-[13.5px] text-ink-secondary leading-[1.65]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doc navigation */}
      <section className="bg-surface/50 border-t border-white/[0.07] px-12 py-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-[22px] font-bold text-ink-primary mb-8">Documentation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOC_SECTIONS.map((doc) => (
              <div
                key={doc.title}
                className={`bg-surface rounded-xl p-6 ${
                  doc.planned
                    ? 'border border-dashed border-white/[0.14] opacity-60'
                    : 'border border-white/[0.07] hover:border-white/[0.14] transition-colors cursor-pointer'
                }`}
              >
                <h4 className="font-display text-[15px] font-semibold text-ink-primary mb-2">{doc.title}</h4>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
