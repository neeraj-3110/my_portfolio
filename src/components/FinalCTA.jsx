import { motion } from 'motion/react'
import Section from './ui/Section.jsx'
import Button from './ui/Button.jsx'
import { site } from '../data/site.js'

export default function FinalCTA() {
  return (
    <Section id="lets-build" tone="plain" pad="py-20 sm:py-28" labelledBy="cta-title">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 id="cta-title" className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          <span className="text-gradient">Let&apos;s build something meaningful.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          I&apos;m always interested in learning, building, and connecting with people working on interesting technology.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="#contact" arrow>Get in Touch</Button>
          <Button variant="secondary" href={site.resume.href} download={site.resume.filename}>Download Resume</Button>
        </div>
      </motion.div>
    </Section>
  )
}
