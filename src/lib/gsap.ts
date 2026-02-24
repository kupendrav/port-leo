import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Public GSAP plugins (safe for npm projects)
import {
  ScrollTrigger,
  ScrollToPlugin,
  Draggable,
  Flip,
  MotionPathPlugin,
  Observer,
  TextPlugin,
} from 'gsap/all'

// Register once at module load
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  Draggable,
  Flip,
  MotionPathPlugin,
  Observer,
  TextPlugin,
)

export { gsap, useGSAP, ScrollTrigger }

// Helper: smooth scroll to an element or selector
export function smoothScrollTo(target: string | Element, duration = 1) {
  gsap.to(window, {
    duration,
    scrollTo: target,
    ease: 'power2.out',
  })
}
