import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import Section from './ui/Section.jsx'
import { stats } from '../data/site.js'
import { useCursorGlow } from '../hooks/useCursorGlow.js'

function CountUp({ value, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const from = value > 1000 ? value - 8 : 0
  const [n, setN] = useState(from)

  useEffect(() => {
    if (!inView) return
    if (reduce) return setN(value)
    const c = animate(from, value, { duration: 1.6, ease: 'easeOut', onUpdate: setN })
    return () => c.stop()
  }, [inView, reduce, value, from])

  return (
    <span ref={ref} aria-label={String(value)}>
      {n.toFixed(decimals)}
    </span>
  )
}

export default function Stats() {
  return (
    <Section id="stats" tone="plain" pad="py-8 sm:py-12">
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.index} stat={s} index={i} />)}
      </ul>
    </Section>
  )
}

function StatCard({ stat, index }) {
  const glowRef = useCursorGlow()

  return (
    <motion.li
      ref={glowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      className="glass cursor-glow-card rounded-3xl p-5 sm:p-7"
    >
      <p className="text-xs tabular-nums text-muted">{stat.index}</p>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {typeof stat.value === 'number' ? <CountUp value={stat.value} decimals={stat.decimals} /> : stat.value}
      </p>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </motion.li>
  )
}
