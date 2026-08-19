import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { Magnetic3D } from './Magnetic3D'
import { navItems } from '../data/site'
import { useUI } from '../store/ui'
import { smoothScrollTo } from '../lib/gsap'

export function Nav() {
  const { theme, toggleTheme, menuOpen, setMenuOpen } = useUI()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setMenuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const goTo = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      smoothScrollTo(href, reduce ? 0 : 0.9)
    }
  }

  return (
    <header className="nav">
      <Magnetic3D className="brand-wrap" intensity={8} tilt={5}>
        <a href="#hero" className="brand" title="Kupendra Portfolio" onClick={(event) => {
          event.preventDefault()
          goTo('#hero')
        }}>
          <span className="brand-orb" aria-hidden>
            <span className="brand-orb-core" />
            <span className="brand-orb-ring" />
          </span>
          KVR • Orbit
        </a>
      </Magnetic3D>

      <nav className="nav-desktop" aria-label="Primary">
        {navItems.map((item) => (
          <Magnetic3D key={item.href} as="a" href={item.href} className="nav-link" intensity={8} tilt={8}>
            <span>{item.label}</span>
          </Magnetic3D>
        ))}
        <Magnetic3D
          as="button"
          className="theme-toggle"
          intensity={8}
          tilt={10}
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <LuSun aria-hidden /> : <LuMoon aria-hidden />}
          <span className="sr-only">Toggle theme</span>
        </Magnetic3D>
      </nav>

      <div className="nav-mobile-tools">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          type="button"
        >
          {theme === 'dark' ? <LuSun aria-hidden /> : <LuMoon aria-hidden />}
          <span className="sr-only">Toggle theme</span>
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <LuX aria-hidden /> : <LuMenu aria-hidden />}
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="nav-drawer"
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault()
                  goTo(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
