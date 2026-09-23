import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { MapPin, GraduationCap } from 'lucide-react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

function IdCard() {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 140, damping: 18 })
  const sy = useSpring(py, { stiffness: 140, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      className="mx-auto w-full max-w-sm [perspective:1000px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        animate={{ rotateY: [-6, 6, -6], y: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.article
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="glass relative overflow-hidden rounded-[28px] p-7"
          aria-label="Developer card"
        >
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet/30 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-blue/25 blur-3xl" />
          <div aria-hidden="true" className="mx-auto mb-7 h-2 w-16 rounded-full bg-white/15" />

          <div className="relative flex items-center gap-4" style={{ transform: 'translateZ(40px)' }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-violet font-display text-2xl font-bold">
              NP
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight">NEERAJ PAL</h3>
              <p className="text-xs tracking-[0.16em] text-cyan">AI/ML STUDENT</p>
              <p className="text-xs tracking-[0.16em] text-muted">SOFTWARE DEVELOPER</p>
            </div>
          </div>

          <dl className="relative mt-8 space-y-4 border-t border-line pt-6 text-sm" style={{ transform: 'translateZ(24px)' }}>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-blue" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted">Location</dt>
                <dd>Vadodara, India</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap size={16} className="mt-0.5 text-blue" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted">Education</dt>
                <dd>Parul University</dd>
              </div>
            </div>
          </dl>
        </motion.article>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <Section id="about" tone="about" labelledBy="about-title">
      <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading id="about-title" title="About Me" />
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {[
              "I'm a B.Tech Computer Science Engineering student specializing in Artificial Intelligence & Machine Learning at Parul University, Vadodara.",
              'I enjoy building practical software, experimenting with AI technologies, and solving programming problems. My experience includes AI data annotation, model evaluation, software development, and working with technologies such as Python, Java, SQL, and web technologies.',
              "I'm continuously learning and looking for opportunities where I can work on meaningful technology projects and grow as a software engineer.",
            ].map((t, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
              >
                {t}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8 }}
        >
          <IdCard />
        </motion.div>
      </div>
    </Section>
  )
}
