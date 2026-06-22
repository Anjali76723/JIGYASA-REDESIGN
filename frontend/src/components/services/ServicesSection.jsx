import React, { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const Icons = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M12 18h.01" strokeWidth="2" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c0 0 4 4 4 9s-4 9-4 9" />
      <path d="M3 12h18" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  transform: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
}

/* ─────────────────────────────────────────────
   DASHBOARD VISUAL — animated bars + chart
───────────────────────────────────────────── */
function DashboardVisual({ animate }) {
  const bars = [
    { h: '55%', color: '#6366F1', delay: '0ms'   },
    { h: '80%', color: '#22D3EE', delay: '80ms'  },
    { h: '45%', color: '#6366F1', delay: '160ms' },
    { h: '90%', color: '#22D3EE', delay: '240ms' },
    { h: '65%', color: '#6366F1', delay: '320ms' },
    { h: '75%', color: '#22D3EE', delay: '400ms' },
  ]

  const metrics = [
    { label: 'Uptime',    value: '99.9%', color: '#22D3EE' },
    { label: 'Speed',     value: '< 1s',  color: '#a78bfa' },
    { label: 'Projects',  value: '500+',  color: '#22D3EE' },
  ]

  return (
    <div className="relative w-full h-full min-h-[220px] select-none pointer-events-none">
      {/* Glass panel */}
      <div className="absolute inset-0 rounded-2xl border border-white/8 overflow-hidden"
        style={{ background: 'rgba(255,255,255,.03)' }}>

        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/6">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          <span className="ml-3 text-[11px] text-slate-500 font-mono">dashboard.jigyasa.io</span>
        </div>

        <div className="p-4 flex flex-col gap-3 h-[calc(100%-44px)]">
          {/* Metric pills */}
          <div className="flex gap-2">
            {metrics.map(m => (
              <div key={m.label}
                className="flex-1 rounded-xl border border-white/8 px-3 py-2 text-center"
                style={{ background: 'rgba(255,255,255,.04)' }}>
                <div className="text-[13px] font-[700]" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="flex-1 flex items-end gap-1.5 px-1 pb-1">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
                <div
                  className="rounded-t-md transition-all duration-700 ease-out"
                  style={{
                    height:           animate ? b.h : '4%',
                    background:       `linear-gradient(to top, ${b.color}cc, ${b.color}44)`,
                    boxShadow:        animate ? `0 0 12px ${b.color}55` : 'none',
                    transitionDelay:  b.delay,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Glow line */}
          <div className="h-px w-full rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #22D3EE55, #6366F155, transparent)' }} />
        </div>
      </div>

      {/* Floating status dot */}
      <div className="absolute -top-2 -right-2 flex items-center gap-1.5 rounded-full border border-green-400/30 px-2.5 py-1"
        style={{ background: 'rgba(34,197,94,.1)', backdropFilter: 'blur(8px)' }}>
        <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,.8)]" />
        <span className="text-[10px] font-[600] text-green-400">Live</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ROADMAP VISUAL — for Digital Transformation
───────────────────────────────────────────── */
function RoadmapVisual({ animate }) {
  const stages = ['Audit', 'Strategy', 'Build', 'Deploy', 'Scale']
  return (
    <div className="flex items-center gap-0 w-full max-w-sm">
      {stages.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-[700] transition-all duration-500 border"
              style={{
                transitionDelay:  `${i * 120}ms`,
                background:       animate && i < 3
                  ? 'linear-gradient(135deg, #6366F1, #22D3EE)'
                  : 'rgba(255,255,255,.06)',
                borderColor:      animate && i < 3
                  ? 'transparent'
                  : 'rgba(255,255,255,.1)',
                color:            animate && i < 3 ? '#fff' : 'rgba(148,163,184,.6)',
                boxShadow:        animate && i < 3 ? '0 0 16px rgba(34,211,238,.3)' : 'none',
                transform:        animate && i === 2 ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {i + 1}
            </div>
            <span className="text-[9px] text-slate-500 whitespace-nowrap">{s}</span>
          </div>
          {i < stages.length - 1 && (
            <div className="flex-1 h-px mx-0.5 mb-4 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,.06)', minWidth: 12 }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width:           animate && i < 2 ? '100%' : '0%',
                  background:      'linear-gradient(90deg, #6366F1, #22D3EE)',
                  transitionDelay: `${i * 150 + 200}ms`,
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MEDIUM CARD
───────────────────────────────────────────── */
function MediumCard({ icon, title, description, accentColor = '#22D3EE', animDelay = '0ms', visible }) {
  return (
    <div
      className="group relative rounded-[28px] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col p-7 cursor-default transition-all duration-300 hover:-translate-y-[10px]"
      style={{
        background:    'rgba(255,255,255,.04)',
        minHeight:     280,
        opacity:       visible ? 1 : 0,
        transform:     visible ? 'translateY(0)' : 'translateY(20px)',
        transition:    `opacity 600ms ${animDelay}, transform 600ms ${animDelay}, box-shadow 300ms, border-color 300ms`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accentColor}40`
        e.currentTarget.style.boxShadow   = `0 24px 60px ${accentColor}18`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* Icon */}
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 transition-all duration-300 group-hover:scale-110"
        style={{ background: `radial-gradient(circle at 35% 35%, ${accentColor}22, rgba(99,102,241,.1))`, color: accentColor }}
      >
        <div className="h-6 w-6">{icon}</div>
      </div>

      <h3 className="text-[17px] font-[700] text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed flex-1">{description}</p>

      {/* Arrow CTA */}
      <div
        className="mt-5 flex items-center gap-2 text-sm font-[500] transition-all duration-300 group-hover:gap-3"
        style={{ color: accentColor }}
      >
        <span>Learn more</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">{Icons.arrow}</span>
      </div>

      {/* Hover gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${accentColor}0d, transparent 60%)` }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 rounded-full"
        style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,211,238,.10) 0%, transparent 70%)', filter: 'blur(200px)' }} />
      <div className="pointer-events-none absolute -right-20 bottom-0 rounded-full"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,.10) 0%, transparent 70%)', filter: 'blur(200px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── HEADER ── */}
        <div
          className="mb-16 text-center max-w-[900px] mx-auto transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#22D3EE]">
            Our Services
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Solutions Designed For<br className="hidden sm:block" /> Modern Businesses
          </h2>
          <p className="mt-5 text-lg text-[#D1D9E8] max-w-[700px] mx-auto leading-relaxed">
            From product strategy to engineering and growth, we help businesses build scalable digital experiences.
          </p>
        </div>

        {/* ════════════════════════════════════════
            BENTO GRID
        ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">

          {/* ── ROW 1, COL 1–2: Featured — Web Development ── */}
          <div
            className="group relative lg:col-span-2 rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden cursor-default transition-all duration-300 hover:border-[#6366F1]/30"
            style={{
              background:   'linear-gradient(135deg, rgba(99,102,241,.08) 0%, rgba(255,255,255,.03) 50%, rgba(34,211,238,.05) 100%)',
              minHeight:    420,
              opacity:      visible ? 1 : 0,
              transform:    visible ? 'translateY(0)' : 'translateY(24px)',
              transition:   'opacity 600ms 0ms, transform 600ms 0ms, border-color 300ms, box-shadow 300ms',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 32px 80px rgba(99,102,241,.18)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Glow orb */}
            <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="relative z-10 h-full flex flex-col sm:flex-row gap-0">
              {/* Left — text */}
              <div className="flex flex-col justify-between p-8 sm:p-10 sm:w-1/2">
                <div>
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-[600] uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#6366F1]/30"
                    style={{ background: 'rgba(99,102,241,.1)', color: '#a78bfa' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                    Featured Service
                  </span>

                  <div className="mt-5 h-14 w-14 rounded-2xl flex items-center justify-center border border-white/8"
                    style={{ background: 'radial-gradient(circle at 35% 35%, rgba(99,102,241,.25), rgba(34,211,238,.1))', color: '#a78bfa' }}>
                    <div className="h-7 w-7">{Icons.web}</div>
                  </div>

                  <h3 className="mt-5 text-3xl font-[800] text-white leading-tight">
                    Web Development
                  </h3>
                  <p className="mt-3 text-[#D1D9E8]/80 leading-relaxed text-sm">
                    Full-stack applications built for scale, speed, and security. We architect, build, and ship production-grade products from the ground up.
                  </p>
                </div>

                {/* Mini stats */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { v: '500+', l: 'Projects' },
                    { v: '99.9%', l: 'Uptime' },
                    { v: '< 2wk', l: 'Kickoff' },
                  ].map(s => (
                    <div key={s.l} className="rounded-2xl border border-white/8 p-3 text-center"
                      style={{ background: 'rgba(255,255,255,.04)' }}>
                      <div className="text-lg font-[800] bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                        {s.v}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* CTA row */}
                <div className="mt-6 flex items-center gap-2 text-sm font-[500] text-[#a78bfa] transition-all duration-300 group-hover:gap-3">
                  <span>Explore Web Services</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{Icons.arrow}</span>
                </div>
              </div>

              {/* Right — dashboard visual */}
              <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-[280px]">
                  <DashboardVisual animate={visible} />
                </div>
              </div>
            </div>

            {/* Bottom shimmer */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,.4), rgba(34,211,238,.3), transparent)' }} />
          </div>

          {/* ── ROW 1, COL 3: Mobile Applications ── */}
          <div
            className="group relative rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col p-8 cursor-default transition-all duration-300 hover:-translate-y-[10px]"
            style={{
              background:  'rgba(255,255,255,.04)',
              minHeight:   420,
              opacity:     visible ? 1 : 0,
              transform:   visible ? 'translateY(0)' : 'translateY(24px)',
              transition:  'opacity 600ms 100ms, transform 600ms 100ms, box-shadow 300ms, border-color 300ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(34,211,238,.35)'
              e.currentTarget.style.boxShadow   = '0 28px 60px rgba(34,211,238,.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
              e.currentTarget.style.boxShadow   = 'none'
            }}
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />

            {/* Phone mockup */}
            <div className="relative z-10 flex justify-center mb-6">
              <div className="relative"
                style={{ width: 80, height: 140 }}>
                <div className="absolute inset-0 rounded-[18px] border-2 border-white/10"
                  style={{ background: 'rgba(255,255,255,.04)' }}>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,.15)' }} />
                  {/* App screen */}
                  <div className="absolute inset-x-2 top-6 bottom-2 rounded-[10px] overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,.2), rgba(34,211,238,.1))' }}>
                    <div className="flex flex-col gap-1.5 p-2">
                      {[70, 45, 90, 55].map((w, i) => (
                        <div key={i} className="rounded-full h-1.5"
                          style={{
                            width:      visible ? `${w}%` : '0%',
                            background: i % 2 === 0
                              ? 'linear-gradient(90deg, #6366F1, #22D3EE)'
                              : 'rgba(255,255,255,.15)',
                            transition: `width 700ms ${300 + i * 120}ms ease-out`,
                          }} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Glow dot */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full"
                  style={{ background: 'rgba(34,211,238,.2)', filter: 'blur(8px)' }} />
              </div>
            </div>

            <div className="relative z-10 flex flex-col flex-1">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center border border-white/8 mb-4"
                style={{ background: 'radial-gradient(circle at 35% 35%, rgba(34,211,238,.2), rgba(99,102,241,.1))', color: '#22D3EE' }}>
                <div className="h-6 w-6">{Icons.mobile}</div>
              </div>
              <h3 className="text-xl font-[700] text-white mb-2">Mobile Applications</h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1">
                Native and cross-platform mobile apps that drive engagement and deliver seamless user experiences.
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-[500] text-[#22D3EE] transition-all duration-300 group-hover:gap-3">
                <span>Learn more</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">{Icons.arrow}</span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(34,211,238,.07), transparent 60%)' }} />
          </div>

          {/* ── ROW 2: Three medium cards ── */}
          <MediumCard
            icon={Icons.design}
            title="UI/UX Design"
            description="Beautiful, intuitive interfaces that convert users into customers. Every pixel intentional, every flow purposeful."
            accentColor="#a78bfa"
            animDelay="200ms"
            visible={visible}
          />
          <MediumCard
            icon={Icons.ai}
            title="AI & Automation"
            description="Intelligent systems that automate workflows and surface insights — making your product smarter with every interaction."
            accentColor="#22D3EE"
            animDelay="300ms"
            visible={visible}
          />
          <MediumCard
            icon={Icons.cloud}
            title="Cloud & DevOps"
            description="Infrastructure automation and deployment pipelines for agility. Ship faster, scale confidently, recover instantly."
            accentColor="#6366F1"
            animDelay="400ms"
            visible={visible}
          />

          {/* ── ROW 3, COL 1–2: Digital Transformation ── */}
          <div
            className="group relative md:col-span-2 rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 p-8 cursor-default transition-all duration-300 hover:-translate-y-[6px]"
            style={{
              background:  'linear-gradient(135deg, rgba(34,211,238,.05) 0%, rgba(255,255,255,.03) 50%, rgba(99,102,241,.06) 100%)',
              opacity:     visible ? 1 : 0,
              transform:   visible ? 'translateY(0)' : 'translateY(20px)',
              transition:  'opacity 600ms 500ms, transform 600ms 500ms, box-shadow 300ms, border-color 300ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(34,211,238,.25)'
              e.currentTarget.style.boxShadow   = '0 24px 60px rgba(34,211,238,.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
              e.currentTarget.style.boxShadow   = 'none'
            }}
          >
            <div className="flex-1">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center border border-white/8 mb-4"
                style={{ background: 'radial-gradient(circle at 35% 35%, rgba(34,211,238,.2), rgba(99,102,241,.1))', color: '#22D3EE' }}>
                <div className="h-6 w-6">{Icons.transform}</div>
              </div>
              <h3 className="text-xl font-[700] text-white mb-2">Digital Transformation</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Modernize legacy systems and embrace digital-first strategies. We guide organizations through every stage of the transformation journey.
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-[500] text-[#22D3EE] transition-all duration-300 group-hover:gap-3">
                <span>Explore transformation</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">{Icons.arrow}</span>
              </div>
            </div>

            {/* Roadmap visual */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <RoadmapVisual animate={visible} />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(ellipse at bottom left, rgba(34,211,238,.06), transparent 60%)' }} />
          </div>

          {/* ── ROW 3, COL 3: CTA card ── */}
          <div
            className="group relative rounded-[32px] overflow-hidden flex flex-col justify-between p-8 cursor-pointer transition-all duration-300 hover:-translate-y-[6px]"
            style={{
              background:  'linear-gradient(135deg, #6366F1ee, #22D3EEdd)',
              opacity:     visible ? 1 : 0,
              transform:   visible ? 'translateY(0)' : 'translateY(20px)',
              transition:  'opacity 600ms 600ms, transform 600ms 600ms, box-shadow 300ms',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 32px 80px rgba(34,211,238,.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {/* Noise overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[.08]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-[700] uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Custom Project
              </div>
              <h3 className="text-2xl font-[800] text-white leading-tight">
                Need a Custom<br />Solution?
              </h3>
              <p className="mt-3 text-white/75 text-sm leading-relaxed">
                Let's discuss your business requirements and build something extraordinary together.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <span
                className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-2xl text-sm font-[700] transition-all duration-300 group-hover:gap-3"
                style={{ background: 'rgba(255,255,255,.18)', color: '#fff', backdropFilter: 'blur(8px)' }}
              >
                Schedule Consultation
                <span className="transition-transform duration-300 group-hover:translate-x-1">{Icons.arrow}</span>
              </span>
            </div>
          </div>

        </div>
        {/* end bento grid */}

      </div>
    </section>
  )
}
