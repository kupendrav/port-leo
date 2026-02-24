import { useEffect, useRef, useState } from 'react'
import {
  LuArrowUpRight,
  LuDownload,
  LuGithub,
  LuLink2,
  LuMail,
  LuMapPin,
  LuSend,
  LuMoon,
  LuSun,
} from 'react-icons/lu'
import { projects, type Project } from './data/projects'
import './App.css'
import { gsap, useGSAP, ScrollTrigger, smoothScrollTo } from './lib/gsap'

const cvUrl = '/cv.pdf'
const contactEmail = 'kupendravr@zohomail.in'
const socialLinks = {
  github: 'https://github.com/kupendrav',
  linkedin: 'https://www.linkedin.com/in/kupendrav99/',
  kaggle: 'https://www.kaggle.com/kupendrav',
  twitter: 'https://x.com/kupendrav99',
  cyfrin: 'https://profiles.cyfrin.io/u/365smile',
}

type Stat = {
  label: string
  value: string
  detail?: string
}

const stats: Stat[] = [
  { label: 'Full-stack builds', value: '15+', detail: 'Web, AI, and Web3' },
  { label: 'Security & audits', value: '4', detail: 'automation & checks' },
  { label: 'Data & ML', value: '6', detail: 'experiments & notebooks' },
]

const focusChips = ['Full-stack', 'AI/ML', 'Security', 'Web3', 'Product polish']

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <div>
          <p className="eyebrow">Featured build</p>
          <h3>{project.title}</h3>
        </div>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <LuArrowUpRight aria-hidden />
            </a>
          ))}
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="tag-row">
        {project.tech.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [userName, setUserName] = useState<string>('')
  const [showNameModal, setShowNameModal] = useState(true)
  const [nameInput, setNameInput] = useState('')
  const cursorRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const flameRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<HTMLDivElement>(null)

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nameInput.trim()) {
      setUserName(nameInput.trim())
      setShowNameModal(false)
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    const cursor = cursorRef.current
    const orbit = orbitRef.current
    const flame = flameRef.current
    if (!cursor || !orbit || !flame) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let rafId = 0

    const handleMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const handleDown = () => {
      cursor.classList.add('cursor-active')
      flame.classList.add('cursor-flame-active')
    }

    const handleUp = () => {
      cursor.classList.remove('cursor-active')
      flame.classList.remove('cursor-flame-active')
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      flame.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      const t = performance.now() * 0.0015
      orbit.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${t}rad)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      cancelAnimationFrame(rafId)
    }
  }, [])



  // GSAP-powered UI animations
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Brand text intro
        gsap.fromTo(
          '.brand',
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.6 },
        )

        // Nav items stagger in
        gsap.from('.nav nav > a, .nav .social-icons .icon-link, .theme-toggle', {
          y: -8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        })

        // Hero copy stagger
        const heroOrder = [
          '.hero .eyebrow',
          '.hero h1',
          '.hero .lede',
          '.hero .cta-row .button',
          '.hero .chip-row .pill',
          '.hero .stat-card',
        ]
        gsap.set(heroOrder.join(','), { opacity: 0, y: 16 })
        gsap.to(heroOrder, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.7,
          stagger: 0.08,
        })

        // Photo slight float
        gsap.from('.photo-frame', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' })

        // Panels reveal on scroll
        gsap.utils.toArray<HTMLElement>('.panel').forEach((panel) => {
          gsap.from(panel, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        // Project cards stagger on scroll + hover polish
        gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
          gsap.from(card, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          })

          const enter = () => gsap.to(card, { y: -4, duration: 0.18, ease: 'power2.out' })
          const leave = () => gsap.to(card, { y: 0, duration: 0.2, ease: 'power2.out' })
          card.addEventListener('mouseenter', enter)
          card.addEventListener('mouseleave', leave)
          ScrollTrigger.create({ trigger: card, onKill: () => {
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseleave', leave)
          } })
        })

        // Smooth scroll for internal anchor links
        const links = gsap.utils.toArray<HTMLAnchorElement>(".nav a[href^='#'], .hero .button[href^='#']")
        links.forEach((a) => {
          a.addEventListener('click', (e) => {
            const href = a.getAttribute('href') || ''
            if (href.startsWith('#')) {
              e.preventDefault()
              const target = href
              smoothScrollTo(target, 0.9)
            }
          })
        })

        // Active link highlight per section
        const sections = ['#hero', '#work', '#about', '#contact']
        sections.forEach((sel) => {
          const section = document.querySelector(sel)
          const navLink = document.querySelector(`.nav a[href='${sel}']`)
          if (!section || !navLink) return
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => navLink.classList.add('active'),
            onEnterBack: () => navLink.classList.add('active'),
            onLeave: () => navLink.classList.remove('active'),
            onLeaveBack: () => navLink.classList.remove('active'),
          })
        })
      }, scopeRef)

      return () => ctx.revert()
    },
    { scope: scopeRef },
  )

  return (
    <div className="app" data-theme={theme}>
      {/* Name Entry Modal */}
      {showNameModal && (
        <div className="name-modal-overlay">
          <div className="name-modal">
            <div className="modal-stars" aria-hidden />
            <h2>🚀 Welcome to the Spaceship</h2>
            <p className="modal-subtitle">Enter the name to enter the space ship</p>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name..."
                className="name-input"
                autoFocus
                maxLength={30}
              />
              <button type="submit" className="button primary modal-btn">
                Launch 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Vertical Name Display */}
      {userName && (
        <div className="vertical-name" aria-hidden>
          {userName}
        </div>
      )}
      
      <div className="cursor-shell" aria-hidden>
        <div ref={flameRef} className="cursor-flame" />
        <div ref={orbitRef} className="cursor-orbit">
          <span className="cursor-orbit-dot" />
        </div>
        <div ref={cursorRef} className="cursor-core" />
      </div>

      <div className="page-shell" ref={scopeRef}>
        <header className="nav">
          <div className="brand">KVR • Orbit</div>
          <nav>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <LuSun aria-hidden /> : <LuMoon aria-hidden />}
              <span className="sr-only">Toggle theme</span>
            </button>
          </nav>
        </header>

        <main>
          <section id="hero" className="hero">
            <div className="hero-copy">
              <p className="eyebrow">Space-inspired portfolio</p>
              <h1>
                Crafting fast, reliable products with a love for stars, orbits, and immersive UI.
              </h1>
              <p className="lede">
                I design and ship end-to-end experiences across web, AI/ML, security automation, and Web3. This
                portfolio pulls my repos, a cosmic Three.js scene, and a CV you can download.
              </p>

              <div className="cta-row">
                <a className="button primary" href={cvUrl} download>
                  <LuDownload aria-hidden />
                  Download CV
                </a>
                <a className="button ghost" href="#contact">
                  <LuSend aria-hidden />
                  Let&apos;s talk
                </a>
              </div>

              <div className="chip-row">
                {focusChips.map((chip) => (
                  <span key={chip} className="pill muted">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="stat-grid">
                {stats.map((item) => (
                  <div key={item.label} className="stat-card">
                    <p className="stat-value">{item.value}</p>
                    <p className="stat-label">{item.label}</p>
                    <p className="stat-detail">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="photo-frame flip-card" title="Train your Back">
                <div className="flip-inner">
                  <div className="flip-front">
                    <div
                      className="photo"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 50% 30%, rgba(249, 215, 112, 0.35), rgba(5, 6, 10, 0.2)), url(/profile.jpeg)',
                      }}
                    />
                  </div>
                  <div className="flip-back">
                    <p className="flip-quote">“keizoku wa chikara nari”</p>
                  </div>
                </div>
              </div>

              <div className="orbit-card">
                <div>
                  <p className="eyebrow">Current focus</p>
                  <h3>Shipping secure, animated experiences</h3>
                  <p className="small">
                    Blending Three.js visuals with product polish, responsive layouts, and automation-first workflows.
                  </p>
                </div>
                <div className="orbit-links">
                  <a href="https://github.com/kupendrav?tab=repositories" target="_blank" rel="noreferrer">
                    <LuLink2 aria-hidden />
                    All repos
                  </a>
                  <a href={`mailto:${contactEmail}`}>
                    <LuMail aria-hidden />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="work" className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Projects from the GitHub constellation</h2>
              </div>
              <a className="button subtle" href={`${socialLinks.github}?tab=repositories`} target="_blank" rel="noreferrer">
                <LuGithub aria-hidden />
                View GitHub
              </a>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>

          <section id="about" className="panel split">
            <div>
              <p className="eyebrow">About</p>
              <h2>Builder with a cosmic streak</h2>
              <p className="lede">
                I like pairing strong fundamentals with playful UI. From security automation to AI-driven helpers and
                Web3 experiments, I ship end-to-end: architecture, product thinking, code, and polish.
              </p>
              <ul className="bullets">
                <li>Architected secure flows across payments, audits, and profile protection.</li>
                <li>Built AI-driven utilities for diagnostics, reinstatements, and content improvement.</li>
                <li>Shipped dashboards, habit tools, and student ops systems with responsive UX.</li>
              </ul>
            </div>
            <div className="stack-card">
              <p className="eyebrow">Toolbox</p>
              <div className="chip-grid">
                {['TypeScript', 'React', 'Vite', 'Three.js', '@react-three/fiber', 'Framer Motion', 'Node', 'Solidity', 'Python', 'Data notebooks'].map(
                  (item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </section>

          <section id="contact" className="panel contact">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s collaborate</h2>
              <p className="lede">
                Need a full-stack build with immersive visuals and secure foundations? I can help.
              </p>
              <div className="contact-actions">
                <a className="button primary" href={`mailto:${contactEmail}`}>
                  <LuMail aria-hidden />
                  {contactEmail}
                </a>
                <div className="social-icons">
                  <a href={socialLinks.github} target="_blank" rel="noreferrer" className="icon-link" title="GitHub">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png" alt="" aria-hidden />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="icon-link" title="LinkedIn">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png" alt="" aria-hidden />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="icon-link" title="X">
                    <img src="/twitter.png" alt="" aria-hidden />
                    <span className="sr-only">X</span>
                  </a>
                </div>
                <span className="location">
                  <LuMapPin aria-hidden /> Planet Earth, Milky Way
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
