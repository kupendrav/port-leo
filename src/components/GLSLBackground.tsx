import { Suspense, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Theme } from '../store/ui'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTheme;
  uniform float uReduced;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / max(uResolution.y, 1.0);
    p += uMouse * 0.12;

    float t = uTime * mix(0.22, 0.0, uReduced);

    float n1 = snoise(p * 1.15 + t * 0.18);
    float n2 = snoise(p * 2.4 - t * 0.12 + 8.0);
    float n3 = snoise(p * 4.2 + t * 0.08 + 18.0);
    float noise = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;

    float dist = length(p);
    float pulse = sin(dist * 3.2 - uTime * mix(0.7, 0.0, uReduced)) * 0.5 + 0.5;
    pulse *= exp(-dist * 0.85);

    vec3 dark1 = vec3(0.02, 0.027, 0.05);
    vec3 dark2 = vec3(0.03, 0.09, 0.2);
    vec3 dark3 = vec3(0.07, 0.28, 0.55);
    vec3 dark4 = vec3(0.12, 0.42, 0.78);

    vec3 light1 = vec3(0.98, 0.84, 0.8);
    vec3 light2 = vec3(0.78, 0.9, 0.98);
    vec3 light3 = vec3(1.0, 0.84, 1.0);
    vec3 light4 = vec3(0.45, 0.72, 1.0);

    vec3 col1 = mix(dark1, light1, uTheme);
    vec3 col2 = mix(dark2, light2, uTheme);
    vec3 col3 = mix(dark3, light3, uTheme);
    vec3 col4 = mix(dark4, light4, uTheme);

    float n = noise * 0.5 + 0.5;
    vec3 color = mix(col1, col2, smoothstep(0.0, 0.35, n));
    color = mix(color, col3, smoothstep(0.35, 0.62, n) * 0.55);
    color = mix(color, col4, pulse * mix(0.28, 0.16, uTheme));

    vec2 grid = abs(fract((uv + uMouse * 0.02) * 22.0 - 0.5) - 0.5);
    float gridLine = min(grid.x, grid.y);
    float gridMask = 1.0 - smoothstep(0.0, 0.028, gridLine);
    color += vec3(0.05, 0.18, 0.38) * gridMask * mix(0.16, 0.06, uTheme) * (1.0 - dist * 0.45);

    float scan = sin(gl_FragCoord.y * 1.4 + uTime * mix(1.4, 0.0, uReduced)) * mix(0.018, 0.008, uTheme);
    color += scan;

    vec2 starUv = uv * vec2(90.0, 56.0);
    vec2 cell = floor(starUv);
    float star = step(0.992, hash(cell));
    float twinkle = 0.55 + 0.45 * sin(uTime * mix(2.2, 0.0, uReduced) + hash(cell) * 20.0);
    color += star * twinkle * mix(vec3(0.75, 0.88, 1.0), vec3(1.0), uTheme) * 0.55;

    float vignette = 1.0 - dist * mix(0.42, 0.22, uTheme);
    color *= vignette;

    gl_FragColor = vec4(color, mix(0.92, 0.78, uTheme));
  }
`

function Nebula({ theme, reduced }: { theme: Theme; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const { viewport, size } = useThree()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const target = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTheme: { value: theme === 'light' ? 1 : 0 },
      uReduced: { value: reduced ? 1 : 0 },
    }),
    [theme, reduced],
  )

  useFrame(({ clock }) => {
    if (!material.current) return
    mouse.current.lerp(target.current, reduced ? 1 : 0.045)
    material.current.uniforms.uTime.value = reduced ? 0 : clock.elapsedTime
    material.current.uniforms.uResolution.value.set(size.width, size.height)
    material.current.uniforms.uMouse.value.copy(mouse.current)
    material.current.uniforms.uTheme.value = theme === 'light' ? 1 : 0
    material.current.uniforms.uReduced.value = reduced ? 1 : 0
  })

  return (
    <mesh scale={[viewport.width * 1.15, viewport.height * 1.15, 1]} position={[0, 0, -8]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function ParallaxRig({ reduced, children }: { reduced: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0, scroll: 0 })

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 0.55
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 0.3
    }
    const onScroll = () => {
      target.current.scroll = window.scrollY * 0.00045
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useFrame((_, delta) => {
    const node = group.current
    if (!node) return
    if (reduced) {
      node.position.set(0, 0, 0)
      return
    }
    const nextX = target.current.x
    const nextY = -target.current.y - target.current.scroll
    node.position.x += (nextX - node.position.x) * Math.min(1, delta * 2.2)
    node.position.y += (nextY - node.position.y) * Math.min(1, delta * 2.2)
  })

  return <group ref={group}>{children}</group>
}

type GLSLBackgroundProps = {
  theme?: Theme
  className?: string
}

export function GLSLBackground({ theme = 'dark', className }: GLSLBackgroundProps) {
  const reduced = usePrefersReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  const starCount = reduced ? 180 : isMobile ? 420 : 900

  return (
    <div className={className} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        frameloop={reduced ? 'demand' : 'always'}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor(0x000000, 0)
          invalidate()
        }}
      >
        <Suspense fallback={null}>
          <ParallaxRig reduced={reduced}>
            <Nebula theme={theme} reduced={reduced} />
            <Stars
              radius={70}
              depth={42}
              count={starCount}
              factor={isMobile ? 2.4 : 3.4}
              saturation={0}
              fade
              speed={reduced ? 0 : 0.35}
            />
          </ParallaxRig>
        </Suspense>
      </Canvas>
    </div>
  )
}
