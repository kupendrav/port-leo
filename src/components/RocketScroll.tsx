import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

type RocketScrollProps = {
  theme: 'dark' | 'light'
}

export function RocketScroll({ theme }: RocketScrollProps) {
  const rocketRef = useRef<HTMLDivElement>(null)
  const flameRef = useRef<HTMLDivElement>(null)
  const flame2Ref = useRef<HTMLDivElement>(null)
  const flame3Ref = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastScrollY = useRef(0)
  const flameTimeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / scrollHeight
      setScrollProgress(progress)

      // Detect scroll direction
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      lastScrollY.current = currentScrollY

      // Rotate rocket based on direction (up when scrolling up, down when scrolling down)
      if (rocketRef.current) {
        const targetRotation = isScrollingDown ? 180 : 0
        gsap.to(rocketRef.current, {
          rotationX: targetRotation,
          duration: 0.35,
          ease: 'power2.out',
        })
      }

      // Animate flames based on scroll direction and speed
      if (flameRef.current && flame2Ref.current && flame3Ref.current) {
        // Kill existing animation
        flameTimeline.current?.kill()

        if (isScrollingDown) {
          // Launching up - intense flames below rocket
          flameTimeline.current = gsap.timeline()
          flameTimeline.current.to(
            [flameRef.current, flame2Ref.current, flame3Ref.current],
            {
              scaleY: 1.4,
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            },
          )
          flameTimeline.current.to(
            [flameRef.current, flame2Ref.current, flame3Ref.current],
            {
              scaleY: 1,
              opacity: 0.8,
              duration: 0.3,
              ease: 'power2.in',
            },
            '+=0.1',
          )
        } else {
          // Landing down - reduced flames
          gsap.to([flameRef.current, flame2Ref.current, flame3Ref.current], {
            scaleY: 0.6,
            opacity: 0.5,
            duration: 0.25,
            ease: 'power2.out',
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      flameTimeline.current?.kill()
    }
  }, [])

  return (
    <div className="rocket-scroll" aria-hidden="true">
      <div
        className="rocket-track"
        style={{
          '--scroll-progress': scrollProgress,
        } as React.CSSProperties}
      >
        <div ref={rocketRef} className="rocket-container">
          {theme === 'light' ? (
            // Airplane for light theme
            <>
              <div className="airplane-body">
                <div className="airplane-nose" />
                <div className="airplane-main">
                  <div className="airplane-window" />
                  <div className="airplane-wing airplane-wing-left" />
                  <div className="airplane-wing airplane-wing-right" />
                </div>
                <div className="airplane-tail">
                  <div className="airplane-fin" />
                </div>
              </div>
              <div className="airplane-propeller" />
            </>
          ) : (
            // Rocket for dark theme
            <>
              <div className="rocket-body">
                <div className="rocket-nose" />
                <div className="rocket-main">
                  <div className="rocket-window" />
                  <div className="rocket-wing rocket-wing-left" />
                  <div className="rocket-wing rocket-wing-right" />
                </div>
                <div className="rocket-bottom" />
              </div>

              {/* Flames */}
              <div className="flames-container">
                <div ref={flameRef} className="flame flame-1" />
                <div ref={flame2Ref} className="flame flame-2" />
                <div ref={flame3Ref} className="flame flame-3" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
