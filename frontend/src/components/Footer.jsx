import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const quickLinks = [
  { label: 'Home',       href: '/'          },
  { label: 'Services',   href: '/services'  },
  { label: 'Industries', href: '/industries'},
  { label: 'About',      href: '/about'     },
  { label: 'Contact',    href: '/contact'   },
]

const serviceLinks = [
  { label: 'Web Development',  href: '/services/web-development' },
  { label: 'Mobile Apps',      href: '/services/mobile-app-development' },
  { label: 'UI/UX Design',     href: '/services/ui-ux-design-prototyping' },
  { label: 'Software Engineering', href: '/services/software-engineering' },
  { label: 'Business Automation', href: '/services/business-automation' },
]

const contactItems = [
  {
    href: 'mailto:hello@jigyasatechnologies.com',
    icon: (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
      </svg>
    ),
    value: 'hello@jigyasatechnologies.com',
  },
  {
    href: 'tel:+918888290917',
    icon: (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81 19.79 19.79 0 01.97 2.18 2 2 0 012.95.97h3a2 2 0 012 1.72c.128.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    value: '+91 88882909177',
  },
  {
    href: '#',
    icon: (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    value: 'India',
  },
]

const socials = [
  {
    label: 'LinkedIn', href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Instagram', href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Twitter', href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────────────────
   WIREFRAME GLOBE  — pure SVG, no canvas, zero deps
───────────────────────────────────────────────────────── */
function WireframeGlobe() {
  // Generate latitude + longitude lines
  const R  = 440   // radius in SVG units
  const cx = 450, cy = 450
  const latLines  = []
  const longLines = []

  // Latitudes: every 18°
  for (let lat = -80; lat <= 80; lat += 18) {
    const r   = R * Math.cos((lat * Math.PI) / 180)
    const y   = cy - R * Math.sin((lat * Math.PI) / 180)
    const ops = r > 0 ? r * 0.3 : 0   // perspective tilt for horizontal ellipses
    latLines.push({ r, y, ops })
  }

  // Longitudes: every 20°
  for (let lon = 0; lon < 180; lon += 20) {
    const angle = (lon * Math.PI) / 180
    const x1 = cx + R * Math.cos(angle + Math.PI / 2)
    const y1 = cy + R * Math.sin(angle + Math.PI / 2) * 0.35
    const x2 = cx + R * Math.cos(angle - Math.PI / 2)
    const y2 = cy + R * Math.sin(angle - Math.PI / 2) * 0.35
    longLines.push({ x1, y1, x2, y2 })
  }

  return (
    <svg
      viewBox="0 0 900 900"
      className="w-full h-full"
      aria-hidden
      style={{ animation: 'globeSpin 60s linear infinite' }}
    >
      <defs>
        <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#22D3EE" stopOpacity="0.06"/>
          <stop offset="60%"  stopColor="#6366F1" stopOpacity="0.04"/>
          <stop offset="100%" stopColor="#020617" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Subtle fill */}
      <circle cx={cx} cy={cy} r={R} fill="url(#globeGrad)"/>

      {/* Latitude rings — drawn as ellipses (perspective) */}
      {latLines.map(({ r, y, ops }, i) => (
        r > 8 && (
          <ellipse
            key={`lat-${i}`}
            cx={cx} cy={y}
            rx={r}  ry={Math.max(r * 0.28, 4)}
            fill="none"
            stroke="url(#globeStroke)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />
        )
      ))}

      {/* Longitude arcs — approximate as straight lines for perf */}
      {longLines.map(({ x1, y1, x2, y2 }, i) => (
        <line
          key={`lon-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#22D3EE"
          strokeWidth="0.7"
          strokeOpacity="0.3"
        />
      ))}

      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={R}
        fill="none" stroke="#6366F1" strokeWidth="1" strokeOpacity="0.2"/>

      <defs>
        <linearGradient id="globeStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#22D3EE"/>
          <stop offset="100%" stopColor="#6366F1"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN FOOTER COMPONENT
───────────────────────────────────────────────────────── */
export default function Footer() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  /* Link hover helper */
  const linkHover = (e) => {
    e.currentTarget.style.color     = '#22D3EE'
    e.currentTarget.style.transform = 'translateX(6px)'
  }
  const linkLeave = (e) => {
    e.currentTarget.style.color     = ''
    e.currentTarget.style.transform = ''
  }

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes globeSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes glowPulse {
          0%,100% { opacity:.10; transform:scale(1);    }
          50%      { opacity:.14; transform:scale(1.06); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
      `}</style>

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute rounded-full"
        style={{
          width:700, height:700, top:'-5%', left:'-10%',
          background:'radial-gradient(circle, #22D3EE 0%, transparent 65%)',
          filter:'blur(250px)', opacity:.10,
          animation:'glowPulse 8s ease-in-out infinite',
        }}/>
      <div className="pointer-events-none absolute rounded-full"
        style={{
          width:700, height:700, bottom:'-10%', right:'-10%',
          background:'radial-gradient(circle, #6366F1 0%, transparent 65%)',
          filter:'blur(250px)', opacity:.10,
          animation:'glowPulse 8s ease-in-out 4s infinite',
        }}/>

      {/* ── Floating wireframe globe ── */}
      <div
        className="pointer-events-none absolute select-none"
        aria-hidden
        style={{
          width:900, height:900,
          right:'-15%', bottom:'-20%',
          opacity:.05,
          zIndex:0,
        }}
      >
        <WireframeGlobe/>
      </div>

      {/* ════════════════════════════════════════════
          FOOTER CONTENT
      ════════════════════════════════════════════ */}
      <div
        className="relative z-10 border-t border-white/10 py-20"
        style={{ backdropFilter: 'blur(0px)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

            {/* Col 1 — Brand */}
            <div
              className="flex flex-col gap-6 transition-all duration-700"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '0ms',
              }}
            >
              <Link to="/" className="flex items-baseline gap-2"
                style={{fontFamily:'Space Grotesk, Inter, system-ui'}}>
                <span className="text-xl font-[800] tracking-tight text-white">JIGYASA</span>
                <span className="text-[13px] font-[500] text-[#22D3EE]"
                  style={{letterSpacing:'.08em'}}>TECHNOLOGIES</span>
              </Link>

              <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
                We craft scalable digital products through strategy, design, and engineering
                for ambitious organizations worldwide.
              </p>

              {/* Social icons — 48px glassmorphism */}
              <div className="flex items-center gap-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300"
                    style={{
                      width:48, height:48,
                      background:'rgba(255,255,255,.05)',
                      backdropFilter:'blur(12px)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform  = 'scale(1.15)'
                      e.currentTarget.style.color      = '#22D3EE'
                      e.currentTarget.style.borderColor = 'rgba(34,211,238,.35)'
                      e.currentTarget.style.boxShadow  = '0 0 20px rgba(34,211,238,.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform  = ''
                      e.currentTarget.style.color      = ''
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,.10)'
                      e.currentTarget.style.boxShadow  = ''
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div
              className="flex flex-col gap-6 transition-all duration-700"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '80ms',
              }}
            >
              <h4 className="text-[11px] font-[700] uppercase tracking-[0.3em] text-white">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {quickLinks.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-slate-400"
                      style={{
                        display:'inline-flex', alignItems:'center', gap:8,
                        transition:'color 200ms, transform 200ms',
                      }}
                      onMouseEnter={linkHover}
                      onMouseLeave={linkLeave}
                    >
                      <span
                        className="inline-block rounded-full"
                        style={{
                          width:4, height:4,
                          background:'rgba(255,255,255,.2)',
                          flexShrink:0,
                          transition:'background 200ms',
                        }}
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div
              className="flex flex-col gap-6 transition-all duration-700"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '160ms',
              }}
            >
              <h4 className="text-[11px] font-[700] uppercase tracking-[0.3em] text-white">
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                {serviceLinks.map(s => (
                  <li key={s.label}>
                    <Link
                      to={s.href}
                      className="text-sm text-slate-400"
                      style={{
                        display:'inline-flex', alignItems:'center', gap:8,
                        transition:'color 200ms, transform 200ms',
                      }}
                      onMouseEnter={linkHover}
                      onMouseLeave={linkLeave}
                    >
                      <span
                        className="inline-block rounded-full"
                        style={{width:4,height:4,background:'rgba(255,255,255,.2)',flexShrink:0}}
                      />
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div
              className="flex flex-col gap-6 transition-all duration-700"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '240ms',
              }}
            >
              <h4 className="text-[11px] font-[700] uppercase tracking-[0.3em] text-white">
                Contact
              </h4>
              <ul className="flex flex-col gap-4">
                {contactItems.map(c => (
                  <li key={c.value}>
                    <a
                      href={c.href}
                      className="flex items-start gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                    >
                      <span className="mt-0.5 text-cyan-400/60 flex-shrink-0">{c.icon}</span>
                      <span className="leading-relaxed">{c.value}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mini CTA */}
              <Link
                to="/contact"
                className="mt-1 inline-flex items-center gap-2 self-start text-sm font-[700] transition-all duration-300"
                style={{
                  background:    'linear-gradient(135deg,#6366F1,#22D3EE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                }}
              >
                Start a Project
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="url(#arrowGrad)"
                  strokeWidth="2" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366F1"/>
                      <stop offset="100%" stopColor="#22D3EE"/>
                    </linearGradient>
                  </defs>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2025 Jigyasa Technologies. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-600 text-center">
            Engineering Digital Products Since 2015
          </p>
          <p className="text-xs text-slate-600">
            Built with ❤️ in India
          </p>
        </div>
      </div>

    </footer>
  )
}
