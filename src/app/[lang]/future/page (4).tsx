import { redirect } from 'next/navigation'

// Redirect root / → /en
export default function RootPage() {
  redirect('/en')
}
