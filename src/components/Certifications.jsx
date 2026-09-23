import { motion } from 'motion/react'
import { Award, BarChart3, Cloud, ExternalLink } from 'lucide-react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { LinkButton } from './ui/Button.jsx'
import CursorGlowArticle from './ui/CursorGlowArticle.jsx'
import { certifications } from '../data/certifications.js'

const icons = { Award, Cloud, BarChart3 }

function CertificationIcon({ name }) {
  const Icon = icons[name] || Award
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/6 text-violet">
      <Icon size={22} aria-hidden="true" />
    </span>
  )
}

export default function Certifications() {
  return (
    <Section id="certifications" tone="plain" labelledBy="cert-title">
      <SectionHeading id="cert-title" title="Certifications" />
      <ul className="grid gap-6 md:grid-cols-2">
        {certifications.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.65, delay: i * 0.12 }}
          >
            <CursorGlowArticle
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="glass flex h-full flex-col rounded-3xl p-7 transition-[border-color,box-shadow] duration-300 hover:border-violet/50 hover:shadow-[0_20px_60px_-24px_rgba(139,108,255,0.6)]"
            >
              <CertificationIcon name={c.icon} />
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight">{c.title}</h3>
              <p className="mt-2 text-muted">{c.issuer}</p>
              <p className="mt-1 text-sm text-muted/80">{c.date}</p>
              <div className="mt-8 pt-1">
                <LinkButton href={c.url} icon={ExternalLink}>View Certificate</LinkButton>
              </div>
            </CursorGlowArticle>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
