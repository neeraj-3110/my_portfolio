import { useEffect, useState } from 'react'

/** True while the element is (roughly) on screen; used to pause WebGL loops off-screen. */
export function useInView(ref, rootMargin = '150px') {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}
