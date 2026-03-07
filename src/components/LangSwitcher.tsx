'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n'
import { clsx } from 'clsx'

const LANG_LABELS: Record<Lang, string> = {
  en: 'EN',
  ru: 'RU',
  es: 'ES',
}

/** Swap the lang segment of the current pathname */
function swapLang(pathname: string, newLang: Lang): string {
  // e.g. /en/future → /ru/future
  const parts = pathname.split('/')
  // parts[0] = '', parts[1] = 'en'|'ru'|'es', rest = subpath
  if (parts.length >= 2 && SUPPORTED_LANGS.includes(parts[1] as Lang)) {
    parts[1] = newLang
    return parts.join('/')
  }
  return `/${newLang}`
}

export function LangSwitcher({ currentLang }: { currentLang: Lang }) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-0.5">
      {/* Divider */}
      <span className="w-px h-3 bg-white/[0.12] mx-1" />

      {SUPPORTED_LANGS.map((lang, i) => {
        const isActive = lang === currentLang
        const href     = swapLang(pathname, lang)

        return (
          <span key={lang} className="flex items-center">
            {i > 0 && (
              <span className="text-white/[0.14] text-[11px] font-mono mx-0.5">|</span>
            )}
            <Link
              href={href}
              className={clsx(
                'font-mono text-[11px] tracking-[0.08em] px-1.5 py-1 rounded-md transition-colors',
                isActive
                  ? 'text-[#E8855A] bg-[#E8855A]/10'
                  : 'text-white/30 hover:text-white/70 hover:bg-white/[0.05]',
              )}
            >
              {LANG_LABELS[lang]}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
