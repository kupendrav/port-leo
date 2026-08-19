import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { gsap } from '../lib/gsap'

const LOAD_DURATION = 2400 // total loading time in ms
const REDUCED_LOAD_DURATION = 400

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
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? REDUCED_LOAD_DURATION
      : LOAD_DURATION

    const tick = () => {
      const elapsed = performance.now() - start
      const p = Math.min(elapsed / duration, 1)
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
  const growth = Math.min(progress / 100, 1)

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="loading-space" aria-hidden />

      <div className="loading-content">
        <div className="loading-circle-wrap" style={{ '--neural-growth': growth } as CSSProperties}>
          <svg
            className="loading-circle-svg"
            width="320"
            height="320"
            viewBox="0 0 320 320"
          >
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E90FF" />
                <stop offset="50%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#AEC6CF" />
              </linearGradient>
              <filter id="neuralGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Background track circle */}
            <circle
              cx="160"
              cy="160"
              r={RADIUS}
              fill="none"
              stroke="rgba(30, 144, 255, 0.1)"
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
            <g className="neural-network" filter="url(#neuralGlow)">
              {[
                'M160 16 C174 2 188 -12 206 -28 C218 -39 224 -56 221 -76',
                'M265 66 C292 54 314 36 334 14 C348 -4 366 -12 389 -10',
                'M304 169 C334 174 365 190 390 218 C407 236 426 244 450 240',
                'M235 284 C250 310 272 329 300 341 C320 350 333 367 337 390',
                'M85 284 C65 309 51 333 43 363 C38 383 24 399 5 409',
                'M16 172 C-14 183 -40 200 -62 225 C-78 242 -99 250 -123 247',
                'M58 62 C40 43 20 29 -4 18 C-26 8 -39 -8 -44 -32',
              ].map((path) => (
                <path key={path} d={path} pathLength="1" className="neural-path" />
              ))}
              {[
                [206, -28],
                [221, -76],
                [334, 14],
                [389, -10],
                [390, 218],
                [450, 240],
                [300, 341],
                [337, 390],
                [43, 363],
                [5, 409],
                [-62, 225],
                [-123, 247],
                [-4, 18],
                [-44, -32],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="neural-node" />
              ))}
            </g>
          </svg>

          <span className="loading-k">K</span>
        </div>
      </div>

      {/* Scan line overlay */}
      <div className="loading-scanlines" />
    </div>
  )
}
