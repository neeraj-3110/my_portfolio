import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingParticles({ count = 500, radius = 4.5, minRadius = 2.4, size = 0.02, color = '#7ea2ff', speed = 0.02 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = minRadius + Math.random() * (radius - minRadius)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius, minRadius])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * speed
    ref.current.rotation.x += dt * speed * 0.4
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  )
}
