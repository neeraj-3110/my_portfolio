import { site } from '../data/site.js'
import { GithubIcon, LinkedinIcon } from './ui/Icons.jsx'

function Social({ href, label, Icon }) {
  const cls = 'glass flex h-11 w-11 items-center justify-center rounded-full transition hover:-translate-y-0.5 hover:border-white/25'
  if (!href) {
    return (
      <button type="button" disabled title="Link coming soon" aria-label={`${label} (link coming soon)`} className={`${cls} cursor-not-allowed text-muted/50 hover:translate-y-0`}>
        <Icon />
      </button>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} text-fg`}>
      <Icon />
    </a>
  )
}

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink to-[#03040a]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-bold tracking-[0.2em]">NEERAJ PAL</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Building, learning, and exploring the future of technology.
            </p>
            <div className="mt-6 flex gap-3">
              <Social href={site.social.github} label="GitHub" Icon={GithubIcon} />
              <Social href={site.social.linkedin} label="LinkedIn" Icon={LinkedinIcon} />
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Neeraj Pal. All rights reserved.</p>
          <p>Designed &amp; Built by Neeraj Pal</p>
        </div>
      </div>
    </footer>
  )
}
