import React, { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   TIMELINE DATA
───────────────────────────────────────────── */
const stages = [
  {
    num:   '01',
    label: 'Challenge',
    color: '#22D3EE',
    title: 'Legacy Systems Creating Friction',
    desc:  'Legacy reporting systems created delays, manual workflows, and slow business decisions — costing the company valuable time and competitive edge.',
  },
  {
    num:   '02',
    label: 'Solution',
    color: '#a78bfa',
    title: 'Modernized Digital Infrastructure',
    desc:  'Modernized internal dashboards, automated reporting pipelines, and redesigned workflows to eliminate bottlenecks at every level.',
  },
  {
    num:   '03',
    label: 'Implementation',
    color: '#6366F1',
    title: 'Real-Time Analytics & Automation',
    desc:  'Integrated real-time analytics, process automation, and executive reporting systems — all connected through a unified data layer.',
  },
  {
    num:   '04',
    label: 'Results',
    color: '#22D3EE',
    title: 'Measurable Business Transformation',
    isResults: true,
    kpis: [
      { value: '+42%', label: 'Efficiency Increase',    color: '#22D3EE' },
      { value: '-31%', label: 'Reporting Time',         color: '#a78bfa' },
      { value: '2.3x', label: 'Faster Insights',        color: '#6366F1' },
    ],
  },
]

/* ─────────────────────────────────────────────
   ANIMATED BAR CHART
───────────────────────────────────────────── */
function BarChart({ animate }) {
  const bars = [
    { h: 38, color: '#6366F1', label: 'Q1' },
    { h: 55, color: '#22D3EE', label: 'Q2' },
    { h: 48, color: '#6366F1', label: 'Q3' },
    { h: 72, color: '#22D3EE', label: 'Q4' },
    { h: 62, color: '#6366F1', label: 'Q5' },
    { h: 88, color: '#22D3EE', label: 'Q6' },
    { h: 95, color: '#6366F1', label: 'Q7' },
  ]
  return (
    <div className="flex items-end gap-2 h-28 px-1">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-lg transition-all duration-700 ease-out"
            style={{
              height:          animate ? `${b.h}%` : '4%',
              background:      `linear-gradient(to top, ${b.color}dd, ${b.color}55)`,
              boxShadow:       animate ? `0 0 14px ${b.color}66` : 'none',
              transitionDelay: `${i * 80}ms`,
            }}
          />
          <span className="text-[9px] text-slate-600">{b.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   ANIMATED LINE CHART (SVG)
───────────────────────────────────────────── */
function LineChart({ animate }) {
  const points = [[0,70],[60,55],[120,62],[180,38],[240,30],[300,18],[360,8]]
  const path   = points.map(([x,y], i) => `${i===0?'M':'L'}${x} ${y}`).join(' ')
  const fill   = points.map(([x,y]) => `${x} ${y}`).join(' ') + ' 360 80 0 80'

  return (
    <div className="relative w-full" style={{ height: 80 }}>
      <svg viewBox="0 0 360 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22D3EE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0"    />
          </linearGradient>
          <clipPath id="lineReveal">
            <rect
              x="0" y="0" height="80"
              width={animate ? 360 : 0}
              style={{ transition: 'width 1.4s ease-out 0.3s' }}
            />
          </clipPath>
        </defs>
        <polygon points={fill} fill="url(#fillGrad)" opacity={animate ? 1 : 0}
          style={{ transition: 'opacity 600ms 400ms' }} />
        <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          clipPath="url(#lineReveal)"
          style={{ filter: animate ? 'drop-shadow(0 0 6px rgba(34,211,238,.6))' : 'none' }} />
        {animate && points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#22D3EE"
            opacity={animate ? 1 : 0}
            style={{
              filter:     'drop-shadow(0 0 4px rgba(34,211,238,.8))',
              transition: `opacity 300ms ${400 + i * 120}ms`,
            }} />
        ))}
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────
   KPI STAT ROW
───────────────────────────────────────────── */
function KpiRow({ label, value, color, barWidth }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] text-slate-400 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width:      barWidth,
            background: `linear-gradient(90deg, ${color}, #22D3EE)`,
            boxShadow:  `0 0 8px ${color}88`,
          }} />
      </div>
      <span className="text-[12px] font-[700] flex-shrink-0" style={{ color }}>{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FLOATING BADGE
───────────────────────────────────────────── */
function FloatingBadge({ children, style, delay = '0s' }) {
  return (
    <div
      className="absolute rounded-2xl border border-white/10 backdrop-blur-xl px-3 py-2 text-center pointer-events-none"
      style={{
        background: 'rgba(7,16,36,.85)',
        animation:  `floatY 3.5s ease-in-out ${delay} infinite alternate`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function FeaturedCaseStudy() {
  const sectionRef = useRef(null)
  const [visible,     setVisible]     = useState(false)
  const [lineHeight,  setLineHeight]  = useState(0)
  const [activeStage, setActiveStage] = useState(-1)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setVisible(true)
        // Stagger timeline nodes
        stages.forEach((_, i) => {
          setTimeout(() => setActiveStage(i), 300 + i * 500)
        })
        // Grow the timeline line
        setTimeout(() => setLineHeight(100), 200)
        obs.disconnect()
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Keyframe */}
      <style>{`
        @keyframes floatY {
          from { transform: translateY(0px);  }
          to   { transform: translateY(-10px); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: .025; }
          50%       { opacity: .05;  }
        }
      `}</style>

      {/* ── Background glows ── */}
      <div className="pointer-events-none absolute -left-20 -top-20 rounded-full"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(34,211,238,.10) 0%, transparent 70%)', filter: 'blur(220px)' }} />
      <div className="pointer-events-none absolute -right-20 bottom-0 rounded-full"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(99,102,241,.10) 0%, transparent 70%)', filter: 'blur(220px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── HEADER ── */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#22D3EE]">
            Featured Success Story
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-[850px] mx-auto">
            Helping a Manufacturing Company Increase Operational Efficiency by{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
              42%
            </span>
          </h2>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">

          {/* ════════════════════════════════
              LEFT — Vertical Timeline
          ════════════════════════════════ */}
          <div className="relative">
            {/* Vertical glowing line */}
            <div className="absolute left-[19px] top-5 w-[2px] rounded-full overflow-hidden"
              style={{ height: 'calc(100% - 40px)', background: 'rgba(255,255,255,.06)' }}>
              <div
                className="w-full rounded-full transition-all duration-[1800ms] ease-out"
                style={{
                  height:     `${lineHeight}%`,
                  background: 'linear-gradient(to bottom, #22D3EE, #6366F1)',
                  boxShadow:  '0 0 12px rgba(34,211,238,.4)',
                }}
              />
            </div>

            {/* Timeline stages */}
            <div className="flex flex-col gap-8 pl-12">
              {stages.map((s, i) => {
                const shown = activeStage >= i
                return (
                  <div
                    key={s.num}
                    className="relative transition-all duration-500"
                    style={{
                      opacity:   shown ? 1 : 0,
                      transform: shown ? 'translateX(0)' : 'translateX(-16px)',
                    }}
                  >
                    {/* Node */}
                    <div
                      className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-[900] text-[11px] transition-all duration-500"
                      style={{
                        background:   shown
                          ? `radial-gradient(circle at 35% 35%, ${s.color}33, rgba(99,102,241,.15))`
                          : 'rgba(255,255,255,.05)',
                        borderColor:  shown ? `${s.color}55` : 'rgba(255,255,255,.08)',
                        color:        s.color,
                        boxShadow:    shown ? `0 0 24px ${s.color}44` : 'none',
                      }}
                    >
                      {s.num}
                    </div>

                    {/* Stage label */}
                    <p
                      className="text-[11px] font-[700] uppercase tracking-[0.25em] mb-1.5"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </p>

                    {/* Title */}
                    <h3 className="text-[17px] font-[700] text-white mb-2">{s.title}</h3>

                    {/* Content */}
                    {s.isResults ? (
                      /* KPI cards */
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {s.kpis.map(k => (
                          <div
                            key={k.label}
                            className="group relative rounded-2xl border border-white/10 backdrop-blur-xl p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(34,211,238,.1)] cursor-default"
                            style={{
                              background: 'rgba(255,255,255,.04)',
                              '--hover-border': `${k.color}44`,
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = `${k.color}44`
                              e.currentTarget.style.boxShadow   = `0 16px 40px ${k.color}18`
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
                              e.currentTarget.style.boxShadow   = 'none'
                            }}
                          >
                            {/* Gradient border glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: `radial-gradient(ellipse at top, ${k.color}18, transparent 70%)` }} />
                            <p className="text-xl font-[900] bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                              {k.value}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-400">{k.label}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* ── CTA BUTTONS ── */}
            <div
              className="mt-10 pl-12 flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-[2000ms]"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
            >
              <button
                className="px-7 py-3 rounded-2xl text-sm font-[600] text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(99,102,241,.35)]"
              >
                View Full Case Study
              </button>
              <button
                className="px-7 py-3 rounded-2xl text-sm font-[600] text-white border border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#22D3EE]/40 hover:bg-white/8"
                style={{ background: 'rgba(255,255,255,.04)' }}
              >
                Book Consultation
              </button>
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT — Dashboard visualization
          ════════════════════════════════ */}
          <div
            className="relative transition-all duration-1000 delay-300"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? 'perspective(1200px) rotateY(-10deg) rotateX(4deg)' : 'perspective(1200px) rotateY(-16deg) rotateX(8deg) translateY(24px)',
            }}
          >
            {/* Subtle grid pattern */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[32px] z-0"
              style={{
                backgroundImage:  'linear-gradient(rgba(34,211,238,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.05) 1px, transparent 1px)',
                backgroundSize:   '28px 28px',
                animation:        'gridPulse 4s ease-in-out infinite',
                borderRadius:     32,
              }}
            />

            {/* Main dashboard card */}
            <div
              className="relative z-10 rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_40px_100px_rgba(99,102,241,.2)]"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,.03) 100%)' }}
            >
              {/* ── Top bar ── */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8"
                style={{ background: 'rgba(255,255,255,.03)' }}>
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,.8)] animate-pulse" />
                  <span className="text-sm font-[600] text-white">Production Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-[600] text-green-400 px-2.5 py-1 rounded-full border border-green-400/20"
                  style={{ background: 'rgba(34,197,94,.08)' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Live
                </div>
              </div>

              <div className="p-6 space-y-5">

                {/* ── Line chart ── */}
                <div className="rounded-2xl border border-white/8 p-4"
                  style={{ background: 'rgba(255,255,255,.03)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-[600] uppercase tracking-widest text-slate-500">Efficiency Trend</span>
                    <span className="text-[11px] font-[700] text-[#22D3EE]">+42% YTD</span>
                  </div>
                  <LineChart animate={visible} />
                </div>

                {/* ── Bar chart ── */}
                <div className="rounded-2xl border border-white/8 p-4"
                  style={{ background: 'rgba(255,255,255,.03)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-[600] uppercase tracking-widest text-slate-500">Output Volume</span>
                    <span className="text-[11px] font-[700] text-[#6366F1]">Quarterly</span>
                  </div>
                  <BarChart animate={visible} />
                </div>

                {/* ── KPI rows ── */}
                <div className="rounded-2xl border border-white/8 p-4 space-y-3"
                  style={{ background: 'rgba(255,255,255,.03)' }}>
                  <p className="text-[11px] font-[600] uppercase tracking-widest text-slate-500 mb-3">System Metrics</p>
                  <KpiRow label="Uptime"            value="99.8%" color="#22D3EE" barWidth={visible ? '99.8%' : '0%'} />
                  <KpiRow label="Processing Speed"  value="2.3s"  color="#a78bfa" barWidth={visible ? '78%' : '0%'}   />
                  <KpiRow label="Data Accuracy"     value="99.7%" color="#6366F1" barWidth={visible ? '99.7%' : '0%'} />
                </div>

              </div>
            </div>

            {/* ── Floating badges ── */}
            <FloatingBadge
              delay="0s"
              style={{ top: -20, right: -12, minWidth: 110 }}
            >
              <p className="text-lg font-[900] bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent leading-none">
                +42%
              </p>
              <p className="text-[9px] text-slate-400 mt-0.5">Efficiency</p>
            </FloatingBadge>

            <FloatingBadge
              delay="0.8s"
              style={{ bottom: 60, left: -20, minWidth: 130 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.8)]" />
                <p className="text-[11px] font-[700] text-white">Live Analytics</p>
              </div>
            </FloatingBadge>

            <FloatingBadge
              delay="1.6s"
              style={{ top: '40%', left: -28, minWidth: 140 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[#a78bfa] text-sm">⚡</span>
                <p className="text-[11px] font-[700] text-white">Automation Enabled</p>
              </div>
            </FloatingBadge>

            {/* Glow beneath dashboard */}
            <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: '80%', height: 60, background: 'rgba(99,102,241,.2)', filter: 'blur(30px)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}
