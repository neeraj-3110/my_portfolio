import AnimatedText from './AnimatedText.jsx'
import { motion } from 'motion/react'

export default function SectionHeading({ title, subtitle, id, align = 'left' }) {
  return (
    <div className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <AnimatedText
        as="h2"
        id={id}
        text={title}
        className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
