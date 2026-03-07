import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'

const FOOTER_LINKS = {
  Protocol: [
    { label: 'Overview',      href: '/protocol' },
    { label: 'Use Cases',     href: '/use-cases' },
    { label: 'Proof of Eat',  href: '/proof-of-eat' },
    { label: 'Network',       href: '/network' },
  ],
  Portal: [
    { label: 'Enter Portal',   href: '/portal' },
    { label: 'Transparency',   href: '/transparency' },
    { label: 'Validator Access', href: '/portal/validator' },
    { label: 'Organizations',  href: '/portal/org' },
  ],
  Developers: [
    { label: 'Documentation', href: '/developers' },
    { label: 'API Reference', href: '/developers#api' },
    { label: 'SDK',           href: '/developers#sdk' },
    { label: 'About',         href: '/about' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-12 pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 no-underline w-fit">
              <LogoMark />
              <span className="font-display text-[15px] font-bold text-ink-primary">PORA</span>
            </Link>
            <p className="text-[13px] text-ink-tertiary leading-relaxed max-w-[220px]">
              Proof of Real Action — open infrastructure for verifiable real-world impact.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h5 className="font-mono-pora text-2xs tracking-widest2 uppercase text-ink-tertiary mb-4">
                {category}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-pora text-[11px] text-ink-tertiary">
            © 2024 PORA Protocol Foundation. Open source.
          </p>
          <p className="font-mono-pora text-[11px] text-amber/60">
            Proof of Real Action
          </p>
        </div>

      </div>
    </footer>
  )
}
