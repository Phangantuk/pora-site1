'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { clsx } from 'clsx'
import { LogoMark } from '@/components/ui/LogoMark'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'Protocol',      href: '/protocol' },
  { label: 'Use Cases',     href: '/use-cases' },
  { label: 'Proof of Eat',  href: '/proof-of-eat' },
  { label: 'Network',       href: '/network' },
  { label: 'Transparency',  href: '/transparency' },
  { label: 'Developers',    href: '/developers' },
  { label: 'About',         href: '/about' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 h-16',
        'flex items-center justify-between px-12',
        'border-b border-white/[0.07]',
        'bg-black/85 backdrop-blur-xl',
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <LogoMark />
        <span className="font-display text-[15px] font-bold tracking-wide text-ink-primary">
          PORA
        </span>
      </Link>

      {/* Desktop nav links */}
      <nav className="hidden lg:flex items-center gap-0.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'font-body text-[13.5px] px-3.5 py-1.5 rounded-md transition-colors',
              pathname === link.href
                ? 'text-ink-primary bg-white/[0.05]'
                : 'text-ink-secondary hover:text-ink-primary hover:bg-white/[0.05]',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* CTAs */}
      <div className="hidden lg:flex items-center gap-2.5">
        <Button href="/developers" variant="ghost" size="sm">Docs</Button>
        <Button href="/portal" variant="primary" size="sm">Enter Portal →</Button>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden border border-white/[0.07] rounded-md px-2.5 py-1.5 text-ink-secondary"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 border-b border-white/[0.07] p-6 flex flex-col gap-1 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-ink-secondary hover:text-ink-primary py-2.5 px-3 rounded-md hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/[0.07]">
            <Button href="/developers" variant="ghost" size="sm" className="flex-1">Docs</Button>
            <Button href="/portal" variant="primary" size="sm" className="flex-1">Enter Portal →</Button>
          </div>
        </div>
      )}
    </header>
  )
}
