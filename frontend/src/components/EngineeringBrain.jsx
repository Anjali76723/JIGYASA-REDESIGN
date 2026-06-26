
/**
 * EngineeringBrain — glass circuit sculpture for the About hero.
 * Pure SVG + CSS + Framer Motion. No canvas, no Three.js, no images.
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/* ─── Node definitions (x,y in 0-560 space, r=radius) ─────── */
const NODES = [
  { id:'strategy',     x:280, y:90,  r:24, label:'STRATEGY',     c:'#22D3EE', layer:4 },
  { id:'design',       x:160, y:140, r:20, label:'DESIGN',       c:'#6366F1', layer:4 },
  { id:'engineering',  x:400, y:140, r:24, label:'ENGINEERING',  c:'#22D3EE', layer:4 },
  { id:'architecture', x:100, y:240, r:18, label:'ARCH',         c:'#3B82F6', layer:3 },
  { id:'frontend',     x:210, y:260, r:20, label:'FRONTEND',     c:'#6366F1', layer:4 },
  { id:'backend',      x:350, y:260, r:20, label:'BACKEND',      c:'#6366F1', layer:4 },
  { id:'cloud',        x:460, y:240, r:18, label:'CLOUD',        c:'#22D3EE', layer:3 },
  { id:'security',     x:130, y:360, r:18, label:'SECURITY',     c:'#10B981', layer:3 },
  { id:'testing',      x:250, y:370, r:16, label:'TESTING',      c:'#8B5CF6', layer:3 },
  { id:'deploy',       x:380, y:365, r:16, label:'DEPLOY',       c:'#22D3EE', layer:3 },
  { id:'perf',         x:480, y:355, r:14, label:'PERF',         c:'#3B82F6', layer:3 },
  { id:'core',         x:280, y:230, r:54, label:'CORE',         c:'#22D3EE', layer:5, core:true },
  { id:'scale',        x:280, y:430, r:22, label:'SCALE',        c:'#6366F1', layer:4 },
  { id:'data',         x:170, y:180, r:16, label:'DATA',         c:'#8B5CF6', layer:3 },
  { id:'ux',           x:390, y:185, r:16, label:'UX',           c:'#A78BFA', layer:3 },
]

/* ─── Circuit path edges ───────────────────────────────────── */
const EDGES = [
  { from:'strategy', to:'design', primary:true },
  { from:'strategy', to:'engineering', primary:true },
  { from:'strategy', to:'core', primary:true },
  { from:'design', to:'frontend', primary:true },
  { from:'design', to:'data', primary:false },
  { from:'design', to:'core', primary:true },
  { from:'engineering', to:'backend', primary:true },
  { from:'engineering', to:'ux', primary:false },
  { from:'engineering', to:'core', primary:true },
  { from:'architecture', to:'frontend', primary:false },
  { from:'architecture', to:'security', primary:false },
  { from:'frontend', to:'backend', primary:true },
  { from:'frontend', to:'core', primary:true },
  { from:'frontend', to:'testing', primary:false },
  { from:'backend', to:'cloud', primary:true },
  { from:'backend', to:'core', primary:true },
  { from:'backend', to:'deploy', primary:true },
  { from:'cloud', to:'perf', primary:false },
  { from:'cloud', to:'deploy', primary:false },
  { from:'security', to:'testing', primary:false },
  { from:'testing', to:'deploy', primary:false },
  { from:'core', to:'scale', primary:true },
  { from:'core', to:'data', primary:true },
  { from:'core', to:'ux', primary:true },
  { from:'deploy', to:'perf', primary:false },
  { from:'scale', to:'security', primary:false },
  { from:'scale', to:'perf', primary:false },
  { from:'data', to:'architecture', primary:false },
  { from:'ux', to:'cloud', primary:false },
]

/* ─── Build SVG path between two nodes (orthogonal routing) ── */
function routePath(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y
  const cx1 = a.x + dx * 0.4
  const cy1 = a.y + dy * 0.1
  const cx2 = a.x + dx * 0.6
  const cy2 = a.y + dy * 0.9
  return `M ${a.x} ${a.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${b.x} ${b.y}`
}

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

/* ─── Data packet component ─────────────────────────────────── */
function DataPacket({ path, color, dur, delay }) {
  const colors = ['#22D3EE', '#3B82F6', '#8B5CF6']
  const packetColor = colors[Math.floor(Math.random() * colors.length)]
  return (
    <circle r={4} fill={packetColor} style={{
      offsetPath: `path("${path}")`,
      offsetRotate: '0deg',
      animation: `ebTravel ${dur}s ${delay}s linear infinite`,
      opacity: 0,
      filter: `blur(6px) drop-shadow(0 0 8px ${packetColor}) drop-shadow(0 0 12px ${packetColor})`,
    }} />
  )
}

/* ─── Outer brain silhouette (brain-like rounded outline) ────── */
function BrainShell() {
  return (
    <g>
      <path
        d="M280,50
           C240,30 130,50 100,130
           C70,210 90,290 120,340
           C140,380 170,420 200,440
           C220,455 250,460 280,462
           C310,460 340,455 360,440
           C390,420 420,380 440,340
           C470,290 490,210 460,130
           C430,50 320,30 280,50 Z"
        fill="rgba(13,20,50,0.07)"
        stroke="rgba(80,170,255,0.10)"
        strokeWidth="1"
        style={{ filter: 'blur(0.5px)' }}
      />
    </g>
  )
}

/* ─── Premium hexagonal glass crystal center ───────────────────── */
function CrystalCore({ x, y, r, pulse, hovered }) {
  const size = r
  const glowIntensity = hovered ? 1.3 : (pulse ? 1.15 : 1)
  
  // Hex points for main crystal
  const hexPoints = Array.from({length:6}, (_,i) => {
    const a = (i * 60 - 30) * Math.PI / 180
    return `${x + size * Math.cos(a)},${y + size * Math.sin(a)}`
  }).join(' ')
  
  // Inner hex points
  const innerHexPoints = Array.from({length:6}, (_,i) => {
    const a = (i * 60 - 30) * Math.PI / 180
    return `${x + size * 0.6 * Math.cos(a)},${y + size * 0.6 * Math.sin(a)}`
  }).join(' ')

  return (
    <g>
      {/* Outer glow */}
      <ellipse cx={x} cy={y} rx={size * 1.4} ry={size * 1.4}
        fill="rgba(34,211,238,0.08)"
        style={{ filter: `blur(20px)`, transition: 'all 400ms ease' }}
      />
      
      {/* Glass crystal layers */}
      <polygon points={hexPoints}
        fill="rgba(34,211,238,0.12)"
        stroke="rgba(34,211,238,0.3)"
        strokeWidth={2}
        style={{
          filter: `drop-shadow(0 0 ${20 * glowIntensity}px rgba(34,211,238,${0.4 * glowIntensity}))`,
          transition: 'all 400ms ease'
        }}
      />
      
      {/* Inner refraction layer */}
      <polygon points={innerHexPoints}
        fill="rgba(59,130,246,0.15)"
        stroke="rgba(59,130,246,0.25)"
        strokeWidth={1.5}
      />
      
      {/* Center highlight */}
      <circle cx={x} cy={y} r={size * 0.25}
        fill="rgba(255,255,255,0.4)"
        style={{ filter: 'blur(4px)' }}
      />
      
      {/* Inner core dot */}
      <circle cx={x} cy={y} r={size * 0.12}
        fill="#22D3EE"
        style={{
          filter: `drop-shadow(0 0 8px #22D3EE) drop-shadow(0 0 16px #22D3EE)`,
          animation: `ebCoreBreath 3s ease-in-out infinite`
        }}
      />
    </g>
  )
}

/* ─── Holographic rings around crystal ─────────────────────────── */
function HolographicRings({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r={70}
        fill="none"
        stroke="rgba(34,211,238,0.2)"
        strokeWidth={2}
        style={{ animation: 'ebRingRotate 18s linear infinite', transformOrigin: `${x}px ${y}px` }}
      />
      <circle cx={x} cy={y} r={81}
        fill="none"
        stroke="rgba(59,130,246,0.2)"
        strokeWidth={2}
        style={{ animation: 'ebRingRotate 26s linear infinite reverse', transformOrigin: `${x}px ${y}px` }}
      />
      <circle cx={x} cy={y} r={92}
        fill="none"
        stroke="rgba(99,102,241,0.2)"
        strokeWidth={2}
        style={{ animation: 'ebRingRotate 34s linear infinite', transformOrigin: `${x}px ${y}px` }}
      />
    </g>
  )
}

/* ─── Hexagonal nodes ─────────────────────────────────────── */
function HexNode({ node, pulse, hovered }) {
  const isCore = node.core
  const active = hovered === node.id || isCore
  const size = node.r
  const nodeIndex = NODES.indexOf(node)

  const pts = Array.from({length:6}, (_,i) => {
    const a = (i * 60 - 30) * Math.PI / 180
    return `${node.x + size * Math.cos(a)},${node.y + size * Math.sin(a)}`
  }).join(' ')

  return (
    <g>
      {/* Glass hex body */}
      <polygon points={pts}
        fill={active ? `${node.c}18` : `${node.c}0a`}
        stroke={active ? `${node.c}66` : `${node.c}33`}
        strokeWidth={1.5}
        style={{
          transition: 'all 350ms ease',
          filter: active ? `drop-shadow(0 0 8px ${node.c}aa)` : 'drop-shadow(0 0 4px ${node.c}66)',
          animation: `ebNodeBreath ${2.5 + (nodeIndex % 4) * 0.5}s ${(nodeIndex % 5) * 0.3}s ease-in-out infinite`
        }}
      />
      
      {/* Inner highlight */}
      <circle cx={node.x - size * 0.2} cy={node.y - size * 0.2} r={size * 0.15}
        fill="rgba(255,255,255,0.3)"
        style={{ filter: 'blur(2px)' }}
      />
      
      {/* Center dot */}
      <circle cx={node.x} cy={node.y} r={size * 0.15}
        fill={node.c}
        style={{
          filter: `drop-shadow(0 0 6px ${node.c})`,
        }}
      />
      
      {/* Label */}
      {!isCore && (
        <text x={node.x} y={node.y - size - 8}
          textAnchor="middle" fontSize="11"
          fill={`${node.c}b3`}
          fontFamily="JetBrains Mono, monospace"
          fontWeight="400"
          letterSpacing="0.18em">
          {node.label}
        </text>
      )}
    </g>
  )
}

/* ─── Main component ──────────────────────────────────────── */
export default function EngineeringBrain({ inView }) {
  const [pulse,   setPulse]   = useState(false)
  const [hovered, setHovered] = useState(null)
  const [sweep,   setSweep]   = useState(false)
  const wrapRef = useRef(null)

  /* parallax */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spX  = useSpring(rawX, { stiffness:55, damping:22 })
  const spY  = useSpring(rawY, { stiffness:55, damping:22 })
  const rotateX = useTransform(rawY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(rawX, [-0.5, 0.5], [-4, 4])

  const onMove = useCallback((e) => {
    if (!wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    rawX.set(((e.clientX - r.left) / r.width  - 0.5) * 2)
    rawY.set(((e.clientY - r.top)  / r.height - 0.5) * 2)
  }, [rawX, rawY])

  /* scan pulse every 4 seconds */
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 1800)
    }, 4000)
    return () => clearInterval(id)
  }, [inView])

  /* light sweep every 10 seconds */
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setSweep(true)
      setTimeout(() => setSweep(false), 1500)
    }, 10000)
    return () => clearInterval(id)
  }, [inView])

  /* build data packets — continuous flow */
  const dataPackets = []
  EDGES.forEach((edge, i) => {
    const a = nodeMap[edge.from], b = nodeMap[edge.to]
    if (!a || !b) return
    const p = routePath(a, b)
    const dur = 4 + (i % 6) * 0.5
    dataPackets.push({ path:p, color:a.c, dur, delay:(i*0.25)%5 })
    if (i % 2 === 0)
      dataPackets.push({ path:p, color:b.c, dur:dur+1.5, delay:((i*0.4)+2)%6 })
  })

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0) }}
      style={{ position:'relative', width:'100%', maxWidth:520, height:540,
        margin:'0 auto', cursor:'default' }}
    >
      <style>{`
        @keyframes ebTravel {
          0%   { offset-distance:  0%; opacity:0; }
          5%   { opacity:.9; }
          95%  { opacity:.8; }
          100% { offset-distance:100%; opacity:0; }
        }
        @keyframes ebNodeBreath {
          0%,100% { opacity:.6; }
          50%     { opacity:.9; }
        }
        @keyframes ebCoreBreath {
          0%,100% { transform:scale(1); opacity:.8; }
          50%     { transform:scale(1.1); opacity:1; }
        }
        @keyframes ebFloat {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-8px); }
        }
        @keyframes ebRingRotate {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes ebPtcl {
          0%,100% { opacity:.15; transform:translate(0,0); }
          50%     { opacity:.25; transform:translate(var(--dx),var(--dy)); }
        }
        @keyframes ebSweep {
          from { transform:translateX(-100%); }
          to   { transform:translateX(100%); }
        }
        @keyframes ebPulseRing {
          0%   { transform:scale(1);   opacity:.6; }
          100% { transform:scale(3.5); opacity:0; }
        }
        @keyframes ebDashFlow {
          to { stroke-dashoffset: -40; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>

      {/* ── Layer 1: radial background glow ── */}
      <div aria-hidden style={{ position:'absolute', inset:'-20%', pointerEvents:'none',
        background:'radial-gradient(ellipse at 50% 50%,rgba(34,211,238,.08) 0%,rgba(99,102,241,.05) 40%,transparent 68%)',
        filter:'blur(30px)', zIndex:0 }} />

      {/* ── Layer 2: blueprint grid (reduced to 3%) ── */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        opacity:.03,
        backgroundImage:'linear-gradient(rgba(34,211,238,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.6) 1px,transparent 1px)',
        backgroundSize:'32px 32px',
        borderRadius:20 }} />

      {/* ── Layer 3: energy rings behind crystal (12% opacity) ── */}
      <div aria-hidden style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2,
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', width:180, height:180,
          borderRadius:'50%', border:'1px solid rgba(34,211,238,0.12)',
          animation:'ebRingRotate 18s linear infinite' }} />
        <div style={{ position:'absolute', width:240, height:240,
          borderRadius:'50%', border:'1px solid rgba(59,130,246,0.12)',
          animation:'ebRingRotate 26s linear infinite reverse' }} />
        <div style={{ position:'absolute', width:300, height:300,
          borderRadius:'50%', border:'1px solid rgba(99,102,241,0.12)',
          animation:'ebRingRotate 34s linear infinite' }} />
      </div>

      {/* ── Layer 3-5: main SVG brain with parallax ── */}
      <motion.div
        style={{ x: spX, y: spY, position:'relative', zIndex:3, width:'100%', height:'100%',
          animation: inView ? 'ebFloat 10s ease-in-out infinite' : 'none' }}
        animate={hovered ? { scale:1.02, rotate:2 } : { scale:1, rotate:0 }}
        transition={{ duration:.4, ease:EASE }}
      >
        <svg
          viewBox="0 0 560 510"
          width="100%" height="100%"
          style={{ overflow:'visible' }}
          aria-hidden
        >
          <defs>
            {/* edge gradients */}
            {EDGES.map((edge, i) => {
              const na = nodeMap[edge.from], nb = nodeMap[edge.to]
              if (!na||!nb) return null
              return (
                <linearGradient key={`lg${i}`} id={`eg${i}`}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor={na.c} stopOpacity=".8"/>
                  <stop offset="100%" stopColor={nb.c} stopOpacity=".6"/>
                </linearGradient>
              )
            })}
            {/* clip path for brain */}
            <clipPath id="brainClip">
              <path d="M280,50 C240,30 130,50 100,130 C70,210 90,290 120,340 C140,380 170,420 200,440 C220,455 250,460 280,462 C310,460 340,455 360,440 C390,420 420,380 440,340 C470,290 490,210 460,130 C430,50 320,30 280,50 Z"/>
            </clipPath>
          </defs>

          {/* Brain shell — layer 3 (reduced opacity) */}
          <BrainShell />

          {/* Circuit edges — layer 4 (improved with gradient, 2.5px width, animated dash) */}
          <g opacity={pulse ? 0.9 : 0.6} style={{ transition:'opacity 600ms ease' }}>
            {EDGES.map((edge, i) => {
              const a = nodeMap[edge.from], b = nodeMap[edge.to]
              if (!a||!b) return null
              const isHov = hovered===edge.from || hovered===edge.to
              const opacity = edge.primary ? (isHov ? 1 : 0.8) : (isHov ? 0.6 : 0.4)
              return (
                <path key={i}
                  d={routePath(a,b)}
                  fill="none"
                  stroke={`url(#eg${i})`}
                  strokeWidth={2.5}
                  strokeDasharray="8 6"
                  opacity={opacity}
                  style={{
                    transition:'stroke-width 300ms, opacity 300ms',
                    animation: 'ebDashFlow 3s linear infinite'
                  }}
                />
              )
            })}
          </g>

          {/* Data packets — layer 5 (continuous flow) */}
          <g>
            {dataPackets.map((pt, i) => (
              <DataPacket key={i} {...pt} />
            ))}
          </g>

          {/* Premium crystal core — layer 5 */}
          <CrystalCore x={280} y={230} r={54} pulse={pulse} hovered={hovered === 'core'} />

          {/* Holographic rings around crystal */}
          <HolographicRings x={280} y={230} />

          {/* Nodes — layer 4-5 */}
          {NODES.map(n => (
            <g key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor:'default' }}>
              <HexNode node={n} pulse={pulse} hovered={hovered} />
              {/* invisible hit area */}
              <circle cx={n.x} cy={n.y} r={n.r+12} fill="transparent" />
            </g>
          ))}

          {/* Scan pulse from core (every 4s, 1.8s duration) */}
          {pulse && (
            <circle cx="280" cy="230" r={70} fill="none"
              stroke="rgba(34,211,238,.7)" strokeWidth={2}
              style={{ animation:'ebPulseRing 1.8s ease-out forwards' }}
            />
          )}

          {/* Light sweep overlay (every 10s, 1.5s duration) */}
          {sweep && (
            <g clipPath="url(#brainClip)">
              <rect x="-20" y="0" width="120" height="510"
                fill="url(#sweepGrad)"
                style={{ animation:'ebSweep 1.5s ease-out forwards' }}
              />
              <defs>
                <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="transparent"/>
                  <stop offset="45%"  stopColor="rgba(34,211,238,.08)"/>
                  <stop offset="50%"  stopColor="rgba(34,211,238,.12)"/>
                  <stop offset="55%"  stopColor="rgba(34,211,238,.08)"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
            </g>
          )}

          {/* Three light sources */}
          <ellipse cx="280" cy="490" rx="160" ry="40"
            fill="rgba(34,211,238,.04)" style={{ filter:'blur(18px)' }} />
          <ellipse cx="80" cy="250" rx="60" ry="120"
            fill="rgba(59,130,246,.03)" style={{ filter:'blur(20px)' }} />
          <ellipse cx="460" cy="80" rx="80" ry="50"
            fill="rgba(99,102,241,.03)" style={{ filter:'blur(16px)' }} />
        </svg>

        {/* Floating engineering particles (25 max, 2-3px, 15-25% opacity) */}
        {Array.from({length:25}, (_,i) => {
          const angle = (i / 25) * Math.PI * 2
          const r = 200 + (i % 6) * 20
          const cx = 260 + Math.cos(angle) * r * 0.5
          const cy = 270 + Math.sin(angle) * r * 0.4
          const sz = 2 + (i % 2) * 1
          const colors = ['#22D3EE','#6366F1','#3B82F6','#8B5CF6','#10B981']
          return (
            <div key={i} aria-hidden style={{
              position:'absolute',
              left: `${(cx / 560) * 100}%`,
              top:  `${(cy / 510) * 100}%`,
              width:sz, height:sz,
              borderRadius:'50%',
              background: colors[i % colors.length],
              filter:'blur(.5px)',
              '--dx': `${(Math.random()-.5)*8}px`,
              '--dy': `${(Math.random()-.5)*8}px`,
              animation:`ebPtcl ${4+(i%6)}s ${(i*.35)%5}s ease-in-out infinite`,
              opacity: 0.15 + (i % 3) * 0.05,
            }} />
          )
        })}
      </motion.div>

      {/* Ambient corner glow accents */}
      <div aria-hidden style={{ position:'absolute', top:-10, right:-10,
        width:80, height:80, borderRadius:'50%',
        background:'rgba(34,211,238,.08)', filter:'blur(24px)', pointerEvents:'none', zIndex:0 }} />
      <div aria-hidden style={{ position:'absolute', bottom:-10, left:-10,
        width:80, height:80, borderRadius:'50%',
        background:'rgba(99,102,241,.06)', filter:'blur(24px)', pointerEvents:'none', zIndex:0 }} />
    </div>
  )
}
