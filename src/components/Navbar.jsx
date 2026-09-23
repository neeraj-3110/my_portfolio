import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/site.js'
import { useActiveSection } from '../hooks/useActiveSection.js'

const ids = navLinks.map((l) => l.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled || open ? 'glass bg-ink/60' : 'border border-transparent'
        }`}
      >
        <a href="#home" className="font-display text-lg font-bold tracking-tight" aria-label="Neeraj Pal, back to top">
          <span className="text-gradient">NP</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-10 items-center rounded-full bg-fg px-5 text-sm font-medium text-ink transition hover:bg-white sm:inline-flex"
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-fg lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl bg-ink/85 p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center rounded-2xl px-4 text-base ${
                      active === l.id ? 'bg-white/8 text-fg' : 'text-muted'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="p-1 pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue to-violet text-base font-medium text-white"
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
