import { useRef, type PointerEvent, type ReactNode, type KeyboardEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

type Magnetic3DProps = {
  children: ReactNode
  className?: string
  intensity?: number
  tilt?: number
  as?: 'div' | 'a' | 'button' | 'article'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  title?: string
  ariaLabel?: string
}

export function Magnetic3D({
  children,
  className,
  intensity = 10,
  tilt = 7,
  as = 'div',
  href,
  target,
  rel,
  type,
  onClick,
  title,
  ariaLabel,
}: Magnetic3DProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const spring = { stiffness: 260, damping: 22, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)
  const srx = useSpring(rotateX, spring)
  const sry = useSpring(rotateY, spring)

  const reset = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    x.set(px * intensity)
    y.set(py * intensity)
    rotateY.set(px * tilt)
    rotateX.set(-py * tilt)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (reduce) return
    if (event.key === 'Enter' || event.key === ' ') {
      rotateX.set(-tilt * 0.45)
      rotateY.set(tilt * 0.35)
    }
  }

  const inner = (
    <motion.div
      ref={ref}
      className="magnetic-3d-inner"
      style={{
        x: sx,
        y: sy,
        rotateX: srx,
        rotateY: sry,
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )

  const shared = {
    className: `magnetic-3d ${className ?? ''}`.trim(),
    onBlur: reset,
    onKeyDown,
    onKeyUp: reset,
    onClick,
    title,
    'aria-label': ariaLabel,
  }

  if (as === 'a') {
    return (
      <a {...shared} href={href} target={target} rel={rel}>
        {inner}
      </a>
    )
  }

  if (as === 'button') {
    return (
      <button {...shared} type={type ?? 'button'}>
        {inner}
      </button>
    )
  }

  if (as === 'article') {
    return <article {...shared}>{inner}</article>
  }

  return <div {...shared}>{inner}</div>
}
