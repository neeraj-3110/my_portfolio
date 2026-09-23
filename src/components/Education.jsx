import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import CursorGlowArticle from './ui/CursorGlowArticle.jsx'
import { education } from '../data/site.js'

export default function Education() {
  return (
    <Section id="education" tone="plain" labelledBy="education-title">
      <SectionHeading id="education-title" title="Education" />
      <div className="relative pl-8 sm:pl-12">
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
          className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-blue via-violet to-transparent sm:left-[11px]"
        />
        <ol className="space-y-8">
          {education.map((e, i) => (
            <li key={e.school} className="relative">
              <span aria-hidden="true" className="absolute -left-8 top-7 h-4 w-4 rounded-full border-2 border-violet bg-ink sm:-left-12 sm:h-6 sm:w-6" />
              <CursorGlowArticle
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass rounded-3xl p-6 sm:p-9"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-blue sm:flex">
                      <GraduationCap size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{e.school}</h3>
                      <p className="mt-1 text-cyan">{e.degree}</p>
                      {e.detail && <p className="mt-1 text-sm text-muted">{e.detail}</p>}
                    </div>
                  </div>
                  <div className="text-sm text-muted sm:text-right">
                    <p>{e.period}</p>
                    <p className="font-medium text-fg">{e.score}</p>
                  </div>
                </div>

                {e.coursework.length > 0 && (
                  <div className="mt-7 border-t border-line pt-6">
                    <h4 className="text-sm font-medium text-muted">Relevant Coursework</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {e.coursework.map((c) => (
                        <li key={c} className="rounded-full border border-line bg-white/4 px-3.5 py-1.5 text-sm">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CursorGlowArticle>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
