/**
 * SoftwareArchitectureMap — Premium software architecture visualization
 * Represents how Jigyasa Technologies builds digital products
 * Pure SVG + CSS + Framer Motion. No canvas, no Three.js, no images.
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  User, 
  Server, 
  Layout, 
  Database, 
  Cloud, 
  Rocket, 
  Activity,
  Shield,
  Cpu,
  Globe
} from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

/* ─── Architecture node definitions ─────── */
const ARCHITECTURE_NODES = [
  { id: 'user', label: 'USER', x: 280, y: 50, color: '#22D3EE', icon: User, size: 80 },
  { id: 'api', label: 'API GATEWAY', x: 280, y: 140, color: '#6366F1', icon: Globe, size: 90 },
  { id: 'frontend', label: 'FRONTEND', x: 140, y: 230, color: '#22D3EE', icon: Layout, size: 85 },
  { id: 'backend', label: 'BACKEND', x: 420, y: 230, color: '#3B82F6', icon: Server, size: 85 },
  { id: 'auth', label: 'AUTH', x: 140, y: 320, color: '#14B8A6', icon: Shield, size: 75 },
  { id: 'business', label: 'BUSINESS LOGIC', x: 420, y: 320, color: '#3B82F6', icon: Cpu, size: 85 },
  { id: 'database', label: 'DATABASE', x: 140, y: 410, color: '#8B5CF6', icon: Database, size: 80 },
  { id: 'ai', label: 'AI SERVICES', x: 420, y: 410, color: '#A78BFA', icon: Cpu, size: 80 },
  { id: 'cloud', label: 'CLOUD INFRA', x: 280, y: 490, color: '#0EA5E9', icon: Cloud, size: 90 },
  { id: 'deploy', label: 'DEPLOYMENT', x: 280, y: 570, color: '#10B981', icon: Rocket, size: 85 },
  { id: 'monitoring', label: 'MONITORING', x: 280, y: 650, color: '#F97316', icon: Activity, size: 80 },
]

/* ─── Connection definitions ─────── */
const CONNECTIONS = [
  ['user', 'api'],
  ['api', 'frontend'],
  ['api', 'backend'],
  ['frontend', 'auth'],
  ['backend', 'business'],
  ['auth', 'database'],
  ['business', 'ai'],
  ['database', 'cloud'],
  ['ai', 'cloud'],
  ['cloud', 'deploy'],
  ['deploy', 'monitoring'],
]

/* ─── Build SVG path between two nodes ── */
function routePath(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y
  const cx1 = a.x + dx * 0.5
  const cy1 = a.y + dy * 0.1
  const cx2 = a.x + dx * 0.5
  const cy2 = a.y + dy * 0.9
  return `M ${a.x} ${a.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${b.x} ${b.y}`
}

const nodeMap = Object.fromEntries(ARCHITECTURE_NODES.map(n => [n.id, n]))

/* ─── Glass node component ─────────────────────────────────── */
function GlassNode({ node, hovered, onHover, onLeave, index, inView }) {
  const Icon = node.icon
  const isHovered = hovered === node.id
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { 
        opacity: 1, 
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.04 : 1
      } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: EASE, delay: inView ? index * 0.15 : 0 }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={onLeave}
      style={{
        position: 'absolute',
        left: node.x - node.size / 2,
        top: node.y - node.size / 2,
        width: node.size,
        height: node.size,
        borderRadius: '16px',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isHovered ? node.color : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isHovered 
          ? `0 20px 60px ${node.color}33, 0 0 40px ${node.color}22`
          : '0 30px 80px rgba(0,0,0,0.35)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px',
        animation: 'ebFloat 7s ease-in-out infinite',
      }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 3 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Icon 
          size={24} 
          color={isHovered ? node.color : `${node.color}99`}
          strokeWidth={1.5}
        />
      </motion.div>
      <span 
        style={{
          fontSize: '11px',
          fontWeight: '500',
          letterSpacing: '0.08em',
          color: isHovered ? node.color : 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        {node.label}
      </span>
    </motion.div>
  )
}

/* ─── Data packet component ─────────────────────────────────── */
function DataPacket({ path, delay, duration }) {
  const colors = ['#22D3EE', '#3B82F6', '#8B5CF6', '#10B981']
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  return (
    <circle 
      r={5} 
      fill={color}
      style={{
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        animation: `ebTravel ${duration}s ${delay}s linear infinite`,
        opacity: 0,
        filter: `blur(4px) drop-shadow(0 0 8px ${color}) drop-shadow(0 0 12px ${color})`,
      }}
    />
  )
}

/* ─── Main component ──────────────────────────────────────── */
export default function SoftwareArchitectureMap({ inView }) {
  const [hovered, setHovered] = useState(null)
  const [pulse, setPulse] = useState(false)
  const wrapRef = useRef(null)

  /* parallax */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spX = useSpring(rawX, { stiffness: 55, damping: 22 })
  const spY = useSpring(rawY, { stiffness: 55, damping: 22 })

  const onMove = useCallback((e) => {
    if (!wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 10)
  }, [rawX, rawY])

  /* scan pulse every 7 seconds */
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 1800)
    }, 7000)
    return () => clearInterval(id)
  }, [inView])

  /* build data packets */
  const packets = []
  CONNECTIONS.forEach(([aId, bId], i) => {
    const a = nodeMap[aId], b = nodeMap[bId]
    if (!a || !b) return
    const p = routePath(a, b)
    const dur = 4 + (i % 3) * 1
    packets.push({ path: p, delay: (i * 0.3) % 6, duration: dur })
    if (i % 2 === 0)
      packets.push({ path: p, delay: ((i * 0.5) + 2) % 7, duration: dur + 1 })
  })

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0) }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 580,
        height: 720,
        margin: '0 auto',
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes ebTravel {
          0%   { offset-distance:  0%; opacity:0; }
          10%  { opacity:.9; }
          85%  { opacity:.7; }
          100% { offset-distance:100%; opacity:0; }
        }
        @keyframes ebFloat {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-4px); }
        }
        @keyframes ebRingRotate {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes ebPulseRing {
          0%   { transform:scale(1);   opacity:.18; }
          100% { transform:scale(2.4); opacity:0; }
        }
        @keyframes ebStatusBlink {
          0%,100% { opacity:1; }
          50%     { opacity:.4; }
        }
        @keyframes ebDashFlow {
          to { stroke-dashoffset: -28; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>

      {/* ── Background radial glow ── */}
      <div 
        style={{
          position: 'absolute',
          inset: '-50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Blueprint grid ── */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(34,211,238,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.6) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating particles ── */}
      {Array.from({ length: 25 }, (_, i) => {
        const angle = (i / 25) * Math.PI * 2
        const r = 150 + (i % 5) * 30
        const cx = 290 + Math.cos(angle) * r * 0.6
        const cy = 360 + Math.sin(angle) * r * 0.5
        const sz = 2 + (i % 2) * 2
        const colors = ['#22D3EE', '#6366F1', '#3B82F6', '#8B5CF6', '#10B981']
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(cx / 580) * 100}%`,
              top: `${(cy / 720) * 100}%`,
              width: sz,
              height: sz,
              borderRadius: '50%',
              background: colors[i % colors.length],
              opacity: 0.1,
              filter: 'blur(1px)',
              animation: `ebFloat ${6 + (i % 4)}s ${(i * 0.2)}s ease-in-out infinite`,
            }}
          />
        )
      })}

      {/* ── Main SVG with parallax ── */}
      <motion.div
        style={{ x: spX, y: spY, position: 'relative', width: '100%', height: '100%' }}
      >
        <svg
          viewBox="0 0 580 720"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
          aria-hidden
        >
          <defs>
            {/* Connection gradients */}
            {CONNECTIONS.map(([aId, bId], i) => {
              const na = nodeMap[aId], nb = nodeMap[bId]
              if (!na || !nb) return null
              return (
                <linearGradient
                  key={`cg${i}`}
                  id={`cg${i}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
                </linearGradient>
              )
            })}
          </defs>

          {/* Connections */}
          <g>
            {CONNECTIONS.map(([aId, bId], i) => {
              const a = nodeMap[aId], b = nodeMap[bId]
              if (!a || !b) return null
              const isHov = hovered === aId || hovered === bId
              return (
                <path
                  key={i}
                  d={routePath(a, b)}
                  fill="none"
                  stroke={`url(#cg${i})`}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  opacity={isHov ? 0.85 : 0.45}
                  style={{
                    transition: 'opacity 300ms ease',
                    animation: 'ebDashFlow 3s linear infinite',
                  }}
                />
              )
            })}
          </g>

          {/* Data packets */}
          <g>
            {packets.map((pt, i) => (
              <DataPacket key={i} {...pt} />
            ))}
          </g>

          {/* Scan pulse from center */}
          {pulse && (
            <circle
              cx="280"
              cy="360"
              r={80}
              fill="none"
              stroke="rgba(34,211,238,0.5)"
              strokeWidth={2}
              style={{ animation: 'ebPulseRing 1.8s ease-out forwards' }}
            />
          )}
        </svg>

        {/* Energy rings behind center */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '1px solid rgba(34,211,238,0.12)',
              animation: 'ebRingRotate 24s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: '50%',
              border: '1px solid rgba(99,102,241,0.10)',
              animation: 'ebRingRotate 30s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.08)',
              animation: 'ebRingRotate 36s linear infinite',
            }}
          />
        </div>

        {/* Architecture nodes */}
        {ARCHITECTURE_NODES.map((node, index) => (
          <GlassNode
            key={node.id}
            node={node}
            hovered={hovered}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
            index={index}
            inView={inView}
          />
        ))}
      </motion.div>

      {/* ── Live status indicator ── */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '20px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
            animation: 'ebStatusBlink 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.8)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          SYSTEM ONLINE
        </span>
      </div>

      {/* ── Metrics display ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '12px 16px',
          borderRadius: '12px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>NODES</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontFamily: 'JetBrains Mono, monospace' }}>11</div>
          </div>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>CONNECTIONS</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontFamily: 'JetBrains Mono, monospace' }}>11</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>LATENCY</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontFamily: 'JetBrains Mono, monospace' }}>42ms</div>
          </div>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>STATUS</div>
            <div style={{ fontSize: '12px', color: '#10B981', fontFamily: 'JetBrains Mono, monospace' }}>Healthy</div>
          </div>
        </div>
      </div>
    </div>
  )
}
