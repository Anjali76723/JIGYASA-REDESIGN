
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const F = 'Space Grotesk, Inter, system-ui'
const MONO = 'JetBrains Mono, IBM Plex Mono, monospace'
const EASE = [0.22, 1, 0.36, 1]

/* ─── node data ─────────────────────────────────────────── */
const NODES = [
  {
    id: 'expertise',
    nodeId: 'NODE_01',
    status: 'ACTIVE',
    title: 'Proven Expertise',
    desc: '500+ successful digital projects delivered worldwide, spanning enterprise software, SaaS platforms, and mission-critical systems.',
    tags: ['500+ Projects', 'Global Clients', 'Enterprise Grade'],
    color: '#22D3EE',
    glow: 'rgba(34,211,238,.2)',
    pos: 'tl',      // top-left
    delay: 1.05,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: 'team',
    nodeId: 'NODE_02',
    status: 'VERIFIED',
    title: 'Dedicated Team',
    desc: 'Senior engineers, product designers, and strategists — all under one roof, fully dedicated to your project from kickoff to launch.',
    tags: ['Senior Engineers', 'Cross-Functional', 'In-House'],
    color: '#6366F1',
    glow: 'rgba(99,102,241,.2)',
    pos: 'tr',      // top-right
    delay: 1.20,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'agile',
    nodeId: 'NODE_03',
    status: 'ONLINE',
    title: 'Agile Delivery',
    desc: 'Fast, iterative development cycles with radical transparency — you see progress every sprint, never wait for surprises at launch.',
    tags: ['Fast Iterations', 'Transparent', 'Sprint-Driven'],
    color: '#A78BFA',
    glow: 'rgba(167,139,250,.2)',
    pos: 'bl',      // bottom-left
    delay: 1.35,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 'partnership',
    nodeId: 'NODE_04',
    status: 'ACTIVE',
    title: 'Long-Term Partnership',
    desc: 'We stay beyond launch — ongoing support, performance optimisation, and growth engineering built into every engagement.',
    tags: ['Long-Term Support', 'Growth Ops', 'Always On'],
    color: '#10B981',
    glow: 'rgba(16,185,129,.2)',
    pos: 'br',      // bottom-right
    delay: 1.50,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
]

const STATUS_COLORS = {
  ACTIVE:   '#10B981',
  VERIFIED: '#22D3EE',
  ONLINE:   '#A78BFA',
}

/* ─── Blueprint Module ───────────────────────────────────── */
function BlueprintModule({ node, active, hovered, setHovered }) {
  const isHov = hovered === node.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: node.delay, ease: EASE }}
      onMouseEnter={() => setHovered(node.id)}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: 'default', perspective: 800 }}
    >
      <motion.div
        animate={isHov
          ? { y: -10, rotateX: 3, rotateY: node.pos.includes('l') ? 2 : -2, scale: 1.015 }
          : { y: 0, rotateX: 0, rotateY: 0, scale: 1 }
        }
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          position: 'relative',
          borderRadius: 22,
          padding: '20px 18px 18px',
          background: isHov ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.03)',
          border: `1px solid ${isHov ? node.color + '44' : 'rgba(255,255,255,.08)'}`,
          backdropFilter: 'blur(16px)',
          boxShadow: isHov
            ? `0 20px 56px ${node.glow}, 0 0 0 1px ${node.color}22`
            : '0 4px 20px rgba(0,0,0,.2)',
          transition: 'background 300ms, border-color 300ms, box-shadow 300ms',
          overflow: 'hidden',
        }}
      >
        {/* noise texture */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 22, pointerEvents: 'none',
          opacity: .022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />

        {/* top scanning light */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent 0%,${node.color} 50%,transparent 100%)`,
          opacity: isHov ? .8 : .35,
          transition: 'opacity 300ms',
          animation: 'bpScan 6s ease-in-out infinite',
        }} />

        {/* corner bracket — top-left */}
        <div style={{ position: 'absolute', top: 7, left: 7, width: 12, height: 12,
          borderTop: `1.5px solid ${node.color}55`, borderLeft: `1.5px solid ${node.color}55` }} />
        {/* corner bracket — top-right */}
        <div style={{ position: 'absolute', top: 7, right: 7, width: 12, height: 12,
          borderTop: `1.5px solid ${node.color}55`, borderRight: `1.5px solid ${node.color}55` }} />
        {/* corner bracket — bottom-left */}
        <div style={{ position: 'absolute', bottom: 7, left: 7, width: 12, height: 12,
          borderBottom: `1.5px solid ${node.color}44`, borderLeft: `1.5px solid ${node.color}44` }} />
        {/* corner bracket — bottom-right */}
        <div style={{ position: 'absolute', bottom: 7, right: 7, width: 12, height: 12,
          borderBottom: `1.5px solid ${node.color}44`, borderRight: `1.5px solid ${node.color}44` }} />

        {/* node id + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 9, fontFamily: MONO, color: 'rgba(148,163,184,.35)',
            letterSpacing: '.08em' }}>{node.nodeId}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5,
            padding: '2px 8px', borderRadius: 999, fontSize: 9, fontWeight: 700,
            background: `${STATUS_COLORS[node.status]}12`,
            border: `1px solid ${STATUS_COLORS[node.status]}30`,
            color: STATUS_COLORS[node.status], fontFamily: MONO }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%',
              background: STATUS_COLORS[node.status],
              boxShadow: `0 0 6px ${STATUS_COLORS[node.status]}`,
              animation: 'bpLED 2.5s ease-in-out infinite' }} />
            {node.status}
          </div>
        </div>

        {/* icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <motion.div
            animate={isHov ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: `${node.color}16`, border: `1px solid ${node.color}28`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: node.color,
              boxShadow: isHov ? `0 0 14px ${node.glow}` : 'none',
              transition: 'box-shadow 300ms' }}
          >
            {node.icon}
          </motion.div>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#F8FAFC',
            fontFamily: F, letterSpacing: '-.01em', lineHeight: 1.2 }}>
            {node.title}
          </span>
        </div>

        <p style={{ fontSize: 11.5, color: 'rgba(148,163,184,.78)', lineHeight: 1.65,
          fontFamily: F, marginBottom: 12 }}>{node.desc}</p>

        {/* tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {node.tags.map(t => (
            <span key={t} style={{ fontSize: 9, fontFamily: MONO, padding: '2px 7px',
              borderRadius: 4, background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.07)',
              color: isHov ? 'rgba(203,213,225,.75)' : 'rgba(148,163,184,.5)',
              letterSpacing: '.04em', transition: 'color 250ms' }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── SVG Blueprint Connections ──────────────────────────── */
function BlueprintConnections({ hovered, active }) {
  /* Connection paths from each corner module to center.
     Layout is a 3-column grid: [tl module] [center] [tr module]
     and [bl module] [center] [br module].
     We use SVG absolutely positioned over the center column area.
     Lines are drawn as straight segments from module midpoint to hub edge. */

  const lines = [
    { id: 'tl', color: NODES[0].color, d: 'M 0 0 C 30 0 50 30 80 50',    pct: 0    },
    { id: 'tr', color: NODES[1].color, d: 'M 160 0 C 130 0 110 30 80 50', pct: 0.33 },
    { id: 'bl', color: NODES[2].color, d: 'M 0 100 C 30 100 50 70 80 50', pct: 0.66 },
    { id: 'br', color: NODES[3].color, d: 'M 160 100 C 130 100 110 70 80 50', pct: 1 },
  ]

  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2, overflow: 'visible' }}
    >
      <defs>
        {lines.map(l => (
          <linearGradient key={l.id} id={`lg-${l.id}`} gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="160" y2="0">
            <stop offset="0%" stopColor={l.color} stopOpacity=".5"/>
            <stop offset="100%" stopColor="#22D3EE" stopOpacity=".35"/>
          </linearGradient>
        ))}
      </defs>

      {lines.map(l => {
        const isHov = hovered === l.id
        const notHov = hovered && hovered !== l.id
        return (
          <g key={l.id}>
            {/* base line */}
            <path
              d={l.d}
              fill="none"
              stroke={`url(#lg-${l.id})`}
              strokeWidth={isHov ? 1.8 : 1.2}
              strokeDasharray="4 3"
              opacity={active ? (notHov ? 0.2 : 0.55) : 0}
              style={{ transition: 'opacity 350ms, stroke-width 300ms' }}
            />
            {/* travelling pulse dot */}
            {active && (
              <circle r="2" fill={l.color} opacity={notHov ? 0.15 : 0.85}
                style={{ transition: 'opacity 350ms',
                  offsetPath: `path("${l.d}")`,
                  animation: `bpPulse${l.id} 4s ease-in-out infinite`,
                  animationDelay: `${l.pct * 1.5}s`,
                }}
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ─── Center Core ────────────────────────────────────────── */
function CenterCore({ active, hovered }) {
  const [angle, setAngle] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) return
    let t0 = performance.now()
    const speed = hovered ? 0.8 : 0.3   // rpm-like
    const run = (now) => {
      setAngle(((now - t0) * speed * 0.02) % 360)
      rafRef.current = requestAnimationFrame(run)
    }
    rafRef.current = requestAnimationFrame(run)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, hovered])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', width: 180, height: 180, margin: '0 auto' }}
    >
      {/* orbiting dots */}
      {[0, 120, 240].map((offset, i) => {
        const a = (angle + offset) * Math.PI / 180
        const r = 84
        const x = Math.cos(a) * r
        const y = Math.sin(a) * r
        return (
          <div key={i} style={{
            position: 'absolute', width: 5, height: 5, borderRadius: '50%',
            background: ['#22D3EE', '#6366F1', '#10B981'][i],
            boxShadow: `0 0 8px ${['rgba(34,211,238,.7)','rgba(99,102,241,.7)','rgba(16,185,129,.7)'][i]}`,
            transform: `translate(${x}px, ${y}px)`,
            zIndex: 3,
          }} />
        )
      })}

      {/* outer dashed ring */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 180 180" aria-hidden>
        <circle cx="90" cy="90" r="82" fill="none"
          stroke="rgba(34,211,238,.12)" strokeWidth="1"
          strokeDasharray="4 4"
          style={{ transformOrigin: '90px 90px',
            animation: 'bpOrbit 20s linear infinite',
            transform: `rotate(${angle}deg)` }}
        />
        <circle cx="90" cy="90" r="70" fill="none"
          stroke="rgba(99,102,241,.08)" strokeWidth="1"
          strokeDasharray="2 6"
          style={{ transformOrigin: '90px 90px',
            animation: 'bpOrbitRev 30s linear infinite reverse',
            transform: `rotate(${-angle * 0.6}deg)` }}
        />
      </svg>

      {/* core circle */}
      <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: EASE } }}
        style={{
          width: 130, height: 130, borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 36%, rgba(34,211,238,.14), rgba(99,102,241,.1) 55%, rgba(8,14,36,.9) 100%)',
          border: '1px solid rgba(34,211,238,.25)',
          backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 4, zIndex: 2, position: 'relative',
          boxShadow: '0 0 40px rgba(34,211,238,.15), inset 0 1px 0 rgba(255,255,255,.06)',
          animation: 'bpCoreBreath 3.5s ease-in-out infinite',
          cursor: 'default',
        }}
      >
        {/* inner ring */}
        <div style={{ position: 'absolute', inset: 8, borderRadius: '50%',
          border: '1px solid rgba(34,211,238,.1)' }} />

        <span style={{ fontSize: 10, fontWeight: 700, fontFamily: MONO,
          color: '#22D3EE', letterSpacing: '.12em', textAlign: 'center',
          lineHeight: 1.2 }}>
          CLIENT<br/>SUCCESS
        </span>
        <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg,transparent,rgba(34,211,238,.4),transparent)' }} />
        <span style={{ fontSize: 8, fontFamily: MONO, color: 'rgba(148,163,184,.5)',
          letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Engineering First
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: true, amount: 0.25 })
  const [active,   setActive]   = useState(false)
  const [hovered,  setHovered]  = useState(null)

  /* parallax */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spX  = useSpring(rawX, { stiffness: 55, damping: 22 })
  const spY  = useSpring(rawY, { stiffness: 55, damping: 22 })

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setActive(true), 300)
      return () => clearTimeout(t)
    }
  }, [inView])

  const onMouseMove = useCallback((e) => {
    rawX.set((e.clientX / window.innerWidth  - 0.5) * 8)
    rawY.set((e.clientY / window.innerHeight - 0.5) * 8)
  }, [rawX, rawY])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  const headWords = ['Engineering', 'Excellence', 'Designed', 'Into', 'Every', 'Layer']

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      style={{ position: 'relative', overflow: 'hidden',
        backgroundColor: '#020617', paddingTop: 140, paddingBottom: 140 }}
    >
      <style>{`
        @keyframes bpLED      { 0%,100%{opacity:1;box-shadow:0 0 6px currentColor} 50%{opacity:.25;box-shadow:none} }
        @keyframes bpScan     { 0%{background-position:-100% 0%} 100%{background-position:200% 0%} }
        @keyframes bpOrbit    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes bpOrbitRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes bpCoreBreath { 0%,100%{box-shadow:0 0 40px rgba(34,211,238,.15),inset 0 1px 0 rgba(255,255,255,.06)} 50%{box-shadow:0 0 60px rgba(34,211,238,.28),inset 0 1px 0 rgba(255,255,255,.08)} }
        @keyframes bpFloat    { 0%,100%{transform:translateY(0);opacity:.28} 50%{transform:translateY(-12px);opacity:.52} }
        @keyframes bpGrid     { from{background-position:0 0} to{background-position:0 -48px} }
        @keyframes bpPulsetl  { 0%{offset-distance:0%;opacity:0} 10%{opacity:.9} 90%{opacity:.9} 100%{offset-distance:100%;opacity:0} }
        @keyframes bpPulsetr  { 0%{offset-distance:0%;opacity:0} 10%{opacity:.9} 90%{opacity:.9} 100%{offset-distance:100%;opacity:0} }
        @keyframes bpPulsebl  { 0%{offset-distance:0%;opacity:0} 10%{opacity:.9} 90%{opacity:.9} 100%{offset-distance:100%;opacity:0} }
        @keyframes bpPulsebr  { 0%{offset-distance:0%;opacity:0} 10%{opacity:.9} 90%{opacity:.9} 100%{offset-distance:100%;opacity:0} }
        @keyframes bpDrift    { 0%,100%{transform:translateY(0);opacity:.25} 50%{transform:translateY(-11px);opacity:.5} }
      `}</style>

      {/* animated grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: .048,
        backgroundImage: 'linear-gradient(rgba(34,211,238,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.5) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        animation: 'bpGrid 25s linear infinite' }} />

      {/* ambient glows */}
      <div aria-hidden style={{ position: 'absolute', top: '-20%', left: '-10%',
        width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(34,211,238,.07) 0%,transparent 65%)',
        filter: 'blur(110px)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-15%', right: '-8%',
        width: 620, height: 620, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(99,102,241,.065) 0%,transparent 65%)',
        filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* vignette */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at center,transparent 45%,rgba(2,6,23,.5) 100%)' }} />

      {/* floating dots */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${6 + (i * 7.8) % 88}%`,
            top:  `${4 + (i * 8.2) % 88}%`,
            width: 1.5 + (i % 3) * .6, height: 1.5 + (i % 3) * .6,
            borderRadius: '50%',
            background: ['#22D3EE','#6366F1','#10B981'][i % 3],
            filter: 'blur(.3px)',
            animation: `bpDrift ${6 + i % 6}s ${(i * .55) % 5}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      {/* ── content ── */}
      <motion.div
        style={{ x: spX, y: spY }}
        transition={{ type: 'spring', stiffness: 55, damping: 22 }}
      >
        <div style={{ position: 'relative', zIndex: 10,
          maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px,3vw,32px)' }}>

          {/* header */}
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 80px' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .5, ease: EASE }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.45em',
                textTransform: 'uppercase', color: '#22D3EE', marginBottom: 18, fontFamily: F }}>
              Why Choose Jigyasa
            </motion.p>

            <h2 style={{ fontFamily: F, fontWeight: 800, lineHeight: 1.08,
              letterSpacing: '-.03em', color: '#F8FAFC', marginBottom: 20,
              fontSize: 'clamp(2.2rem,4.5vw,3.6rem)' }}>
              {headWords.slice(0,2).map((w,i) => (
                <motion.span key={w}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: .55, delay: .1 + i * .06, ease: EASE }}
                  style={{ display: 'inline-block', marginRight: '.2em',
                    background: 'linear-gradient(90deg,#22D3EE,#3B82F6,#6366F1)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text' }}
                >{w}</motion.span>
              ))}
              {headWords.slice(2).map((w,i) => (
                <motion.span key={w}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: .55, delay: .22 + i * .06, ease: EASE }}
                  style={{ display: 'inline-block', marginRight: '.2em' }}
                >{w}</motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .6, delay: .5 }}
              style={{ fontSize: 18, color: 'rgba(148,163,184,.78)', lineHeight: 1.8, fontFamily: F }}>
              Four pillars — all connecting to one mission: delivering measurable outcomes for every client.
            </motion.p>
          </div>

          {/* ── Blueprint grid: 3 cols on desktop ── */}
          {/* Desktop: tl | center | tr  +  bl | center | br */}
          <div>
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 1fr', gap: 'clamp(12px,2vw,24px)', alignItems: 'center', marginBottom: 'clamp(12px,2vw,24px)' }}>
              <BlueprintModule node={NODES[0]} active={active} hovered={hovered} setHovered={setHovered} />

              {/* center — row 1 portion: top half of core */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%', minHeight: 120 }}>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={active ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: .5, delay: .9, ease: EASE }}
                  style={{ width: '100%', height: 1.5,
                    background: `linear-gradient(90deg,${NODES[0].color}55,rgba(34,211,238,.2),${NODES[1].color}55)`,
                    transformOrigin: 'left' }}
                />
              </div>

              <BlueprintModule node={NODES[1]} active={active} hovered={hovered} setHovered={setHovered} />
            </div>

            {/* Center row: connection lines + core */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 1fr', gap: 'clamp(12px,2vw,24px)', alignItems: 'center', marginBottom: 'clamp(12px,2vw,24px)' }}>
              {/* left vertical connector */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: .5, delay: .95 }}
                style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, width: 40 }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ height: 1, width: `${40 + i * 8}%`,
                      background: `rgba(34,211,238,${.08 + i * .04})`,
                      borderRadius: 999 }} />
                  ))}
                </div>
              </motion.div>

              {/* CENTER CORE */}
              <CenterCore active={active} hovered={hovered} />

              {/* right vertical connector */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: .5, delay: .95 }}
                style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: 40 }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ height: 1, width: `${40 + i * 8}%`,
                      background: `rgba(99,102,241,${.08 + i * .04})`,
                      borderRadius: 999 }} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 1fr', gap: 'clamp(12px,2vw,24px)', alignItems: 'center' }}>
              <BlueprintModule node={NODES[2]} active={active} hovered={hovered} setHovered={setHovered} />

              {/* bottom horizontal line */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%', minHeight: 120 }}>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={active ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: .5, delay: .9, ease: EASE }}
                  style={{ width: '100%', height: 1.5,
                    background: `linear-gradient(90deg,${NODES[2].color}55,rgba(34,211,238,.2),${NODES[3].color}55)`,
                    transformOrigin: 'left' }}
                />
              </div>

              <BlueprintModule node={NODES[3]} active={active} hovered={hovered} setHovered={setHovered} />
            </div>

            {/* ── Mobile stack (hidden on desktop) ── */}
            {/* handled by the grid collapsing; grid auto-fit handles tablet */}
          </div>

          {/* blueprint reference footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: .6, delay: 1.8 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: 20, marginTop: 40 }}>
            {NODES.map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: n.color,
                  boxShadow: `0 0 6px ${n.color}`, animation: 'bpLED 2.5s ease-in-out infinite' }} />
                <span style={{ fontSize: 9, fontFamily: MONO, color: 'rgba(148,163,184,.4)',
                  letterSpacing: '.06em' }}>{n.nodeId}</span>
              </div>
            ))}
            <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,.1)' }} />
            <span style={{ fontSize: 9, fontFamily: MONO, color: 'rgba(148,163,184,.3)',
              letterSpacing: '.06em' }}>REV.2024 · JIGYASA BLUEPRINT</span>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
