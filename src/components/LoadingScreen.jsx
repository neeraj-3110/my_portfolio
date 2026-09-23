import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const MIN_MS = 1100

export default function LoadingScreen({ ready, onDone }) {
  const [progress, setProgress] = useState(0)
  const readyRef = useRef(ready)
  const finished = useRef(false)
  readyRef.current = ready

  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => {
      const elapsed = performance.now() - start
      const canFinish = readyRef.current && elapsed > MIN_MS
      setProgress((p) => {
        const target = canFinish ? 100 : Math.min(88, (elapsed / MIN_MS) * 88)
        const next = p + (target - p) * 0.12 + (canFinish ? 0.6 : 0)
        return Math.min(100, next)
      })
    }, 32)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (progress >= 99.5 && !finished.current) {
      finished.current = true
      setTimeout(onDone, 250) // guarded by `finished`, so it must not be cancelled by re-renders
    }
  }, [progress, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-violet/20 blur-[90px]" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center"
      >
        <div className="glass flex h-20 w-20 items-center justify-center rounded-3xl">
          <span className="text-gradient font-display text-3xl font-bold">NP</span>
        </div>
        <p className="mt-6 font-display text-sm font-medium tracking-[0.35em] text-fg">NEERAJ PAL</p>
        <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue via-violet to-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs tabular-nums text-muted">{Math.round(progress)}%</p>
      </motion.div>
    </motion.div>
  )
}
