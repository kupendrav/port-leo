import { useState, useEffect, useRef } from 'react'
import { GLSLBackground } from './GLSLBackground'
import { gsap } from '../lib/gsap'

const LOAD_DURATION = 2400 // total loading time in ms

// SVG circle constants
const RADIUS = 140
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type LoadingScreenProps = {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Animate progress from 0 to 100
  useEffect(() => {
    const start = performance.now()
    let raf: number

    const tick = () => {
      const elapsed = performance.now() - start
      const p = Math.min(elapsed / LOAD_DURATION, 1)
      // Ease-out for smooth feel
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased * 100)

      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setIsComplete(true), 400)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Curtain lift animation when loading is complete
  useEffect(() => {
    if (!isComplete || !containerRef.current) return

    const doLift = () => {
      gsap.to(containerRef.current, {
        y: '-100%',
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          onLoadingComplete()
        },
      })
    }

    if (document.readyState === 'complete') {
      doLift()
    } else {
      window.addEventListener('load', doLift, { once: true })
      const fallback = setTimeout(doLift, 3000)
      return () => {
        window.removeEventListener('load', doLift)
        clearTimeout(fallback)
      }
    }
  }, [isComplete, onLoadingComplete])

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE

  return (
    <div ref={containerRef} className="loading-screen">
      <GLSLBackground />

      <div className="loading-content">
        {/* SVG circle progress indicator with K inside */}
        <div className="loading-circle-wrap">
          <svg
            className="loading-circle-svg"
            width="320"
            height="320"
            viewBox="0 0 320 320"
          >
            {/* Background track circle */}
            <circle
              cx="160"
              cy="160"
              r={RADIUS}
              fill="none"
              stroke="rgba(125, 211, 252, 0.08)"
              strokeWidth="3"
            />
            {/* Animated progress arc */}
            <circle
              cx="160"
              cy="160"
              r={RADIUS}
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className="loading-progress-circle"
            />
            {/* Glow duplicate */}
            <circle
              cx="160"
              cy="160"
              r={RADIUS}
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className="loading-progress-circle loading-progress-glow"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f9a8d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Big K letter centered inside the circle */}
          <span className="loading-k">K</span>
        </div>
      </div>

      {/* Scan line overlay */}
      <div className="loading-scanlines" />
    </div>
  )
}
