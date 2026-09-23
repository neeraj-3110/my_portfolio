import { useEffect, useRef, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMedia.js'

const TEXT_TARGETS = 'p, h1, h2, h3, h4, h5, h6, li, dt, dd, blockquote, pre, code, span, strong, em, small'
const NATIVE_TARGETS = 'input, textarea, select, option, [contenteditable="true"]'
const INTERACTIVE_TARGETS = 'a, button, [role="button"]'

function setPosition(element, x, y) {
  if (!element) return
  element.style.setProperty('--cursor-x', `${x}px`)
  element.style.setProperty('--cursor-y', `${y}px`)
}

export default function Cursor() {
  const fine = useFinePointer()
  const reducedMotion = usePrefersReducedMotion()
  const enabled = fine && !reducedMotion
  const [mode, setMode] = useState('default')
  const [visible, setVisible] = useState(false)
  const coreRef = useRef(null)
  const followerRef = useRef(null)
  const modeRef = useRef('default')

  useEffect(() => {
    if (!enabled) return undefined

    const root = document.documentElement
    const pointer = { x: -100, y: -100 }
    const follower = { x: -100, y: -100 }
    const magneticTarget = { x: -100, y: -100 }
    let frameId
    let lastTime = performance.now()

    const updateMode = (nextMode) => {
      if (modeRef.current === nextMode) return
      modeRef.current = nextMode
      setMode(nextMode)
      root.dataset.cursorState = nextMode === 'native' ? 'native' : 'custom'
    }

    const getMode = (target) => {
      if (!(target instanceof Element)) return 'native'
      if (target.closest(NATIVE_TARGETS)) return 'native'

      const interactive = target.closest(INTERACTIVE_TARGETS)
      if (interactive) return interactive.matches('button, [role="button"]') ? 'button' : 'link'
      if (target.closest(TEXT_TARGETS)?.textContent?.trim()) return 'native'
      if (target.closest('[data-cursor="view"]')) return 'view'
      if (target.closest('img')) return 'image'
      return 'default'
    }

    const move = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      const nextMode = getMode(event.target)
      const interactive = event.target instanceof Element ? event.target.closest(INTERACTIVE_TARGETS) : null
      if (nextMode === 'button' && interactive) {
        const bounds = interactive.getBoundingClientRect()
        magneticTarget.x = bounds.left + bounds.width / 2
        magneticTarget.y = bounds.top + bounds.height / 2
      } else {
        magneticTarget.x = pointer.x
        magneticTarget.y = pointer.y
      }
      updateMode(nextMode)
      setVisible(nextMode !== 'native')
    }

    const leave = () => {
      setVisible(false)
      updateMode('native')
    }

    const render = (time) => {
      const delta = Math.min((time - lastTime) / 16.67, 2)
      lastTime = time

      setPosition(coreRef.current, pointer.x, pointer.y)
      const ease = 1 - Math.pow(1 - 0.18, delta)
      follower.x += (magneticTarget.x - follower.x) * ease
      follower.y += (magneticTarget.y - follower.y) * ease
      setPosition(followerRef.current, follower.x, follower.y)

      frameId = requestAnimationFrame(render)
    }

    root.classList.add('has-custom-cursor')
    root.dataset.cursorState = 'native'
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      root.classList.remove('has-custom-cursor')
      delete root.dataset.cursorState
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled])

  if (!enabled) return null

  const isNative = mode === 'native'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ opacity: visible && !isNative ? 1 : 0, transition: 'opacity 160ms ease-out' }}
    >
      <span ref={followerRef} className={`cursor-follower cursor-follower--${mode}`}>
        {mode === 'view' && <span className="cursor-follower__label">VIEW</span>}
      </span>
      <span ref={coreRef} className="cursor-core" />
    </div>
  )
}