import { ArrowRight } from 'lucide-react'

const base =
  'group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 select-none'

const variants = {
  primary:
    'bg-gradient-to-r from-blue to-violet text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)] hover:shadow-[0_12px_40px_-6px_rgba(99,102,241,0.9)] hover:-translate-y-0.5',
  secondary: 'glass text-fg hover:border-white/25 hover:bg-white/8 hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-fg',
}

/**
 * Renders <a> when `href` is set, otherwise <button>.
 * Pass `arrow` to show the sliding arrow micro-interaction.
 */
export default function Button({ variant = 'primary', href, arrow = false, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />}
    </>
  )
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  )
}

/**
 * A link that may not exist yet. With no `href` it renders a visibly disabled
 * button, so a placeholder never looks clickable or silently does nothing.
 */
export function LinkButton({ href, icon: Icon, children, variant = 'secondary', className = '', ...rest }) {
  if (href) {
    return (
      <Button variant={variant} href={href} className={className} {...rest}>
        {Icon && <Icon size={16} />}
        {children}
      </Button>
    )
  }
  return (
    <button
      type="button"
      disabled
      title="Link coming soon"
      aria-label={`${children} (link coming soon)`}
      className={`${base} glass cursor-not-allowed text-muted/60 ${className}`}
    >
      {Icon && <Icon size={16} />}
      <span>{children}</span>
    </button>
  )
}
