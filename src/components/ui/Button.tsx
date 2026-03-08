import Link from 'next/link'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'ghost' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children:   React.ReactNode
  href?:      string
  onClick?:   () => void
  variant?:   ButtonVariant
  size?:      ButtonSize
  className?: string
  disabled?:  boolean
  type?:      'button' | 'submit'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-amber text-[#0D0805] font-semibold hover:bg-[#F09068] hover:shadow-[0_8px_24px_rgba(232,133,90,0.3)] hover:-translate-y-px active:translate-y-0',
  ghost:
    'bg-transparent text-ink-secondary border border-white/[0.07] hover:border-white/[0.14] hover:text-ink-primary',
  outline:
    'bg-transparent text-amber border border-amber/30 hover:border-amber/60 hover:bg-amber/[0.08]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm:  'px-4 py-2 text-[13.5px] rounded-lg gap-1.5',
  md:  'px-5 py-2.5 text-[14px] rounded-lg gap-2',
  lg:  'px-7 py-3.5 text-[15px] rounded-xl gap-2',
}

export function Button({
  children,
  href,
  onClick,
  variant  = 'primary',
  size     = 'md',
  className,
  disabled,
  type     = 'button',
}: ButtonProps) {
  const baseStyles = clsx(
    'inline-flex items-center font-body tracking-[0.01em] cursor-pointer',
    'transition-all duration-200 no-underline',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-40 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseStyles}>
      {children}
    </button>
  )
}
