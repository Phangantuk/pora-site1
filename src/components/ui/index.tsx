// ─── LogoMark ────────────────────────────────────────────────────────────────
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border border-amber rounded-md flex items-center justify-center font-mono-pora text-[10px] font-medium text-amber tracking-[0.05em] shrink-0"
    >
      P
    </div>
  )
}

// ─── GradientLine ────────────────────────────────────────────────────────────
export function GradientLine({ className = 'mx-12' }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        height: 1,
        background: 'linear-gradient(to right, transparent, #E8855A, transparent)',
        opacity: 0.2,
      }}
    />
  )
}

// ─── Badge ───────────────────────────────────────────────────────────────────
type BadgeVariant = 'live' | 'planned' | 'soon'

const badgeStyles: Record<BadgeVariant, string> = {
  live:    'bg-amber/[0.15] text-amber border border-amber/30',
  planned: 'bg-white/[0.06] text-ink-tertiary border border-white/[0.07]',
  soon:    'bg-green-dim text-green border border-green/30',
}

export function Badge({ variant = 'live', children }: { variant?: BadgeVariant; children: React.ReactNode }) {
  return (
    <span className={`inline-block font-mono-pora text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded ${badgeStyles[variant]}`}>
      {children}
    </span>
  )
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  tag:        string
  title:      React.ReactNode
  subtitle?:  string
  center?:    boolean
  maxWidth?:  string
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  center = false,
  maxWidth = '560px',
}: SectionHeaderProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <span className="section-tag">{tag}</span>
      <h2 className="font-display font-bold text-[clamp(30px,3.5vw,44px)] leading-[1.1] tracking-tight text-ink-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[16px] text-ink-secondary leading-relaxed font-light"
          style={{ maxWidth: center ? '600px' : maxWidth, margin: center ? '0 auto' : undefined }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children:   React.ReactNode
  className?: string
  accent?:    boolean
  hover?:     boolean
}

export function Card({ children, className = '', accent = false, hover = false }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border',
        accent
          ? 'border-amber/30 bg-gradient-to-br from-surface to-amber/[0.05]'
          : 'border-white/[0.07] bg-surface',
        hover && 'transition-all duration-200 hover:border-white/[0.14] hover:-translate-y-0.5 cursor-pointer',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

// ─── StatItem ─────────────────────────────────────────────────────────────────
export function StatItem({ num, suffix = '', label }: { num: string; suffix?: string; label: string }) {
  return (
    <div className="bg-surface border border-white/[0.07] p-8 text-center">
      <div className="font-display text-[36px] font-extrabold leading-none tracking-tight text-ink-primary mb-2">
        {num}<span className="text-amber">{suffix}</span>
      </div>
      <div className="font-mono-pora text-[11px] tracking-[0.1em] uppercase text-ink-tertiary">
        {label}
      </div>
    </div>
  )
}
