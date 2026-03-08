import type { Metadata } from 'next'
import { Syne, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})
const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'PORA — Proof of Real Action',
    template: '%s | PORA',
  },
  description:
    'A protocol that connects real-world humanitarian actions with verifiable, transparent digital records.',
  keywords: ['PORA', 'Proof of Real Action', 'protocol', 'humanitarian', 'blockchain', 'impact'],
  openGraph: {
    title: 'PORA — Proof of Real Action',
    description: 'Open infrastructure for verifiable real-world impact.',
    url: 'https://pora.xyz',
    siteName: 'PORA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PORA — Proof of Real Action',
    description: 'Open infrastructure for verifiable real-world impact.',
  },
}

/* ─── Root Layout ─────────────────────────────────────────────────────────────
   Only provides <html>/<body> shell + fonts.
   Nav and Footer live in app/[lang]/layout.tsx so they get the correct lang prop.
──────────────────────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${syne.variable} ${dmSans.variable} ${ibmMono.variable}`}>
      <body className="bg-black text-ink-primary font-body">
        {children}
      </body>
    </html>
  )
}
