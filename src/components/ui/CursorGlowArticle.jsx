import { motion } from 'motion/react'
import { useCursorGlow } from '../../hooks/useCursorGlow.js'

export default function CursorGlowArticle({ className, ...props }) {
  const glowRef = useCursorGlow()
  return <motion.article ref={glowRef} className={`cursor-glow-card ${className ?? ''}`} {...props} />
}