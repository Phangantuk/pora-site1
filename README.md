# PORA — Proof of Real Action

Protocol foundation website built with **Next.js 14** (App Router) and **Tailwind CSS**.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14 | App Router, SSR, file-based routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| TypeScript | 5 | Type safety |
| `clsx` + `tailwind-merge` | latest | Class merging utility |

---

## Project Structure

```
src/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout (fonts, nav, footer)
│   ├── page.tsx               # Home page
│   ├── protocol/page.tsx      # /protocol
│   ├── use-cases/page.tsx     # /use-cases
│   ├── proof-of-eat/page.tsx  # /proof-of-eat
│   ├── network/page.tsx       # /network
│   ├── transparency/page.tsx  # /transparency
│   ├── developers/page.tsx    # /developers
│   ├── about/page.tsx         # /about
│   └── portal/
│       ├── layout.tsx         # Portal shell with sidebar
│       ├── page.tsx           # Portal entry / role selector
│       ├── dashboard/page.tsx # Participant dashboard
│       ├── validator/page.tsx # Validator dashboard
│       └── org/page.tsx       # Organization dashboard
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx            # Fixed top navigation
│   │   └── Footer.tsx         # Site footer
│   ├── ui/
│   │   ├── index.tsx          # LogoMark, GradientLine, Badge,
│   │   │                      #   SectionHeader, Card, StatItem
│   │   ├── Button.tsx         # Button (primary / ghost / outline)
│   │   ├── GradientLine.tsx   # Re-export
│   │   └── LogoMark.tsx       # Re-export
│   ├── sections/
│   │   ├── index.tsx          # HowItWorks, StatsBar, UseCasesPreview
│   │   ├── HeroSection.tsx    # Home hero
│   │   ├── HowItWorks.tsx     # Re-export
│   │   ├── StatsBar.tsx       # Re-export
│   │   └── UseCasesPreview.tsx# Re-export
│   └── portal/                # (reserved for portal-specific components)
│
├── lib/
│   └── utils.ts               # cn(), truncateAddress(), API stubs
│
├── types/
│   └── index.ts               # ProtocolAction, UserProfile, NetworkStats…
│
└── styles/
    └── globals.css            # Tailwind directives + design tokens
```

---

## Design System

### Fonts
- **Syne** — display / headings (`font-display`)
- **DM Sans** — body copy (`font-body`)
- **IBM Plex Mono** — labels, code, monospace UI (`font-mono-pora`)

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `black` | `#070707` | Page background |
| `surface` | `#0E0E0F` | Card background |
| `amber` | `#E8855A` | Primary accent |
| `green` | `#4ECAA0` | Success / live |
| `ink-primary` | `#F0EDE8` | Primary text |
| `ink-secondary` | `55% opacity` | Body text |
| `ink-tertiary` | `28% opacity` | Labels / meta |

### Key CSS Classes
```css
.section-tag      /* monospace eyebrow label */
.inline-tag       /* inline amber code badge */
.gradient-line    /* amber horizontal separator */
.reveal           /* scroll-reveal base class */
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/protocol` | Protocol overview |
| `/use-cases` | Proof-of-X implementations |
| `/proof-of-eat` | First live module |
| `/network` | Global validator network |
| `/transparency` | Public ledger |
| `/portal` | Portal entry / role selector |
| `/portal/dashboard` | Participant dashboard |
| `/portal/validator` | Validator queue |
| `/portal/org` | Organization dashboard |
| `/developers` | API, SDK, docs |
| `/about` | Mission & philosophy |

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

---

## Next Steps

- [ ] Connect wallet using `wagmi` + `viem`
- [ ] Replace data stubs in `src/lib/utils.ts` with real API calls
- [ ] Add `next-auth` or wallet-based auth for portal routes
- [ ] Implement scroll-reveal with `IntersectionObserver` in a Client Component
- [ ] Add `middleware.ts` to protect portal routes
- [ ] Deploy to Vercel
