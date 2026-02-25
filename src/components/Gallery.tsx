import { useEffect, useRef } from 'react'
import { galleryPhotos } from '../data/gallery'
import { gsap, ScrollTrigger } from '../lib/gsap'

type GalleryProps = {
  onBack: () => void
}

export function Gallery({ onBack }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate heading in
      gsap.from('.gallery-heading', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Stagger cards in on scroll
      gsap.utils.toArray<HTMLElement>('.gallery-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen relative" style={{ background: 'var(--bg)' }}>
      {/* Starfield background layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 20% 20%, rgba(124, 58, 237, 0.15), transparent 45%), radial-gradient(120% 120% at 80% 0%, rgba(125, 211, 252, 0.2), transparent 35%)',
          }}
        />
        {/* Tiny stars */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.7), transparent), radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.5), transparent), radial-gradient(1.5px 1.5px at 50% 10%, rgba(125,211,252,0.8), transparent), radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 90% 80%, rgba(167,139,250,0.7), transparent), radial-gradient(1.5px 1.5px at 15% 85%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 60% 75%, rgba(125,211,252,0.6), transparent), radial-gradient(1px 1px at 85% 15%, rgba(255,255,255,0.4), transparent)',
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {/* Scan line overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-1"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button */}
        <button
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer"
          style={{ color: 'var(--accent)', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 group-hover:-translate-x-1"
            style={{ borderColor: 'rgba(125, 211, 252, 0.3)', background: 'rgba(125, 211, 252, 0.05)' }}
          >
            ←
          </span>
          Back to orbit
        </button>

        {/* Heading */}
        <div className="gallery-heading text-center mb-12 sm:mb-16">
          <p
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-3"
            style={{ color: 'var(--accent)', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ✦ Captured Moments ✦
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Syne', 'Space Grotesk', sans-serif",
              color: 'var(--text)',
              textShadow: '0 0 40px rgba(125, 211, 252, 0.15)',
            }}
          >
            Hackathons & Tech Events
          </h1>
          <p
            className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--muted)', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Moments from hackathons, expos, and gaming events — each one a launchpad in the journey.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {galleryPhotos.map((photo, index) => (
            <div
              key={index}
              className="gallery-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.border = '1px solid rgba(125, 211, 252, 0.2)'
                el.style.boxShadow =
                  '0 8px 40px rgba(125, 211, 252, 0.1), 0 0 60px rgba(167, 139, 250, 0.05)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.border = '1px solid rgba(255, 255, 255, 0.06)'
                el.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Image container */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-40 group-hover:opacity-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(5,6,10,0.3) 0%, rgba(5,6,10,0.6) 100%)',
                  }}
                />
                {/* Event badge */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full backdrop-blur-md transition-all duration-300"
                  style={{
                    background: 'rgba(125, 211, 252, 0.12)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(125, 211, 252, 0.2)',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {photo.event}
                </span>
              </div>

              {/* Description */}
              <div className="p-4 sm:p-5">
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{
                    color: 'var(--muted)',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="text-center mt-16 mb-8">
          <p
            className="text-xs uppercase tracking-[0.3em] opacity-40"
            style={{ color: 'var(--accent)', fontFamily: "'Orbitron', monospace" }}
          >
            ── End of transmission ──
          </p>
        </div>
      </div>
    </div>
  )
}
