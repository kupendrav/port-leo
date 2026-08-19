import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { gsap, useGSAP, ScrollTrigger, smoothScrollTo } from './lib/gsap'
import { LoadingScreen } from './components/LoadingScreen'
import { StarClickEffect } from './components/StarClickEffect'
import { Nav } from './components/Nav'

import { Hero } from './components/Hero'
import { Work } from './components/Work'
import { OpenSource } from './components/OpenSource'
import { About } from './components/About'
import { Gallery } from './components/Gallery'
import { Contact } from './components/Contact'
import { useUI } from './store/ui'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

const SpaceBackground = lazy(() =>
  import('./components/SpaceBackground').then((module) => ({ default: module.SpaceBackground })),
)

function App() {
  const { theme, setMenuOpen } = useUI()
  const [isLoading, setIsLoading] = useState(true)
  const cursorRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let rafId = 0

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
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
  }, [reduced])

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!reduced) {
          gsap.fromTo(
            '.brand',
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.6 },
          )

          gsap.from('.nav-desktop .nav-link, .nav-desktop .theme-toggle, .nav-mobile-tools', {
            y: -8,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
          })

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

          gsap.from('.photo-frame', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' })

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

          gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
            gsap.from(card, {
              y: 24,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            })
          })
        }

        const links = gsap.utils.toArray<HTMLAnchorElement>(".nav a[href^='#'], .hero .button[href^='#']")
        links.forEach((anchor) => {
          const onClick = (event: Event) => {
            const href = anchor.getAttribute('href') || ''
            if (href.startsWith('#')) {
              event.preventDefault()
              setMenuOpen(false)
              smoothScrollTo(href, reduced ? 0 : 0.9)
            }
          }
          anchor.addEventListener('click', onClick)
          ScrollTrigger.create({
            trigger: document.body,
            onKill: () => anchor.removeEventListener('click', onClick),
          })
        })

        const sections = ['#work', '#open-source', '#about', '#gallery', '#contact']
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
    { scope: scopeRef, dependencies: [reduced, isLoading] },
  )

  return (
    <div className={`app${reduced ? ' reduced-motion' : ''}`} data-theme={theme}>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && (
        <Suspense fallback={null}>
          <SpaceBackground theme={theme} />
        </Suspense>
      )}
      <StarClickEffect />

      {!reduced && (
        <div className="cursor-shell" aria-hidden>
          <div ref={cursorRef} className="cursor-core" />
        </div>
      )}

      <a className="skip-link" href="#hero">
        Skip to content
      </a>

      <div className="page-shell" ref={scopeRef}>
        <Nav />
        <main id="main">
          <Hero />
          <Work />
          <OpenSource />
          <About />
          <Gallery />
          <Contact />
        </main>
      </div>
    </div>
  )
}

export default App
