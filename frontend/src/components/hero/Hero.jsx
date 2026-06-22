import React, { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { useTheme } from '../../context/ThemeContext'

const AuroraBackground = lazy(() => import('./AuroraBackground'))

/* ─────────────────────────────────────────────────────────
   KEYFRAMES (injected once at module level)
───────────────────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes heroDotPulse {
    0%,100% { opacity:1;  transform:scale(1);   }
    50%      { opacity:.4; transform:scale(1.6); }
  }
  /* #4 — dashboard float: -10px ↔ +10px, 12s */
  @keyframes dashFloat {
    0%   { transform: rotate(-2deg) translateY(-10px); }
    100% { transform: rotate(-2deg) translateY( 10px); }
  }
  /* #4 mobile — no rotation */
  @keyframes dashFloatMobile {
    0%   { transform: translateY(-10px); }
    100% { transform: translateY( 10px); }
  }
  /* #6 — glass shine sweep every 8s */
  @keyframes glassShine {
    0%,85%  { transform: translateX(-120%) skewX(-18deg); opacity:0;   }
    87%     { opacity:.55; }
    100%    { transform: translateX( 260%) skewX(-18deg); opacity:0;   }
  }
  /* #8 — staggered word reveal */
  @keyframes wordReveal {
    from { opacity:0; transform:translateY(18px); filter:blur(4px); }
    to   { opacity:1; transform:translateY(0);    filter:blur(0);   }
  }
  /* #9 — gradient sweep on "Scale" */
  @keyframes scaleSweep {
    0%   { background-position: 0%   50%; }
    100% { background-position: 200% 50%; }
  }
  /* horizontal beam */
  @keyframes beamPan {
    0%   { transform: translateX(-100%) scaleY(1);   opacity:0;   }
    10%  { opacity:1; }
    90%  { opacity:.7; }
    100% { transform: translateX( 110%) scaleY(1);   opacity:0;   }
  }
`

/* ─────────────────────────────────────────────
   ANIMATED LINE CHART (unchanged)
───────────────────────────────────────────── */
function HeroLineChart() {
  const [drawn, setDrawn] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setDrawn(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const pts = [
    [0,64],[28,58],[56,52],[84,46],[112,50],
    [140,38],[168,32],[196,40],[224,26],[252,30],
    [280,20],[308,24],[336,14],[364,18],[400,10],
  ]
  const linePath = pts.map(([x,y],i) => `${i===0?'M':'L'}${x} ${y}`).join(' ')
  const fillPath = linePath + ' L400 80 L0 80 Z'

  return (
    <div ref={ref} className="w-full" style={{ height: 80 }}>
      <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="hFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22D3EE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"    />
          </linearGradient>
          <clipPath id="hReveal">
            <rect x="0" y="0" height="80"
              style={{ width: drawn ? 400 : 0, transition: 'width 1.6s cubic-bezier(.4,0,.2,1) .2s' }} />
          </clipPath>
        </defs>
        <path d={fillPath} fill="url(#hFillGrad)"
          style={{ opacity: drawn ? 1 : 0, transition: 'opacity 600ms 400ms' }} />
        <path d={linePath} fill="none" stroke="url(#hLineGrad)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          clipPath="url(#hReveal)"
          style={{ filter: drawn ? 'drop-shadow(0 0 6px rgba(34,211,238,.5))' : 'none' }} />
        {drawn && (
          <circle cx="400" cy="10" r="4" fill="#22D3EE"
            style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,.9))', animation: 'heroDotPulse 2s ease-in-out infinite' }} />
        )}
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HERO VISUAL — right column
───────────────────────────────────────────── */
function HeroVisual({ isDark }) {
  const card  = isDark
    ? { bg: 'linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.03) 100%)',
        shadow: '0 32px 80px rgba(99,102,241,.18), 0 0 0 1px rgba(255,255,255,.05) inset, 0 0 60px rgba(34,211,238,.06)',
        border: 'rgba(255,255,255,.10)' }
    : { bg: '#FFFFFF',
        shadow: '0 24px 60px rgba(99,102,241,.10), 0 0 0 1px #E2E8F0',
        border: '#E2E8F0' }

  const topBar = isDark ? 'rgba(255,255,255,.03)' : 'rgba(248,250,252,.9)'
  const topBarBorder = isDark ? 'rgba(255,255,255,.08)' : '#E2E8F0'
  const chartBg  = isDark ? 'rgba(255,255,255,.03)' : '#F8FAFC'
  const chartBorder = isDark ? 'rgba(255,255,255,.06)' : '#E2E8F0'
  const kpiBg    = isDark ? 'rgba(255,255,255,.04)' : '#F8FAFC'
  const kpiBorder = isDark ? 'rgba(255,255,255,.08)' : '#E2E8F0'
  const floatBg  = isDark ? 'rgba(7,16,36,.90)' : 'rgba(255,255,255,.97)'
  const floatBorder = isDark ? 'rgba(255,255,255,.10)' : '#E2E8F0'
  const floatShadow1 = isDark ? '0 8px 32px rgba(34,211,238,.12)' : '0 4px 20px rgba(99,102,241,.08)'
  const floatShadow2 = isDark ? '0 8px 32px rgba(99,102,241,.12)' : '0 4px 20px rgba(99,102,241,.08)'
  const titleColor  = isDark ? undefined : '#0F172A'
  const labelColor  = isDark ? undefined : '#64748B'
  const dayColor    = isDark ? undefined : '#94A3B8'

  return (
    <div className="relative w-full flex justify-center lg:justify-end">

      {/* Radial spotlight — hidden in light (Canvas aurora also hidden) */}
      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: 900, height: 900,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse at center, rgba(34,211,238,.07) 0%, rgba(34,211,238,.03) 35%, transparent 65%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
      )}

      {/* Light mode: soft radial glow behind card */}
      {!isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: 700, height: 700,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,.05) 0%, transparent 65%)',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
      )}

      {/* Horizontal beam — dark only */}
      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute overflow-hidden"
          style={{ inset: 0, zIndex: 1, borderRadius: 32 }}
        >
          <div style={{
            position: 'absolute', top: '42%', left: 0, width: '100%', height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,.55) 40%, rgba(99,102,241,.55) 60%, transparent 100%)',
            filter: 'blur(6px)',
            animation: 'beamPan 7s cubic-bezier(.4,0,.6,1) infinite',
            animationDelay: '1.5s',
          }} />
        </div>
      )}

      {/* Dashboard wrapper — float + rotation */}
      <div
        className="relative z-10 w-full"
        style={{ maxWidth: 520, animation: 'dashFloat 12s ease-in-out infinite alternate' }}
      >
        {/* Glass shine — dark only */}
        {isDark && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[32px] overflow-hidden"
            style={{ zIndex: 20 }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '55%', height: '100%',
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,.07) 50%, transparent 60%)',
              animation: 'glassShine 8s ease-in-out infinite',
            }} />
          </div>
        )}

        {/* ── Dashboard card ── */}
        <div
          className="w-full rounded-[32px] overflow-hidden"
          style={{
            height:     420,
            background: card.bg,
            boxShadow:  card.shadow,
            border:     `1px solid ${card.border}`,
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ background: topBar, borderBottom: `1px solid ${topBarBorder}` }}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,.8)] animate-pulse" />
              <span className="text-sm font-[600]" style={{ color: titleColor }}>Analytics</span>
            </div>
            <span className="text-xs font-[500]" style={{ color: labelColor ?? undefined }}
              className2="text-slate-500">Last 7 days</span>
          </div>

          <div className="flex flex-col h-[calc(100%-57px)] p-5 gap-4">
            {/* Users */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-[600] uppercase tracking-widest text-slate-500"
                  style={labelColor ? { color: labelColor } : {}}>Total Users</p>
                <p className="mt-1 text-3xl font-[800] tracking-tight"
                  style={{ color: titleColor }}>34.8k</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-[700] text-green-600 px-2.5 py-1 rounded-full"
                style={{
                  background: isDark ? 'rgba(34,197,94,.08)' : 'rgba(34,197,94,.10)',
                  border: `1px solid ${isDark ? 'rgba(34,197,94,.2)' : 'rgba(34,197,94,.25)'}`,
                }}>
                ↑ 12.4%
              </div>
            </div>

            {/* Line chart */}
            <div
              className="flex-1 px-4 pt-3 pb-2 flex flex-col justify-between rounded-2xl"
              style={{ background: chartBg, border: `1px solid ${chartBorder}` }}
            >
              <HeroLineChart />
              <div className="flex justify-between mt-1">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                  <span key={d} className="text-[9px]"
                    style={{ color: dayColor ?? '#64748B' }}>{d}</span>
                ))}
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Revenue', value: '$1.2M', color: '#22D3EE'  },
                { label: 'Growth',  value: '+24%',  color: '#a78bfa'  },
                { label: 'NPS',     value: '+48',   color: '#6366F1'  },
              ].map(k => (
                <div key={k.label}
                  className="rounded-2xl px-3 py-3 text-center"
                  style={{ background: kpiBg, border: `1px solid ${kpiBorder}` }}>
                  <p className="text-[15px] font-[800]" style={{ color: k.color }}>{k.value}</p>
                  <p className="text-[10px] mt-0.5"
                    style={{ color: labelColor ?? '#64748B' }}>{k.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating card 1 — Conversion */}
      <div
        className="absolute z-30 rounded-[20px] px-4 py-3"
        style={{
          top: '10%', left: 0,
          background:  floatBg,
          border:      `1px solid ${floatBorder}`,
          boxShadow:   floatShadow1,
          animation:   'dashFloat 12s ease-in-out 0.8s infinite alternate',
          minWidth:    120,
        }}
      >
        <p className="text-[10px] font-[600] uppercase tracking-widest mb-0.5"
          style={{ color: labelColor ?? '#64748B' }}>Conversion</p>
        <p className="text-xl font-[900] bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent leading-none">
          +24%
        </p>
      </div>

      {/* Floating card 2 — NPS */}
      <div
        className="absolute z-30 rounded-[20px] px-4 py-3"
        style={{
          bottom: '14%', right: 0,
          background:  floatBg,
          border:      `1px solid ${floatBorder}`,
          boxShadow:   floatShadow2,
          animation:   'dashFloat 12s ease-in-out 2s infinite alternate',
          minWidth:    110,
        }}
      >
        <p className="text-[10px] font-[600] uppercase tracking-widest mb-0.5"
          style={{ color: labelColor ?? '#64748B' }}>NPS Score</p>
        <p className="text-xl font-[900] bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-transparent leading-none">
          +48
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ANIMATED HEADING
───────────────────────────────────────────── */
function AnimatedHeading({ isDark }) {
  const words = ['Engineering', 'Digital', 'Products', 'That']
  const headingColor = isDark ? '#F8FAFC' : '#0F172A'
  return (
    <h1
      id="hero-heading"
      className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
      style={{ color: headingColor }}
    >
      {words.map((w, i) => (
        <span
          key={w}
          style={{
            display:        'inline-block',
            opacity:        0,
            animation:      'wordReveal 0.7s cubic-bezier(.22,1,.36,1) forwards',
            animationDelay: `${0.1 + i * 0.12}s`,
          }}
        >
          {w}{' '}
        </span>
      ))}
      <span
        className="inline-block"
        style={{ opacity: 0, animation: 'wordReveal 0.7s cubic-bezier(.22,1,.36,1) 0.60s forwards' }}
      >
        <span
          style={{
            backgroundImage:      'linear-gradient(90deg, #22D3EE 0%, #6366F1 30%, #A78BFA 60%, #22D3EE 100%)',
            backgroundSize:       '200% auto',
            backgroundClip:       'text',
            WebkitBackgroundClip: 'text',
            color:                'transparent',
            WebkitTextFillColor:  'transparent',
            animation:            'scaleSweep 4s linear 1.2s infinite',
          }}
        >
          Scale
        </span>
      </span>
    </h1>
  )
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const sectionBg = isDark
    ? '#020617'
    : 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #EEF2FF 100%)'

  const descColor  = isDark ? '#D1D9E8' : '#334155'
  const badgeBg    = isDark ? 'rgba(255,255,255,.06)' : 'rgba(99,102,241,.08)'
  const badgeBorder = isDark ? 'rgba(255,255,255,.10)' : 'rgba(99,102,241,.2)'
  const badgeColor = isDark ? '#D1D9E8' : '#4338CA'
  const secBtnBg   = isDark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.8)'
  const secBtnBorder = isDark ? 'rgba(255,255,255,.10)' : '#CBD5E1'
  const secBtnColor  = isDark ? '#D1D9E8' : '#0F172A'

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden max-w-[1440px] mx-auto px-6 sm:px-8 py-16 md:py-24 lg:py-28"
      style={isDark
        ? { backgroundColor: sectionBg }
        : { background: sectionBg }
      }
    >
      <style>{KEYFRAMES}</style>

      {/* Aurora — dark mode only (canvas renders its own dark bg) */}
      {isDark && (
        <Suspense fallback={null}>
          <AuroraBackground />
        </Suspense>
      )}

      {/* Edge glows */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute rounded-full"
          style={{
            top: '-15%', left: '-12%', width: 700, height: 700,
            background: isDark
              ? 'radial-gradient(circle, rgba(34,211,238,.04) 0%, transparent 60%)'
              : 'radial-gradient(circle, rgba(99,102,241,.06) 0%, transparent 60%)',
            filter: 'blur(200px)',
          }} />
        <div className="absolute rounded-full"
          style={{
            top: '0%', right: '-18%', width: 800, height: 800,
            background: isDark
              ? 'radial-gradient(circle, rgba(99,102,241,.05) 0%, transparent 60%)'
              : 'radial-gradient(circle, rgba(34,211,238,.05) 0%, transparent 60%)',
            filter: 'blur(220px)',
          }} />
      </div>

      {/* Content grid */}
      <div
        className="relative grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center"
        style={{ zIndex: 10 }}
      >
        {/* LEFT */}
        <div className="max-w-xl">
          {/* Badge */}
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
            style={{
              background:  badgeBg,
              border:      `1px solid ${badgeBorder}`,
              color:       badgeColor,
              opacity:     0,
              animation:   'wordReveal 0.7s cubic-bezier(.22,1,.36,1) 0s forwards',
            }}
          >
            Digital Transformation Studio
          </span>

          <AnimatedHeading isDark={isDark} />

          {/* Description */}
          <p
            className="mt-4 text-base md:text-lg"
            style={{
              color:     descColor,
              opacity:   0,
              animation: 'wordReveal 0.7s cubic-bezier(.22,1,.36,1) 0.72s forwards',
            }}
          >
            We help ambitious businesses design, develop and grow modern digital experiences.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3"
            style={{ opacity: 0, animation: 'wordReveal 0.7s cubic-bezier(.22,1,.36,1) 0.88s forwards' }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(99,102,241,.35)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]/40"
              aria-label="Start your project"
            >
              Start Your Project
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl text-base font-medium hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
              style={{
                background:  secBtnBg,
                border:      `1px solid ${secBtnBorder}`,
                color:       secBtnColor,
              }}
              aria-label="View case studies"
            >
              View Case Studies
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <HeroVisual isDark={isDark} />
      </div>
    </section>
  )
}
