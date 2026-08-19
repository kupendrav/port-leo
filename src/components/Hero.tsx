import { useRef, useState } from 'react'
import { LuDownload, LuLink2, LuMail, LuSend } from 'react-icons/lu'
import heroImage from '../photos/image.jpeg'
import { contactEmail, cvUrl, drivePhotoUrls, focusChips, stats } from '../data/site'
import { gsap } from '../lib/gsap'

export function Hero() {
  const [photoSrc, setPhotoSrc] = useState<string>(heroImage)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const lastIndexRef = useRef<number>(-1)
  const cyclingRef = useRef(false)

  const handleHeroPhotoClick = () => {
    const img = heroImgRef.current
    if (!img || cyclingRef.current) return
    cyclingRef.current = true

    const idx = (lastIndexRef.current + 1) % drivePhotoUrls.length
    lastIndexRef.current = idx
    const nextUrl = drivePhotoUrls[idx]

    const preload = new Image()
    preload.src = nextUrl
    preload.onload = () => {
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
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => {
                cyclingRef.current = false
              },
            },
          )
        },
      })
    }
    preload.onerror = () => {
      cyclingRef.current = false
      lastIndexRef.current = idx
      handleHeroPhotoClick()
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">AI Engineering & Scalable Systems</p>
        <h1>
          <span className="name-highlight">Kupendra Venkatesh</span>
          {' — Engineering AI systems that drive measurable product growth and operational efficiency.'}
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
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleHeroPhotoClick()
            }
          }}
          role="button"
          tabIndex={0}
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
  )
}
