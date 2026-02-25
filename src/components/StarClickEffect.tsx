import { useEffect, useCallback } from 'react'

interface Star {
  x: number
  y: number
  size: number
  angle: number
  speed: number
  opacity: number
  rotation: number
  rotationSpeed: number
  color: string
}

const STAR_COLORS = [
  '#fcd34d', // gold
  '#7dd3fc', // sky blue
  '#a78bfa', // violet
  '#f9a8d4', // pink
  '#34d399', // emerald
  '#ffffff', // white
  '#f97316', // orange
]

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
) {
  let rot = (Math.PI / 2) * 3
  const step = Math.PI / spikes

  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)

  for (let i = 0; i < spikes; i++) {
    let x = cx + Math.cos(rot) * outerRadius
    let y = cy + Math.sin(rot) * outerRadius
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    ctx.lineTo(x, y)
    rot += step
  }

  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath()
}

export function StarClickEffect() {
  const spawnStars = useCallback((e: MouseEvent) => {
    const canvas = document.createElement('canvas')
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 99999;
    `
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const starCount = 8 + Math.floor(Math.random() * 6) // 8-13 stars
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      const angle = (Math.PI * 2 * i) / starCount + (Math.random() - 0.5) * 0.5
      stars.push({
        x: e.clientX,
        y: e.clientY,
        size: 3 + Math.random() * 8,
        angle,
        speed: 2 + Math.random() * 4,
        opacity: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      })
    }

    let frame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      let allDone = true

      for (const star of stars) {
        if (star.opacity <= 0) continue
        allDone = false

        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed + 0.5 // slight gravity
        star.speed *= 0.97
        star.opacity -= 0.018
        star.rotation += star.rotationSpeed
        star.size *= 0.99

        if (star.opacity <= 0) continue

        ctx.save()
        ctx.globalAlpha = Math.max(0, star.opacity)
        ctx.translate(star.x, star.y)
        ctx.rotate(star.rotation)

        // Draw star shape
        ctx.fillStyle = star.color
        ctx.shadowColor = star.color
        ctx.shadowBlur = 8
        drawStar(ctx, 0, 0, 5, star.size, star.size * 0.4)
        ctx.fill()

        // Inner glow
        ctx.shadowBlur = 0
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        drawStar(ctx, 0, 0, 5, star.size * 0.4, star.size * 0.2)
        ctx.fill()

        ctx.restore()
      }

      if (allDone) {
        cancelAnimationFrame(frame)
        canvas.remove()
        return
      }

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)

    // Safety cleanup after 3 seconds
    setTimeout(() => {
      cancelAnimationFrame(frame)
      if (canvas.parentNode) canvas.remove()
    }, 3000)
  }, [])

  useEffect(() => {
    window.addEventListener('click', spawnStars)
    return () => window.removeEventListener('click', spawnStars)
  }, [spawnStars])

  return null
}
