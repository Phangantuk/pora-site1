import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'

const SIDEBAR_LINKS = [
  { label: 'Dashboard',     href: '/portal/dashboard' },
  { label: 'Validator',     href: '/portal/validator' },
  { label: 'Organization',  href: '/portal/org' },
  { label: '← Back to Site', href: '/' },
]

// Note: Active state highlighting requires a Client Component.
// In production, extract sidebar into 'use client' with usePathname().
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden pt-16">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-surface border-r border-white/[0.07] flex flex-col overflow-y-auto">
        <div className="p-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 mb-1">
            <LogoMark size={22} />
            <span className="font-mono-pora text-[13px] font-medium">PORA Portal</span>
          </div>
          <p className="font-mono-pora text-[9px] text-ink-tertiary tracking-[0.1em] uppercase">
            Ecosystem Access
          </p>
        </div>
        <nav className="p-4 flex flex-col gap-0.5">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-[13px] text-ink-secondary hover:text-ink-primary hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-black">
        {children}
      </div>
    </div>
  )
}
