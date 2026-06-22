import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────
   GLSL — vertex shader (standard fullscreen quad pass-through)
───────────────────────────────────────────────────────────────── */
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

/* ─────────────────────────────────────────────────────────────────
   GLSL — fragment shader
   Technique: layered smooth radial blobs driven by slow sine waves.
   No texture lookups, no noise texture — pure math.
   Very low GPU cost.
───────────────────────────────────────────────────────────────── */
const fragmentShader = /* glsl */`
  precision mediump float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;       // normalised 0-1
  uniform float uIntensity;   // 0.5 on mobile, 1.0 on desktop

  varying vec2 vUv;

  /* ── Smooth falloff blob ── */
  float blob(vec2 uv, vec2 center, float radius, float softness) {
    float d = length(uv - center);
    return smoothstep(radius, radius - softness, d);
  }

  /* ── Simple 2D value noise for organic wobble ── */
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);          // smoothstep interpolation
    float a = hash(i);
    float b = hash(i + vec2(1,0));
    float c = hash(i + vec2(0,1));
    float d = hash(i + vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }

  /* ── Fractional brownian motion — 3 octaves only ── */
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    /* Correct for aspect ratio so blobs are round */
    float aspect = uResolution.x / uResolution.y;
    vec2  uv     = vUv;
    uv.x        *= aspect;

    float t  = uTime * 0.12;           // very slow — one cycle ~52 s
    float mt = uTime * 0.05;

    /* ── Subtle mouse parallax offset (max 8px → ~0.006 in UV) ── */
    vec2 mOff = (uMouse - 0.5) * 0.012;

    /* ────────────────────────────────────────────
       AURORA BAND 1  — top-left cyan (#2: edge only)
    ──────────────────────────────────────────── */
    vec2 c1 = vec2(
      -0.08 * aspect + sin(t * 0.7) * 0.14 * aspect + mOff.x,
       0.90          + cos(t * 0.5) * 0.08           + mOff.y
    );
    float n1 = fbm(uv * 1.4 + vec2(t * 0.3, t * 0.2));
    float b1 = blob(uv + vec2(n1 * 0.12), c1, 0.42 * aspect, 0.38 * aspect);

    /* ────────────────────────────────────────────
       AURORA BAND 2  — right edge indigo (#2: edge only)
    ──────────────────────────────────────────── */
    vec2 c2 = vec2(
      1.10 * aspect + cos(t * 0.6) * 0.10 * aspect + mOff.x,
       0.50         + sin(t * 0.4) * 0.14           + mOff.y
    );
    float n2 = fbm(uv * 1.2 + vec2(t * 0.2, -t * 0.25) + 3.7);
    float b2 = blob(uv + vec2(n2 * 0.10), c2, 0.48 * aspect, 0.40 * aspect);

    /* ────────────────────────────────────────────
       AURORA BAND 3  — bottom-right edge (#2: edge only)
    ──────────────────────────────────────────── */
    vec2 c3 = vec2(
      1.05 * aspect + sin(t * 0.55 + 1.2) * 0.08 * aspect + mOff.x,
       0.05         + cos(t * 0.45 + 2.1) * 0.08           + mOff.y
    );
    float n3 = fbm(uv * 1.6 - vec2(t * 0.15, t * 0.18) + 7.3);
    float b3 = blob(uv + vec2(n3 * 0.08), c3, 0.36 * aspect, 0.32 * aspect);

    /* ── Brand colours ── */
    vec3 cyan   = vec3(0.133, 0.831, 0.933);   /* #22D3EE */
    vec3 indigo = vec3(0.388, 0.400, 0.945);   /* #6366F1 */
    vec3 bg     = vec3(0.008, 0.024, 0.090);   /* #020617 */

    /* ── Compose aurora colour ── */
    vec3 aurora = vec3(0.0);
    aurora += b1 * cyan   * 0.55;
    aurora += b2 * indigo * 0.65;
    aurora += b3 * mix(cyan, indigo, 0.6) * 0.45;

    /* ── Clamp intensity and apply mobile/desktop scale (#1: -50%) ── */
    aurora  = clamp(aurora, 0.0, 0.09) * uIntensity;

    /* ── Final composite over background ── */
    vec3 color = bg + aurora;

    /* ── Very faint radial vignette to keep edges dark ── */
    float vign = 1.0 - smoothstep(0.4, 1.2, length((vUv - 0.5) * vec2(1.0, 1.6)));
    color *= 0.88 + 0.12 * vign;

    gl_FragColor = vec4(color, 1.0);
  }
`

/* ─────────────────────────────────────────────────────────────────
   AURORA MESH — lives inside <Canvas>
───────────────────────────────────────────────────────────────── */
function AuroraMesh({ intensity }) {
  const meshRef  = useRef()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const { size } = useThree()

  /* Track mouse globally — tiny overhead */
  useMemo(() => {
    const onMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
    uIntensity:  { value: intensity },
  }), [])   // eslint-disable-line react-hooks/exhaustive-deps

  /* Smooth mouse lag */
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const u = meshRef.current.material.uniforms

    u.uTime.value = clock.elapsedTime

    /* Lerp mouse for smooth parallax */
    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.04
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.04
    u.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y)

    u.uResolution.value.set(size.width, size.height)
    u.uIntensity.value = intensity
  })

  return (
    <mesh ref={meshRef}>
      {/* Fullscreen quad — exactly covers NDC space */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC COMPONENT — drop-in absolute background layer
───────────────────────────────────────────────────────────────── */
export default function AuroraBackground() {
  /* Detect reduced complexity for mobile */
  const isMobile   = typeof window !== 'undefined' && window.innerWidth < 768
  const intensity  = isMobile ? 0.5 : 1.0

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
    >
      <Canvas
        flat
        gl={{
          antialias:         false,   // not needed for blurred gradients
          alpha:             false,
          powerPreference:   'low-power',
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        style={{ width: '100%', height: '100%' }}
        frameloop="always"
      >
        <AuroraMesh intensity={intensity} />
      </Canvas>
    </div>
  )
}
