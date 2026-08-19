import { useRef } from 'react'
import { GLSLBackground } from './GLSLBackground'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Theme } from '../store/ui'

type SpaceBackgroundProps = {
  theme: Theme
}

export function SpaceBackground({ theme }: SpaceBackgroundProps) {
  const reduced = usePrefersReducedMotion()
  const midRef = useRef<HTMLDivElement>(null)
  const foreRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      const mid = midRef.current
      const fore = foreRef.current
      if (!mid || !fore) return

      gsap.to(mid, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      })

      gsap.to(fore, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
        },
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === document.body) trigger.kill()
        })
      }
    },
    { dependencies: [reduced] },
  )

  return (
    <div className="space-backdrop" aria-hidden>
      <div className="space-layer space-layer-back">
        <GLSLBackground theme={theme} />
      </div>
      <div ref={midRef} className="space-layer space-layer-mid">
        <span className="nebula-orb orb-a" />
        <span className="nebula-orb orb-b" />
        <span className="nebula-orb orb-c" />
      </div>
      <div ref={foreRef} className="space-layer space-layer-fore">
        <span className="dust-speck s1" />
        <span className="dust-speck s2" />
        <span className="dust-speck s3" />
        <span className="dust-speck s4" />
      </div>
      <div className="space-vignette" />
    </div>
  )
}
