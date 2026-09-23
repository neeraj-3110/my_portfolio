import { motion } from 'motion/react'
import { Download, FileText } from 'lucide-react'
import Section from './ui/Section.jsx'
import Button from './ui/Button.jsx'
import { site } from '../data/site.js'

export default function ResumeCTA() {
  return (
    <Section id="resume" tone="plain" pad="py-16 sm:py-20" labelledBy="resume-title">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.7 }}
        className="glass relative overflow-hidden rounded-[32px] p-8 sm:p-14"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue/25 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-violet/20 blur-[90px]" />
        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-cyan">
              <FileText size={22} aria-hidden="true" />
            </span>
            <h2 id="resume-title" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Want to know more?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Download my resume for a detailed overview of my experience, projects, skills, and education.
            </p>
          </div>
          <Button href={site.resume.href} download={site.resume.filename} className="shrink-0">
            <Download size={16} aria-hidden="true" />
            Download Resume
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
