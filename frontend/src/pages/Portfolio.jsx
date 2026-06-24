import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import { PROJECTS } from '../data/projects'

const FONT = 'Space Grotesk, Inter, system-ui'
const BG   = '#020617'

const KF = `
  @keyframes pfGradSweep { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
  @keyframes pfFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes pfParticle { 0%,100%{opacity:.25;transform:scale(1)} 50%{opacity:.55;transform:scale(1.2)} }
`

/* ── category pills ── */
const CATS = ['All', 'Industrial', 'Healthcare', 'FinTech']

/* ── technology matrix ── */
const TECH_STACK = [
  { name: 'React',       color: '#22D3EE' },
  { name: 'Node.js',     color: '#34D399' },
  { name: 'TypeScript',  color: '#6366F1' },
  { name: 'PostgreSQL',  color: '#A78BFA' },
  { name: 'AWS',         color: '#FBBF24' },
  { name: 'Python',      color: '#F472B6' },
  { name: 'GraphQL',     color: '#E879F9' },
  { name: 'Docker',      color: '#22D3EE' },
  { name: 'TimescaleDB', color: '#6366F1' },
  { name: 'Kafka',       color: '#F87171' },
  { name: 'Redis',       color: '#FB923C' },
  { name: 'Vercel',      color: '#A78BFA' },
]

/* ── ambient particles ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i, left: `${6 + (i * 5.1) % 88}%`, top: `${4 + (i * 6.7) % 88}%`,
  size: 1.4 + (i % 3) * 0.8,
  dur: `${4 + (i % 5)}s`, delay: `${(i * 0.35) % 3.5}s`,
  color: ['#22D3EE','#6366F1','#A78BFA'][i % 3],
}))

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.35em',
      textTransform: 'uppercase', color: '#22D3EE', marginBottom: 14, fontFamily: FONT }}>
      {children}
    </p>
  )
}

/* ── Portfolio Hero ── */
function PortfolioHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <section ref={ref} style={{ position:'relative', overflow:'hidden',
      backgroundColor: BG, paddingTop: 72, paddingBottom: 80 }}>
      {PARTICLES.map(p => (
        <div key={p.id} aria-hidden style={{ position:'absolute', left:p.left, top:p.top,
          width:p.size, height:p.size, borderRadius:'50%', background:p.color,
          animation:`pfParticle ${p.dur} ${p.delay} ease-in-out infinite`,
          pointerEvents:'none' }} />
      ))}
      <div style={{ pointerEvents:'none', position:'absolute', left:'-8%', top:'-15%',
        width:560, height:560, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(34,211,238,.06) 0%,transparent 65%)',
        filter:'blur(120px)' }} />
      <div style={{ pointerEvents:'none', position:'absolute', right:'-5%', bottom:0,
        width:480, height:480, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 65%)',
        filter:'blur(110px)' }} />
      <div style={{ position:'relative', zIndex:10, maxWidth:800, margin:'0 auto',
        padding:'0 24px', textAlign:'center' }}>
        <motion.p initial={{opacity:0,y:14}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.5}} style={{ fontSize:11, fontWeight:700,
            letterSpacing:'0.35em', textTransform:'uppercase', color:'#22D3EE',
            marginBottom:16, fontFamily:FONT }}>
          Portfolio
        </motion.p>
        <motion.h1 initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.65, delay:.1}}
          style={{ fontSize:'clamp(2.6rem,5.5vw,4.4rem)', fontWeight:800, color:'#fff',
            lineHeight:1.08, letterSpacing:'-0.02em', fontFamily:FONT, marginBottom:20 }}>
          Work that{' '}
          <span style={{ backgroundImage:'linear-gradient(90deg,#22D3EE 0%,#6366F1 38%,#A78BFA 65%,#22D3EE 100%)',
            backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text', animation:'pfGradSweep 5s linear infinite' }}>
            speaks for itself
          </span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.6, delay:.2}}
          style={{ fontSize:17, color:'rgba(209,217,232,0.75)', lineHeight:1.75,
            fontFamily:FONT, maxWidth:'50ch', margin:'0 auto' }}>
          Three production-grade platforms built for industries where reliability,
          security, and scale are non-negotiable.
        </motion.p>
      </div>
    </section>
  )
}

/* ── Category filter ── */
function CategoryFilter({ active, onChange }) {
  return (
    <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center',
      marginBottom:48 }}>
      {CATS.map(c => (
        <button key={c} onClick={() => onChange(c)} style={{
          padding:'7px 20px', borderRadius:999, fontSize:12, fontWeight:700,
          cursor:'pointer', border:'none', fontFamily:FONT,
          letterSpacing:'0.06em', textTransform:'uppercase',
          transition:'all 200ms',
          background: active === c
            ? 'linear-gradient(135deg,#6366F1,#22D3EE)'
            : 'rgba(255,255,255,0.04)',
          color: active === c ? '#fff' : 'rgba(148,163,184,0.7)',
          boxShadow: active === c ? '0 4px 20px rgba(34,211,238,0.20)' : 'none',
          border: active === c ? 'none' : '1px solid rgba(255,255,255,0.08)',
        }}>
          {c}
        </button>
      ))}
    </div>
  )
}

/* ── Project card ── */
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-50px' })
  const [hov, setHov] = useState(false)
  return (
    <motion.article ref={ref}
      initial={{opacity:0,y:48}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:.65, delay:index*.1, ease:[.22,1,.36,1]}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:24, overflow:'hidden', cursor:'default',
        border:`1px solid ${hov?project.accent+'44':'rgba(255,255,255,0.08)'}`,
        background:'rgba(255,255,255,0.03)', backdropFilter:'blur(16px)',
        boxShadow: hov?`0 24px 64px ${project.accent}1a`:'0 4px 24px rgba(0,0,0,0.2)',
        transform: hov?'translateY(-6px)':'translateY(0)',
        transition:'all 320ms cubic-bezier(.22,1,.36,1)',
      }}>
      {/* Visual header */}
      <div style={{ position:'relative', aspectRatio:'16/8', overflow:'hidden',
        background:`linear-gradient(135deg,${project.gradientFrom},${project.gradientTo})` }}>
        <div style={{ position:'absolute', inset:0, opacity:.06,
          backgroundImage:'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
          backgroundSize:'36px 36px' }} />
        <div style={{ position:'absolute', inset:0,
          background:`radial-gradient(ellipse at 50% 50%,${project.accent}25,transparent 65%)`,
          opacity: hov?1:.55, transition:'opacity 320ms' }} />
        {/* Top accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg,transparent,${project.accent},${project.accentSecondary},transparent)`,
          opacity: hov?1:.5, transition:'opacity 320ms' }} />
        {/* Metrics */}
        <div style={{ position:'absolute', bottom:16, left:16, right:16,
          display:'flex', gap:10, flexWrap:'wrap' }}>
          {project.metrics.slice(0,3).map(m=>(
            <div key={m.label} style={{ padding:'6px 12px', borderRadius:10,
              background:'rgba(0,0,0,0.5)', backdropFilter:'blur(10px)',
              border:'1px solid rgba(255,255,255,0.10)' }}>
              <span style={{ fontSize:16, fontWeight:900, fontFamily:FONT,
                background:`linear-gradient(90deg,${project.accent},${project.accentSecondary})`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text' }}>{m.value}{m.suffix}</span>
              <span style={{ fontSize:9, color:'rgba(148,163,184,0.6)', marginLeft:5,
                textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:FONT }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding:'24px 24px 28px' }}>
        <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase',
          letterSpacing:'0.12em', color:project.accent, fontFamily:FONT,
          display:'block', marginBottom:8 }}>{project.category}</span>
        <h3 style={{ fontSize:18, fontWeight:800, color:'#fff', lineHeight:1.2,
          fontFamily:FONT, marginBottom:10 }}>{project.title}</h3>
        <p style={{ fontSize:13, color:'rgba(148,163,184,0.78)', lineHeight:1.7,
          fontFamily:FONT, marginBottom:18 }}>{project.tagline}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
          {project.tech.slice(0,5).map(t=>(
            <span key={t} style={{ fontSize:10, fontWeight:600, padding:'2px 8px',
              borderRadius:6, background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(255,255,255,0.09)',
              color:'rgba(203,213,225,0.65)', fontFamily:FONT }}>{t}</span>
          ))}
        </div>
        <Link to={`/work/${project.slug}`} style={{
          display:'inline-flex', alignItems:'center', gap:7,
          padding:'9px 18px', borderRadius:10, textDecoration:'none',
          fontSize:12, fontWeight:700, color:'#fff', fontFamily:FONT,
          background:`linear-gradient(135deg,${project.accent},${project.accentSecondary})`,
          boxShadow: hov?`0 6px 24px ${project.accent}30`:'none',
          transition:'box-shadow 250ms',
        }}>
          View Case Study
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

/* ── Tech stack grid ── */
function TechGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <section ref={ref} style={{ backgroundColor:BG, padding:'72px 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', textAlign:'center' }}>
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.55}}>
          <SectionLabel>Technology</SectionLabel>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:800, color:'#fff',
            letterSpacing:'-0.01em', fontFamily:FONT, marginBottom:40 }}>
            Tools we ship with
          </h2>
        </motion.div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
          {TECH_STACK.map((t,i)=>(
            <motion.span key={t.name}
              initial={{opacity:0,scale:.85}} animate={inView?{opacity:1,scale:1}:{}}
              transition={{delay:i*.04, duration:.35}}
              whileHover={{y:-4}}
              style={{ padding:'9px 20px', borderRadius:12, fontSize:13, fontWeight:700,
                fontFamily:FONT, cursor:'default',
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)',
                color:'rgba(203,213,225,0.85)', transition:'all 200ms' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.color+'55';e.currentTarget.style.color=t.color;e.currentTarget.style.background=t.color+'10'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.09)';e.currentTarget.style.color='rgba(203,213,225,0.85)';e.currentTarget.style.background='rgba(255,255,255,0.04)'}}>
              {t.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Main ── */
export default function Portfolio() {
  const [activeCat, setActiveCat] = useState('All')
  const filtered = activeCat === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.industry.includes(activeCat) || p.category.includes(activeCat))

  return (
    <div style={{ minHeight:'100vh', backgroundColor:BG, color:'#F8FAFC' }}>
      <style>{KF}</style>
      <Navbar />
      <PortfolioHero />
      <section style={{ backgroundColor:BG, padding:'0 0 80px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
          <CategoryFilter active={activeCat} onChange={setActiveCat} />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:28 }}>
            {filtered.map((p,i) => <ProjectCard key={p.slug} project={p} index={i} />)}
          </div>
        </div>
      </section>
      <TechGrid />
      <CallToAction />
      <Footer />
    </div>
  )
}
