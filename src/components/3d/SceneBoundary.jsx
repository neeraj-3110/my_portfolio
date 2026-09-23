import { Component, lazy, Suspense, useEffect, useMemo, useRef } from 'react'
import { hasWebGL, useIsMobile, usePrefersReducedMotion } from '../../hooks/useMedia.js'
import { useInView } from '../../hooks/useInView.js'

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.warn('3D scene disabled:', err?.message)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

const scenes = {
  hero: lazy(() => import('./HeroScene.jsx')),
  contact: lazy(() => import('./ContactScene.jsx')),
}

/**
 * Lazy-loads a 3D scene, pauses it off-screen, and quietly falls back to a
 * static glow if WebGL is unavailable or the scene throws.
 */
export default function SceneBoundary({ scene, onReady, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const supported = useMemo(() => hasWebGL(), [])
  const Scene = scenes[scene]

  useEffect(() => {
    if (!supported) onReady?.() // nothing to wait for; release the loading screen
  }, [supported, onReady])

  const fallback = (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue/40 to-violet/40 blur-2xl" />
    </div>
  )

  if (!supported) {
    return <div ref={ref} className={className}>{fallback}</div>
  }

  return (
    <div ref={ref} className={className}>
      <Boundary fallback={fallback}>
        <Suspense fallback={null}>
          <Scene active={inView} mobile={mobile} reduced={reduced} onReady={onReady} />
        </Suspense>
      </Boundary>
    </div>
  )
}
