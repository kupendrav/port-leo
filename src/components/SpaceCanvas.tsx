import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

type SpaceCanvasProps = {
  theme: 'dark' | 'light'
  scrollProgress?: number
}

type PlanetProps = {
  radius: number
  size: number
  color: string
  speed: number
  offset?: number
}

function Planet({ radius, size, color, speed, offset = 0 }: PlanetProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return

    const t = clock.getElapsedTime() * speed + offset
    mesh.position.x = Math.cos(t) * radius
    mesh.position.z = Math.sin(t) * radius
    mesh.rotation.y += 0.003
    mesh.rotation.x += 0.0015
  })

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        roughness={0.35}
        metalness={0.65}
      />
    </mesh>
  )
}

function GlowSun({ theme }: { theme: 'dark' | 'light' }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  if (theme === 'light') {
    return (
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 48, 48]} />
        <meshBasicMaterial color="#fbbf24" />
        <pointLight args={[0xffd700, 3.2, 30]} />
      </mesh>
    )
  }

  // Dark mode: crescent moon
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial color="#e0e7ff" emissive="#a5b4fc" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshBasicMaterial color="#030712" />
      </mesh>
      <pointLight args={[0xa5b4fc, 1.2, 20]} />
    </group>
  )
}

function Spaceship({ pathRadius, speed, offset = 0 }: { pathRadius: number; speed: number; offset?: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const group = ref.current
    if (!group) return

    const t = clock.getElapsedTime() * speed + offset
    group.position.x = Math.cos(t) * pathRadius
    group.position.y = Math.sin(t * 0.5) * 0.8
    group.position.z = Math.sin(t) * pathRadius
    group.rotation.y = -t + Math.PI / 2
  })

  return (
    <group ref={ref}>
      <mesh castShadow>
        <coneGeometry args={[0.12, 0.4, 4]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#93c5fd" metalness={0.6} />
      </mesh>
      <pointLight args={[0x60a5fa, 0.6, 3]} position={[0, 0, 0]} />
    </group>
  )
}

function Satellite({ pathRadius, speed, offset = 0 }: { pathRadius: number; speed: number; offset?: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const group = ref.current
    if (!group) return

    const t = clock.getElapsedTime() * speed + offset
    group.position.x = Math.cos(t) * pathRadius
    group.position.y = Math.sin(t * 1.2) * 1.2
    group.position.z = Math.sin(t) * pathRadius
    group.rotation.z = t * 0.3
  })

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#f97316" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.08, 0.02]} />
        <meshStandardMaterial color="#facc15" emissive="#fbbf24" emissiveIntensity={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.08, 0.02]} />
        <meshStandardMaterial color="#facc15" emissive="#fbbf24" emissiveIntensity={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

function GroundLights({ theme, progress }: { theme: 'dark' | 'light'; progress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const palette = theme === 'light' ? ['#f97316', '#22c55e', '#0ea5e9'] : ['#93c5fd', '#a855f7', '#fbbf24']

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return
    const t = clock.getElapsedTime()
    const k = THREE.MathUtils.smoothstep(progress, 0, 1)
    group.children.forEach((child, i) => {
      const phase = t * 0.6 + i * 0.8
      child.position.x = Math.sin(phase * 0.7) * (4 + i * 0.4)
      child.position.z = Math.cos(phase * 0.5) * (3 + i * 0.6)
      child.position.y = -1.8 + Math.sin(phase * 1.4) * 0.08
      const mesh = child as THREE.Mesh
      const mat = mesh.material as THREE.MeshStandardMaterial
      const flicker = 0.4 + 0.4 * Math.sin(phase * 2.2)
      mat.emissiveIntensity = (0.4 + k * 0.6) * flicker
      mat.opacity = 0.6 + 0.3 * k
      mat.transparent = true
    })
  })

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={palette[i % palette.length]}
            emissive={palette[i % palette.length]}
            emissiveIntensity={0.6}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function GroundSurface({ theme, progress }: { theme: 'dark' | 'light'; progress: number }) {
  const colorTop = theme === 'light' ? new THREE.Color('#8bd5ff') : new THREE.Color('#4b5563')
  const colorBottom = theme === 'light' ? new THREE.Color('#2f855a') : new THREE.Color('#0f172a')
  const emissive = theme === 'light' ? new THREE.Color('#9ae6b4') : new THREE.Color('#93c5fd')

  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const k = THREE.MathUtils.smoothstep(progress, 0, 1)
    const material = ref.current.material as THREE.MeshStandardMaterial
    material.color = colorBottom.clone().lerp(colorTop, k)
    const shimmer = 0.05 + k * 0.1
    const pulse = 0.06 * (0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 0.8))
    material.emissive = emissive.clone().multiplyScalar(shimmer + pulse)
    ref.current.position.y = -2 + k * -0.2
  })

  return (
    <mesh ref={ref} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200, 64, 64]} />
      <meshStandardMaterial roughness={1} metalness={0.05} />
    </mesh>
  )
}

export function SpaceCanvas({ theme, scrollProgress = 0 }: SpaceCanvasProps) {
  const bgStart = theme === 'light' ? '#0b1b3a' : '#01040c'
  const bgEnd = theme === 'light' ? '#b9e6ff' : '#101425'
  const fogStart = theme === 'light' ? '#0b1b3a' : '#050910'
  const fogEnd = theme === 'light' ? '#c8ecff' : '#161c2a'

  const ambientBase = theme === 'light' ? 0.25 : 0.18
  const ambientPeak = theme === 'light' ? 0.9 : 0.55
  const dirColorStart = theme === 'light' ? '#6ab8ff' : '#7cc6ff'
  const dirColorEnd = theme === 'light' ? '#ffffff' : '#9ad0ff'

  const t = scrollProgress
  const lerpColor = (a: string, b: string, k: number) => new THREE.Color(a).lerp(new THREE.Color(b), k)
  const bgColor = lerpColor(bgStart, bgEnd, t)
  const fogColor = lerpColor(fogStart, fogEnd, t)
  const ambientIntensity = THREE.MathUtils.lerp(ambientBase, ambientPeak, t)
  const directionalColor = lerpColor(dirColorStart, dirColorEnd, t)

  // Camera descent illusion
  const camStart = new THREE.Vector3(0, 2.2, 8)
  const camEnd = new THREE.Vector3(0, theme === 'light' ? 0.8 : 1.2, theme === 'light' ? 5.5 : 6.5)
  const camPos = camStart.clone().lerp(camEnd, t)

  return (
    <div className="space-canvas" aria-hidden>
      <Canvas camera={{ position: camPos.toArray(), fov: 55 }} shadows>
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 10, 28]} />
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 8, 2]}
          intensity={THREE.MathUtils.lerp(0.25, 0.5, t)}
          color={directionalColor}
        />

        <Suspense fallback={null}>
          <GlowSun theme={theme} />
          <GroundSurface theme={theme} progress={t} />
          <GroundLights theme={theme} progress={t} />
          <Planet radius={4.5} size={0.55} color="#78c6f7" speed={0.35} />
          <Planet radius={6.5} size={0.75} color="#8b5cf6" speed={0.22} offset={1.2} />
          <Planet radius={8.2} size={0.65} color="#f97316" speed={0.18} offset={2.4} />
          <Planet radius={9.5} size={0.42} color="#22d3ee" speed={0.42} offset={0.8} />
          
          <Spaceship pathRadius={5.5} speed={0.4} offset={0.5} />
          <Spaceship pathRadius={7.2} speed={0.28} offset={2.1} />
          <Satellite pathRadius={6.0} speed={0.32} offset={1.5} />
          <Satellite pathRadius={8.8} speed={0.25} offset={3.2} />
          
          <Stars radius={80} depth={40} count={theme === 'light' ? 400 : 1200} factor={3.5} saturation={0} fade speed={1} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}
