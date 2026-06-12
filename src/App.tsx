import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  LuArrowUpRight,
  LuGithub,
  LuMail,
  LuRadio,
  LuRocket,
  LuSatellite,
  LuVolume2,
  LuVolumeX,
  LuZap,
} from 'react-icons/lu'
import type { Points } from 'three'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, MathUtils } from 'three'
import { gsap, ScrollTrigger } from './lib/gsap'
import { projects } from './data/projects'
import './App.css'

type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

type Achievement = {
  id: string
  title: string
  xp: number
}

const username = import.meta.env.VITE_GITHUB_USERNAME || 'kupendrav'
const contactEmail = 'kupendravr@zohomail.in'

const achievements: Achievement[] = [
  { id: 'first-contact', title: 'First Contact', xp: 20 },
  { id: 'neural-link', title: 'Neural Link', xp: 35 },
  { id: 'mission-launched', title: 'Mission Launched', xp: 45 },
  { id: 'star-collector', title: 'Star Collector', xp: 60 },
  { id: 'transmission-sent', title: 'Transmission Sent', xp: 70 },
  { id: 'galaxy-brain', title: 'Galaxy Brain', xp: 90 },
  { id: 'god-mode', title: 'God Mode', xp: 150 },
]

const skillGroups = [
  ['AI', 'LLMs', 'ML Ops', 'Pandas', 'TensorFlow'],
  ['React', 'TypeScript', 'Node', 'FastAPI', 'PostgreSQL'],
  ['Docker', 'CI/CD', 'Cloud', 'Automation', 'Systems'],
]

const timeline = [
  ['2026', 'AI-first systems', 'Designing automation layers, inference-aware APIs, and product loops with measurable ROI.'],
  ['2025', 'Production builds', 'Shipping full-stack platforms, dashboards, and ML-enabled workflows across real users.'],
  ['2024', 'Hackathon orbit', 'Building fast, presenting publicly, and turning event pressure into product instincts.'],
]

const equation = 'Psi(Kupendra) = int [nabla^2 phi + lambda AI(t) + sigma code(n)] d3x dt'
const fallbackRepos: Repo[] = projects.map((project, index) => ({
  id: index + 1,
  name: project.title,
  description: project.description,
  html_url: project.links.find((link) => link.label.toLowerCase().includes('github'))?.href || socialGithub(),
  homepage: project.links.find((link) => !link.label.toLowerCase().includes('github'))?.href || null,
  language: project.tech[0] || 'TypeScript',
  stargazers_count: Math.max(1, project.tech.length + index),
  forks_count: Math.max(0, Math.floor(index / 2)),
  updated_at: new Date(Date.now() - index * 86400000 * 9).toISOString(),
}))

function socialGithub() {
  return `https://github.com/${username}`
}

function GalaxyField() {
  const pointsRef = useRef<Points>(null)
  const geometry = useMemo(() => {
    const particleCount = window.matchMedia('(max-width: 720px)').matches ? 18000 : 70000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const colorA = new Color('#00f5ff')
    const colorB = new Color('#f59e0b')
    const colorC = new Color('#e2e8f0')

    for (let i = 0; i < particleCount; i += 1) {
      const angle = i * 2.399963
      const radius = Math.sqrt(i / particleCount) * 42
      const jitter = Math.sin(i * 12.9898) * 0.6
      positions[i * 3] = Math.cos(angle) * radius + jitter
      positions[i * 3 + 1] = (Math.sin(i * 0.37) + Math.cos(i * 0.11)) * 1.1
      positions[i * 3 + 2] = Math.sin(angle) * radius + Math.cos(i * 78.23) * 0.8

      const mix = i / particleCount
      const color = mix < 0.5 ? colorA.clone().lerp(colorC, mix * 2) : colorC.clone().lerp(colorB, (mix - 0.5) * 2)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const bufferGeometry = new BufferGeometry()
    bufferGeometry.setAttribute('position', new BufferAttribute(positions, 3))
    bufferGeometry.setAttribute('color', new BufferAttribute(colors, 3))
    return bufferGeometry
  }, [])

  useFrame(({ clock, pointer, camera }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.elapsedTime * 0.025
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.05
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 2.2, 0.035)
    camera.position.y = MathUtils.lerp(camera.position.y, pointer.y * 1.1, 0.035)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
      <mesh rotation={[0.9, 0.2, 0.4]}>
        <torusKnotGeometry args={[4.2, 0.08, 220, 16, 2, 5]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.22} />
      </mesh>
    </>
  )
}

function EquationRain() {
  const symbols = ['E=mc^2', 'd psi / dt', 'sigma(Wx+b)', 'nabla x B', 'int AI(t)', 'lambda -> code', 'pi r^2']

  return (
    <div className="equation-rain" aria-hidden>
      {Array.from({ length: 26 }).map((_, index) => (
        <span
          key={index}
          style={{
            left: `${(index * 37) % 100}%`,
            animationDelay: `${(index % 9) * -1.3}s`,
            animationDuration: `${10 + (index % 7)}s`,
          }}
        >
          {symbols[index % symbols.length]}
        </span>
      ))}
    </div>
  )
}

function QuantumCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame = 0

    const move = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
    }

    const down = () => ring.classList.add('is-clicking')
    const up = () => ring.classList.remove('is-clicking')
    const over = (event: Event) => {
      const target = event.target as HTMLElement
      ring.classList.toggle('is-hovering', Boolean(target.closest('a, button, input, textarea')))
    }
    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('mouseover', over)
    tick()

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="quantum-cursor" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

function Hud({
  xp,
  unlocked,
  audioEnabled,
  onToggleAudio,
}: {
  xp: number
  unlocked: string[]
  audioEnabled: boolean
  onToggleAudio: () => void
}) {
  const level = Math.max(1, Math.floor(xp / 120) + 1)
  const progress = xp % 120

  return (
    <aside className="hud" aria-label="Explorer progress">
      <div>
        <span>EXPLORER LVL {level}</span>
        <progress value={progress} max={120} />
      </div>
      <span>XP {xp}</span>
      <span>{unlocked.length}/{achievements.length} ACH</span>
      <button type="button" onClick={onToggleAudio} aria-label="Toggle ambient audio">
        {audioEnabled ? <LuVolume2 aria-hidden /> : <LuVolumeX aria-hidden />}
      </button>
    </aside>
  )
}

function LoadingScreen({ ready }: { ready: boolean }) {
  const facts = [
    'INITIALIZING QUANTUM MATRIX',
    'SOLVING ORBITAL PATHS',
    'COMPILING STARLIGHT',
    'ALIGNING NEURAL VECTORS',
  ]
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (ready) return
    const id = window.setInterval(() => setProgress((value) => Math.min(value + 7, 96)), 160)
    return () => window.clearInterval(id)
  }, [ready])

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div className="quantum-loader" exit={{ opacity: 0, y: '-8%' }} transition={{ duration: 0.8 }}>
          <div className="binary-stars">
            <span />
            <span />
          </div>
          <div className="orbit-progress">
            <i style={{ transform: `rotate(${progress * 3.6}deg)` }} />
          </div>
          <p>{facts[Math.floor(progress / 25) % facts.length]}... {progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MissionCard({ repo, index, onReward }: { repo: Repo; index: number; onReward: (id: string) => void }) {
  const live = repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : ''

  return (
    <motion.article
      className="mission-card"
      initial={{ opacity: 0, y: 90, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay: Math.min(index * 0.04, 0.35), ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onReward('star-collector')}
    >
      <div className="mission-card__shine" />
      <div className="mission-card__top">
        <span>MISSION {String(index + 1).padStart(2, '0')}</span>
        <b>{repo.language || 'Code'}</b>
      </div>
      <h3>{repo.name.replaceAll('-', ' ')}</h3>
      <p>{repo.description || 'Experimental build from the GitHub constellation.'}</p>
      <div className="mission-actions">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            onClick={() => onReward('mission-launched')}
            aria-label={`Live demo of Kupendra project ${repo.name}`}
          >
            <LuRocket aria-hidden />
            Live Demo
          </a>
        )}
        <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`GitHub repository for Kupendra project ${repo.name}`}>
          <LuGithub aria-hidden />
          GitHub
        </a>
      </div>
    </motion.article>
  )
}

function ContactTerminal({ onSubmit }: { onSubmit: () => void }) {
  const [message, setMessage] = useState('')

  return (
    <form
      className="contact-terminal"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
        window.location.href = `mailto:${contactEmail}?subject=Transmission from portfolio&body=${encodeURIComponent(message)}`
      }}
    >
      <label>
        Signal
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Describe the system you want to build..."
          required
        />
      </label>
      <div className="waveform" aria-hidden>
        {Array.from({ length: 28 }).map((_, index) => (
          <span key={index} style={{ height: `${18 + ((message.length + index * 7) % 42)}px` }} />
        ))}
      </div>
      <button type="submit">
        <LuSatellite aria-hidden />
        Establish Transmission
      </button>
    </form>
  )
}

function App() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos)
  const [siteReady, setSiteReady] = useState(false)
  const [xp, setXp] = useState(() => Number(localStorage.getItem('kvr-xp') || 0))
  const [unlocked, setUnlocked] = useState<string[]>(() => JSON.parse(localStorage.getItem('kvr-achievements') || '[]') as string[])
  const [toast, setToast] = useState('')
  const [audioEnabled, setAudioEnabled] = useState(true)
  const audioRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const oscillatorRefs = useRef<OscillatorNode[]>([])
  const xpRef = useRef(xp)
  const unlockedRef = useRef(unlocked)

  const unlock = useCallback((id: string) => {
    const achievement = achievements.find((item) => item.id === id)
    if (!achievement || unlockedRef.current.includes(id)) return
    const nextUnlocked = [...unlockedRef.current, id]
    const nextXp = xpRef.current + achievement.xp
    unlockedRef.current = nextUnlocked
    xpRef.current = nextXp
    setUnlocked(nextUnlocked)
    setXp(nextXp)
    setToast(achievement.title)
    localStorage.setItem('kvr-achievements', JSON.stringify(nextUnlocked))
    localStorage.setItem('kvr-xp', String(nextXp))
    window.setTimeout(() => setToast(''), 2600)
  }, [])

  const startAudio = useCallback((enabled: boolean) => {
    if (!audioRef.current) {
      const context = new AudioContext()
      const low = context.createOscillator()
      const shimmer = context.createOscillator()
      const filter = context.createBiquadFilter()
      const gain = context.createGain()
      low.type = 'sine'
      low.frequency.value = 64
      shimmer.type = 'triangle'
      shimmer.frequency.value = 128
      filter.type = 'lowpass'
      filter.frequency.value = 420
      filter.Q.value = 0.7
      gain.gain.value = 0
      low.connect(filter)
      shimmer.connect(filter)
      filter.connect(gain)
      gain.connect(context.destination)
      low.start()
      shimmer.start()
      audioRef.current = context
      gainRef.current = gain
      filterRef.current = filter
      oscillatorRefs.current = [low, shimmer]
    }
    const context = audioRef.current
    if (context?.state === 'suspended') void context.resume()
    if (context && gainRef.current && filterRef.current) {
      gainRef.current.gain.setTargetAtTime(enabled ? 0.075 : 0, context.currentTime, 0.12)
      filterRef.current.frequency.setTargetAtTime(enabled ? 760 : 320, context.currentTime, 0.4)
    }
  }, [])

  useEffect(() => {
    const readyTimer = window.setTimeout(() => setSiteReady(true), 1400)
    return () => window.clearTimeout(readyTimer)
  }, [])

  useEffect(() => {
    if (!audioEnabled) return

    const startOnGesture = () => {
      startAudio(true)
      window.removeEventListener('pointerdown', startOnGesture)
      window.removeEventListener('keydown', startOnGesture)
    }

    window.addEventListener('pointerdown', startOnGesture, { once: true })
    window.addEventListener('keydown', startOnGesture, { once: true })

    return () => {
      window.removeEventListener('pointerdown', startOnGesture)
      window.removeEventListener('keydown', startOnGesture)
    }
  }, [audioEnabled, startAudio])

  useEffect(() => {
    const firstContactTimer = window.setTimeout(() => unlock('first-contact'), 0)
    const controller = new AbortController()
    const headers: HeadersInit = import.meta.env.VITE_GITHUB_TOKEN
      ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
      : {}

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers,
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: Repo[]) => {
        const publicRepos = data.filter((repo) => !repo.name.includes('.github.io')).slice(0, 12)
        if (publicRepos.length) setRepos(publicRepos)
      })
      .catch(() => setRepos(fallbackRepos))

    return () => {
      window.clearTimeout(firstContactTimer)
      controller.abort()
    }
  }, [unlock])

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-reward]')
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => unlock(section.dataset.reward || ''),
      }),
    )
    gsap.from('.reveal', {
      y: 64,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.hero-panel', start: 'top center' },
    })

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [unlock])

  useEffect(() => {
    const timer = window.setTimeout(() => unlock('galaxy-brain'), 300000)
    const keys: string[] = []
    const konami = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a'
    const keydown = (event: KeyboardEvent) => {
      keys.push(event.key)
      keys.splice(0, keys.length - 10)
      if (keys.join(' ') === konami) document.body.classList.add('god-mode')
      if (keys.join(' ') === konami) unlock('god-mode')
    }
    window.addEventListener('keydown', keydown)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', keydown)
    }
  }, [unlock])

  const toggleAudio = () => {
    const next = !audioEnabled
    startAudio(next)
    setAudioEnabled(next)
  }

  useEffect(() => {
    return () => {
      oscillatorRefs.current.forEach((oscillator) => oscillator.stop())
      void audioRef.current?.close()
    }
  }, [])

  return (
    <div className={`experience-shell${audioEnabled ? ' audio-on' : ''}`}>
      <LoadingScreen ready={siteReady} />
      <QuantumCursor />
      <Hud xp={xp} unlocked={unlocked} audioEnabled={audioEnabled} onToggleAudio={toggleAudio} />
      <AnimatePresence>
        {toast && (
          <motion.div className="achievement-toast" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
            <LuZap aria-hidden />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero-panel" aria-label="The Void Awakens">
        <Canvas className="galaxy-canvas" camera={{ position: [0, 2.4, 12], fov: 58 }} dpr={[1, 1.8]}>
          <color attach="background" args={['#000308']} />
          <GalaxyField />
        </Canvas>
        <EquationRain />
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#about" aria-label="About Kupendra identity core">Identity</a>
          <a href="#projects" aria-label="Explore Kupendra GitHub projects">Missions</a>
          <a href="#skills" aria-label="View Kupendra skills matrix">Matrix</a>
          <a href="#contact" aria-label="Contact Kupendra">Transmit</a>
        </nav>
        <div className="hero-copy">
          <div className="hero-avatar reveal" aria-label="Kupendra profile photo hologram">
            <img src="/logo.jpeg" alt="Kupendra logo with astronauts and monogram" />
            <span aria-hidden />
          </div>
          <h1 className="reveal">Kupendra V R</h1>
          <p className="hero-equation reveal">{equation}</p>
          <p className="hero-lede reveal">
            Engineering AI systems, automation workflows, and full-stack products with the gravity of real business outcomes.
          </p>
          <div className="hero-actions reveal">
            <a href="#projects" aria-label="Explore Kupendra mission projects">
              <LuRocket aria-hidden />
              Enter Mission Hangar
            </a>
            <a href={`mailto:${contactEmail}`} aria-label="Contact Kupendra by email">
              <LuMail aria-hidden />
              Open Channel
            </a>
          </div>
        </div>
      </section>

      <main>
        <section id="about" className="section-band neural-core" data-reward="neural-link" aria-label="About Kupendra">
          <div className="neural-orb" aria-hidden>
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} style={{ '--i': index } as CSSProperties} />
            ))}
          </div>
          <div className="section-copy">
            <p className="eyebrow">Neural Identity Core</p>
            <h2>Kupendra builds useful AI with an operator&apos;s bias.</h2>
            <p>
              I build from the model layer to the user workflow: inference-aware APIs, automations that remove drag,
              and interfaces that make complex systems feel controllable.
            </p>
            <div className="stat-strip">
              <strong>8+ AI systems</strong>
              <strong>15+ deployments</strong>
              <strong>20+ integrations</strong>
            </div>
          </div>
        </section>

        <section id="projects" className="section-band mission-hangar" aria-label="Kupendra projects and GitHub repositories">
          <div className="section-copy">
            <p className="eyebrow">The Mission Hangar</p>
            <h2>Kupendra GitHub missions update live with resilient fallbacks.</h2>
          </div>
          <div className="mission-grid">
            {repos.slice(0, 12).map((repo, index) => (
              <MissionCard key={repo.id} repo={repo} index={index} onReward={unlock} />
            ))}
          </div>
        </section>

        <section id="skills" className="section-band skill-matrix" aria-label="Kupendra skills">
          <div className="section-copy">
            <p className="eyebrow">Quantum Skill Matrix</p>
            <h2>Kupendra skill domains orbit product-grade engineering.</h2>
          </div>
          <div className="skill-orbits">
            {skillGroups.flat().map((skill, index) => (
              <button key={skill} type="button" style={{ '--i': index } as CSSProperties}>
                {skill}
              </button>
            ))}
          </div>
        </section>

        <section className="section-band continuum" aria-label="Kupendra experience timeline">
          <div className="section-copy">
            <p className="eyebrow">Space-Time Continuum</p>
            <h2>Kupendra experience through pressure, shipping, and polish.</h2>
          </div>
          <div className="timeline">
            {timeline.map(([year, title, body]) => (
              <article key={year}>
                <span>{year}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-band contact-band" aria-label="Contact Kupendra">
          <div className="earth-scene" aria-hidden>
            <span className="earth" />
            <span className="satellite">
              <LuSatellite aria-hidden />
            </span>
          </div>
          <div className="section-copy">
            <p className="eyebrow">Establish Transmission</p>
            <h2>Contact Kupendra for AI systems, automation, and product builds.</h2>
          </div>
          <ContactTerminal onSubmit={() => unlock('transmission-sent')} />
          <a className="direct-mail" href={`mailto:${contactEmail}`} aria-label="Email Kupendra directly">
            <LuRadio aria-hidden />
            {contactEmail}
            <LuArrowUpRight aria-hidden />
          </a>
        </section>
      </main>
      <footer className="seo-footer">
        Kupendra (KVR) is a full-stack developer, AI/ML engineer, data science builder, Web3 experimenter, and automation-focused engineer based in India.
      </footer>
    </div>
  )
}

export default App
