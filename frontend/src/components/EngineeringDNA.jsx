
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

const F = 'Space Grotesk, Inter, system-ui'
const EASE = [0.22, 1, 0.36, 1]

/* ─── data ─────────────────────────────────────────────── */
const CARDS = [
  {
    id:'innovation', label:'Innovation', code:'INNOV-01',
    color:'#22D3EE', glow:'rgba(34,211,238,.18)',
    desc:'We turn ambitious ideas into production-grade products — blending emerging technology with deep engineering craft to ship experiences that are fast, accessible, and built to last.',
    chips:['AI_READY','EMERGENT_TECH','ZERO_TO_PROD','ADAPTIVE'],
    icon:(
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 017 7c0 3-1.8 5.4-4.3 6.6V17a1 1 0 01-1 1h-3.4a1 1 0 01-1-1v-1.4C6.8 14.4 5 12 5 9a7 7 0 017-7z"/>
        <path d="M9 21h6"/>
      </svg>
    ),
  },
  {
    id:'integrity', label:'Integrity', code:'INTEG-02',
    color:'#6366F1', glow:'rgba(99,102,241,.18)',
    desc:'Every decision is made with honesty and full accountability. We communicate clearly, own our outcomes, and measure success by the real growth our clients achieve — not lines of code.',
    chips:['TRANSPARENT_OPS','CLIENT_FIRST','ACCOUNTABLE','NO_SURPRISES'],
    icon:(
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id:'security', label:'Security', code:'SECUR-03',
    color:'#10B981', glow:'rgba(16,185,129,.18)',
    desc:'Security is foundational, never an afterthought. We architect systems with compliance, resilience, and data protection built in from day one — across every industry we serve.',
    chips:['ZERO_TRUST','COMPLIANCE_READY','DATA_SOVEREIGNTY','SOC2'],
    icon:(
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
  },
]

const DIAG = [
  { label:'Verification Status', val:'COMPLETE',  num:null, color:'#10B981', pct:100 },
  { label:'Innovation Index',    val:'98 / 100',  num:98,   color:'#22D3EE', pct:98  },
  { label:'Integrity Score',     val:'100 / 100', num:100,  color:'#6366F1', pct:100 },
  { label:'Security Rating',     val:'A+',        num:null, color:'#10B981', pct:97  },
  { label:'Code Standards',      val:'ENFORCED',  num:null, color:'#22D3EE', pct:100 },
  { label:'Deployment Ready',    val:'YES',       num:null, color:'#10B981', pct:100 },
]

/* typing sequence */
const SCRIPT = [
  { text:'> Booting DNA Scanner...',              color:'#94A3B8', delay:0    },
  { text:'> Loading Engineering Matrix...',       color:'#94A3B8', delay:600  },
  { text:'> Checking Innovation...',              color:'#22D3EE', delay:1200 },
  { text:'  ✓ INNOV-01  VERIFIED',               color:'#22D3EE', delay:1800, bold:true },
  { text:'> Checking Integrity...',               color:'#6366F1', delay:2200 },
  { text:'  ✓ INTEG-02  VERIFIED',               color:'#6366F1', delay:2800, bold:true },
  { text:'> Checking Security...',                color:'#10B981', delay:3200 },
  { text:'  ✓ SECUR-03  VERIFIED',               color:'#10B981', delay:3800, bold:true },
  { text:'> Cross-validating 500+ deployments…', color:'#94A3B8', delay:4300 },
  { text:'  ✓ DNA VERIFIED',                     color:'#22D3EE', delay:5000, bold:true, final:true },
]

const PTCLS = Array.from({length:16},(_, i)=>({
  id:i, left:`${5+(i*6.1)%88}%`, top:`${4+(i*7.3)%88}%`,
  sz:1.1+(i%3)*.8, dur:`${7+(i%6)}s`, del:`${(i*.6)%5}s`,
  c:['#22D3EE','#6366F1','#10B981'][i%3],
}))

/* ─── Terminal ──────────────────────────────────────────── */
function Terminal({ active }) {
  const [lines, setLines]       = useState([])
  const [typing, setTyping]     = useState('')   // current line being typed
  const [cursor, setCursor]     = useState(true)
  const [progress, setProgress] = useState(0)
  const [scanY, setScanY]       = useState(-10)
  const [complete, setComplete] = useState(false)
  const timers = useRef([])
  const rafBeam = useRef(null)
  const rafProg = useRef(null)
  const bodyRef = useRef(null)

  /* blink cursor */
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(id)
  }, [])

  /* progress 0→100 over 900ms */
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    const run = (now) => {
      const p = Math.min((now-t0)/900, 1)
      setProgress(Math.round((1-Math.pow(1-p,3))*100))
      if (p < 1) rafProg.current = requestAnimationFrame(run)
    }
    rafProg.current = requestAnimationFrame(run)
    return () => cancelAnimationFrame(rafProg.current)
  }, [active])

  /* scan beam repeats every 4s */
  useEffect(() => {
    if (!active) return
    let start = performance.now()
    const DUR = 3800
    const run = (now) => {
      const t = ((now-start)%DUR)/DUR
      // ease-in-out: slow near center, faster at ends
      const eased = t < 0.5
        ? 2*t*t
        : 1-Math.pow(-2*t+2,2)/2
      setScanY(eased * 100)
      rafBeam.current = requestAnimationFrame(run)
    }
    rafBeam.current = requestAnimationFrame(run)
    return () => cancelAnimationFrame(rafBeam.current)
  }, [active])

  /* typing sequence */
  useEffect(() => {
    if (!active) return
    timers.current.forEach(clearTimeout)
    timers.current = []

    SCRIPT.forEach((line, li) => {
      const t = setTimeout(() => {
        let i = 0
        const chars = line.text.split('')
        const typeNext = () => {
          if (i < chars.length) {
            setTyping(prev => (li === 0 && i === 0 ? '' : prev) + chars[i])
            i++
            timers.current.push(setTimeout(typeNext, 38 + Math.random()*12))
          } else {
            /* commit line */
            setLines(prev => [...prev, line])
            setTyping('')
            if (line.final) setComplete(true)
          }
        }
        setTyping('')
        typeNext()
      }, line.delay)
      timers.current.push(t)
    })

    return () => timers.current.forEach(clearTimeout)
  }, [active])

  /* auto scroll log */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, typing])

  return (
    <motion.div
      initial={{ opacity:0, scale:.96 }}
      animate={active ? { opacity:1, scale:1 } : {}}
      transition={{ duration:.6, delay:.5, ease:EASE }}
      style={{ borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column',
        background:'rgba(8,14,36,.85)', border:'1px solid rgba(255,255,255,.09)',
        boxShadow:'0 24px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)', height:'100%', minHeight:420 }}
    >
      {/* title bar */}
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 14px',
        background:'rgba(0,0,0,.3)', borderBottom:'1px solid rgba(255,255,255,.06)', flexShrink:0 }}>
        {['#F87171','#FBBF24','#34D399'].map(c=>(
          <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c,opacity:.75 }} />
        ))}
        <span style={{ marginLeft:10,fontSize:10,fontFamily:F,color:'rgba(148,163,184,.55)',letterSpacing:'.08em' }}>
          jigyasa ~ DNA_SCANNER v2.1
        </span>
        <div style={{ marginLeft:'auto',display:'flex',alignItems:'center',gap:5 }}>
          <div style={{ width:6,height:6,borderRadius:'50%',
            background: active ? '#10B981' : '#475569',
            boxShadow: active ? '0 0 8px rgba(16,185,129,.9)' : 'none',
            animation: active ? 'dnaPulse 1.5s ease-in-out infinite' : 'none' }} />
          <span style={{ fontSize:9,fontFamily:F,color:active?'#10B981':'#475569',letterSpacing:'.06em' }}>
            {active ? 'LIVE' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* scan zone */}
      <div style={{ position:'relative',height:80,flexShrink:0,overflow:'hidden',
        background:'linear-gradient(180deg,rgba(34,211,238,.025),rgba(99,102,241,.02))' }}>
        {/* grid lines */}
        {[0,1,2,3,4].map(i=>(
          <div key={i} style={{ position:'absolute',left:0,right:0,top:`${i*25}%`,height:1,background:'rgba(34,211,238,.05)' }} />
        ))}
        {[0,1,2,3,4,5,6].map(i=>(
          <div key={i} style={{ position:'absolute',top:0,bottom:0,left:`${i*16.66}%`,width:1,background:'rgba(34,211,238,.04)' }} />
        ))}
        {/* beam */}
        {active && (
          <div style={{
            position:'absolute',left:0,right:0,height:2,
            top:`${scanY}%`,
            background:'linear-gradient(90deg,transparent 0%,rgba(34,211,238,.5) 20%,#22D3EE 50%,rgba(34,211,238,.5) 80%,transparent 100%)',
            boxShadow:'0 0 14px 2px rgba(34,211,238,.5)',
            filter:'blur(.4px)',
          }}>
            {/* trailing particles */}
            {[0,1,2].map(i=>(
              <div key={i} style={{
                position:'absolute',top:0,left:`${25+i*25}%`,
                width:3,height:3,borderRadius:'50%',
                background:'#22D3EE',
                transform:'translateY(-0.5px)',
                opacity:.6-i*.15,
                boxShadow:'0 0 6px rgba(34,211,238,.8)',
              }} />
            ))}
          </div>
        )}
        {/* center label */}
        <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',
          justifyContent:'center',flexDirection:'column',gap:3,pointerEvents:'none' }}>
          <span style={{ fontSize:9,fontFamily:F,color:'rgba(34,211,238,.4)',
            letterSpacing:'.18em',textTransform:'uppercase' }}>
            {complete ? 'SCAN COMPLETE' : active ? 'SCANNING…' : 'STANDBY'}
          </span>
          {active && (
            <span style={{ fontSize:18,fontWeight:900,fontFamily:F,
              background:'linear-gradient(90deg,#22D3EE,#6366F1)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              {progress}%
            </span>
          )}
        </div>
      </div>

      {/* progress bar */}
      <div style={{ padding:'8px 14px 0',flexShrink:0 }}>
        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
          <span style={{ fontSize:9,fontFamily:F,color:'rgba(148,163,184,.45)',textTransform:'uppercase',letterSpacing:'.1em' }}>
            integrity check
          </span>
          <span style={{ fontSize:9,fontFamily:F,color:'#22D3EE',fontWeight:700 }}>{progress}%</span>
        </div>
        <div style={{ height:3,borderRadius:999,background:'rgba(255,255,255,.06)',overflow:'hidden',position:'relative' }}>
          <div style={{ height:'100%',borderRadius:999,
            background:'linear-gradient(90deg,#22D3EE,#6366F1)',
            width:`${progress}%`,
            boxShadow:progress>0?'0 0 8px rgba(34,211,238,.45)':'none',
            transition:'width 80ms linear',
          }} />
          {/* shimmer on bar */}
          {progress>0 && (
            <div style={{ position:'absolute',inset:0,borderRadius:999,
              background:'linear-gradient(90deg,transparent 40%,rgba(255,255,255,.15) 50%,transparent 60%)',
              animation:'dnaBarShimmer 5s ease-in-out 1s infinite' }} />
          )}
        </div>
      </div>

      {/* log body */}
      <div ref={bodyRef} style={{ flex:1,padding:'8px 14px 12px',overflow:'hidden',
        display:'flex',flexDirection:'column',gap:2 }}>
        {lines.map((l,i)=>(
          <div key={i} style={{ display:'flex',gap:8,alignItems:'flex-start' }}>
            <span style={{ fontSize:9,fontFamily:'monospace',color:'rgba(148,163,184,.3)',flexShrink:0,userSelect:'none' }}>
              {String(i+1).padStart(2,'0')}
            </span>
            <span style={{ fontSize:10,fontFamily:'monospace',color:l.color,lineHeight:1.55,
              fontWeight:l.bold?700:400,
              textShadow:l.bold?`0 0 8px ${l.color}88`:'none' }}>
              {l.text}
            </span>
          </div>
        ))}
        {/* current typing line */}
        {typing && (
          <div style={{ display:'flex',gap:8,alignItems:'flex-start' }}>
            <span style={{ fontSize:9,fontFamily:'monospace',color:'rgba(148,163,184,.3)',flexShrink:0 }}>
              {String(lines.length+1).padStart(2,'0')}
            </span>
            <span style={{ fontSize:10,fontFamily:'monospace',color:'#94A3B8',lineHeight:1.55 }}>
              {typing}
              <span style={{ opacity:cursor?1:0,borderRight:'1.5px solid #22D3EE',
                marginLeft:1,display:'inline-block',height:'10px',verticalAlign:'middle' }} />
            </span>
          </div>
        )}
      </div>

      {/* DNA VERIFIED footer */}
      {complete && (
        <motion.div
          initial={{ opacity:0, y:8 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.5, ease:EASE }}
          style={{ margin:'0 12px 12px', padding:'9px 14px', borderRadius:10, flexShrink:0,
            background:'rgba(34,211,238,.07)', border:'1px solid rgba(34,211,238,.22)',
            display:'flex',alignItems:'center',gap:9 }}>
          <div style={{ width:22,height:22,borderRadius:'50%',
            background:'rgba(34,211,238,.15)', border:'1px solid rgba(34,211,238,.3)',
            display:'flex',alignItems:'center',justifyContent:'center',
            animation:'dnaPulse 2.2s ease-in-out infinite',boxShadow:'0 0 12px rgba(34,211,238,.25)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span style={{ fontSize:11,fontWeight:800,fontFamily:F,color:'#22D3EE',
            letterSpacing:'.08em',textShadow:'0 0 10px rgba(34,211,238,.4)' }}>
            DNA VERIFIED
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

/* ─── Principle Card ────────────────────────────────────── */
function PrincipleCard({ card, index, active }) {
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness:220, damping:18 })
  const sRotY = useSpring(rotY, { stiffness:220, damping:18 })
  const cardRef = useRef(null)

  const onMove = useCallback((e) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width  - 0.5
    const cy = (e.clientY - r.top)  / r.height - 0.5
    rotX.set(-cy * 8)
    rotY.set( cx * 6)
  }, [rotX, rotY])

  const onLeave = useCallback(() => { rotX.set(0); rotY.set(0) }, [rotX, rotY])

  return (
    <motion.div
      initial={{ opacity:0, y:18, scale:.98 }}
      animate={active ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:.65, delay: active ? 1.0 + index * 0.12 : 0, ease:EASE }}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle:'preserve-3d', perspective:800, cursor:'default' }}
      whileHover={{ translateY:-8, scale:1.015,
        transition:{ duration:.35, ease:EASE } }}
    >
      <motion.div
        style={{
          rotateX: sRotX, rotateY: sRotY,
          borderRadius:20, padding:'20px 18px',
          background:'rgba(255,255,255,.04)',
          border:`1px solid rgba(255,255,255,.09)`,
          position:'relative', overflow:'hidden',
          backdropFilter:'blur(12px)',
          boxShadow:'0 4px 24px rgba(0,0,0,.2)',
          transition:'background 300ms, border-color 300ms, box-shadow 300ms',
        }}
        whileHover={{
          background:'rgba(255,255,255,.065)',
          borderColor: card.color + '44',
          boxShadow:`0 24px 64px ${card.glow}, 0 0 0 1px ${card.color}22`,
        }}
      >
        {/* animated top border */}
        <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
          background:`linear-gradient(90deg,transparent 0%,${card.color} 50%,transparent 100%)`,
          opacity:.5, animation:'dnaTopBorder 3s ease-in-out infinite' }} />

        {/* noise texture overlay */}
        <div style={{ position:'absolute',inset:0,borderRadius:20,pointerEvents:'none',
          opacity:.025,
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:'200px' }} />

        {/* inner highlight top edge */}
        <div style={{ position:'absolute',top:0,left:0,right:0,height:40,
          background:`linear-gradient(180deg,rgba(255,255,255,.04),transparent)`,pointerEvents:'none' }} />

        {/* verified badge + code */}
        <div style={{ display:'flex',alignItems:'center',gap:7,marginBottom:14 }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:5,
            padding:'3px 10px',borderRadius:999,fontSize:9,fontWeight:700,
            background:`${card.color}12`, border:`1px solid ${card.color}30`,
            color:card.color, fontFamily:F, letterSpacing:'.06em' }}>
            <div style={{ width:5,height:5,borderRadius:'50%',background:card.color,
              boxShadow:`0 0 6px ${card.color}`,
              animation:active?'dnaPulse 2.2s ease-in-out infinite':'none' }} />
            ✓ VERIFIED
          </div>
          <span style={{ marginLeft:'auto',fontSize:9,fontFamily:'monospace',
            color:'rgba(148,163,184,.3)',letterSpacing:'.06em' }}>{card.code}</span>
        </div>

        {/* icon + title */}
        <div style={{ display:'flex',alignItems:'center',gap:11,marginBottom:11 }}>
          <motion.div
            whileHover={{ rotate:5, scale:1.08,
              transition:{ type:'spring',stiffness:220,damping:18 } }}
            style={{ width:38,height:38,borderRadius:11,flexShrink:0,
              background:`${card.color}16`, border:`1px solid ${card.color}28`,
              display:'flex',alignItems:'center',justifyContent:'center',color:card.color }}
          >
            {card.icon}
          </motion.div>
          <span style={{ fontSize:15,fontWeight:800,color:'#F8FAFC',
            fontFamily:F,letterSpacing:'-.01em' }}>{card.label}</span>
        </div>

        <p style={{ fontSize:12,color:'rgba(148,163,184,.82)',lineHeight:1.72,
          fontFamily:F,marginBottom:13 }}>{card.desc}</p>

        {/* terminal chips */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:5 }}>
          {card.chips.map(c=>(
            <motion.span key={c}
              whileHover={{ background:`${card.color}18`, borderColor:`${card.color}44`,
                color:'#F8FAFC', transition:{duration:.2} }}
              style={{ fontSize:9,fontFamily:'monospace',padding:'2px 8px',
                borderRadius:5, background:'rgba(255,255,255,.05)',
                border:'1px solid rgba(255,255,255,.08)',
                color:'rgba(148,163,184,.55)', letterSpacing:'.04em', cursor:'default' }}>
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Diagnostics ───────────────────────────────────────── */
function useCountUp(target, run, dur=1200) {
  const [v, setV] = useState(0)
  const r = useRef(null)
  useEffect(() => {
    if (!run || target == null) return
    const t0 = performance.now()
    const go = (now) => {
      const p = Math.min((now-t0)/dur, 1)
      const e = 1-Math.pow(1-p,3)
      setV(Math.round(target*e))
      if (p<1) r.current = requestAnimationFrame(go)
    }
    r.current = requestAnimationFrame(go)
    return () => cancelAnimationFrame(r.current)
  }, [target, run, dur])
  return v
}

function DiagRow({ d, index, active }) {
  const count = useCountUp(d.num, active, 1400)
  const display = d.num != null ? `${count}${d.val.replace(/[0-9]*/,'').trim()}` : d.val
  return (
    <motion.div
      initial={{ opacity:0, x:16 }}
      animate={active ? { opacity:1, x:0 } : {}}
      transition={{ duration:.45, delay: active ? 0.85 + index*.1 : 0, ease:EASE }}
    >
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5 }}>
        <div style={{ display:'flex',alignItems:'center',gap:7 }}>
          {/* blinking LED */}
          <div style={{ width:5,height:5,borderRadius:'50%',background:d.color,flexShrink:0,
            boxShadow:`0 0 7px ${d.color}`,
            animation:active?`dnaLED 2.5s ${index*.3}s ease-in-out infinite`:'none' }} />
          <span style={{ fontSize:11,fontFamily:F,color:'rgba(148,163,184,.75)' }}>{d.label}</span>
        </div>
        <motion.span
          animate={active ? { color:d.color } : {}}
          style={{ fontSize:10,fontWeight:700,fontFamily:F,color:'rgba(148,163,184,.4)' }}>
          {display}
        </motion.span>
      </div>
      {/* progress bar with shimmer */}
      <div style={{ height:3,borderRadius:999,background:'rgba(255,255,255,.05)',overflow:'hidden',position:'relative' }}>
        <motion.div
          initial={{ width:0 }}
          animate={active ? { width:`${d.pct}%` } : {}}
          transition={{ duration:1.1, delay: active ? 1.05+index*.1 : 0, ease:EASE }}
          style={{ height:'100%',borderRadius:999,
            background:`linear-gradient(90deg,${d.color},${d.color}77)`,
            boxShadow:`0 0 8px ${d.color}55`, position:'relative' }}
        >
          {/* glowing endpoint dot */}
          <div style={{ position:'absolute',right:0,top:'50%',transform:'translate(50%,-50%)',
            width:5,height:5,borderRadius:'50%',background:d.color,
            boxShadow:`0 0 8px ${d.color}` }} />
        </motion.div>
        {/* shimmer */}
        <div style={{ position:'absolute',inset:0,borderRadius:999,
          background:'linear-gradient(90deg,transparent 40%,rgba(255,255,255,.12) 50%,transparent 60%)',
          animation:'dnaBarShimmer 5s ease-in-out infinite',
          animationDelay:`${index*.6}s` }} />
      </div>
    </motion.div>
  )
}

function Diagnostics({ active }) {
  return (
    <motion.div
      initial={{ opacity:0, x:20 }}
      animate={active ? { opacity:1, x:0 } : {}}
      transition={{ duration:.65, delay:.85, ease:EASE }}
      style={{ borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column',
        background:'rgba(8,14,36,.82)', border:'1px solid rgba(255,255,255,.09)',
        boxShadow:'0 24px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05)',
        height:'100%', minHeight:420 }}
    >
      {/* header */}
      <div style={{ display:'flex',alignItems:'center',gap:7,padding:'10px 14px',
        background:'rgba(0,0,0,.25)',borderBottom:'1px solid rgba(255,255,255,.06)',flexShrink:0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        <span style={{ fontSize:10,fontFamily:F,color:'rgba(148,163,184,.6)',letterSpacing:'.08em' }}>
          SYS_DIAGNOSTICS
        </span>
        {active && (
          <motion.span
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:2.8 }}
            style={{ marginLeft:'auto',fontSize:9,fontFamily:F,color:'#10B981',
              letterSpacing:'.06em', animation:'dnaPulse 3s ease-in-out infinite' }}>
            ALL SYSTEMS ✓
          </motion.span>
        )}
      </div>

      {/* rows */}
      <div style={{ flex:1,padding:'14px',display:'flex',flexDirection:'column',gap:12 }}>
        {DIAG.map((d,i) => <DiagRow key={d.label} d={d} index={i} active={active} />)}
      </div>

      {/* DNA VERIFIED */}
      <motion.div
        initial={{ opacity:0, scale:.94 }}
        animate={active ? { opacity:1, scale:1 } : {}}
        transition={{ duration:.55, delay: active ? 2.9 : 0, ease:EASE }}
        style={{ margin:'0 12px 12px', padding:'10px 14px', borderRadius:10, flexShrink:0,
          background:'rgba(16,185,129,.07)', border:'1px solid rgba(16,185,129,.22)',
          display:'flex',alignItems:'center',gap:9,
          boxShadow:'0 0 24px rgba(16,185,129,.08)',
          animation: active ? 'dnaBreath 3s ease-in-out infinite' : 'none' }}
      >
        <div style={{ width:24,height:24,borderRadius:'50%',
          background:'rgba(16,185,129,.14)', border:'1px solid rgba(16,185,129,.28)',
          display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
          animation:active?'dnaPulse 2.5s ease-in-out infinite':'none',
          boxShadow:'0 0 10px rgba(16,185,129,.2)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="#10B981" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:11,fontWeight:800,color:'#10B981',fontFamily:F,
            letterSpacing:'.08em',textShadow:'0 0 10px rgba(16,185,129,.35)' }}>
            DNA VERIFIED
          </div>
          <div style={{ fontSize:9,color:'rgba(148,163,184,.45)',fontFamily:F,marginTop:2 }}>
            Engineering principles validated
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main export ───────────────────────────────────────── */
export default function EngineeringDNA() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once:true, amount:0.35 })
  const [active, setActive] = useState(false)

  /* smooth mouse parallax */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spX  = useSpring(rawX, { stiffness:60, damping:20 })
  const spY  = useSpring(rawY, { stiffness:60, damping:20 })

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setActive(true), 300)
      return () => clearTimeout(t)
    }
  }, [inView])

  useEffect(() => {
    const fn = (e) => {
      rawX.set((e.clientX/window.innerWidth  - 0.5) * 8)
      rawY.set((e.clientY/window.innerHeight - 0.5) * 8)
    }
    window.addEventListener('mousemove', fn, { passive:true })
    return () => window.removeEventListener('mousemove', fn)
  }, [rawX, rawY])

  const words = ['The','Principles','Behind','Every','Product','We','Build']

  return (
    <section
      ref={sectionRef}
      style={{ position:'relative', overflow:'hidden',
        backgroundColor:'#020617', paddingTop:140, paddingBottom:140 }}
    >
      <style>{`
        @keyframes dnaPulse  { 0%,100%{opacity:1;transform:scale(1)}   50%{opacity:.4;transform:scale(1.45)} }
        @keyframes dnaFloat  { 0%,100%{transform:translateY(0);opacity:.28}  50%{transform:translateY(-13px);opacity:.55} }
        @keyframes dnaShimmer{ 0%,88%{transform:translateX(-130%) skewX(-14deg);opacity:0} 90%{opacity:.38} 100%{transform:translateX(230%) skewX(-14deg);opacity:0} }
        @keyframes dnaTopBorder{ 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        @keyframes dnaBarShimmer{ 0%,88%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes dnaLED    { 0%,100%{opacity:1;box-shadow:0 0 7px currentColor} 50%{opacity:.3;box-shadow:none} }
        @keyframes dnaBreath { 0%,100%{box-shadow:0 0 24px rgba(16,185,129,.08)} 50%{box-shadow:0 0 36px rgba(16,185,129,.18)} }
        @keyframes dnaGrid   { 0%{background-position:0 0} 100%{background-position:0 -48px} }
      `}</style>

      {/* floating particles */}
      <div aria-hidden style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:0 }}>
        {PTCLS.map(p=>(
          <div key={p.id} style={{ position:'absolute',left:p.left,top:p.top,
            width:p.sz,height:p.sz,borderRadius:'50%',background:p.c,filter:'blur(.4px)',
            animation:`dnaFloat ${p.dur} ${p.del} ease-in-out infinite` }} />
        ))}
      </div>

      {/* animated blueprint grid */}
      <div aria-hidden style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
        opacity:.026,
        backgroundImage:'linear-gradient(rgba(34,211,238,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.5) 1px,transparent 1px)',
        backgroundSize:'48px 48px',
        animation:'dnaGrid 20s linear infinite' }} />

      {/* ambient glows */}
      <div aria-hidden style={{ position:'absolute',top:'-18%',left:'-10%',width:560,height:560,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(34,211,238,.06) 0%,transparent 65%)',
        filter:'blur(110px)',pointerEvents:'none',zIndex:0 }} />
      <div aria-hidden style={{ position:'absolute',bottom:'-12%',right:'-8%',width:640,height:640,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.065) 0%,transparent 65%)',
        filter:'blur(130px)',pointerEvents:'none',zIndex:0 }} />

      {/* vignette */}
      <div aria-hidden style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:1,
        background:'radial-gradient(ellipse at center,transparent 40%,rgba(2,6,23,.55) 100%)' }} />

      {/* ── content ── */}
      <div style={{ position:'relative',zIndex:10,maxWidth:1280,margin:'0 auto',padding:'0 clamp(20px,3vw,32px)' }}>

        {/* header */}
        <div style={{ textAlign:'center',maxWidth:820,margin:'0 auto 72px' }}>
          <motion.p
            initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:.5,ease:EASE }}
            style={{ fontSize:12,fontWeight:700,letterSpacing:'.35em',textTransform:'uppercase',
              color:'#22D3EE',marginBottom:18,fontFamily:F }}>
            Engineering DNA
          </motion.p>

          <h2 style={{ fontFamily:F,fontSize:'clamp(2.4rem,4.5vw,3.8rem)',fontWeight:800,
            letterSpacing:'-.04em',lineHeight:1.08,color:'#F8FAFC',marginBottom:20 }}>
            {words.map((w,i)=>(
              <motion.span key={w+i}
                initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:.55,delay:.1+i*.06,ease:EASE }}
                style={{ display:'inline-block',marginRight:'.22em' }}>
                {w}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:.6,delay:.55 }}
            style={{ fontSize:18,color:'rgba(148,163,184,.78)',lineHeight:1.8,
              fontFamily:F,maxWidth:580,margin:'0 auto' }}>
            Every product we ship is governed by three non-negotiable engineering principles — validated across 500+ deployments in 15+ industries.
          </motion.p>
        </div>

        {/* scanner panel */}
        <motion.div
          initial={{ opacity:0,y:36 }}
          animate={inView ? { opacity:1, y:0, x:spX, translateY:spY } : {}}
          transition={{ duration:.8,ease:EASE }}
          style={{ position:'relative',borderRadius:26,
            background:'rgba(255,255,255,.025)',
            border:'1px solid rgba(255,255,255,.07)',
            backdropFilter:'blur(20px)',
            boxShadow:'0 30px 80px rgba(0,0,0,.45)',
            padding:'clamp(16px,2.5vw,28px)',
            overflow:'hidden' }}
        >
          {/* top gradient border */}
          <div aria-hidden style={{ position:'absolute',top:0,left:0,right:0,height:1,
            background:'linear-gradient(90deg,transparent,rgba(34,211,238,.5),rgba(99,102,241,.35),rgba(34,211,238,.28),transparent)',
            opacity:.65 }} />

          {/* panel shimmer */}
          <div aria-hidden style={{ position:'absolute',inset:0,borderRadius:26,pointerEvents:'none',overflow:'hidden' }}>
            <div style={{ position:'absolute',top:0,left:0,width:'36%',height:'100%',
              background:'linear-gradient(105deg,transparent 38%,rgba(255,255,255,.018) 50%,transparent 62%)',
              animation:'dnaShimmer 9s ease-in-out 3s infinite' }} />
          </div>

          {/* 3-column grid */}
          <div style={{ display:'grid',gridTemplateColumns:'35fr 35fr 30fr',gap:'clamp(12px,2vw,20px)',alignItems:'start' }}>

            {/* LEFT — terminal */}
            <Terminal active={active} />

            {/* CENTER — cards */}
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {CARDS.map((c,i)=>(
                <PrincipleCard key={c.id} card={c} index={i} active={active} />
              ))}
            </div>

            {/* RIGHT — diagnostics */}
            <Diagnostics active={active} />

          </div>
        </motion.div>

      </div>
    </section>
  )
}
