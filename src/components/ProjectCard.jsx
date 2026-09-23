import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { LinkButton } from './ui/Button.jsx'
import { GithubIcon } from './ui/Icons.jsx'
import ProjectVisual from './ProjectVisual.jsx'

const MAX_TILT = 4 // degrees, kept intentionally subtle

export default function ProjectCard({ project, onOpen, index }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [MAX_TILT, -MAX_TILT]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-MAX_TILT, MAX_TILT]), { stiffness: 200, damping: 20 })
  const vx = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 160, damping: 20 })
  const vy = useSpring(useTransform(my, [0, 1], [-8, 8]), { stiffness: 160, damping: 20 })
  const gx = useTransform(mx, (v) => v * 100)
  const gy = useTransform(my, (v) => v * 100)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(120,140,255,0.2), transparent 60%)`

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const featured = project.featured

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      className={`[perspective:1200px] ${featured ? 'lg:col-span-2' : ''}`}
    >
      <motion.article
        data-cursor="view"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`glass group relative h-full overflow-hidden rounded-3xl transition-colors duration-300 hover:border-white/25 ${
          featured ? 'grid lg:grid-cols-[1.1fr_1fr]' : 'flex flex-col'
        }`}
      >
        <motion.div aria-hidden="true" style={{ background: glow }} className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className={`relative overflow-hidden ${featured ? 'min-h-[240px] lg:min-h-[420px]' : 'aspect-[16/10]'}`}>
          <motion.div style={{ x: vx, y: vy, scale: 1.06 }} className="h-full w-full">
            <ProjectVisual type={project.visual} className="h-full w-full" />
          </motion.div>
        </div>

        <div className="relative z-[2] flex flex-1 flex-col p-6 sm:p-8">
          {featured && (
            <span className="mb-4 inline-flex w-fit rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
              Featured project
            </span>
          )}
          <h3 className={`font-display font-semibold tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
            {/* stretched button makes the whole card open the details panel, keyboard accessible */}
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              data-card-open
              className="text-left after:absolute after:inset-0 after:z-[3] after:content-[''] focus-visible:outline-offset-[-4px]"
            >
              {project.title}
            </button>
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-line bg-white/4 px-3 py-1 text-xs text-fg/85">
                {t}
              </li>
            ))}
          </ul>

          <div className="relative z-[4] mt-7 flex flex-wrap gap-3 pt-1">
            <LinkButton href={project.github} icon={GithubIcon}>GitHub</LinkButton>
            {project.live && (
              <LinkButton href={project.live} icon={ExternalLink} variant="primary">Live Demo</LinkButton>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
