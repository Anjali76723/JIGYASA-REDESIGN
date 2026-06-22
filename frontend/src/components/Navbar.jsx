'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Services',   href: '#services'   },
  { label: 'Work',       href: '#work'       },
  { label: 'Process',    href: '#process'    },
  { label: 'Industries', href: '#industries' },
  { label: 'About',      href: '#about'      },
  { label: 'Contact',    href: '#contact'    },
]

function smoothScroll(href, cb) {
  const el = document.getElementById(href.replace('#', ''))
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', href)
  }
  cb?.()
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
export default function Navbar() {
  const [open,       setOpen]       = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [activeHash, setActiveHash] = useState('')

  /* scroll state */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* active section — IntersectionObserver */
  useEffect(() => {
    const ids     = navLinks.map(l => l.href.replace('#', ''))
    const visible = {}
    const obs     = []

    const pick = () => {
      for (const id of ids) {
        if (visible[id]) { setActiveHash('#' + id); return }
      }
    }

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { visible[id] = e.isIntersecting; pick() },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      o.observe(el)
      obs.push(o)
    })

    return () => obs.forEach(o => o.disconnect())
  }, [])

  /* lock scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleClick = (e, href) => {
    e.preventDefault()
    smoothScroll(href, () => setOpen(false))
    setActiveHash(href)
  }

  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const bg = scrolled
    ? 'bg-[rgba(7,16,36,0.80)] backdrop-blur-[30px] shadow-[0_10px_40px_rgba(0,0,0,.32),0_20px_60px_rgba(99,102,241,.10)]'
    : 'bg-[rgba(7,16,36,0.55)] backdrop-blur-[24px] shadow-[0_10px_40px_rgba(0,0,0,.25),0_20px_60px_rgba(99,102,241,.08)]'

  const h = scrolled ? 'h-16' : 'h-[72px]'

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`
          fixed top-6 left-1/2 -translate-x-1/2 z-[100]
          w-[calc(100%-48px)] max-w-[1440px]
          rounded-[999px]
          border border-[rgba(255,255,255,.08)]
          transition-all duration-300
          ${bg}
        `}
      >
        <div className={`flex items-center justify-between px-5 sm:px-7 transition-all duration-300 ${h}`}>

          {/* ── Logo ── */}
          <a
            href="/"
            className="flex items-baseline gap-[7px] flex-shrink-0 group"
            style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}
          >
            <span className="text-[18px] font-[800] tracking-tight text-white transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,.5)]">
              JIGYASA
            </span>
            <span
              className="text-[13px] font-[500] text-[#22D3EE] transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,.6)]"
              style={{ letterSpacing: '.08em' }}
            >
              TECHNOLOGIES
            </span>
          </a>

          {/* ── Center nav links (desktop) ── */}
          <ul className="hidden lg:flex items-center gap-1" style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>
            {navLinks.map(l => {
              const active = activeHash === l.href
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => handleClick(e, l.href)}
                    aria-current={active ? 'page' : undefined}
                    className={`
                      relative inline-flex items-center
                      text-[15px] font-[500]
                      transition-all duration-300
                      select-none rounded-[999px]
                      px-[18px] py-[10px]
                      ${active
                        ? 'text-white'
                        : 'text-[#D1D9E8] hover:text-white hover:-translate-y-[2px]'
                      }
                    `}
                    style={active ? {
                      background:     'rgba(255,255,255,.08)',
                      border:         '1px solid rgba(255,255,255,.08)',
                      backdropFilter: 'blur(12px)',
                      boxShadow:      '0 0 30px rgba(99,102,241,.15)',
                    } : {}}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* ── Right CTAs (desktop) ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* Theme toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Schedule Call — glass */}
            <button
              className="
                px-5 py-[10px] rounded-[999px]
                text-[14px] font-[500] text-white
                border border-[rgba(255,255,255,.08)]
                transition-all duration-300
                hover:-translate-y-[2px]
                active:scale-[.98]
              "
              style={{
                fontFamily: 'Space Grotesk, Inter, system-ui',
                background: 'rgba(255,255,255,.04)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
            >
              Schedule Call
            </button>

            {/* Start Project — gradient */}
            <button
              onClick={e => { e.preventDefault(); smoothScroll('#contact') }}
              className="
                px-6 py-[10px] rounded-[999px]
                text-[14px] font-[600] text-white
                bg-gradient-to-r from-[#6366F1] to-[#22D3EE]
                transition-all duration-300
                hover:-translate-y-[3px] hover:scale-[1.02]
                hover:shadow-[0_0_40px_rgba(34,211,238,.20)]
                active:scale-[.98]
              "
              style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}
            >
              Start Project
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen(s => !s)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="
              lg:hidden flex h-9 w-9 items-center justify-center
              rounded-full border border-[rgba(255,255,255,.08)]
              text-white/75 transition-colors duration-200
              hover:text-white hover:border-white/20
            "
            style={{ background: 'rgba(255,255,255,.04)' }}
          >
            <HamburgerIcon open={open} />
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        navLinks={navLinks}
        activeHash={activeHash}
        onNavClick={handleClick}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Layout spacer */}
      <div className="h-[108px]" aria-hidden />
    </>
  )
}

/* ══════════════════════════════════════════════
   THEME TOGGLE BUTTON
══════════════════════════════════════════════ */
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        width:       44,
        height:      44,
        background:  isDark ? 'rgba(255,255,255,.05)' : 'rgba(15,23,42,.06)',
        borderColor: isDark ? 'rgba(255,255,255,.10)' : 'rgba(15,23,42,.12)',
        color:       isDark ? '#e2e8f0'               : '#334155',
        flexShrink:  0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = isDark ? 'rgba(255,255,255,.10)' : 'rgba(15,23,42,.10)'
        e.currentTarget.style.borderColor  = isDark ? 'rgba(34,211,238,.35)'  : 'rgba(99,102,241,.35)'
        e.currentTarget.style.boxShadow    = isDark
          ? '0 0 16px rgba(34,211,238,.2)'
          : '0 0 16px rgba(99,102,241,.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = isDark ? 'rgba(255,255,255,.05)' : 'rgba(15,23,42,.06)'
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,.10)' : 'rgba(15,23,42,.12)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden>
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  )
}

/* ══════════════════════════════════════════════
   HAMBURGER
══════════════════════════════════════════════ */
function HamburgerIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="1" y="3" width="14" height="1.5" rx=".75" fill="currentColor"
        className="transition-all duration-300 origin-center"
        style={{ transform: open ? 'rotate(45deg) translateY(4px)' : 'none' }}
      />
      <rect
        x="1" y="7.25" width="14" height="1.5" rx=".75" fill="currentColor"
        className="transition-all duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <rect
        x="1" y="11.5" width="14" height="1.5" rx=".75" fill="currentColor"
        className="transition-all duration-300 origin-center"
        style={{ transform: open ? 'rotate(-45deg) translateY(-4px)' : 'none' }}
      />
    </svg>
  )
}

/* ══════════════════════════════════════════════
   MOBILE DRAWER
══════════════════════════════════════════════ */
function MobileDrawer({ open, onClose, navLinks, activeHash, onNavClick, isDark, onToggleTheme }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-[90] lg:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#020617]/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Panel */}
      <div
        className={`
          absolute inset-x-0 top-0 min-h-screen
          flex flex-col
          bg-[#020617]
          px-6 pt-6 pb-12
          transition-transform duration-300
          overflow-y-auto
          ${open ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <a
            href="/"
            onClick={onClose}
            className="flex items-baseline gap-[7px]"
            style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}
          >
            <span className="text-[18px] font-[800] tracking-tight text-white">JIGYASA</span>
            <span className="text-[13px] font-[500] text-[#22D3EE]" style={{ letterSpacing: '.08em' }}>
              TECHNOLOGIES
            </span>
          </a>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="h-9 w-9 grid place-items-center rounded-full border border-white/10 text-white/60 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,.04)' }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1">
          <ul className="flex flex-col">
            {navLinks.map((l, i) => {
              const active = activeHash === l.href
              return (
                <li
                  key={l.href}
                  style={{
                    opacity:    open ? 1 : 0,
                    transform:  open ? 'translateY(0)' : 'translateY(-10px)',
                    transition: `opacity 280ms ${i * 45}ms, transform 280ms ${i * 45}ms`,
                  }}
                >
                  <a
                    href={l.href}
                    onClick={e => onNavClick(e, l.href)}
                    className="
                      flex items-center justify-between
                      py-5 border-b border-white/[.04]
                      transition-all duration-200
                      group
                    "
                    style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}
                  >
                    <span
                      className={`text-[20px] font-[600] transition-all duration-200 ${
                        active
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-transparent'
                          : 'text-white group-hover:text-white/80'
                      }`}
                    >
                      {l.label}
                    </span>

                    <svg
                      className={`h-4 w-4 transition-all duration-200 group-hover:translate-x-1 ${
                        active ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                      fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Mobile CTA */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full h-14 rounded-[999px] text-[15px] font-[500] text-white border border-white/10 transition-all duration-200 hover:border-white/20"
            style={{ background: 'rgba(255,255,255,.04)', fontFamily: 'Space Grotesk, Inter, system-ui' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
          >
            Schedule Call
          </button>

          <button
            onClick={() => { onClose(); smoothScroll('#contact') }}
            className="w-full h-14 rounded-[999px] text-[15px] font-[600] text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] transition-all duration-200 hover:shadow-[0_0_40px_rgba(34,211,238,.20)] active:scale-[.99]"
            style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}
          >
            Start Project
          </button>
        </div>
      </div>
    </div>
  )
}
