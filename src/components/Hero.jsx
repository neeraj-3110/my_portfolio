import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Button from './ui/Button.jsx'
import AnimatedText from './ui/AnimatedText.jsx'
import SceneBoundary from './3d/SceneBoundary.jsx'
import { site } from '../data/site.js'

export default function Hero({ onSceneReady, started }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-ink via-ink to-navy"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-blue/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 h-96 w-96 rounded-full bg-violet/20 blur-[130px]" />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-6 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pt-24">
        <motion.div style={{ y: textY }} className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-fg/90"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <h1 id="hero-title" className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
            <AnimatedText as="span" manual active={started} text="Hi, I'm Neeraj Pal." className="block text-balance" />
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              className="text-gradient mt-2 block text-[1.7rem] leading-[1.15] sm:text-4xl xl:text-5xl"
            >
              AI/ML &amp; Software Engineering Student
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            B.Tech Computer Science student specializing in AI/ML, with hands-on experience in AI model training, data
            annotation, and software development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button href="#projects" arrow>View My Work</Button>
            <Button variant="secondary" href={site.resume.href} download={site.resume.filename}>Download Resume</Button>
            <Button variant="ghost" href="#contact" arrow>Get In Touch</Button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: sceneY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="order-1 lg:order-2"
        >
          <SceneBoundary scene="hero" onReady={onSceneReady} className="h-[340px] w-full sm:h-[440px] lg:h-[600px]" />
        </motion.div>
      </div>
    </section>
  )
}
