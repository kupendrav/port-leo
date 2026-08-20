import { useCallback, useEffect, useRef, useState } from 'react'
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
import { projects, type Project, DOMAIN_ORDER } from './data/projects'
import './App.css'
import { gsap, useGSAP, ScrollTrigger, smoothScrollTo } from './lib/gsap'
import { LoadingScreen } from './components/LoadingScreen'
import { StarClickEffect } from './components/StarClickEffect'
import heroImage from './photos/image.jpeg'

// Google Drive photo IDs — converted to thumbnail URLs
const drivePhotoIds = [
  '125yU5rDweMtxOrGnqRc0samU1hLTw_hm',
  '14vGGA4q8Z3xe3IanBbwqGCS8E5CAFpeu',
  '15NcYx5KmGuuLSDu-AiHc3wG53BzIrtoi',
  '16ZXfXXEE-aG5_vamXeHDWgZd5_Pucz6p',
  '1DXoRQd0rVoZhV6Du7_bAuUDcoZwvzJ5m',
  '1Di9ZNPaCJyogoK9O74pKOdG7HeTlSxaZ',
  '1HnxCkPBlJsW7CeGnAdMAlshP8QYVTMn_',
  '1JjZkYJKPPzwNbVcTM08iVp_4pzXWVEvP',
  '1LOwWWei92bIEVSFc2BeLrKrGvBxjh_8q',
  '1MMiErtRLVKh9bR_qADglezdaKkgcYSIm',
  '1MYc0vdaSVfoO9qNbQQWWtV3JibTYY4HY',
  '1PQZn_Frx-Z545PZUrvCuVlvzhzuJXzyK',
  '1RCYslRZixJ7xvtGX0B6vjD4ZjTxqt_oV',
  '1UkTFAZKmHw4d3OyssuMe819LmquYNwPW',
  '1V4lTSYIeWsLCJxYMRnG4u7m1xtEmiAt-',
  '1Wrxi-5ldQlxdJgnaVwTagO3erEcLmyBU',
  '1XwV-pYTAeJGwDAkIO1372vcgIpGIdbmy',
  '1YKg77efNH0o_eWFrHF4tidQP0b78z2Wo',
  '1ZDjgLzd8bc3EgYdzF9K2wwTCYoXh7Y8V',
  '1ZMEMukb4rEaYdbQ0OhdbKY9d9Le9LBqZ',
  '1bG1erT3N-HtWKBXKrVZxNSZ3Ui-v4-k2',
  '1eKSRn26HUxsY1iV7GvjIdc2FF_jyXzFB',
  '1eRzIgd4T15c6rJmf_G7eEjR9S2LuHsyM',
  '1fDbGREwXpsn-nm2K16I5jm2NbSNrZPEE',
  '1fZGX4W8TVjcXuImyoiKWaBdA-FfrTqPC',
  '1iM88GqmerRifbYN6vhFFzCDBN1QtZRVP',
  '1ll4n47_VDubHmoRA7oznIx3eWCwNpjxC',
  '1s3EGNB50QvSAxs2GApgwFNM7JiKMyH5b',
  '1swRKMRL1jMhxtS1bH85FKHfiWO3DZLnT',
  '1tVIxEMEbR2uyOkfq3-Ai8_19taTJufHb',
  '1uBy7gzStDuvGY-81V7qcLxJiq4BE9MRm',
  '1w3A-teeITAfs5cS6p2ux-D-Uswk9dczo',
]
const drivePhotoUrls = drivePhotoIds.map(
  (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
)

const cvUrl = '/cv.pdf'
const contactEmail = 'kupendravr@zohomail.in'
const socialLinks = {
  github: 'https://github.com/kupendrav',
  linkedin: 'https://www.linkedin.com/in/kupendrav99/',
}

type Stat = {
  label: string
  value: string
  detail?: string
}

const stats: Stat[] = [
  { label: 'End-to-end AI systems', value: '8+', detail: 'ML ops, agentic workflows, API orchestration' },
  { label: 'Production deployments', value: '15+', detail: 'Web, API, data pipelines, automation' },
  { label: 'System integrations', value: '20+', detail: 'legacy workflows, ML platforms, cost optimizations' },
]

const focusChips = ['AI Engineering', 'ML Ops', 'System Architecture', 'Full-stack', 'Security']

const openSourceHighlights = [
  {
    title: '39 public GitHub repositories',
    description:
      'Maintains public work across TypeScript, Python, JavaScript, Java, Jupyter Notebook, and Solidity, with portfolio, AI/ML, security, Web3, and full-stack projects.',
  },
  {
    title: 'Tessera.io fork and ecosystem learning',
    description:
      'Publicly tracks work around an open-source collaborative developer sandbox focused on CRDT synchronization, secure remote execution, and human-AI pair programming.',
  },
  {
    title: 'Security challenge repositories',
    description:
      'Publishes CodeHawks Solidity challenge repos and security-focused tools such as SecureAudit, showing interest in smart-contract review and application security workflows.',
  },
]

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
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [isLoading, setIsLoading] = useState(true)
  const cursorRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<HTMLDivElement>(null)

  const [photoSrc, setPhotoSrc] = useState<string>(heroImage)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const lastIndexRef = useRef<number>(-1)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Click hero photo to cycle Drive images with a crossfade.
  const handleHeroPhotoClick = () => {
    const img = heroImgRef.current
    if (!img) return

    const idx = (lastIndexRef.current + 1) % drivePhotoUrls.length
    lastIndexRef.current = idx

    const nextUrl = drivePhotoUrls[idx]

    // Preload the image before transitioning
    const preload = new Image()
    preload.src = nextUrl
    preload.onload = () => {
      // GSAP crossfade: blur out → swap → blur in
      gsap.to(img, {
        opacity: 0,
        scale: 0.96,
        filter: 'blur(8px)',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setPhotoSrc(nextUrl)
          gsap.fromTo(
            img,
            { opacity: 0, scale: 1.05, filter: 'blur(8px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
          )
        },
      })
    }
    preload.onerror = () => {
      // If load fails, just try the next one
      lastIndexRef.current = idx
      handleHeroPhotoClick()
    }
  }

  // Simple cursor follow (core dot only)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let rafId = 0

    const handleMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const handleDown = () => cursor.classList.add('cursor-active')
    const handleUp = () => cursor.classList.remove('cursor-active')

    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
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
        gsap.from('.nav nav > a, .theme-toggle', {
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
        const sections = ['#hero', '#work', '#open-source', '#about', '#contact']
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
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <StarClickEffect />

      {/* Simplified cursor — single dot */}
      <div className="cursor-shell" aria-hidden>
        <div ref={cursorRef} className="cursor-core" />
      </div>

      <div className="page-shell" ref={scopeRef}>
        <header className="nav">
          <div className="brand" title="Kupendra Portfolio">KVR • Orbit</div>
          <nav>
            <a href="#work">Work</a>
            <a href="#open-source">Open Source</a>
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
              <p className="eyebrow">AI Engineering & Scalable Systems</p>
              <h1>
                Kupendra Venkatesh — Engineering AI systems that drive measurable product growth and operational efficiency.
              </h1>
              <p className="lede">
                I build end-to-end AI systems and automated workflows that bridge raw data to revenue. From predictive ML platforms intercepting customer churn to machine-to-machine orchestration layers, I focus on architectures with clear ROI—reducing operational drag and accelerating user productivity by 2-3x. Every technical choice is filtered through a business lens: does this reduce inference costs? Does it ship faster? Does it solve the core problem?
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
              <div
                className="photo-frame hero-photo-clickable"
                onClick={handleHeroPhotoClick}
                title="Click to shuffle photo"
              >
                <img
                  ref={heroImgRef}
                  src={photoSrc}
                  alt="Kupendra Venkatesh - Full-Stack Developer and AI/ML Engineer"
                  className={`hero-photo${photoSrc === heroImage ? ' greyscale' : ''}`}
                />
              </div>

              <div className="orbit-card">
                <div>
                  <p className="eyebrow">Current focus</p>
                  <h3>Building AI-First Platforms for Scale</h3>
                  <p className="small">
                     Engineering production AI systems that move the needle—cost optimization, seamless legacy integration, and measurable product growth.
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
                <p className="panel-intro">
                  Updated from the public GitHub profile at github.com/kupendrav, with direct links to repositories and live demos where available.
                </p>
              </div>
              <a className="button subtle" href={`${socialLinks.github}?tab=repositories`} target="_blank" rel="noreferrer">
                <LuGithub aria-hidden />
                View GitHub
              </a>
            </div>

            {DOMAIN_ORDER.map((domain) => {
              const items = projects.filter((p) => p.domain === domain)
              if (items.length === 0) return null
              return (
                <div key={domain} className="domain-section">
                  <h3 className="domain-heading">{domain}</h3>
                  <div className="projects-grid">
                    {items.map((project) => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                  </div>
                </div>
              )
            })}
          </section>

          <section id="open-source" className="panel open-source-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Open source</p>
                <h2>Public contributions and learning in the open</h2>
                <p className="panel-intro">
                  Kupendra&apos;s GitHub profile shows an active public portfolio of 39 repositories, open-source forks, security challenge repos, and project code spanning AI, full-stack, Web3, and data science.
                </p>
              </div>
              <a className="button subtle" href={socialLinks.github} target="_blank" rel="noreferrer">
                <LuGithub aria-hidden />
                Profile
              </a>
            </div>
            <div className="contribution-grid">
              {openSourceHighlights.map((item) => (
                <article key={item.title} className="contribution-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="about" className="panel split">
            <div>
              <p className="eyebrow">About Kupendra Venkatesh</p>
              <h2>Engineering AI systems for measurable ROI</h2>
              <p className="lede">
                Most AI engineering stops at building expensive wrappers. I engineer end-to-end AI systems and automated workflows that drive revenue—reducing operational drag, intercepting customer churn, and accelerating productivity by 2-3x. Every decision is grounded in unit economics.
              </p>
              <ul className="bullets">
                <li><b>End-to-End AI Systems:</b> Designed predictive ML platforms for churn interception, agentic workflows for task automation, and cost-optimized inference pipelines—each with measurable ROI metrics.</li>
                <li><b>System Architecture:</b> Built resilient architectures integrating legacy workflows with modern AI—API orchestration, data pipeline optimization, and machine-to-machine automation layers that scale.</li>
                <li><b>Production ML Ops:</b> Deployed ML models to production at scale—monitoring, versioning, cost modeling, and real-time inference infrastructure designed for reliability and cost efficiency.</li>
                <li><b>Business-Driven Engineering:</b> Technical choices filtered through ROI: does this reduce inference costs? Does it ship faster? Does it solve the core problem or just look impressive?</li>
              </ul>
            </div>
            <div className="stack-card">
              <p className="eyebrow">Toolbox</p>

              <h4 className="stack-title">Languages</h4>
              <div className="chip-grid">
                {['Python', 'TypeScript', 'JavaScript', 'SQL'].map(
                  (item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ),
                )}
              </div>

              <h4 className="stack-title">AI / ML Stack</h4>
              <div className="chip-grid">
                {['LLMs', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'].map(
                  (item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ),
                )}
              </div>

              <h4 className="stack-title">Frameworks & Tools</h4>
              <div className="chip-grid">
                {['React', 'Node.js', 'FastAPI', 'PostgreSQL', 'Anthropic SDK'].map(
                  (item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ),
                )}
              </div>

              <h4 className="stack-title">Production & Ops</h4>
              <div className="chip-grid">
                {['Docker', 'CI/CD', 'Monitoring', 'Cost Optimization', 'System Architecture'].map(
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
              <h2>Let&apos;s build AI at scale</h2>
              <p className="lede">
                Building an AI-first platform and want to bounce ideas around system architecture or product growth? Let's connect.
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
