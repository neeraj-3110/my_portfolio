import { motion } from 'motion/react'

/** Word-by-word reveal. Under reduced motion, MotionConfig collapses this to a plain fade. */
export default function AnimatedText({ text, as = 'span', className = '', delay = 0, stagger = 0.06, id, manual = false, active = true }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(manual
        ? { animate: active ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { once: true, margin: '-10%' } })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
      id={id}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%', opacity: 0 }, show: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
