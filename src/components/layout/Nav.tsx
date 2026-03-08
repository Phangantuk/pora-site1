'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { clsx } from 'clsx'
import { LogoMark }     from '@/components/ui/LogoMark'
import { Button }       from '@/components/ui/Button'
import { LangSwitcher } from '@/components/layout/LangSwitcher'
import { getT, isValidLang, SUPPORTED_LANGS, type Lang } from '@/lib/i18n'

interface NavProps {
  /** Current language — passed from [lang]/layout.tsx */
  lang?: Lang
}

export function Nav({ lang = 'en' }: NavProps) {
  const pathname   = usePathname()
  const [open, setOpen] = useState(false)
  const t          = getT(lang)

  // Prefix a sub-path with the current lang segment
  const lp = (path: string) => `/${lang}${path}`

  // Is the current path active for a given sub-path?
  const isActive = (path: string) => pathname === lp(path)

  const NAV_LINKS = [
    { label: t.nav.protocol,      href: lp('/protocol') },
    { label: t.nav.useCases,      href: lp('/use-cases') },
    { label: t.nav.proofOfMeal,   href: lp('/proof-of-eat') },
    { label: t.nav.network,       href: lp('/network') },
    { label: t.nav.transparency,  href: lp('/transparency') },
    { label: t.nav.futureModules, href: lp('/future') },
    { label: t.nav.developers,    href: lp('/developers') },
    { label: t.nav.about,         href: lp('/about') },
  ]

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 h-16',
        'flex items-center justify-between px-6 lg:px-10',
        'border-b border-white/[0.07]',
        'bg-black/85 backdrop-blur-xl',
      )}
    >
      {/* Logo */}
      <Link href={lp('/')} className="flex items-center gap-2.5 no-underline shrink-0">
        <LogoMark />
        <span className="font-display text-[15px] font-bold tracking-wide text-ink-primary">
          PORA
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'font-body text-[13px] px-3 py-1.5 rounded-md transition-colors whitespace-nowrap',
              pathname === link.href
                ? 'text-ink-primary bg-white/[0.05]'
                : 'text-ink-secondary hover:text-ink-primary hover:bg-white/[0.05]',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right side: lang switcher + CTAs */}
      <div className="hidden lg:flex items-center gap-1">
        <LangSwitcher currentLang={lang} />
        <div className="w-px h-4 bg-white/[0.1] mx-2" />
        <Button href={lp('/developers')} variant="ghost" size="sm">{t.nav.docs}</Button>
        <Button href={lp('/portal')}     variant="primary" size="sm">{t.nav.enterPortal}</Button>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden border border-white/[0.07] rounded-md px-2.5 py-1.5 text-ink-secondary"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 border-b border-white/[0.07] p-5 flex flex-col gap-1 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-ink-secondary hover:text-ink-primary py-2.5 px-3 rounded-md hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* Language switcher in mobile menu */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.07] px-3">
            <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">Lang</span>
            <LangSwitcher currentLang={lang} />
          </div>
          <div className="flex gap-3 mt-2 pt-3 border-t border-white/[0.07]">
            <Button href={lp('/developers')} variant="ghost"   size="sm" className="flex-1">{t.nav.docs}</Button>
            <Button href={lp('/portal')}     variant="primary" size="sm" className="flex-1">{t.nav.enterPortal}</Button>
          </div>
        </div>
      )}
    </header>
  )
}
