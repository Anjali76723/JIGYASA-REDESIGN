import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM
   viewBox: 600 × 600  —  centre at (300, 300)
   Nodes are glassmorphism tiles (rounded-rect) not plain circles.
   Three depth layers: background glow < connections < tiles < core
─────────────────────────────────────────────────────────────── */

const CX = 300
const CY = 300

/* Service nodes: angle (°), orbit radius, accent color, icon path, label */
const RAW_NODES = [
  {
    id: 'ai',      label: 'AI',             angle:   0, r: 178,
    color: '#22D3EE', bg: 'rgba(34,211,238,0.10)',
    icon: 'M12 2l2.5 7.5H22l-6.5 4.5 2.5 7.5-6.5-4.5L5 21.5l2.5-7.5L1 9.5h7.5z',
  },
  {
    id: 'web',     label: 'Web Dev',        angle:  51, r: 170,
    color: '#818CF8', bg: 'rgba(129,140,248,0.10)',
    icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c-2.5 2.5-4 6-4 10s1.5 7.5 4 10m0-20c2.5 2.5 4 6 4 10s-1.5 7.5-4 10M2 12h20',
  },
  {
    id: 'mobile',  label: 'Mobile',         angle: 103, r: 182,
    color: '#34D399', bg: 'rgba(52,211,153,0.10)',
    icon: 'M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm4 16a1 1 0 100 2 1 1 0 000-2z',
  },
  {
    id: 'cloud',   label: 'Cloud',          angle: 154, r: 174,
    color: '#60A5FA', bg: 'rgba(96,165,250,0.10)',
    icon: 'M18 10h-1.3A8 8 0 109 20h9a5 5 0 000-10z',
  },
  {
    id: 'uiux',    label: 'UI / UX',        angle: 206, r: 178,
    color: '#A78BFA', bg: 'rgba(167,139,250,0.10)',
    icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9m0-18c2.5 3 4 5.5 4 9s-1.5 6-4 9',
  },
  {
    id: 'data',    label: 'Data',           angle: 257, r: 170,
    color: '#F472B6', bg: 'rgba(244,114,182,0.10)',
    icon: 'M3 3h5v5H3zm8 0h5v5h-5zm-8 8h5v5H3zm8 0h5v5h-5zm-8 8h5v5H3zm8 0h5v5h-5z',
  },
  {
    id: 'product', label: 'Product Eng',    angle: 309, r: 178,
    color: '#FBBF24', bg: 'rgba(251,191,36,0.10)',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]

function polar(cx, cy, deg, r) {
  const rad = (deg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/* Precompute base positions once */
const NODES = RAW_NODES.map(n => ({ ...n, ...polar(CX, CY, n.angle, n.r) }))

/* ── Tile dimensions ── */
const TW = 72   // tile width
const TH = 62   // tile height
const TR = 14   // corner radius

/* ── Pulse manager ── */
function usePulses() {
  const [pulses, setPulses] = useState([])
  const id = useRef(0)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true
    const spawn = () => {
      if (!alive.current) return
      const n = NODES[Math.floor(Math.random() * NODES.length)]
      const outward = Math.random() > 0.45
      setPulses(p => [
        ...p.slice(-18),          // cap at 18 simultaneous pulses
        {
          id: id.current++,
          color: n.color,
          x1: outward ? CX : n.x, y1: outward ? CY : n.y,
          x2: outward ? n.x : CX, y2: outward ? n.y : CY,
          t: 0,
        },
      ])
      setTimeout(spawn, 380 + Math.random() * 500)
    }
    const timer = setTimeout(spawn, 200)
    return () => { alive.current = false; clearTimeout(timer) }
  }, [])

  /* Advance */
  useEffect(() => {
    let raf
    const tick = () => {
      setPulses(p =>
        p.map(x => ({ ...x, t: x.t + 0.018 })).filter(x => x.t < 1.1)
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return pulses
}

/* ── Background particles ── */
const PARTICLE_DATA = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: Math.random() * 600,
  y: Math.random() * 600,
  r: 0.6 + Math.random() * 1.8,
  speed: 0.08 + Math.random() * 0.14,
  phase: Math.random() * Math.PI * 2,
  ampX: 10 + Math.random() * 28,
  ampY: 6 + Math.random() * 18,
  color: ['#22D3EE', '#6366F1', '#A78BFA', '#818CF8'][Math.floor(Math.random() * 4)],
}))

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
─────────────────────────────────────────────────────────────── */
export default function EcosystemVisualization({ isMobile = false }) {
  const pulses  = usePulses()
  const svgRef  = useRef(null)

  /* Single shared rAF for time + mouse */
  const tRef     = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const [frame, setFrame] = useState(0)    // forces re-render each rAF

  useEffect(() => {
    let raf
    const tick = () => {
      tRef.current += 0.007
      /* Smooth mouse lerp */
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.06
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.06
      setFrame(f => f + 1)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    targetMouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    targetMouseRef.current = { x: 0, y: 0 }
  }, [])

  const [hovered, setHovered] = useState(null)

  const t = tRef.current
  const mx = mouseRef.current.x
  const my = mouseRef.current.y

  /* Per-layer parallax offset */
  const px = (depth) => mx * 14 * depth
  const py = (depth) => my * 14 * depth

  /* Per-node idle float */
  const floatY = (i) => Math.sin(t * 0.9 + i * 1.1) * 7
  const floatX = (i) => Math.cos(t * 0.6 + i * 0.8) * 3

  /* Core breathing scale */
  const coreBreath = 1 + Math.sin(t * 1.6) * 0.04

  /* Particle render at current time */
  const renderParticles = () =>
    PARTICLE_DATA.map(p => ({
      ...p,
      cx: p.x + Math.sin(t * p.speed + p.phase) * p.ampX,
      cy: p.y + Math.cos(t * p.speed * 0.7 + p.phase + 1) * p.ampY,
      opacity: 0.18 + Math.sin(t * p.speed * 1.3 + p.phase) * 0.10,
    }))

  const parts = renderParticles()

  /* Node screen position (with float + parallax) */
  const nodePos = (n, i) => ({
    nx: n.x + px(0.55) + floatX(i),
    ny: n.y + py(0.55) + floatY(i),
  })

  /* Core screen position */
  const corePx = CX + px(0.18)
  const corePy = CY + py(0.18)

  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: '1 / 1' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Outer ambient glow rings (CSS, behind SVG) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: '-8%',
          background: 'radial-gradient(ellipse at 52% 50%, rgba(34,211,238,0.09) 0%, rgba(99,102,241,0.07) 35%, transparent 65%)',
          filter: 'blur(48px)',
        }} />
        <div style={{
          position: 'absolute', inset: '10%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)',
          filter: 'blur(32px)',
          animation: 'coreGlowPulse 4s ease-in-out infinite',
        }} />
      </div>

      {/* ── SVG ── */}
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="relative w-full h-full overflow-visible"
        style={{ zIndex: 1 }}
        aria-label="Jigyasa Technologies digital ecosystem"
      >
        <defs>
          {/* Gradient: connection lines */}
          <linearGradient id="ecConnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#22D3EE" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#6366F1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.25" />
          </linearGradient>

          {/* Gradient: core radial fill */}
          <radialGradient id="ecCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#22D3EE" />
            <stop offset="45%"  stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
          </radialGradient>

          {/* Gradient: deep core glow */}
          <radialGradient id="ecCoreAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#22D3EE" stopOpacity="0.22" />
            <stop offset="60%"  stopColor="#6366F1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0"    />
          </radialGradient>

          {/* Gradient: individual tile node fills */}
          {NODES.map(n => (
            <radialGradient key={`tg-${n.id}`} id={`tg-${n.id}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%"   stopColor={n.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.05" />
            </radialGradient>
          ))}

          {/* Soft glow filter */}
          <filter id="ecGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Strong glow filter — hovered tiles */}
          <filter id="ecGlowHot" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Subtle blur for deep-layer particles */}
          <filter id="ecParticle" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>

          {/* Clip to 600×600 */}
          <clipPath id="ecBounds">
            <rect width="600" height="600" />
          </clipPath>
        </defs>

        {/* ════════════════ LAYER 0: deep background particles ════════════════ */}
        <g clipPath="url(#ecBounds)">
          {parts.map(p => (
            <circle
              key={p.id}
              cx={p.cx} cy={p.cy} r={p.r}
              fill={p.color}
              opacity={p.opacity}
              filter="url(#ecParticle)"
            />
          ))}
        </g>

        {/* ════════════════ LAYER 1: orbit rings around core ════════════════ */}
        {[130, 160, 192, 220].map((r, i) => (
          <circle
            key={`orbit-${i}`}
            cx={corePx} cy={corePy}
            r={r * coreBreath}
            fill="none"
            stroke={i % 2 === 0 ? '#22D3EE' : '#6366F1'}
            strokeWidth={i === 2 ? 0.6 : 0.35}
            strokeOpacity={0.07 + (3 - i) * 0.015}
            strokeDasharray={i % 2 === 0 ? '4 10' : '2 14'}
          />
        ))}

        {/* ════════════════ LAYER 2: connection beams ════════════════ */}
        {NODES.map((n, i) => {
          const { nx, ny } = nodePos(n, i)
          const isHov = hovered === n.id
          /* Compute midpoint for quadratic curve control */
          const midX = (nx + corePx) / 2 + (CX - nx) * 0.08
          const midY = (ny + corePy) / 2 + (CY - ny) * 0.08
          const d = `M${nx},${ny} Q${midX},${midY} ${corePx},${corePy}`

          return (
            <g key={`conn-${n.id}`}>
              {/* Glow trail behind the visible line */}
              <path
                d={d} fill="none"
                stroke={n.color}
                strokeWidth={isHov ? 4 : 2.5}
                strokeOpacity={isHov ? 0.18 : 0.07}
                filter="url(#ecGlow)"
              />
              {/* Crisp line on top */}
              <path
                d={d} fill="none"
                stroke={isHov ? n.color : 'url(#ecConnGrad)'}
                strokeWidth={isHov ? 1.2 : 0.7}
                strokeOpacity={isHov ? 0.95 : 0.38}
                strokeDasharray={isHov ? 'none' : '5 9'}
              />
            </g>
          )
        })}

        {/* ════════════════ LAYER 3: energy pulses ════════════════ */}
        {pulses.map(p => {
          const ct = Math.max(0, Math.min(p.t, 1))
          const ex = p.x1 + (p.x2 - p.x1) * ct
          const ey = p.y1 + (p.y2 - p.y1) * ct
          const fade = ct < 0.12 ? ct / 0.12 : ct > 0.82 ? (1 - ct) / 0.18 : 1
          return (
            <g key={p.id} filter="url(#ecGlow)">
              {/* Comet tail */}
              <circle cx={ex} cy={ey} r={6}  fill={p.color} opacity={fade * 0.20} />
              {/* Bright core */}
              <circle cx={ex} cy={ey} r={3}  fill={p.color} opacity={fade * 0.75} />
              {/* Hot centre */}
              <circle cx={ex} cy={ey} r={1.4} fill="#ffffff" opacity={fade * 0.9}  />
            </g>
          )
        })}

        {/* ════════════════ LAYER 4: service tiles (glassmorphism) ════════════════ */}
        {NODES.map((n, i) => {
          const { nx, ny } = nodePos(n, i)
          const isHov = hovered === n.id
          const tw = isHov ? TW + 4 : TW
          const th = isHov ? TH + 4 : TH

          return (
            <g
              key={n.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* ── Outer aura when hovered ── */}
              {isHov && (
                <rect
                  x={nx - tw / 2 - 10} y={ny - th / 2 - 10}
                  width={tw + 20}       height={th + 20}
                  rx={TR + 6}
                  fill={n.color} opacity={0.12}
                  filter="url(#ecGlowHot)"
                />
              )}

              {/* ── Glass tile body ── */}
              <rect
                x={nx - tw / 2} y={ny - th / 2}
                width={tw} height={th}
                rx={TR}
                fill="#0a1628"
                opacity={0.92}
                stroke={n.color}
                strokeWidth={isHov ? 1.4 : 0.8}
                strokeOpacity={isHov ? 1 : 0.55}
                filter={isHov ? 'url(#ecGlowHot)' : 'url(#ecGlow)'}
              />

              {/* ── Colour tint fill ── */}
              <rect
                x={nx - tw / 2} y={ny - th / 2}
                width={tw} height={th}
                rx={TR}
                fill={`url(#tg-${n.id})`}
              />

              {/* ── Top highlight edge (glass feel) ── */}
              <line
                x1={nx - tw / 2 + TR}     y1={ny - th / 2 + 0.5}
                x2={nx + tw / 2 - TR}     y2={ny - th / 2 + 0.5}
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* ── Icon (24×24 viewport, centered in upper tile) ── */}
              <g
                transform={`translate(${nx - 10} ${ny - th / 2 + 11})`}
                fill="none"
                stroke={n.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={isHov ? 1 : 0.72}
              >
                <path d={n.icon} />
              </g>

              {/* ── Label ── */}
              <text
                x={nx}
                y={ny + th / 2 - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHov ? n.color : 'rgba(203,213,225,0.78)'}
                fontSize="9.5"
                fontWeight={isHov ? '700' : '500'}
                fontFamily="Space Grotesk, Inter, system-ui"
                letterSpacing="0.03em"
              >
                {n.label}
              </text>
            </g>
          )
        })}

        {/* ════════════════ LAYER 5: central Jigyasa core ════════════════ */}
        <g>
          {/* Deep background aura */}
          <circle
            cx={corePx} cy={corePy}
            r={82 * coreBreath}
            fill="url(#ecCoreAura)"
          />

          {/* Rotating dashed inner ring */}
          <circle
            cx={corePx} cy={corePy}
            r={52}
            fill="none"
            stroke="#22D3EE"
            strokeWidth="0.7"
            strokeOpacity={0.35}
            strokeDasharray="4 8"
            transform={`rotate(${t * 18} ${corePx} ${corePy})`}
          />

          {/* Static outer ring */}
          <circle
            cx={corePx} cy={corePy}
            r={62}
            fill="none"
            stroke="#6366F1"
            strokeWidth="0.5"
            strokeOpacity={0.22}
          />

          {/* Core glass disc */}
          <circle
            cx={corePx} cy={corePy}
            r={42}
            fill="#060e22"
            stroke="#22D3EE"
            strokeWidth="1.2"
            strokeOpacity={0.55}
            filter="url(#ecGlow)"
          />

          {/* Radial fill overlay */}
          <circle
            cx={corePx} cy={corePy}
            r={42}
            fill="url(#ecCoreGrad)"
            opacity={0.35}
          />

          {/* Top highlight */}
          <ellipse
            cx={corePx} cy={corePy - 22}
            rx={18} ry={8}
            fill="rgba(255,255,255,0.07)"
          />

          {/* Bright centre dot */}
          <circle
            cx={corePx} cy={corePy}
            r={7}
            fill="#ffffff"
            opacity={0.88}
            filter="url(#ecGlow)"
          />
          <circle cx={corePx} cy={corePy} r={3} fill="#22D3EE" />

          {/* JIGYASA wordmark */}
          <text
            x={corePx} y={corePy + 26}
            textAnchor="middle"
            fill="#22D3EE"
            fontSize="8.5"
            fontWeight="800"
            fontFamily="Space Grotesk, Inter, system-ui"
            letterSpacing="0.18em"
            opacity={0.95}
          >
            JIGYASA
          </text>
          <text
            x={corePx} y={corePy + 37}
            textAnchor="middle"
            fill="rgba(148,163,184,0.55)"
            fontSize="5.5"
            fontWeight="500"
            fontFamily="Space Grotesk, Inter, system-ui"
            letterSpacing="0.12em"
          >
            TECHNOLOGIES
          </text>
        </g>

      </svg>

      {/* CSS keyframe for ambient pulse — lives outside SVG */}
      <style>{`
        @keyframes coreGlowPulse {
          0%,100% { opacity: 0.6; transform: scale(1);    }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
      `}</style>
    </div>
  )
}
