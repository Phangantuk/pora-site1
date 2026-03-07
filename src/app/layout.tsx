import type { Metadata } from 'next'
import { Syne, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Nav }    from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { isValidLang, getT, type Lang } from '@/lib/i18n'
import { notFound } from 'next/navigation'

const syne = Syne({
  subsets: ['latin'],
  weight:  ['400','500','600','700','800'],
  variable:'--font-syne',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight:  ['300','400','500'],
  style:   ['normal','italic'],
  variable:'--font-dm-sans',
  display: 'swap',
})
const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight:  ['300','400','500'],
  variable:'--font-ibm-mono',
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'es' }]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang as Lang
  const t    = getT(isValidLang(lang) ? lang : 'en')
  return {
    title: {
      default:  'PORA — Proof of Real Action',
      template: '%s | PORA',
    },
    description: t.home.heroSub,
  }
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params:   { lang: string }
}) {
  if (!isValidLang(params.lang)) notFound()
  const lang = params.lang as Lang

  return (
    <html
      lang={lang}
      dir={getT(lang).dir}
      className={`${syne.variable} ${dmSans.variable} ${ibmMono.variable}`}
    >
      <body className="bg-black text-ink-primary font-body">
        <Nav lang={lang} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
