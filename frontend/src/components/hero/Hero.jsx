import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import EcosystemVisualization from './EcosystemVisualization'

const AuroraBackground = lazy(() => import('./AuroraBackground'))

/* ─────────────────────────────────────────────────────────
   KEYFRAMES
─────────────────────────────────────────────────────────── */
const KF = `
  /* Word reveal — blur eases from 4px (not 8) for a crisper, more premium feel */
  @keyframes wordReveal {
    from { opacity:0; transform:translateY(20px); filter:blur(4px); }
    to   { opacity:1; transform:translateY(0);    filter:blur(0);   }
  }
  /* "Scale" gradient sweep */
  @keyframes scaleSweep {
    0%   { background-position: 0%   50%; }
    100% { background-position: 200% 50%; }
  }
  /* "Scale" ambient glow pulse */
  @keyframes scaleGlow {
    0%,100% { text-shadow: 0 0 0px transparent; }
    50%     { text-shadow: 0 0 28px rgba(34,211,238,0.45), 0 0 60px rgba(99,102,241,0.20); }
  }
  /* Light sweep across the heading block every ~7s */
  @keyframes headingSweep {
    0%,82%  { transform:translateX(-110%) skewX(-14deg); opacity:0; }
    84%     { opacity:1; }
    100%    { transform:translateX(210%)  skewX(-14deg); opacity:0; }
  }
  @keyframes badgeShimmer {
    0%,88%  { transform:translateX(-130%) skewX(-16deg); opacity:0;   }
    90%     { opacity:.45; }
    100%    { transform:translateX(270%)  skewX(-16deg); opacity:0;   }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes arrowNudge {
    0%,100% { transform:translateX(0);   }
    50%     { transform:translateX(5px); }
  }
  @keyframes rayDrift {
    0%   { transform:translateX(-120%) rotate(12deg); opacity:0;   }
    6%   { opacity:.7; }
    94%  { opacity:.4; }
    100% { transform:translateX(220%)  rotate(12deg); opacity:0;   }
  }
  @keyframes metricIn {
    from { opacity:0; transform:translateY(16px) scale(.96); }
    to   { opacity:1; transform:translateY(0)    scale(1);   }
  }
  @keyframes countPop {
    0%   { transform:scale(1); }
    40%  { transform:scale(1.12); }
    100% { transform:scale(1); }
  }
  @keyframes heroFloat {
    0%,100% { transform:translateY(0px);   }
    50%     { transform:translateY(-12px); }
  }
  @keyframes sepGlow {
    0%,100% { opacity:.18; }
    50%     { opacity:.55; }
  }
`

/* ─────────────────────────────────────────────────────────
   COUNT-UP — starts immediately when trigger=true
─────────────────────────────────────────────────────────── */
function useCountUp(end, trigger, duration = 1600) {
  const [val, setVal] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!trigger) return
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(end * e))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [end, trigger, duration])

  return val
}

/* ─────────────────────────────────────────────────────────
   METRIC CARD
─────────────────────────────────────────────────────────── */
const METRICS = [
  { end: 50,  suffix: '+', label: 'Projects'    },
  { end: 20,  suffix: '+', label: 'Experts'     },
  { end: 15,  suffix: '+', label: 'Industries'  },
  { end: 98,  suffix: '%', label: 'Satisfaction'},
]

function MetricCard({ end, suffix, label, delay, trigger }) {
  const [hov, setHov] = useState(false)
  const count = useCountUp(end, trigger)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       '12px 8px',
        borderRadius:  16,
        border:        `1px solid ${hov ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.08)'}`,
        background:    hov
          ? 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(99,102,241,0.06))'
          : 'rgba(255,255,255,0.03)',
        boxShadow:     hov ? '0 0 28px rgba(34,211,238,0.12)' : 'none',
        cursor:        'default',
        transition:    'border-color 260ms, background 260ms, box-shadow 260ms',
        opacity:       0,
        animation:     `metricIn 0.55s cubic-bezier(.22,1,.36,1) ${delay}s forwards`,
      }}
    >
      <span
        style={{
          fontSize:             '1.6rem',
          fontWeight:           900,
          lineHeight:           1,
          fontVariantNumeric:   'tabular-nums',
          backgroundImage:      'linear-gradient(90deg,#22D3EE,#A78BFA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
          animation:            trigger ? `countPop 0.4s ease ${delay + 0.4}s` : 'none',
          fontFamily:           'Space Grotesk, Inter, system-ui',
        }}
      >
        {count}{suffix}
      </span>
      <span style={{
        marginTop:     5,
        fontSize:      '9.5px',
        fontWeight:    600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color:         'rgba(148,163,184,0.75)',
        textAlign:     'center',
        fontFamily:    'Space Grotesk, Inter, system-ui',
      }}>
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   ANIMATED HEADING
   — tighter stagger (0.08s gaps feel more cohesive)
   — light sweep overlay runs every ~7s
   — mouse parallax on the whole heading block
   — "Scale" gets ambient glow pulse on top of gradient sweep
─────────────────────────────────────────────────────────── */
function Heading() {
  const blockRef = useRef(null)

  /* Subtle mouse parallax — moves at most ±6px */
  useEffect(() => {
    const el = blockRef.current
    if (!el) return
    let tx = 0, ty = 0
    let cx = 0, cy = 0
    let raf

    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      tx = ((e.clientX / W) - 0.5) * -12
      ty = ((e.clientY / H) - 0.5) * -6
    }

    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      if (el) el.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (el) el.style.transform = ''
    }
  }, [])

  /* Words on two visual lines */
  const line1 = [
    { text: 'Engineering', delay: 0.10 },
    { text: 'Digital',     delay: 0.18 },
  ]
  const line2 = [
    { text: 'Products',    delay: 0.26 },
    { text: 'That',        delay: 0.34 },
  ]

  return (
    <h1
      id="hero-heading"
      ref={blockRef}
      style={{
        margin:        '18px 0 0',
        fontSize:      'clamp(2.5rem,5.2vw,4.4rem)',
        fontWeight:    800,
        lineHeight:    1.06,
        letterSpacing: '-0.02em',
        fontFamily:    'Space Grotesk, Inter, system-ui',
        /* relative so the sweep overlay is clipped to the heading box */
        position:      'relative',
        willChange:    'transform',
      }}
    >
      {/* ── Line 1 ── */}
      <div>
        {line1.map(w => (
          <span
            key={w.text}
            className="inline-block text-white"
            style={{
              marginRight: '0.24em',
              opacity:     0,
              animation:   `wordReveal .65s cubic-bezier(.22,1,.36,1) ${w.delay}s forwards`,
            }}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* ── Line 2 ── */}
      <div>
        {line2.map(w => (
          <span
            key={w.text}
            className="inline-block text-white"
            style={{
              marginRight: '0.24em',
              opacity:     0,
              animation:   `wordReveal .65s cubic-bezier(.22,1,.36,1) ${w.delay}s forwards`,
            }}
          >
            {w.text}
          </span>
        ))}

        {/* ── "Scale" — gradient sweep + ambient glow pulse ── */}
        <span
          style={{
            display:  'inline-block',
            opacity:  0,
            animation:'wordReveal .65s cubic-bezier(.22,1,.36,1) .42s forwards',
          }}
        >
          <span style={{
            display:              'inline-block',
            backgroundImage:      'linear-gradient(90deg,#22D3EE 0%,#6366F1 28%,#A78BFA 55%,#22D3EE 100%)',
            backgroundSize:       '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            /* gradient sweep — continuous after initial reveal */
            animation:            'scaleSweep 4.5s linear 1s infinite, scaleGlow 3.5s ease-in-out 1.5s infinite',
          }}>
            Scale
          </span>
        </span>
      </div>

      {/* ── Heading light sweep — runs every 7s ── */}
      <span
        aria-hidden
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          overflow:      'hidden',
          borderRadius:  4,
          /* clip to the heading bounds */
          display:       'block',
        }}
      >
        <span style={{
          position:   'absolute',
          top:        0,
          left:       0,
          width:      '45%',
          height:     '100%',
          background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.055) 50%,transparent 70%)',
          animation:  'headingSweep 7s ease-in-out 2.5s infinite',
          display:    'block',
        }} />
      </span>
    </h1>
  )
}

/* ─────────────────────────────────────────────────────────
   CTA BUTTONS
─────────────────────────────────────────────────────────── */
function CTARow() {
  const [hp, setHp] = useState(false)
  const [hs, setHs] = useState(false)

  return (
    <div style={{
      display:   'flex',
      flexWrap:  'wrap',
      gap:       12,
      marginTop: 28,
      opacity:   0,
      animation: 'wordReveal .7s cubic-bezier(.22,1,.36,1) .76s forwards',
    }}>
      {/* Primary */}
      <Link
        to="/contact"
        aria-label="Start your project"
        style={{
          position:       'relative',
          display:        'inline-flex',
          alignItems:     'center',
          gap:            8,
          padding:        '13px 28px',
          borderRadius:   14,
          fontSize:       15,
          fontWeight:     700,
          color:          '#fff',
          textDecoration: 'none',
          overflow:       'hidden',
          background:     'linear-gradient(135deg,#6366F1,#22D3EE)',
          boxShadow:      hp
            ? '0 0 52px rgba(34,211,238,.38),0 8px 32px rgba(99,102,241,.32)'
            : '0 4px 24px rgba(99,102,241,.22)',
          transform:      hp ? 'translateY(-2px)' : 'none',
          transition:     'box-shadow 260ms, transform 220ms',
          fontFamily:     'Space Grotesk, Inter, system-ui',
        }}
        onMouseEnter={() => setHp(true)}
        onMouseLeave={() => setHp(false)}
      >
        Start Your Project
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: hp ? 'arrowNudge .6s ease infinite' : 'none' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span style={{
          position:   'absolute', inset: 0, borderRadius: 14,
          background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,.18) 50%,transparent 60%)',
          animation:  hp ? 'badgeShimmer 1.1s ease-in-out' : 'none',
          pointerEvents: 'none',
        }} />
      </Link>

      {/* Secondary */}
      <Link
        to="/portfolio"
        aria-label="View case studies"
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            8,
          padding:        '13px 24px',
          borderRadius:   14,
          fontSize:       15,
          fontWeight:     500,
          color:          hs ? '#fff' : '#D1D9E8',
          textDecoration: 'none',
          background:     hs ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.04)',
          border:         `1px solid ${hs ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.10)'}`,
          transform:      hs ? 'translateY(-2px)' : 'none',
          transition:     'all 220ms',
          fontFamily:     'Space Grotesk, Inter, system-ui',
        }}
        onMouseEnter={() => setHs(true)}
        onMouseLeave={() => setHs(false)}
      >
        View Case Studies
        <svg width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   METRICS STRIP
─────────────────────────────────────────────────────────── */
function MetricsStrip({ trigger }) {
  return (
    <div style={{ marginTop: 28 }}>
      {/* Divider */}
      <div style={{
        height:     '1px',
        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.10),transparent)',
        marginBottom: 20,
        opacity:    0,
        animation: 'fadeUp .5s ease .92s forwards',
      }} />

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap:                 10,
      }}>
        {METRICS.map((m, i) => (
          <MetricCard
            key={m.label}
            {...m}
            delay={0.96 + i * 0.07}
            trigger={trigger}
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   HERO
─────────────────────────────────────────────────────────── */
export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  /* Metrics trigger immediately on mount (always above fold) */
  const [metricsTrigger, setMetricsTrigger] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMetricsTrigger(true), 900)
    return () => clearTimeout(t)
  }, [])

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position:   'relative',
        overflow:   'hidden',
        background: isDark
          ? 'linear-gradient(165deg,#020617 0%,#020e24 45%,#030b1f 100%)'
          : 'linear-gradient(165deg,#f8fafc 0%,#eef2ff 100%)',
        paddingTop:    'clamp(16px,3.5vw,48px)',
        paddingBottom: 'clamp(40px,6vw,72px)',
      }}
    >
      <style>{KF}</style>

      {/* ── Aurora canvas (dark only, lazy) ── */}
      {isDark && (
        <Suspense fallback={null}>
          <AuroraBackground />
        </Suspense>
      )}

      {/* ── Light rays ── */}
      {isDark && (
        <div aria-hidden style={{ position:'absolute',inset:0,zIndex:1,overflow:'hidden',pointerEvents:'none' }}>
          <div style={{
            position:   'absolute',
            top:        '-5%',
            left:       '-30%',
            width:      '65%',
            height:     '120%',
            background: 'linear-gradient(105deg,transparent 38%,rgba(99,102,241,0.045) 50%,transparent 62%)',
            animation:  'rayDrift 22s ease-in-out 1s infinite',
          }} />
          <div style={{
            position:   'absolute',
            top:        '20%',
            right:      '-20%',
            width:      '50%',
            height:     '80%',
            background: 'linear-gradient(260deg,transparent 40%,rgba(34,211,238,0.03) 50%,transparent 60%)',
            animation:  'rayDrift 28s ease-in-out 8s infinite reverse',
          }} />
        </div>
      )}

      {/* ── Ambient glows ── */}
      <div aria-hidden style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none' }}>
        <div style={{
          position:'absolute', top:'-22%', left:'-8%',
          width:680, height:680, borderRadius:'50%',
          background: isDark
            ? 'radial-gradient(circle,rgba(34,211,238,.055) 0%,transparent 65%)'
            : 'radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 65%)',
          filter:'blur(170px)',
        }} />
        <div style={{
          position:'absolute', top:'8%', right:'-12%',
          width:720, height:720, borderRadius:'50%',
          background: isDark
            ? 'radial-gradient(circle,rgba(99,102,241,.065) 0%,transparent 65%)'
            : 'radial-gradient(circle,rgba(34,211,238,.04) 0%,transparent 65%)',
          filter:'blur(190px)',
        }} />
        <div style={{
          position:'absolute', bottom:'-8%', left:'35%',
          width:560, height:380, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(167,139,250,.04) 0%,transparent 65%)',
          filter:'blur(160px)',
        }} />
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: 'relative',
        zIndex:   10,
        maxWidth: 1440,
        margin:   '0 auto',
        padding:  '0 clamp(20px,4vw,48px)',
      }}>
        <div style={{
          display:             'grid',
          /* left text narrower, right viz larger — creates visual tension */
          gridTemplateColumns: isMobile ? '1fr' : '46fr 54fr',
          gap:                 isMobile ? 48 : 'clamp(24px,4vw,56px)',
          alignItems:          'center',
        }}>

          {/* ════════════════ LEFT ════════════════ */}
          <div style={{ display:'flex', flexDirection:'column' }}>

            {/* Badge */}
            <div style={{
              position:   'relative',
              display:    'inline-flex',
              alignItems: 'center',
              gap:        8,
              alignSelf:  'flex-start',
              overflow:   'hidden',
              borderRadius: 999,
              padding:    '7px 16px',
              background: isDark ? 'rgba(255,255,255,.05)' : 'rgba(99,102,241,.08)',
              border:     `1px solid ${isDark ? 'rgba(255,255,255,.10)' : 'rgba(99,102,241,.20)'}`,
              opacity:    0,
              animation:  'wordReveal .65s cubic-bezier(.22,1,.36,1) 0s forwards',
            }}>
              {/* Pulse dot */}
              <span style={{ position:'relative', display:'flex', width:8, height:8, flexShrink:0 }}>
                <span style={{
                  position:'absolute', inset:0, borderRadius:'50%',
                  background:'#22D3EE', opacity:.65,
                  animation:'ping 1.4s cubic-bezier(0,0,.2,1) infinite',
                }} />
                <span style={{ position:'relative', width:8, height:8, borderRadius:'50%', background:'#22D3EE' }} />
              </span>
              <span style={{
                fontSize:    13,
                fontWeight:  600,
                letterSpacing: '0.02em',
                color:       isDark ? '#D1D9E8' : '#4338CA',
                fontFamily:  'Space Grotesk, Inter, system-ui',
                whiteSpace:  'nowrap',
              }}>
                Digital Transformation Studio
              </span>
              {/* shimmer */}
              <span style={{
                position:'absolute', inset:0, borderRadius:999, pointerEvents:'none',
                background:'linear-gradient(105deg,transparent 38%,rgba(255,255,255,.10) 50%,transparent 62%)',
                animation: 'badgeShimmer 7s ease-in-out 2s infinite',
              }} />
            </div>

            {/* Heading */}
            <Heading />

            {/* Description */}
            <p style={{
              marginTop:  20,
              fontSize:   'clamp(15px,1.6vw,17px)',
              lineHeight: 1.75,
              color:      isDark ? 'rgba(209,217,232,.80)' : '#475569',
              maxWidth:   '42ch',
              opacity:    0,
              animation:  'wordReveal .7s cubic-bezier(.22,1,.36,1) .62s forwards',
              fontFamily: 'Space Grotesk, Inter, system-ui',
            }}>
              We help ambitious businesses design, develop and grow
              modern digital experiences — from first concept to production at scale.
            </p>

            {/* CTA */}
            <CTARow />

            {/* Metrics — directly below CTA, always visible on first load */}
            <MetricsStrip trigger={metricsTrigger} />

          </div>

          {/* ════════════════ RIGHT — Ecosystem ════════════════ */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: isMobile ? 'center' : 'flex-end',
            opacity:        0,
            animation:      'wordReveal 1s cubic-bezier(.22,1,.36,1) .25s forwards',
          }}>
            <div style={{
              position:  'relative',
              width:      '100%',
              maxWidth:   isMobile ? 340 : '100%',
              animation: 'heroFloat 10s ease-in-out infinite',
            }}>
              {/* Extra radial glow behind the ecosystem */}
              <div aria-hidden style={{
                position:  'absolute',
                inset:     '-12%',
                borderRadius: '50%',
                background:'radial-gradient(ellipse at 50% 50%,rgba(34,211,238,.07) 0%,rgba(99,102,241,.05) 40%,transparent 68%)',
                filter:    'blur(50px)',
                zIndex:    0,
                pointerEvents: 'none',
              }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <EcosystemVisualization isMobile={isMobile} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Ping keyframe (badge dot) */}
      <style>{`
        @keyframes ping {
          75%,100% { transform:scale(2); opacity:0; }
        }
      `}</style>

    </section>
  )
}
