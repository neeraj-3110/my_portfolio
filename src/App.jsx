import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Home from './pages/Home.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import Cursor from './components/Cursor.jsx'

export default function App() {
  const [sceneReady, setSceneReady] = useState(false)
  const [done, setDone] = useState(false)

  // Never block the site on the 3D scene for more than a few seconds.
  useEffect(() => {
    const t = setTimeout(() => setSceneReady(true), 3500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
  }, [done])

  return (
    <div className="grain">
      <AnimatePresence>
        {!done && <LoadingScreen key="loader" ready={sceneReady} onDone={() => setDone(true)} />}
      </AnimatePresence>
      <Cursor />
      <Home onSceneReady={() => setSceneReady(true)} started={done} />
    </div>
  )
}
