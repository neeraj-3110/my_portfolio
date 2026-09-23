import { useEffect, useRef } from 'react'
import { useFinePointer } from './useMedia.js'

export function useCursorGlow() {
  const fine = useFinePointer()
  const ref = useRef(null)

  useEffect(() => {
    if (!fine) return undefined
    const element = ref.current
    if (!element) return undefined

    let frameId = 0
    let nextX = 50
    let nextY = 50

    const update = () => {
      frameId = 0
      element.style.setProperty('--mouse-x', `${nextX}%`)
      element.style.setProperty('--mouse-y', `${nextY}%`)
    }

    const onMove = (event) => {
      const bounds = element.getBoundingClientRect()
      nextX = ((event.clientX - bounds.left) / bounds.width) * 100
      nextY = ((event.clientY - bounds.top) / bounds.height) * 100
      if (!frameId) frameId = requestAnimationFrame(update)
    }

    const onLeave = () => {
      element.style.setProperty('--mouse-x', '50%')
      element.style.setProperty('--mouse-y', '50%')
    }

    element.addEventListener('pointermove', onMove, { passive: true })
    element.addEventListener('pointerleave', onLeave)
    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [fine])

  return ref
}