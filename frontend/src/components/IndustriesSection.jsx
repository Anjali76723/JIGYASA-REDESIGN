import { useEffect, useRef, useState, useCallback } from 'react'

const AUTOPLAY_MS = 5000   // 5 seconds per industry

/* ─────────────────────────────────────────────────────────
   INDUSTRY DATA  (unchanged)
───────────────────────────────────────────────────────── */
const industries = [
  {
    key:'healthcare', title:'Healthcare',
    desc:'We build patient-centred digital platforms that modernise care delivery — from telemedicine to clinical analytics — while staying fully HIPAA-compliant.',
    accent:'#22D3EE',
    capabilities:['Patient Portals','Telemedicine Platforms','Healthcare Analytics','HIPAA-Compliant Systems'],
    metrics:[{value:'99.9',unit:'%',label:'System Reliability'},{value:'1',unit:'M+',label:'Patient Records'},{value:'24/7',unit:'',label:'Monitoring'}],
    icon:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M12 7v10M7 12h10"/><rect x="3" y="3" width="18" height="18" rx="4"/></svg>),
    visual:'healthcare',
  },
  {
    key:'fintech', title:'FinTech',
    desc:'Secure, scalable financial infrastructure — from real-time payment rails to AI-driven fraud detection and regulatory-ready digital banking experiences.',
    accent:'#6366F1',
    capabilities:['Payment Infrastructure','Digital Banking','Financial Dashboards','Fraud Detection Systems'],
    metrics:[{value:'2',unit:'B+',label:'Transactions Processed'},{value:'0.1',unit:'s',label:'Avg. Response Time'},{value:'PCI',unit:'',label:'DSS Compliant'}],
    icon:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M12 8c-3 0-5 1.2-5 4s2 4 5 4 5-1.2 5-4-2-4-5-4z"/><path d="M12 4v4M12 16v4"/></svg>),
    visual:'fintech',
  },
  {
    key:'ecommerce', title:'E-Commerce',
    desc:'Conversion-first storefronts and headless commerce platforms engineered for speed, scale, and seamless omnichannel customer experiences.',
    accent:'#a78bfa',
    capabilities:['Headless Storefronts','Checkout Optimisation','Inventory & OMS','Personalisation Engines'],
    metrics:[{value:'3.2',unit:'×',label:'Avg. Conversion Lift'},{value:'99',unit:'ms',label:'Page Load Time'},{value:'40',unit:'%',label:'Cart Recovery Rate'}],
    icon:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/></svg>),
    visual:'ecommerce',
  },
  {
    key:'education', title:'Education',
    desc:'Engaging learning platforms and LMS integrations that adapt to every learner — from K-12 schools to enterprise L&D programmes at global scale.',
    accent:'#22D3EE',
    capabilities:['Learning Management Systems','Adaptive Courseware','Student Analytics','Live Virtual Classrooms'],
    metrics:[{value:'500',unit:'K+',label:'Active Learners'},{value:'92',unit:'%',label:'Completion Rate'},{value:'4.8',unit:'/5',label:'Learner Satisfaction'}],
    icon:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M12 3l9 4-9 4-9-4 9-4z"/><path d="M3 11l9 4 9-4M3 17l9 4 9-4"/></svg>),
    visual:'education',
  },
  {
    key:'logistics', title:'Logistics',
    desc:'Real-time fleet tracking, warehouse management, and end-to-end supply-chain automation — built for the speed modern logistics demands.',
    accent:'#6366F1',
    capabilities:['Fleet Management','Real-Time Tracking','Warehouse Automation','Route Optimisation'],
    metrics:[{value:'28',unit:'%',label:'Fuel Cost Reduction'},{value:'99.5',unit:'%',label:'Delivery Accuracy'},{value:'2.1',unit:'×',label:'Throughput Increase'}],
    icon:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/></svg>),
    visual:'logistics',
  },
  {
    key:'saas', title:'SaaS',
    desc:'Scalable multi-tenant SaaS platforms with robust APIs, usage analytics, billing infrastructure, and the architecture to grow from 10 to 10 million users.',
    accent:'#a78bfa',
    capabilities:['Multi-Tenant Architecture','API Platform & SDKs','Usage Analytics','Subscription Billing'],
    metrics:[{value:'10',unit:'M+',label:'End Users Supported'},{value:'99.99',unit:'%',label:'Platform Uptime'},{value:'4',unit:'×',label:'Faster Time-to-Ship'}],
    icon:(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"/></svg>),
    visual:'saas',
  },
]

/* ─────────────────────────────────────────────────────────
   COUNT-UP HOOK  — animates a number from 0 → target on trigger
───────────────────────────────────────────────────────── */
function useCountUp(target, trigger, duration = 1200) {
  const [display, setDisplay] = useState('0')
  const rafRef = useRef(null)

  useEffect(() => {
    if (!trigger) return
    // Only animate if target is numeric
    const num = parseFloat(target)
    if (isNaN(num)) { setDisplay(target); return }

    const start    = performance.now()
    const decimals = target.includes('.') ? (target.split('.')[1]?.length ?? 0) : 0

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)          // ease-out-cubic
      const cur  = num * ease
      setDisplay(cur.toFixed(decimals))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, trigger])   // re-runs every time trigger identity changes

  return display
}

/* ─────────────────────────────────────────────────────────
   METRIC VALUE  — wraps useCountUp per metric
───────────────────────────────────────────────────────── */
function MetricValue({ value, unit, triggerKey }) {
  const display = useCountUp(value, triggerKey)
  return <>{display}{unit}</>
}

/* ─────────────────────────────────────────────────────────
   INDUSTRY VISUAL  (unchanged logic, key prop handled outside)
───────────────────────────────────────────────────────── */
function IndustryVisual({ type, accent, animate }) {
  const barSets = {
    healthcare:[55,72,48,88,65,91], fintech:[40,68,55,82,70,95],
    ecommerce:[60,45,78,52,88,74],  education:[50,65,42,76,60,84],
    logistics:[72,58,85,63,79,92],  saas:[45,70,55,88,66,96],
  }
  const bars = barSets[type] || barSets.saas

  const lineSets = {
    healthcare:[[0,65],[60,52],[120,58],[180,38],[240,44],[300,28],[360,14]],
    fintech:   [[0,60],[60,48],[120,55],[180,35],[240,42],[300,22],[360,10]],
    ecommerce: [[0,70],[60,55],[120,62],[180,40],[240,46],[300,25],[360,12]],
    education: [[0,68],[60,54],[120,60],[180,42],[240,48],[300,30],[360,16]],
    logistics: [[0,62],[60,50],[120,56],[180,36],[240,42],[300,24],[360,12]],
    saas:      [[0,72],[60,58],[120,64],[180,44],[240,50],[300,30],[360,8]],
  }
  const pts = lineSets[type] || lineSets.saas
  const linePath = pts.map(([x,y],i) => `${i===0?'M':'L'}${x} ${y}`).join(' ')

  const labels = {
    healthcare:['Q1','Q2','Q3','Q4','Q5','Q6'], fintech:['Jan','Feb','Mar','Apr','May','Jun'],
    ecommerce:['Mon','Tue','Wed','Thu','Fri','Sat'], education:['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6'],
    logistics:['06h','09h','12h','15h','18h','21h'], saas:['M','T','W','T','F','S'],
  }
  const lbl = labels[type] || labels.saas

  const uid = `${type}-${Math.random().toString(36).slice(2,6)}`

  return (
    <div className="relative w-full h-full min-h-[200px] select-none pointer-events-none">
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/8" style={{background:'rgba(255,255,255,.03)'}}>
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/6">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/50"/>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50"/>
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/50"/>
          <span className="ml-3 text-[10px] text-slate-500 font-mono truncate">{type}.dashboard.io</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] font-[600] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_4px_rgba(34,197,94,.8)]"/>Live
          </span>
        </div>
        <div className="p-4 flex flex-col gap-3 h-[calc(100%-44px)]">
          {/* Line chart */}
          <div className="rounded-xl border border-white/6 px-3 pt-2.5 pb-1" style={{background:'rgba(255,255,255,.03)'}}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-[600]">Performance</span>
              <span className="text-[10px] font-[700]" style={{color:accent}}>▲ Trending</span>
            </div>
            <svg viewBox="0 0 360 60" className="w-full" style={{height:52}} preserveAspectRatio="none">
              <defs>
                <linearGradient id={`vg-${uid}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366F1"/>
                  <stop offset="100%" stopColor={accent}/>
                </linearGradient>
                <clipPath id={`vc-${uid}`}>
                  <rect x="0" y="0" height="60"
                    style={{width: animate ? 360 : 0, transition:'width 1.4s ease-out 0.2s'}}/>
                </clipPath>
              </defs>
              <path d={linePath+` L360 60 L0 60 Z`} fill={`url(#vg-${uid})`}
                style={{opacity: animate ? 0.12 : 0, transition:'opacity 600ms 400ms'}}/>
              <path d={linePath} fill="none" stroke={`url(#vg-${uid})`} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" clipPath={`url(#vc-${uid})`}
                style={{filter: animate ? `drop-shadow(0 0 4px ${accent}88)` : 'none'}}/>
            </svg>
          </div>
          {/* Bar chart */}
          <div className="flex-1 flex items-end gap-1 px-1 pb-1">
            {bars.map((h,i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md transition-all duration-700 ease-out"
                  style={{
                    height: animate ? `${h}%` : '4%',
                    background:`linear-gradient(to top, ${accent}cc, ${accent}44)`,
                    boxShadow: animate ? `0 0 10px ${accent}55` : 'none',
                    transitionDelay:`${i*80+300}ms`, maxHeight:80, minHeight:4,
                  }}/>
                <span className="text-[8px] text-slate-600">{lbl[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{width:'70%',height:30,background:accent,filter:'blur(20px)',opacity:0.12}}/>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────── */
export default function IndustriesSection() {
  const [active,      setActive]      = useState(0)
  const [visible,     setVisible]     = useState(false)
  const [paused,      setPaused]      = useState(false)
  // panelPhase: 'idle' | 'exit' | 'enter'
  const [panelPhase,  setPanelPhase]  = useState('idle')
  // triggerKey changes on every industry switch → CountUp restarts
  const [triggerKey,  setTriggerKey]  = useState(0)
  // progress 0→100 over AUTOPLAY_MS
  const [progress,    setProgress]    = useState(0)

  const sectionRef    = useRef(null)
  const pendingRef    = useRef(null)
  const progressRef   = useRef(null)   // rAF id
  const startTimeRef  = useRef(null)
  const pausedAtRef   = useRef(null)   // ms elapsed when paused

  /* ── Section visibility ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* ── Smooth industry switch (with exit → enter transition) ── */
  const goTo = useCallback((next) => {
    if (next === active) return
    clearTimeout(pendingRef.current)
    cancelAnimationFrame(progressRef.current)

    setPanelPhase('exit')
    setProgress(0)

    pendingRef.current = setTimeout(() => {
      setActive(next)
      setTriggerKey(k => k + 1)
      setPanelPhase('enter')
      startTimeRef.current = null
      pausedAtRef.current  = null
      // Snap to 'idle' after enter animation completes
      setTimeout(() => setPanelPhase('idle'), 500)
    }, 320)
  }, [active])

  /* ── Progress bar rAF loop ── */
  const startProgress = useCallback(() => {
    cancelAnimationFrame(progressRef.current)

    const tick = (now) => {
      if (!startTimeRef.current) startTimeRef.current = now
      const elapsed = now - startTimeRef.current
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick)
      }
    }
    progressRef.current = requestAnimationFrame(tick)
  }, [])

  /* ── Autoplay: advance every AUTOPLAY_MS ── */
  useEffect(() => {
    if (paused || !visible) return

    // Reset and restart progress bar
    setProgress(0)
    startTimeRef.current = null
    startProgress()

    const t = setTimeout(() => {
      goTo((active + 1) % industries.length)
    }, AUTOPLAY_MS)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(progressRef.current)
    }
  }, [active, paused, visible, goTo, startProgress])

  /* ── Pause / resume with elapsed preservation ── */
  const handlePause = useCallback(() => {
    setPaused(true)
    cancelAnimationFrame(progressRef.current)
    pausedAtRef.current = startTimeRef.current
      ? performance.now() - startTimeRef.current
      : 0
  }, [])

  const handleResume = useCallback(() => {
    setPaused(false)
    // Restore elapsed so bar continues from where it paused
    if (pausedAtRef.current != null) {
      startTimeRef.current = performance.now() - pausedAtRef.current
    }
  }, [])

  const ind = industries[active]

  /* ── Panel content animation styles ── */
  const panelItemBase = (delayMs) => ({
    transition:    `opacity 400ms ${delayMs}ms, transform 400ms ${delayMs}ms`,
    opacity:       panelPhase === 'exit' ? 0 : 1,
    transform:     panelPhase === 'exit'  ? 'translateY(20px)' :
                   panelPhase === 'enter' ? 'translateY(8px)'  : 'translateY(0)',
  })

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes indGlow {
          0%,100% { transform:translateY(0) scale(1);      }
          50%      { transform:translateY(-16px) scale(1.02);}
        }
        @keyframes iconFloat {
          0%,100% { transform:translateY(0);   }
          50%      { transform:translateY(-6px); }
        }
        @keyframes nodeGlow {
          0%,100% { box-shadow: 0 0 10px rgba(34,211,238,.35); }
          50%      { box-shadow: 0 0 24px rgba(34,211,238,.55); }
        }
        @keyframes energyDot {
          0%   { top:0%;      opacity:0;   }
          10%  { opacity:.7;  }
          90%  { opacity:.7;  }
          100% { top:100%;    opacity:0;   }
        }
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute rounded-full"
        style={{width:600,height:600,top:'-10%',left:'-8%',
          background:'radial-gradient(circle,rgba(34,211,238,.08) 0%,transparent 65%)',
          filter:'blur(220px)', animation:'indGlow 12s ease-in-out infinite alternate'}}/>
      <div className="pointer-events-none absolute rounded-full"
        style={{width:700,height:700,bottom:'-10%',right:'-8%',
          background:'radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 65%)',
          filter:'blur(240px)', animation:'indGlow 12s ease-in-out 6s infinite alternate'}}/>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16 transition-all duration-700"
          style={{opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(24px)'}}>
          <p className="text-sm font-[700] uppercase tracking-[0.3em] text-[#22D3EE]">
            Industries We Serve
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Industry Expertise Across<br className="hidden sm:block"/> Digital Ecosystems
          </h2>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            We design and engineer digital products across industries, helping
            organizations modernize operations and accelerate growth.
          </p>
        </div>

        {/* Mobile chips */}
        <div className="lg:hidden mb-6 -mx-6 px-6">
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {industries.map((ind, i) => (
              <button key={ind.key}
                onClick={() => goTo(i)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-[600] border transition-all duration-200"
                style={{
                  background:  i===active ? `linear-gradient(135deg,#6366F1,${ind.accent})` : 'rgba(255,255,255,.04)',
                  borderColor: i===active ? 'transparent' : 'rgba(255,255,255,.10)',
                  color:       i===active ? '#fff' : 'rgba(148,163,184,.8)',
                  boxShadow:   i===active ? `0 0 20px ${ind.accent}44` : 'none',
                }}>
                {ind.title}
              </button>
            ))}
          </div>
          {/* Mobile progress bar */}
          <div className="mt-3 h-[3px] w-full rounded-full overflow-hidden"
            style={{background:'rgba(255,255,255,.06)'}}>
            <div className="h-full rounded-full transition-none"
              style={{
                width:`${progress}%`,
                background:'linear-gradient(90deg,#6366F1,#22D3EE)',
                boxShadow:'0 0 8px rgba(34,211,238,.4)',
              }}/>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-8 lg:gap-12 items-start">

          {/* ══ LEFT — timeline ══ */}
          <div
            className="hidden lg:flex flex-col relative transition-all duration-700"
            style={{opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(-24px)'}}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
          >
            {/* Track */}
            <div className="absolute left-[6px] top-[22px] w-[2px] rounded-full overflow-visible"
              style={{bottom:22, background:'rgba(255,255,255,.08)'}}>
              {/* Fill */}
              <div className="absolute top-0 left-0 w-full rounded-full transition-all duration-500"
                style={{
                  height:`${((active+0.5)/industries.length)*100}%`,
                  background:'linear-gradient(to bottom,#22D3EE,#6366F1)',
                  boxShadow:'0 0 10px rgba(34,211,238,.4)',
                }}/>
              {/* Energy dot travelling downward */}
              <div className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width:6, height:6,
                  background:'#22D3EE',
                  boxShadow:'0 0 8px rgba(34,211,238,.9)',
                  animation:'energyDot 3s linear infinite',
                }}/>
            </div>

            {industries.map((item, i) => {
              const isActive = i === active
              return (
                <button key={item.key}
                  onClick={() => goTo(i)}
                  className="flex items-start gap-4 text-left py-[14px] pl-2 group relative"
                  style={{
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? 'translateX(0)' : 'translateX(-12px)',
                    transition: `opacity 500ms ${i*80}ms, transform 500ms ${i*80}ms`,
                  }}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {/* Node */}
                  <div className="relative flex-shrink-0 z-10 transition-all duration-300"
                    style={{
                      width:14, height:14, marginTop:3,
                      borderRadius:'50%',
                      background: isActive
                        ? `linear-gradient(135deg,#22D3EE,${item.accent})`
                        : 'rgba(255,255,255,.15)',
                      boxShadow:  isActive ? `0 0 16px ${item.accent}88` : 'none',
                      transform:  isActive ? 'scale(1.15)' : 'scale(1)',
                      opacity:    isActive ? 1 : 0.6,
                      animation:  isActive ? 'nodeGlow 4s ease-in-out infinite' : 'none',
                    }}>
                    {isActive && (
                      <span className="absolute -inset-[5px] rounded-full border border-cyan-400/30 animate-ping"/>
                    )}
                  </div>

                  {/* Text + progress */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-[600] leading-tight transition-colors duration-300"
                      style={{color: isActive ? '#fff' : 'rgba(148,163,184,.65)'}}>
                      {item.title}
                    </p>

                    {isActive && (
                      <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">
                        {item.capabilities[0]} + {item.capabilities.length-1} more
                      </p>
                    )}

                    {/* Per-item 5s progress bar */}
                    {isActive && (
                      <div className="mt-2 h-[3px] w-full rounded-full overflow-hidden"
                        style={{background:'rgba(255,255,255,.07)'}}>
                        <div className="h-full rounded-full transition-none"
                          style={{
                            width:`${progress}%`,
                            background:`linear-gradient(90deg,#6366F1,#22D3EE)`,
                            boxShadow:'0 0 6px rgba(34,211,238,.5)',
                          }}/>
                      </div>
                    )}
                  </div>

                  {isActive && (
                    <svg className="h-4 w-4 flex-shrink-0 text-slate-500 mt-0.5" fill="none"
                      stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {/* ══ RIGHT — showcase panel ══ */}
          <div
            className="relative rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.03) 100%)',
              boxShadow:  '0 20px 60px rgba(99,102,241,.15)',
              padding:    40,
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 700ms 200ms, transform 700ms 200ms, box-shadow 300ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 32px 80px rgba(99,102,241,.22)'
              handlePause()
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(99,102,241,.15)'
              handleResume()
            }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[32px]"
              style={{boxShadow:'inset 0 1px 0 rgba(255,255,255,.05)'}}/>
            <div className="pointer-events-none absolute top-0 right-0 rounded-full"
              style={{width:300,height:300,
                background:`radial-gradient(circle at 70% 20%,${ind.accent}18,transparent 65%)`,
                filter:'blur(40px)'}}/>

            {/* ── Staggered content ── */}

            {/* Icon + title */}
            <div className="flex items-start gap-5 mb-6" style={panelItemBase(0)}>
              <div className="flex-shrink-0 rounded-2xl flex items-center justify-center border border-white/8"
                style={{
                  width:56, height:56,
                  background:`radial-gradient(circle at 35% 35%,${ind.accent}33,rgba(99,102,241,.12))`,
                  color:ind.accent,
                  animation:'iconFloat 5s ease-in-out infinite',
                }}>
                <div className="h-7 w-7">{ind.icon}</div>
              </div>
              <div>
                <h3 className="text-2xl font-[800] text-white">{ind.title}</h3>
                <p className="mt-2 text-[15px] text-slate-400 leading-relaxed max-w-xl">{ind.desc}</p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="flex flex-wrap gap-2 mb-7" style={panelItemBase(80)}>
              {ind.capabilities.map(c => (
                <span key={c}
                  className="text-[12px] font-[500] px-3 py-1.5 rounded-full border border-white/8 transition-all duration-200 hover:border-white/20"
                  style={{background:'rgba(255,255,255,.05)',color:'rgba(203,213,225,.85)'}}>
                  {c}
                </span>
              ))}
            </div>

            {/* Dashboard — keyed so SVG clip re-animates on switch */}
            <div className="mb-7" style={{height:220,...panelItemBase(160)}}>
              <IndustryVisual key={ind.key} type={ind.visual} accent={ind.accent} animate={visible}/>
            </div>

            {/* Divider */}
            <div className="h-px mb-6"
              style={{background:'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)',...panelItemBase(240)}}/>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4" style={panelItemBase(320)}>
              {ind.metrics.map((m) => (
                <div key={m.label}
                  className="rounded-2xl border border-white/8 p-4 text-center cursor-default transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.02]"
                  style={{background:'rgba(255,255,255,.04)'}}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${ind.accent}55`
                    e.currentTarget.style.boxShadow   = `0 12px 32px ${ind.accent}22`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'
                    e.currentTarget.style.boxShadow   = 'none'
                  }}>
                  <p className="text-xl font-[800] bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                    <MetricValue value={m.value} unit={m.unit} triggerKey={`${triggerKey}-${m.label}`}/>
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">{m.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
