import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
import FloatingParticles from './FloatingParticles.jsx'

function Envelope({ reduced }) {
  const group = useRef()
  const flapShape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-1.1, 0.7)
    s.lineTo(1.1, 0.7)
    s.lineTo(0, -0.05)
    s.closePath()
    return s
  }, [])

  useFrame((state, dt) => {
    const { x, y } = state.pointer
    const k = reduced ? 0 : 1
    const t = state.clock.elapsedTime
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(t * 0.4) * 0.35 * k + x * 0.5 * k, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.3 * k + 0.1, 3, dt)
    group.current.position.y = Math.sin(t * 0.9) * 0.1 * k
  })

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[2.2, 1.4, 0.1]} />
        <meshStandardMaterial color="#0c1433" emissive="#2a3fb0" emissiveIntensity={0.06} metalness={0.8} roughness={0.3} />
        <Edges color="#6f8fff" />
      </mesh>
      <mesh position={[0, 0, 0.056]}>
        <shapeGeometry args={[flapShape]} />
        <meshStandardMaterial color="#141d45" emissive="#5b3fd0" emissiveIntensity={0.08} metalness={0.7} roughness={0.35} side={THREE.DoubleSide} />
        <Edges color="#4fd8e8" />
      </mesh>
    </group>
  )
}

export default function ContactScene({ active = true, mobile = false, reduced = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: !mobile, alpha: true }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={45} color="#6f8fff" />
      <pointLight position={[-3, -2, 3]} intensity={35} color="#a48cff" />
      <Suspense fallback={null}>
        <Envelope reduced={reduced} />
        <FloatingParticles count={mobile ? 80 : 180} radius={3} minRadius={1.8} size={0.025} color="#4fd8e8" speed={reduced ? 0 : 0.05} />
      </Suspense>
    </Canvas>
  )
}
