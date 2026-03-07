import { Button } from '@/components/ui/Button'

const FLOW_STEPS = [
  {
    num:   '01',
    title: 'Real Action',
    desc:  'A verifiable real-world humanitarian event occurs — meals served, shelter provided, care given.',
  },
  {
    num:   '02',
    title: 'Verification',
    desc:  'Independent validators review evidence and confirm the action meets protocol standards.',
  },
  {
    num:   '03',
    title: 'Protocol Record',
    desc:  'The verified action becomes a permanent, public, tamper-proof protocol event.',
  },
]

export function HeroSection() {
  return (
    <section className="relative pt-40 pb-30 px-12 max-w-[1200px] mx-auto overflow-hidden">

      {/* Background glow */}
      <div
        aria-hidden
        className="absolute -top-48 -right-48 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,133,90,0.06) 0%, transparent 65%)' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left — copy */}
        <div className="animate-fade-up">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 font-mono-pora text-[11px] tracking-[0.12em] uppercase text-amber border border-amber/25 bg-amber-dim rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
            Infrastructure for Real-World Impact
          </div>

          <h1 className="font-display text-[clamp(42px,5vw,64px)] font-extrabold leading-[1.05] tracking-tight text-ink-primary mb-6">
            Proof of<br />
            <em className="not-italic text-amber">Real Action</em>
          </h1>

          <p className="text-[17px] text-ink-secondary leading-[1.7] max-w-[480px] mb-10 font-light">
            A protocol that connects real-world humanitarian actions with verifiable,
            transparent digital records. Value created from action — not speculation.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="/protocol" variant="primary" size="lg">
              Explore the Protocol →
            </Button>
            <Button href="/portal" variant="ghost" size="lg">
              Enter Portal
            </Button>
          </div>
        </div>

        {/* Right — flow card */}
        <div
          className="hidden lg:block"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-8">
            <p className="font-mono-pora text-[10px] tracking-[0.14em] uppercase text-ink-tertiary mb-7">
              // protocol event flow
            </p>

            <div className="flex flex-col">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.num} className="relative flex gap-4 pb-0">
                  {/* Connector line */}
                  {i < FLOW_STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-[15px] top-[44px] bottom-0 w-px"
                      style={{ background: 'linear-gradient(to bottom, rgba(232,133,90,0.3), transparent)' }}
                    />
                  )}

                  {/* Number badge */}
                  <div className="w-[30px] h-[30px] shrink-0 rounded-lg bg-amber-dim border border-amber/30 flex items-center justify-center font-mono-pora text-[11px] font-medium text-amber">
                    {step.num}
                  </div>

                  {/* Content */}
                  <div className={i < FLOW_STEPS.length - 1 ? 'pb-6' : 'pb-0'}>
                    <h4 className="font-display text-[14px] font-semibold text-ink-primary mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[13px] text-ink-secondary leading-[1.5]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chain visualization */}
            <div className="mt-6 pt-6 border-t border-white/[0.07] flex items-center gap-2 flex-wrap">
              {['Action', '→', 'Verify', '→', 'Validate', '→', 'On-chain'].map((node, i) => (
                <span
                  key={i}
                  className={
                    node === '→'
                      ? 'text-amber/50 text-sm'
                      : i === 0 || i === 2 || i === 4
                      ? 'font-mono-pora text-[11px] text-amber'
                      : 'font-mono-pora text-[11px] text-ink-tertiary'
                  }
                >
                  {node}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
