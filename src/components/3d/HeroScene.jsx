import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import FloatingSphere from './FloatingSphere.jsx'
import FloatingParticles from './FloatingParticles.jsx'

export default function HeroScene({ active = true, mobile = false, reduced = false, onReady }) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 7.8], fov: 42 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#6f8fff" />
      <pointLight position={[-4, -2, 3]} intensity={45} color="#a48cff" />
      <Suspense fallback={null}>
        <FloatingSphere reduced={reduced} mobile={mobile} />
        <FloatingParticles count={mobile ? 220 : 650} speed={reduced ? 0 : 0.02} />
      </Suspense>
    </Canvas>
  )
}
