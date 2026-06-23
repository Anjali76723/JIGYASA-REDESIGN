import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import { PROJECTS } from '../data/projects'

/* ─── Shared keyframes ─── */
const KF = `
  @keyframes workParticleFloat {
    0%,100% { transform:translateY(0) scale(1);   opacity:.35; }
    50%      { transform:translateY(-22px) scale(1.2); opacity:.65; }
  }
  @keyframes borderRotate {
    from { background-position: 0% 50%; }
    to   { background-position: 200% 50%; }
  }
  @keyframes gradSweep {
    0%   { background-position: 0%   50%; }
    100% { background-position: 200% 50%; }
  }
`

/* ─── Background particles ─── */
const PARTICLE_DATA = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 4.3) % 90}%`,
  top: `${8 + (i * 7.1) % 84}%`,
  size: 1.5 + (i % 3) * 0.9,
  dur: `${5 + (i % 5)}s`,
  delay: `${(i * 0.4) % 4}s`,
  color: ['#22D3EE', '#6366F1', '#A78BFA'][i % 3],
}))

function WorkParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLE_DATA.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.color,
            animation: `workParticleFloat ${p.dur} ${p.delay} ease-in-out infinite`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Work Hero ─── */
function WorkHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden pt-20 pb-16"
      style={{ backgroundColor: '#020617' }}>
      <WorkParticles />
      {/* Glows */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(34,211,238,.07) 0%,transparent 65%)', filter: 'blur(120px)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 65%)', filter: 'blur(120px)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-[0.35em] uppercase text-[#22D3EE]"
        >
          Selected Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-4 font-extrabold leading-tight text-white"
          style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', letterSpacing: '-0.02em',
            fontFamily: 'Space Grotesk, Inter, system-ui' }}
        >
          Building products that{' '}
          <span style={{
            backgroundImage: 'linear-gradient(90deg,#22D3EE 0%,#6366F1 40%,#A78BFA 70%,#22D3EE 100%)',
            backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'gradSweep 5s linear infinite',
          }}>solve real problems</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Three years of shipping production-grade software for industries where
          reliability, security, and scale are non-negotiable.
        </motion.p>
      </div>
    </section>
  )
}

/* ─── Mouse-tracking light effect on card ─── */
function useMouseLight(ref) {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fn = (e) => {
      const r = el.getBoundingClientRect()
      setPos({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      })
    }
    el.addEventListener('mousemove', fn)
    return () => el.removeEventListener('mousemove', fn)
  }, [ref])
  return pos
}

/* ─── Project showcase card ─── */
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mousePos = useMouseLight(cardRef)
  const [hov, setHov] = useState(false)

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: 'relative', borderRadius: 28,
          border: `1px solid ${hov ? project.accent + '55' : 'rgba(255,255,255,0.08)'}`,
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          transition: 'border-color 350ms, box-shadow 350ms, transform 350ms',
          transform: hov ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hov
            ? `0 32px 80px ${project.accent}22, 0 0 0 1px ${project.accent}22`
            : '0 8px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Mouse tracking spotlight */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: `radial-gradient(320px circle at ${mousePos.x}% ${mousePos.y}%, ${project.accent}10 0%, transparent 65%)`,
          transition: 'background 120ms',
        }} />

        {/* Top gradient accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${project.accent}80, ${project.accentSecondary}60, transparent)`,
          opacity: hov ? 1 : 0.4, transition: 'opacity 350ms',
        }} />

        {/* Card inner layout: alternating side on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 0,
        }}>

          {/* Visual panel */}
          <div
            style={{
              order: isEven ? 0 : 1,
              position: 'relative', minHeight: 280,
              background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              borderRight: isEven ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderLeft: !isEven ? '1px solid rgba(255,255,255,0.06)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Grid pattern */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.06,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            {/* Central glow */}
            <div style={{
              position: 'absolute', width: 200, height: 200, borderRadius: '50%',
              background: `radial-gradient(circle, ${project.accent}30, transparent 70%)`,
              filter: 'blur(30px)', transition: 'opacity 350ms',
              opacity: hov ? 1 : 0.6,
            }} />
            {/* Industry badge */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '24px 32px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '10px 20px', borderRadius: 999,
                background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)',
                border: `1px solid ${project.accent}40`,
                marginBottom: 20,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: project.accent,
                  boxShadow: `0 0 8px ${project.accent}`,
                  animation: 'workParticleFloat 2s ease-in-out infinite',
                }} />
                <span style={{ color: project.accent, fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'Space Grotesk, Inter, system-ui' }}>
                  {project.industry}
                </span>
              </div>
              {/* Impact metrics row */}
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                {project.metrics.slice(0, 3).map(m => (
                  <div key={m.label} style={{
                    padding: '8px 14px', borderRadius: 12,
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: 20, fontWeight: 900,
                      background: `linear-gradient(90deg, ${project.accent}, ${project.accentSecondary})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text', fontFamily: 'Space Grotesk, Inter, system-ui',
                    }}>{m.value}{m.suffix}</div>
                    <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.7)',
                      marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase',
                      fontFamily: 'Space Grotesk, Inter, system-ui' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content panel */}
          <div style={{
            order: isEven ? 1 : 0,
            padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <span style={{
              alignSelf: 'flex-start', padding: '4px 12px', borderRadius: 999,
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              background: `${project.accent}14`, border: `1px solid ${project.accent}35`,
              color: project.accent, fontFamily: 'Space Grotesk, Inter, system-ui',
            }}>{project.category}</span>

            <div>
              <h2 style={{
                fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 800, color: '#fff',
                lineHeight: 1.15, letterSpacing: '-0.01em',
                fontFamily: 'Space Grotesk, Inter, system-ui',
              }}>{project.title}</h2>
              <p style={{ marginTop: 10, fontSize: 15, color: 'rgba(148,163,184,0.85)',
                lineHeight: 1.7, maxWidth: '44ch', fontFamily: 'Space Grotesk, Inter, system-ui' }}>
                {project.summary}
              </p>
            </div>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.tech.slice(0, 6).map(t => (
                <span key={t} style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(203,213,225,0.75)', letterSpacing: '0.02em',
                  fontFamily: 'Space Grotesk, Inter, system-ui',
                }}>{t}</span>
              ))}
            </div>

            <Link
              to={`/work/${project.slug}`}
              style={{
                alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                color: '#fff', textDecoration: 'none',
                background: `linear-gradient(135deg, ${project.accent}, ${project.accentSecondary})`,
                boxShadow: hov ? `0 8px 32px ${project.accent}30` : '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'box-shadow 300ms, transform 200ms',
                transform: hov ? 'translateY(-1px)' : 'none',
                fontFamily: 'Space Grotesk, Inter, system-ui',
              }}
            >
              View Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Delivery metrics strip ─── */
const DELIVERY_METRICS = [
  { value: '3', suffix: '', label: 'Case Studies' },
  { value: '99.9', suffix: '%', label: 'Avg Uptime Delivered' },
  { value: '10+', suffix: '', label: 'Years Experience' },
  { value: '3', suffix: '', label: 'Industries Served' },
]

function DeliveryMetrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} style={{ backgroundColor: '#020617', padding: '64px 0 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16,
          borderRadius: 24,
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '32px 24px',
          backdropFilter: 'blur(12px)',
        }}>
          {DELIVERY_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ textAlign: 'center', padding: '8px 0' }}
            >
              <div style={{
                fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900,
                background: 'linear-gradient(90deg,#22D3EE,#A78BFA)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', fontFamily: 'Space Grotesk, Inter, system-ui',
              }}>{m.value}{m.suffix}</div>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(148,163,184,0.65)',
                marginTop: 6, fontFamily: 'Space Grotesk, Inter, system-ui',
              }}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Main Work page ─── */
export default function Work() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#F8FAFC' }}>
      <style>{KF}</style>
      <Navbar />
      <WorkHero />

      {/* Project showcase */}
      <section style={{ backgroundColor: '#020617', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', flexDirection: 'column', gap: 40 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <DeliveryMetrics />
      <CallToAction />
      <Footer />
    </div>
  )
}
