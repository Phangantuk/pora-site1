import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Tailwind class merge helper ──────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Format helpers ───────────────────────────────────────────────────────────

/** Truncate an Ethereum address: 0x3f8a...2c9e */
export function truncateAddress(address: string, chars = 4): string {
  if (address.length < 10) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/** Format a large number with K/M suffix */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`
  return n.toLocaleString()
}

/** Relative time: "2h ago", "3d ago" */
export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60_000)
  const hours   = Math.floor(diff / 3_600_000)
  const days    = Math.floor(diff / 86_400_000)

  if (minutes < 1)  return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours   < 24) return `${hours}h ago`
  return `${days}d ago`
}

// ─── API data fetching stubs ──────────────────────────────────────────────────
// Replace these with real fetch calls to your API endpoint.

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.pora.xyz/v1'

export async function fetchNetworkStats() {
  // TODO: replace with real API call
  // const res = await fetch(`${API_BASE}/stats`, { next: { revalidate: 60 } })
  // return res.json()
  return {
    totalVerifiedActions:   12_481,
    totalMealsRecorded:     840_320,
    countriesActive:        28,
    organizationsOnboarded: 142,
    activeValidators:       89,
    lastBlockRecorded:      481_920,
  }
}

export async function fetchRecentEvents(limit = 5) {
  // TODO: replace with real API call
  // const res = await fetch(`${API_BASE}/events?limit=${limit}`, { next: { revalidate: 30 } })
  // return res.json()
  return []
}
