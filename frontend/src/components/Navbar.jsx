'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-6 left-1/2 z-50 w-[calc(100%-48px)] max-w-7xl -translate-x-1/2 rounded-3xl transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl bg-[#071024]/60 border border-white/10 shadow-[0_20px_40px_rgba(34,211,238,0.04),0_8px_20px_rgba(99,102,241,0.06)]' : 'bg-[#071024]/50 backdrop-blur-xl border border-white/8'
        }`}
      >
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between gap-6">
            {/* Logo */}
            <a href="/" className="flex items-baseline gap-3 flex-shrink-0" style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>
              <span className="text-xl font-extrabold text-white tracking-tight">JIGYASA</span>
              <span className="text-sm font-medium text-cyan-300/90 mt-1">TECHNOLOGIES</span>
            </a>

            {/* Nav - center */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex items-center gap-8">
                {navLinks.map((l) => {
                  const active = hash === l.href
                  return (
                    <li key={l.label} className="group">
                      <a
                        href={l.href}
                        className={`inline-flex flex-col items-center gap-1 transform transition-transform duration-200 ${
                          active ? 'text-white' : 'text-[#D1D9E8] hover:text-white'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="text-sm font-medium" style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>{l.label}</span>
                        <span
                          className="block h-0.5 bg-gradient-to-r from-[#22D3EE] to-[#6366F1] transition-all duration-300"
                          style={{ width: active ? '56%' : '0%' }}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 transform transition-all duration-200" style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>
                Schedule Call
              </button>

              <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-[0_8px_32px_rgba(99,102,241,0.18)] hover:shadow-[0_10px_40px_rgba(34,211,238,0.12)] transform transition-all duration-200 hover:-translate-y-1" style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>
                Start Project
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Open menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/90"
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} navLinks={navLinks} />

      {/* spacer to preserve layout */}
      <div className="h-6 lg:h-12" />
    </>
  )
}

function Hamburger({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g className="transform transition-transform duration-300" style={{ transformOrigin: 'center' }}>
        <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" className={`transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
        <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" className={`transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
        <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" className={`transition-transform duration-300 ${open ? 'translate-y-[-6px] -rotate-45' : ''}`} />
      </g>
    </svg>
  )
}

function MobileMenu({ open, onClose, navLinks }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={`fixed inset-0 z-40 lg:hidden pointer-events-auto transition-all duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className={`absolute inset-0 bg-[#020617]/60 backdrop-blur-sm`} onClick={onClose} />

      <div className={`absolute top-0 left-0 right-0 h-full bg-[#071024]/80 backdrop-blur-xl border-t border-white/10 p-6 overflow-auto transform transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center justify-between">
          <div style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>
            <div className="text-xl font-extrabold text-white">JIGYASA <span className="text-cyan-300 text-sm font-medium">TECHNOLOGIES</span></div>
          </div>
          <button onClick={onClose} className="h-10 w-10 grid place-items-center rounded-lg bg-white/5 border border-white/10">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={onClose} className="block text-lg font-medium text-[#D1D9E8] py-3 px-2 rounded-lg hover:bg-white/5">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-3">
          <button onClick={onClose} className="w-full px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-base font-medium text-white">Schedule Call</button>
          <button onClick={onClose} className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-base font-semibold text-white shadow-lg">Start Project</button>
        </div>
      </div>
    </div>
  )
}
