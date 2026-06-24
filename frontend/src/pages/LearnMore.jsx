import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const FONT = 'Space Grotesk, Inter, system-ui'
const BG   = '#020617'

const KF = `
  @keyframes lmGradSweep{0%{background-position:0% 50%}100%{background-position:200% 50%}}
  @keyframes lmParticle{0%,100%{opacity:.22;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}}
`

const PARTICLES = Array.from({length:16},(_, i)=>({
  id:i, left:`${5+(i*5.7)%88}%`, top:`${5+(i*7.3)%86}%`,
  size:1.3+(i%3)*.9, dur:`${4+(i%5)}s`, delay:`${(i*.38)%3.5}s`,
  color:['#22D3EE','#6366F1','#A78BFA'][i%3],
}))

function SectionLabel({ children }) {
  return <p style={{fontSize:11,fontWeight:700,letterSpacing:'0.35em',
    textTransform:'uppercase',color:'#22D3EE',marginBottom:14,fontFamily:FONT}}>{children}</p>
}

function fadeUpProps(delay=0) {
  return { initial:{opacity:0,y:28}, whileInView:{opacity:1,y:0},
    viewport:{once:true,margin:'-50px'}, transition:{duration:.6,delay,ease:[.22,1,.36,1]} }
}

/* ── Milestones ── */
const MILESTONES = [
  { year:'2015', event:'Founded in New Delhi with a mission to build software that changes businesses.' },
  { year:'2017', event:'First enterprise client — delivered a manufacturing analytics system still in production today.' },
  { year:'2019', event:'Expanded into healthcare and fintech verticals. Team grew to 20 specialists.' },
  { year:'2021', event:'Reached 200+ projects milestone. Launched dedicated AI/ML practice.' },
  { year:'2023', event:'500+ projects delivered across 15 industries and 3 continents.' },
  { year:'2024', event:'Team of 50+ engineers, designers, and strategists. New office expansion.' },
]

/* ── Values ── */
const VALUES = [
  { title:'Craft over quantity', desc:'We take fewer projects to do each one exceptionally well.',
    accent:'#22D3EE', icon:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { title:'Outcomes, not output', desc:'Success is measured by the growth our clients achieve — not lines of code.',
    accent:'#6366F1', icon:'M3 17l4-8 4 4 4-6 4 10' },
  { title:'Transparent by default', desc:'Clear communication at every stage. No surprises, no excuses.',
    accent:'#A78BFA', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { title:'Long-term thinking', desc:'We build partnerships, not transactions. Most clients have been with us for years.',
    accent:'#34D399', icon:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
]

/* ── Expertise areas ── */
const EXPERTISE = [
  { label:'Product Engineering',  pct:98, color:'#22D3EE' },
  { label:'UI/UX Design',         pct:94, color:'#6366F1' },
  { label:'Cloud Architecture',   pct:90, color:'#A78BFA' },
  { label:'AI & Data Systems',    pct:85, color:'#F472B6' },
  { label:'DevOps & Infra',       pct:88, color:'#34D399' },
]

/* ── Stats ── */
const STATS = [
  { value:'500+', label:'Projects Delivered' },
  { value:'98%',  label:'Client Satisfaction' },
  { value:'50+',  label:'Specialists' },
  { value:'10+',  label:'Years Experience' },
]

/* ── Hero ── */
function LMHero() {
  const ref = useRef(null)
  const inView = useInView(ref,{once:true})
  return (
    <section ref={ref} style={{position:'relative',overflow:'hidden',
      backgroundColor:BG, paddingTop:72, paddingBottom:80}}>
      {PARTICLES.map(p=>(
        <div key={p.id} aria-hidden style={{position:'absolute',left:p.left,top:p.top,
          width:p.size,height:p.size,borderRadius:'50%',background:p.color,
          animation:`lmParticle ${p.dur} ${p.delay} ease-in-out infinite`,pointerEvents:'none'}}/>
      ))}
      <div style={{pointerEvents:'none',position:'absolute',left:'-8%',top:'-15%',
        width:560,height:560,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(34,211,238,.055) 0%,transparent 65%)',filter:'blur(120px)'}}/>
      <div style={{pointerEvents:'none',position:'absolute',right:'-5%',bottom:0,
        width:500,height:500,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(99,102,241,.055) 0%,transparent 65%)',filter:'blur(110px)'}}/>
      <div style={{position:'relative',zIndex:10,maxWidth:800,margin:'0 auto',
        padding:'0 24px',textAlign:'center'}}>
        <motion.p initial={{opacity:0,y:14}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.5}} style={{fontSize:11,fontWeight:700,
            letterSpacing:'0.35em',textTransform:'uppercase',color:'#22D3EE',
            marginBottom:16,fontFamily:FONT}}>
          About Jigyasa Technologies
        </motion.p>
        <motion.h1 initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.65,delay:.1}}
          style={{fontSize:'clamp(2.4rem,5vw,4rem)',fontWeight:800,color:'#fff',
            lineHeight:1.08,letterSpacing:'-0.02em',fontFamily:FONT,marginBottom:20}}>
          We build software that{' '}
          <span style={{backgroundImage:'linear-gradient(90deg,#22D3EE 0%,#6366F1 38%,#A78BFA 65%,#22D3EE 100%)',
            backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
            backgroundClip:'text',animation:'lmGradSweep 5s linear infinite'}}>
            changes businesses
          </span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.6,delay:.2}}
          style={{fontSize:17,color:'rgba(209,217,232,0.75)',lineHeight:1.75,
            fontFamily:FONT,maxWidth:'52ch',margin:'0 auto'}}>
          Since 2015, Jigyasa Technologies has partnered with startups and enterprises
          to design, engineer, and grow digital products that drive measurable outcomes.
        </motion.p>
      </div>
    </section>
  )
}

/* ── Timeline ── */
function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref,{once:true,margin:'-60px'})
  return (
    <section ref={ref} style={{backgroundColor:BG,padding:'72px 0'}}>
      <div style={{maxWidth:800,margin:'0 auto',padding:'0 24px'}}>
        <motion.div {...fadeUpProps()}>
          <SectionLabel>Our Story</SectionLabel>
          <h2 style={{fontSize:'clamp(1.7rem,3vw,2.5rem)',fontWeight:800,color:'#fff',
            letterSpacing:'-0.01em',fontFamily:FONT,marginBottom:48,lineHeight:1.2}}>
            A decade of building
          </h2>
        </motion.div>
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',left:16,top:8,bottom:8,width:2,
            background:'linear-gradient(to bottom,#22D3EE,#6366F1,#A78BFA)',
            opacity:.2,borderRadius:2}}/>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            {MILESTONES.map((m,i)=>(
              <motion.div key={m.year}
                initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
                viewport={{once:true}} transition={{delay:i*.1,duration:.5}}
                style={{display:'flex',gap:24,paddingBottom:i<MILESTONES.length-1?32:0}}>
                <div style={{position:'relative',flexShrink:0,width:36}}>
                  <div style={{width:12,height:12,borderRadius:'50%',marginTop:5,
                    background:'linear-gradient(135deg,#22D3EE,#6366F1)',
                    border:'2px solid #020617',
                    boxShadow:'0 0 10px rgba(34,211,238,0.45)',
                    marginLeft:10,position:'relative',zIndex:2}}/>
                </div>
                <div>
                  <span style={{fontSize:12,fontWeight:700,color:'#22D3EE',
                    fontFamily:FONT,letterSpacing:'0.08em'}}>{m.year}</span>
                  <p style={{fontSize:14,color:'rgba(209,217,232,0.75)',lineHeight:1.7,
                    fontFamily:FONT,marginTop:4,maxWidth:'52ch'}}>{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Mission / Vision ── */
function MissionVision() {
  return (
    <section style={{backgroundColor:BG,padding:'72px 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',
        display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
        {[
          {label:'Mission',title:'Transform ideas into scalable digital products',
            desc:"We exist to bridge the gap between ambitious business goals and the technology needed to achieve them — turning vision into working software that drives real growth.",
            accent:'#22D3EE'},
          {label:'Vision',title:'Become the most trusted product engineering partner',
            desc:'A world where any organisation — regardless of size or sector — can access the same calibre of digital product thinking and execution as the world\'s leading tech companies.',
            accent:'#6366F1'},
          {label:'Philosophy',title:'Great software is a craft, not a commodity',
            desc:'We slow down to think before we build. We challenge requirements, ask hard questions, and propose better approaches. The best code is often less code.',
            accent:'#A78BFA'},
        ].map((item,i)=>(
          <motion.div key={item.label} {...fadeUpProps(i*.1)}
            style={{borderRadius:24,padding:'32px 28px',
              background:`linear-gradient(135deg,${item.accent}0d,rgba(255,255,255,0.025))`,
              border:`1px solid ${item.accent}25`,
              boxShadow:`0 8px 32px ${item.accent}0d`}}>
            <p style={{fontSize:10,fontWeight:700,textTransform:'uppercase',
              letterSpacing:'0.2em',color:item.accent,fontFamily:FONT,marginBottom:12}}>{item.label}</p>
            <h3 style={{fontSize:18,fontWeight:800,color:'#fff',lineHeight:1.3,
              fontFamily:FONT,marginBottom:14}}>{item.title}</h3>
            <p style={{fontSize:14,color:'rgba(148,163,184,0.8)',lineHeight:1.75,fontFamily:FONT}}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ── Values grid ── */
function ValuesGrid() {
  return (
    <section style={{backgroundColor:BG,padding:'72px 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
        <motion.div {...fadeUpProps()} style={{marginBottom:40}}>
          <SectionLabel>Values</SectionLabel>
          <h2 style={{fontSize:'clamp(1.7rem,3vw,2.5rem)',fontWeight:800,color:'#fff',
            letterSpacing:'-0.01em',fontFamily:FONT,lineHeight:1.2}}>
            How we think and work
          </h2>
        </motion.div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
          {VALUES.map((v,i)=>(
            <motion.div key={v.title} {...fadeUpProps(i*.08)}
              whileHover={{y:-5}}
              style={{borderRadius:20,padding:'24px 22px',cursor:'default',
                background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',
                transition:'all 250ms'}}>
              <div style={{width:40,height:40,borderRadius:12,marginBottom:16,
                background:`${v.accent}14`,border:`1px solid ${v.accent}30`,
                display:'flex',alignItems:'center',justifyContent:'center',color:v.accent}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={v.icon}/>
                </svg>
              </div>
              <h3 style={{fontSize:15,fontWeight:700,color:'#fff',marginBottom:8,fontFamily:FONT}}>
                {v.title}
              </h3>
              <p style={{fontSize:13,color:'rgba(148,163,184,0.78)',lineHeight:1.7,fontFamily:FONT}}>
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Expertise bars ── */
function ExpertiseBars() {
  const ref = useRef(null)
  const inView = useInView(ref,{once:true,margin:'-60px'})
  return (
    <section ref={ref} style={{backgroundColor:BG,padding:'72px 0'}}>
      <div style={{maxWidth:800,margin:'0 auto',padding:'0 24px'}}>
        <motion.div {...fadeUpProps()} style={{marginBottom:36}}>
          <SectionLabel>Expertise</SectionLabel>
          <h2 style={{fontSize:'clamp(1.7rem,3vw,2.5rem)',fontWeight:800,color:'#fff',
            letterSpacing:'-0.01em',fontFamily:FONT,lineHeight:1.2}}>
            What we do best
          </h2>
        </motion.div>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {EXPERTISE.map((e,i)=>(
            <motion.div key={e.label}
              initial={{opacity:0,x:-16}} animate={inView?{opacity:1,x:0}:{}}
              transition={{delay:i*.1,duration:.5}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:13,fontWeight:600,color:'rgba(209,217,232,0.85)',fontFamily:FONT}}>
                  {e.label}
                </span>
                <span style={{fontSize:13,fontWeight:700,color:e.color,fontFamily:FONT}}>
                  {e.pct}%
                </span>
              </div>
              <div style={{height:7,borderRadius:999,background:'rgba(255,255,255,0.06)',overflow:'hidden'}}>
                <motion.div initial={{width:0}}
                  animate={inView?{width:`${e.pct}%`}:{width:0}}
                  transition={{duration:1.2,delay:.3+i*.12,ease:[.22,1,.36,1]}}
                  style={{height:'100%',borderRadius:999,
                    background:`linear-gradient(90deg,${e.color},${e.color}88)`,
                    boxShadow:`0 0 12px ${e.color}50`}}/>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats ── */
function StatsRow() {
  const ref = useRef(null)
  const inView = useInView(ref,{once:true,margin:'-60px'})
  return (
    <section ref={ref} style={{backgroundColor:BG,padding:'56px 0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',
        display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:16,
        borderRadius:24,background:'rgba(255,255,255,0.025)',
        border:'1px solid rgba(255,255,255,0.07)',backdropFilter:'blur(12px)'}}>
        {STATS.map((s,i)=>(
          <motion.div key={s.label}
            initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
            transition={{delay:i*.08,duration:.5}}
            style={{textAlign:'center',padding:'28px 16px',cursor:'default'}}>
            <div style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,fontFamily:FONT,
              background:'linear-gradient(90deg,#22D3EE,#A78BFA)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
              backgroundClip:'text'}}>{s.value}</div>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:'0.1em',
              textTransform:'uppercase',color:'rgba(148,163,184,0.6)',
              marginTop:7,fontFamily:FONT}}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function LearnMore() {
  return (
    <div style={{minHeight:'100vh',backgroundColor:BG,color:'#F8FAFC'}}>
      <style>{KF}</style>
      <Navbar/>
      <LMHero/>
      <Timeline/>
      <MissionVision/>
      <ValuesGrid/>
      <ExpertiseBars/>
      <StatsRow/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}
