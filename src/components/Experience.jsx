import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import CursorGlowArticle from './ui/CursorGlowArticle.jsx'
import { experience } from '../data/experience.js'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <Section id="experience" tone="plain" labelledBy="experience-title">
      <SectionHeading id="experience-title" title="Experience" />

      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-white/10 sm:left-[11px]" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-blue via-violet to-cyan sm:left-[11px]"
        />

        <ol className="space-y-10">
          {experience.map((e) => (
            <li key={e.company + e.period} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-7 h-4 w-4 rounded-full border-2 border-blue bg-ink shadow-[0_0_18px_rgba(79,124,255,0.8)] sm:-left-12 sm:h-6 sm:w-6"
              />
              <CursorGlowArticle
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7 }}
                className="glass rounded-3xl p-6 sm:p-9"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{e.company}</h3>
                    <p className="mt-1 text-base text-cyan">{e.role}</p>
                  </div>
                  <div className="text-sm text-muted sm:text-right">
                    <p>{e.period}</p>
                    <p>{e.type}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CursorGlowArticle>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
