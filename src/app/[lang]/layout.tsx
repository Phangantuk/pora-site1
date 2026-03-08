import { Nav }    from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { isValidLang, getT, type Lang } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'es' }]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = isValidLang(params.lang) ? (params.lang as Lang) : 'en'
  const t    = getT(lang)
  return {
    title: {
      default:  'PORA — Proof of Real Action',
      template: '%s | PORA',
    },
    description: t.home.heroSub,
  }
}

/* ─── Lang Layout ─────────────────────────────────────────────────────────────
   Validates the [lang] param, renders Nav (with lang prop) + Footer.
   Does NOT include <html>/<body> — those live in the root layout.
──────────────────────────────────────────────────────────────────────────── */
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
    <>
      <Nav lang={lang} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
