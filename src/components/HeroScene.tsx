import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const LAYERS = [
  { label: 'Frontend', nodes: 5, radius: 2.6, color: '#7DF9D3' },
  { label: 'API', nodes: 4, radius: 1.9, color: '#38BDF8' },
  { label: 'Application', nodes: 6, radius: 2.3, color: '#7C5CFF' },
  { label: 'Database', nodes: 3, radius: 1.4, color: '#7C5CFF' },
  { label: 'Realtime', nodes: 4, radius: 1.9, color: '#C4FF4D' },
]

const LAYER_GAP = 1.35

function buildLayerPositions() {
  const top = ((LAYERS.length - 1) * LAYER_GAP) / 2
  return LAYERS.map((layer, i) => {
    const y = top - i * LAYER_GAP
    const positions: THREE.Vector3[] = []
    for (let n = 0; n < layer.nodes; n++) {
      const angle = (n / layer.nodes) * Math.PI * 2 + i * 0.4
      const x = Math.cos(angle) * layer.radius
      const z = Math.sin(angle) * layer.radius * 0.55
      positions.push(new THREE.Vector3(x, y, z))
    }
    return { ...layer, y, positions }
  })
}

function ArchitectureGraph({
  scrollRef,
  pointerRef,
  reducedMotion,
}: {
  scrollRef: React.MutableRefObject<number>
  pointerRef: React.MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const layers = useMemo(() => buildLayerPositions(), [])

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < layers.length - 1; i++) {
      const a = layers[i].positions
      const b = layers[i + 1].positions
      a.forEach((from, ai) => {
        const to = b[ai % b.length]
        lines.push([from, to])
      })
      if (b.length > a.length) {
        const to = b[b.length - 1]
        const from = a[a.length - 1]
        lines.push([from, to])
      }
    }
    return lines
  }, [layers])

  const particles = useMemo(() => {
    const count = 140
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    const targetRotY = reducedMotion ? 0.35 : 0.35 + pointerRef.current.x * 0.5
    const targetRotX = reducedMotion ? 0 : pointerRef.current.y * -0.22
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.055
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.055
    group.current.position.y = -scrollRef.current * 3.2
    if (!reducedMotion) {
      group.current.position.z = Math.sin(t * 0.25) * 0.15
    }
  })

  return (
    <group ref={group} rotation={[0, 0.35, 0]}>
      {connections.map(([from, to], i) => (
        <Line
          key={i}
          points={[from, to]}
          color="#8B98A7"
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}

      {layers.map((layer) =>
        layer.positions.map((pos, i) => (
          <mesh key={`${layer.label}-${i}`} position={pos}>
            <icosahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={0.9}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
        )),
      )}

      <Points positions={particles} stride={3}>
        <PointMaterial color="#8B98A7" size={0.02} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

export function HeroScene({
  scrollRef,
  pointerRef,
  reducedMotion,
  isMobile,
}: {
  scrollRef: React.MutableRefObject<number>
  pointerRef: React.MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
  isMobile: boolean
}) {
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.75]}
      camera={{ position: [0, 0.4, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="absolute! inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={22} color="#7DF9D3" />
      <pointLight position={[-4, -2, -3]} intensity={14} color="#7C5CFF" />
      <Suspense fallback={null}>
        <ArchitectureGraph scrollRef={scrollRef} pointerRef={pointerRef} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  )
}
