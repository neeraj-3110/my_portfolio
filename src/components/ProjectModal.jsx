import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import { LinkButton } from './ui/Button.jsx'
import { GithubIcon } from './ui/Icons.jsx'
import ProjectVisual from './ProjectVisual.jsx'

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const panel = useRef(null)
  const closeBtn = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panel.current) return
      const items = [...panel.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previous?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="glass relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-[#0a0f22]/95 sm:rounded-3xl"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-fg backdrop-blur transition hover:bg-white/15"
        >
          <X size={20} />
        </button>

        <ProjectVisual type={project.visual} className="h-52 w-full sm:h-64" />

        <div className="space-y-8 p-6 sm:p-9">
          <header>
            <h3 id="project-modal-title" className="font-display text-3xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2">
            <section>
              <h4 className="font-display text-base font-semibold text-cyan">Problem</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.problem}</p>
            </section>
            <section>
              <h4 className="font-display text-base font-semibold text-cyan">Solution</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.solution}</p>
            </section>
          </div>

          <section>
            <h4 className="font-display text-base font-semibold">Technologies</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-display text-base font-semibold">Key features</h4>
            <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 border-t border-line pt-6">
            <LinkButton href={project.github} icon={GithubIcon}>GitHub</LinkButton>
            {project.live && <LinkButton href={project.live} icon={ExternalLink} variant="primary">Live Demo</LinkButton>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
