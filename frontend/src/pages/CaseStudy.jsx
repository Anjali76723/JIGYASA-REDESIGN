import { useRef, useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import { getProjectBySlug } from '../data/projects'

/* ── Count-up hook ── */
function useCountUp(raw, trigger, duration = 1600) {
  const [display, setDisplay] = useState('0')
  const raf = useRef(null)
  useEffect(() => {
    if (!trigger) return
    const num = parseFloat(String(raw).replace(/[^0-9.]/g, ''))
    if (isNaN(num)) { setDisplay(String(raw)); return }
    const start = performance.now()
    const dec = String(num).includes('.') ? (String(num).split('.')[1]?.length ?? 0) : 0
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay((num * e).toFixed(dec))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [raw, trigger, duration])
  return display
}

/* ── Shared styles ── */
const BG = '#020617'
const FONT = 'Space Grotesk, Inter, system-ui'

const KF = `
  @keyframes csParticle {
    0%,100% { transform:translateY(0) scale(1); opacity:.3; }
    50%      { transform:translateY(-18px) scale(1.15); opacity:.6; }
  }
  @keyframes csGradSweep {
    0%   { background-position:0% 50%; }
    100% { background-position:200% 50%; }
  }
  @keyframes drawPath {
    to { stroke-dashoffset: 0; }
  }
`

/* ── Project Hero ── */
function CSHero({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden',
      background: `linear-gradient(165deg, ${BG} 0%, #030b1f 100%)`,
      paddingTop: 80, paddingBottom: 80 }}>
      {/* Ambient glows */}
      <div style={{ pointerEvents: 'none', position: 'absolute', top: '-20%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}0d 0%, transparent 65%)`,
        filter: 'blur(140px)' }} />
      <div style={{ pointerEvents: 'none', position: 'absolute', bottom: 0, right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accentSecondary}0c 0%, transparent 65%)`,
        filter: 'blur(120px)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}>
          <Link to="/portfolio" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32,
            color: 'rgba(148,163,184,0.7)', textDecoration: 'none', fontSize: 13,
            fontFamily: FONT, transition: 'color 200ms',
          }}
            onMouseEnter={e => e.currentTarget.style.color = project.accent}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,184,0.7)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All Case Studies
          </Link>
        </motion.div>

        {/* Industry + year badges */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          {[project.industry, project.year, project.duration].map(b => (
            <span key={b} style={{
              padding: '4px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              background: `${project.accent}14`, border: `1px solid ${project.accent}35`,
              color: project.accent, fontFamily: FONT,
            }}>{b}</span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)', fontWeight: 800, color: '#fff',
            lineHeight: 1.08, letterSpacing: '-0.02em', fontFamily: FONT, marginBottom: 20 }}>
          {project.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{ fontSize: 18, color: 'rgba(209,217,232,0.78)', lineHeight: 1.7,
            maxWidth: '54ch', fontFamily: FONT, marginBottom: 36 }}>
          {project.summary}
        </motion.p>

        {/* Hero metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.26 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {project.metrics.map(m => (
            <div key={m.label} style={{
              padding: '14px 20px', borderRadius: 16,
              background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
              border: `1px solid ${project.accent}25`,
              minWidth: 100, textAlign: 'center',
            }}>
              <div style={{ fontSize: 26, fontWeight: 900, fontFamily: FONT,
                background: `linear-gradient(90deg,${project.accent},${project.accentSecondary})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{m.value}{m.suffix}</div>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.09em', color: 'rgba(148,163,184,0.65)', marginTop: 4,
                fontFamily: FONT }}>{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Divider ── */
function SectionDivider() {
  return (
    <div style={{ height: 1, maxWidth: 960, margin: '0 auto 0',
      background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />
  )
}

/* ── Section wrapper ── */
function CSSection({ id, label, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section id={id} ref={ref} style={{ backgroundColor: BG, padding: '72px 0' }}>
      <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {label && (
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#22D3EE', marginBottom: 12,
            fontFamily: FONT }}>{label}</p>
        )}
        {children}
      </motion.div>
    </section>
  )
}

/* ── Challenge ── */
function CSChallenge({ project }) {
  return (
    <CSSection id="challenge" label="The Challenge">
      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#fff',
        letterSpacing: '-0.01em', fontFamily: FONT, marginBottom: 28, lineHeight: 1.2 }}>
        {project.challenge.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {project.challenge.body.map((para, i) => (
          <p key={i} style={{ fontSize: 16, color: 'rgba(209,217,232,0.75)', lineHeight: 1.8,
            maxWidth: '68ch', fontFamily: FONT }}>{para}</p>
        ))}
      </div>
    </CSSection>
  )
}

/* ── Solution ── */
function CSSolution({ project }) {
  return (
    <CSSection id="solution" label="Our Solution">
      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#fff',
        letterSpacing: '-0.01em', fontFamily: FONT, marginBottom: 36, lineHeight: 1.2 }}>
        {project.solution.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {project.solution.blocks.map((block, i) => (
          <div key={i} style={{
            borderRadius: 20, padding: '28px 32px',
            background: `linear-gradient(135deg, ${block.accent}0d 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${block.accent}25`,
            borderLeft: `3px solid ${block.accent}`,
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10,
              fontFamily: FONT }}>{block.title}</h3>
            <p style={{ fontSize: 15, color: 'rgba(148,163,184,0.82)', lineHeight: 1.75,
              fontFamily: FONT }}>{block.body}</p>
          </div>
        ))}
      </div>
    </CSSection>
  )
}

/* ── Process timeline ── */
function CSProcess({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section id="process" style={{ backgroundColor: BG, padding: '72px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }} ref={ref}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#22D3EE', marginBottom: 12, fontFamily: FONT }}>
            Process
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#fff',
            letterSpacing: '-0.01em', fontFamily: FONT, marginBottom: 48, lineHeight: 1.2 }}>
            Discovery to Delivery
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 20, top: 12, bottom: 12, width: 2,
            background: 'linear-gradient(to bottom,#22D3EE,#6366F1,#A78BFA)',
            opacity: 0.25, borderRadius: 2,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {project.process.map((step, i) => (
              <motion.div key={step.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                style={{ display: 'flex', gap: 24, paddingLeft: 0,
                  paddingBottom: i < project.process.length - 1 ? 32 : 0 }}>
                {/* Node */}
                <div style={{ position: 'relative', flexShrink: 0, width: 42 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%', marginTop: 4,
                    background: `linear-gradient(135deg,${project.accent},${project.accentSecondary})`,
                    border: '2px solid #020617',
                    boxShadow: `0 0 12px ${project.accent}50`,
                    marginLeft: 13,
                    position: 'relative', zIndex: 2,
                  }} />
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: FONT }}>
                      {step.phase}
                    </span>
                    <span style={{ fontSize: 11, color: project.accent, fontWeight: 600,
                      fontFamily: FONT, letterSpacing: '0.05em' }}>
                      Weeks {step.weeks}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(148,163,184,0.75)',
                    lineHeight: 1.65, fontFamily: FONT, maxWidth: '56ch' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Tech stack ── */
function CSTechStack({ project }) {
  return (
    <CSSection id="tech" label="Technology Stack">
      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#fff',
        letterSpacing: '-0.01em', fontFamily: FONT, marginBottom: 28, lineHeight: 1.2 }}>
        Built with modern tools
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {project.tech.map((t, i) => (
          <motion.span key={t}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -3 }}
            style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(203,213,225,0.88)', letterSpacing: '0.02em',
              fontFamily: FONT, cursor: 'default',
              transition: 'border-color 200ms, background 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = project.accent + '55'
              e.currentTarget.style.background = `${project.accent}10`
              e.currentTarget.style.color = project.accent
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.color = 'rgba(203,213,225,0.88)'
            }}
          >{t}</motion.span>
        ))}
      </div>
    </CSSection>
  )
}

/* ── Results ── */
function ResultCard({ result, trigger }) {
  const count = useCountUp(result.value, trigger)
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, padding: '28px 24px', textAlign: 'center', cursor: 'default',
        background: hov ? `${result.color}0e` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? result.color + '50' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hov ? `0 16px 48px ${result.color}20` : 'none',
        transition: 'all 280ms', transform: hov ? 'translateY(-4px)' : 'none',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, fontFamily: FONT,
          background: `linear-gradient(90deg,${result.color},${result.color}bb)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1,
        }}>{count}{result.suffix}</div>
        <div style={{ marginTop: 10, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(148,163,184,0.65)', fontFamily: FONT }}>
          {result.label}
        </div>
      </div>
    </div>
  )
}

function CSResults({ project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section id="results" ref={ref} style={{ backgroundColor: BG, padding: '72px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#22D3EE', marginBottom: 12, fontFamily: FONT }}>
            Results
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#fff',
            letterSpacing: '-0.01em', fontFamily: FONT, marginBottom: 40, lineHeight: 1.2 }}>
            Outcomes that speak for themselves
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
          {project.results.map(r => (
            <ResultCard key={r.label} result={r} trigger={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Main CaseStudy page ── */
export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/portfolio" replace />

  return (
    <div style={{ minHeight: '100vh', backgroundColor: BG, color: '#F8FAFC' }}>
      <style>{KF}</style>
      <Navbar />
      <CSHero project={project} />
      <SectionDivider />
      <CSChallenge project={project} />
      <SectionDivider />
      <CSSolution project={project} />
      <SectionDivider />
      <CSProcess project={project} />
      <SectionDivider />
      <CSTechStack project={project} />
      <SectionDivider />
      <CSResults project={project} />
      <CallToAction />
      <Footer />
    </div>
  )
}
