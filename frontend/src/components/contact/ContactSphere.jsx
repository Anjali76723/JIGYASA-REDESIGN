/**
 * ContactSphere.jsx
 * ─────────────────
 * A rotating particle-network sphere built with React Three Fiber.
 * Lazy-loaded by ContactSection so it never blocks first paint.
 *
 * Technique:
 *  - N random points on a unit sphere (Fibonacci lattice for even distribution)
 *  - Points rendered as a single Points object (one draw call)
 *  - Connections between nearby points rendered as a LineSegments object
 *  - Smooth slow rotation + mouse-parallax tilt
 *  - Energy "pulse" particles travel along random connection edges
 */
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ── tuneable constants ── */
const N_POINTS       = 175    // ↓ from 280 — less dense, more airy
const SPHERE_R       = 1.35   // ↓ from 1.6  — ~16% smaller sphere
const CONNECT_DIST   = 0.60   // ↓ from 0.72 — fewer connections (~35% reduction)
const N_PULSES       = 8      // ↓ from 14   — cleaner energy pulses
const PULSE_SPEED    = 0.007  // ↓ from 0.009 — slightly slower pulses
const ROTATION_SPEED = 0.0010 // ↓ from 0.0015 — ~33% slower, more premium feel

/* ── Fibonacci sphere: evenly-spaced points on a unit sphere ── */
function fibonacciSphere(n, r) {
  const positions = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th  = golden * i
    positions[i * 3]     = Math.cos(th) * rad * r
    positions[i * 3 + 1] = y * r
    positions[i * 3 + 2] = Math.sin(th) * rad * r
  }
  return positions
}

/* ── Build connection edge list (pairs of point indices) ── */
function buildEdges(positions, n, maxDist) {
  const edges = []
  for (let i = 0; i < n; i++) {
    const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2]
    for (let j = i + 1; j < n; j++) {
      const dx = ax - positions[j * 3]
      const dy = ay - positions[j * 3 + 1]
      const dz = az - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        edges.push(i, j)
      }
    }
  }
  return edges   // flat array of [i0,j0, i1,j1, ...]
}

/* ── Gradient colours per point based on y position ── */
function buildPointColors(positions, n) {
  const colors = new Float32Array(n * 3)
  const cyan   = new THREE.Color('#22D3EE')
  const indigo = new THREE.Color('#6366F1')
  const purple = new THREE.Color('#A78BFA')
  for (let i = 0; i < n; i++) {
    const y = (positions[i * 3 + 1] / SPHERE_R + 1) / 2   // 0..1
    const c = y > 0.5
      ? cyan.clone().lerp(indigo, (y - 0.5) * 2)
      : indigo.clone().lerp(purple, (0.5 - y) * 2)
    colors[i * 3]     = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  return colors
}

/* ─────────────────────────────────────────────────────────
   INNER SCENE — lives inside <Canvas>
─────────────────────────────────────────────────────────── */
function SphereScene({ mouseRef }) {
  const groupRef  = useRef()
  const pulseRef  = useRef()
  const { size }  = useThree()

  /* ── Static geometry data (computed once) ── */
  const { positions, colors, linePositions, edges } = useMemo(() => {
    const pos   = fibonacciSphere(N_POINTS, SPHERE_R)
    const cols  = buildPointColors(pos, N_POINTS)
    const edg   = buildEdges(pos, N_POINTS, CONNECT_DIST)

    /* Build line vertex buffer from edge list */
    const linePos = new Float32Array(edg.length * 3)
    for (let k = 0; k < edg.length; k++) {
      const idx = edg[k]
      linePos[k * 3]     = pos[idx * 3]
      linePos[k * 3 + 1] = pos[idx * 3 + 1]
      linePos[k * 3 + 2] = pos[idx * 3 + 2]
    }
    return { positions: pos, colors: cols, linePositions: linePos, edges: edg }
  }, [])

  /* ── Pulse state: each pulse travels along one random edge ── */
  const pulses = useMemo(() => Array.from({ length: N_PULSES }, () => {
    const ei = Math.floor(Math.random() * (edges.length / 2)) * 2
    return { ei, t: Math.random(), dir: Math.random() > 0.5 ? 1 : -1 }
  }), [edges])

  /* ── Pulse geometry (Points — one per pulse) ── */
  const pulsePositions = useMemo(() => new Float32Array(N_PULSES * 3), [])
  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3))
    return g
  }, [pulsePositions])

  /* ── Smooth mouse lerp ── */
  const targetTilt = useRef({ x: 0, y: 0 })
  const currentTilt = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fn = (e) => {
      targetTilt.current.x = ((e.clientY / window.innerHeight) - 0.5) * 0.4
      targetTilt.current.y = ((e.clientX / window.innerWidth)  - 0.5) * 0.4
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  /* ── Per-frame update ── */
  useFrame(() => {
    if (!groupRef.current) return

    /* Rotation */
    groupRef.current.rotation.y += ROTATION_SPEED

    /* Mouse parallax tilt (lerp) */
    currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.05
    currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.05
    groupRef.current.rotation.x = currentTilt.current.x
    groupRef.current.rotation.z = currentTilt.current.y * 0.3

    /* Advance pulses */
    const arr = pulsePositions
    for (let k = 0; k < N_PULSES; k++) {
      const p = pulses[k]
      p.t += PULSE_SPEED * p.dir
      if (p.t > 1 || p.t < 0) {
        p.dir = -p.dir
        const ei = Math.floor(Math.random() * (edges.length / 2)) * 2
        p.ei = ei
      }
      const t    = Math.max(0, Math.min(1, p.t))
      const idxA = edges[p.ei]
      const idxB = edges[p.ei + 1]
      arr[k * 3]     = positions[idxA * 3]     + (positions[idxB * 3]     - positions[idxA * 3])     * t
      arr[k * 3 + 1] = positions[idxA * 3 + 1] + (positions[idxB * 3 + 1] - positions[idxA * 3 + 1]) * t
      arr[k * 3 + 2] = positions[idxA * 3 + 2] + (positions[idxB * 3 + 2] - positions[idxA * 3 + 2]) * t
    }
    pulseGeo.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      {/* ── Network points ── */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.92}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* ── Connection lines ── */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>

      {/* ── Energy pulses ── */}
      <points ref={pulseRef} geometry={pulseGeo}>
        <pointsMaterial
          size={0.07}
          color="#22D3EE"
          transparent
          opacity={0.98}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────
   PUBLIC COMPONENT
─────────────────────────────────────────────────────────── */
export default function ContactSphere() {
  const mouseRef = useRef({ x: 0, y: 0 })

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.8], fov: 48 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          preserveDrawingBuffer: false,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <ambientLight intensity={0.12} />
        {/* Cyan core point light for the centre glow effect */}
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#22D3EE" distance={3} decay={2} />
        <SphereScene mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
