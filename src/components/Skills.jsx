import { motion } from 'motion/react'
import { BrainCircuit, Code2, Database, Layers, Wrench } from 'lucide-react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { skillGroups } from '../data/skills.js'

const icons = { Code2, Layers, Database, BrainCircuit, Wrench }

export default function Skills() {
  return (
    <Section id="skills" tone="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" title="Technical Arsenal" subtitle="The languages, frameworks, and tools I work with." />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.icon]
          return (
            <motion.li
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={i === 0 ? 'lg:col-span-2' : ''}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass group relative h-full rounded-3xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-blue/50 hover:shadow-[0_0_0_1px_rgba(79,124,255,0.35),0_20px_60px_-20px_rgba(99,102,241,0.55)] sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/6 text-blue transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:text-cyan">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-white/4 px-3.5 py-1.5 text-sm text-fg/90 transition-colors hover:border-cyan/50 hover:bg-cyan/10"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </Section>
  )
}
