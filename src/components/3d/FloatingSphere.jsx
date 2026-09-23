import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const LABELS = [
  { text: 'Python', pos: [1.85, 0.9, 0.4] },
  { text: 'Java', pos: [-1.8, 1.15, 0.5] },
  { text: 'AI/ML', pos: [0.2, 2.05, 0.7] },
  { text: 'SQL', pos: [-1.5, -1.45, 0.9] },
  { text: 'JavaScript', pos: [1.35, -1.55, 0.8] },
]

export default function FloatingSphere({ reduced = false, mobile = false }) {
  const rig = useRef()
  const spin = useRef()
  const orbit = useRef()
  const ringA = useRef()
  const ringB = useRef()

  useFrame((state, dt) => {
    const { x, y } = state.pointer
    const k = reduced ? 0 : 1
    // react gently to the pointer
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * 0.3 * k, 3, dt)
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * 0.4 * k, 3, dt)
    // slow idle motion
    spin.current.rotation.y += dt * 0.16 * (reduced ? 0.15 : 1)
    spin.current.rotation.x += dt * 0.05 * (reduced ? 0.15 : 1)
    orbit.current.rotation.y += dt * 0.07 * (reduced ? 0 : 1)
    ringA.current.rotation.z += dt * 0.12 * k
    ringB.current.rotation.z -= dt * 0.09 * k
    // float
    rig.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08 * k
  })

  return (
    <group ref={rig} scale={mobile ? 0.95 : 1}>
      <group ref={spin}>
        {/* solid low-poly core */}
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#0c1433" emissive="#2a3fb0" emissiveIntensity={0.16} metalness={0.85} roughness={0.22} flatShading />
        </mesh>
        {/* neural wireframe shell + nodes */}
        <mesh>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshBasicMaterial color="#6f8fff" wireframe transparent opacity={0.28} />
        </mesh>
        <points>
          <icosahedronGeometry args={[1.55, 2]} />
          <pointsMaterial size={0.055} color="#5fe0ee" sizeAttenuation transparent opacity={0.95} depthWrite={false} />
        </points>
      </group>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[1.95, 0.006, 6, 120]} />
        <meshBasicMaterial color="#8b6cff" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.6, 0.4]}>
        <torusGeometry args={[2.2, 0.005, 6, 120]} />
        <meshBasicMaterial color="#4fd8e8" transparent opacity={0.4} />
      </mesh>

      <group ref={orbit}>
        {LABELS.map((l) => (
          <Html key={l.text} position={l.pos} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
            <span className="glass whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium tracking-wide text-fg/90 sm:text-xs">
              {l.text}
            </span>
          </Html>
        ))}
      </group>
    </group>
  )
}
