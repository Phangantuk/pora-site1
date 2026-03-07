import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        black:   '#070707',
        surface: {
          DEFAULT: '#0E0E0F',
          2:       '#141416',
          3:       '#1A1A1D',
        },
        amber: {
          DEFAULT: '#E8855A',
          dim:     'rgba(232,133,90,0.15)',
          glow:    'rgba(232,133,90,0.08)',
        },
        green: {
          DEFAULT: '#4ECAA0',
          dim:     'rgba(78,202,160,0.12)',
        },
        ink: {
          primary:   '#F0EDE8',
          secondary: 'rgba(240,237,232,0.55)',
          tertiary:  'rgba(240,237,232,0.28)',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-ibm-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',  // 10px
        'xs':  '0.6875rem', // 11px
      },
      letterSpacing: {
        widest2: '0.14em',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
        hover:   'rgba(255,255,255,0.14)',
      },
      backgroundImage: {
        'amber-radial': 'radial-gradient(circle, rgba(232,133,90,0.06) 0%, transparent 65%)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.8)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-up':   'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
