import React, { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const steps = [
  {
    id: '01',
    title: 'Discovery',
    shortTitle: 'Discovery',
    progress: 25,
    description:
      'Understand business goals, users, pain points, and opportunities. We map the full landscape before writing a single line of code.',
    tags: ['User Research', 'Goal Mapping', 'Competitor Audit', 'Opportunity Framing'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Strategy & Design',
    shortTitle: 'Strategy',
    progress: 50,
    description:
      'Create wireframes, UX flows, user journeys, and system architecture. Every pixel and interaction is intentional.',
    tags: ['Wireframes', 'UX Flows', 'System Architecture', 'Visual Design'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Development',
    shortTitle: 'Build',
    progress: 75,
    description:
      'Build scalable applications using modern technologies and best practices — clean, tested, and production-ready.',
    tags: ['Full-Stack Dev', 'API Integration', 'QA & Testing', 'Performance'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Launch & Growth',
    shortTitle: 'Launch',
    progress: 100,
    description:
      'Deploy, optimize, monitor, and continuously improve product performance. We stay with you through scale.',
    tags: ['CI/CD Deploy', 'Monitoring', 'Analytics', 'Growth Ops'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function ProcessSection() {
  const [active,    setActive]    = useState(0)
  const [visible,   setVisible]   = useState(false)
  const [hovered,   setHovered]   = useState(null)
  const sectionRef = useRef(null)

  /* reveal on scroll */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* auto-advance active step */
  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => setActive(a => (a + 1) % steps.length), 3000)
    return () => clearInterval(t)
  }, [visible])

  const displayStep = hovered !== null ? hovered : active

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden py-32"
      style={{ backgroundColor: '#020617' }}
    >
      {/* ── Background glows ── */}
      <div className="pointer-events-none absolute -left-20 -top-20 rounded-full"
        style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,211,238,.08) 0%, transparent 70%)', filter: 'blur(180px)' }} />
      <div className="pointer-events-none absolute -right-20 bottom-0 rounded-full"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%)', filter: 'blur(200px)' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(99,102,241,.05) 0%, rgba(34,211,238,.03) 50%, transparent 70%)', filter: 'blur(250px)' }} />

      {/* ── Scrolling keyframe styles ── */}
      <style>{`
        @keyframes pipelineFlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes pulsRing {
          0%   { transform: scale(1);    opacity: .6; }
          100% { transform: scale(1.18); opacity: 0;  }
        }
        .pipeline-flow {
          background: linear-gradient(90deg, #22D3EE, #6366F1, #22D3EE);
          background-size: 200% 100%;
          animation: pipelineFlow 8s linear infinite;
        }
        .pulse-ring {
          animation: pulsRing 2.5s ease-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ══ HEADER ══ */}
        <div
          className="text-center max-w-[800px] mx-auto transition-all duration-700"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#22D3EE]">
            Our Process
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            How We Transform Ideas<br className="hidden sm:block" /> Into Digital Products
          </h2>
          <p className="mt-5 text-lg text-slate-400 leading-relaxed">
            We blend strategy, design, and engineering to transform ideas into scalable products users love and businesses trust.
          </p>
        </div>

        {/* ══ TIMELINE — desktop ══ */}
        <div
          className="relative mt-20 hidden lg:block transition-all duration-700 delay-100"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? 'scaleX(1)' : 'scaleX(.9)',
            transformOrigin: 'center',
          }}
        >
          {/* Track */}
          <div className="absolute top-12 left-[6.25%] right-[6.25%] h-[6px] rounded-[999px]"
            style={{ background: 'rgba(255,255,255,.04)' }}>
            {/* Animated fill */}
            <div className="absolute inset-0 rounded-[999px] overflow-hidden">
              <div className="h-full w-full pipeline-flow rounded-[999px]"
                style={{ boxShadow: '0 0 20px rgba(34,211,238,.2)' }} />
            </div>
          </div>

          {/* Nodes row */}
          <div className="relative grid grid-cols-4">
            {steps.map((s, i) => {
              const isActive  = i === displayStep
              const isPast    = i < displayStep
              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-5 cursor-pointer"
                  style={{
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 500ms ${100 + i * 100}ms, transform 500ms ${100 + i * 100}ms`,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => { setActive(i); setHovered(null) }}
                >
                  {/* Node wrapper — holds ring + circle */}
                  <div className="relative flex items-center justify-center">
                    {/* Pulse ring — active only */}
                    {isActive && (
                      <span
                        className="pulse-ring absolute rounded-full border border-cyan-400/40"
                        style={{ width: 104, height: 104 }}
                      />
                    )}

                    {/* Node circle */}
                    <div
                      className="relative flex flex-col items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        width:         96,
                        height:        96,
                        background:    isActive
                          ? 'radial-gradient(circle at 35% 35%, rgba(34,211,238,.12), rgba(99,102,241,.08))'
                          : 'rgba(255,255,255,.05)',
                        border:        isActive
                          ? '1px solid rgba(34,211,238,.3)'
                          : '1px solid rgba(255,255,255,.08)',
                        backdropFilter: 'blur(16px)',
                        boxShadow:      isActive
                          ? '0 0 40px rgba(34,211,238,.35), inset 0 1px 0 rgba(255,255,255,.06)'
                          : isPast
                          ? '0 0 20px rgba(99,102,241,.2)'
                          : 'none',
                        transform:     isActive ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      {/* Step number */}
                      <span
                        className="text-xl font-[900] leading-none bg-gradient-to-br from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent"
                      >
                        {s.id}
                      </span>
                      {/* Icon */}
                      <span
                        className="mt-1 transition-colors duration-300"
                        style={{ color: isActive ? '#22D3EE' : 'rgba(148,163,184,.7)' }}
                      >
                        {s.icon}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <p
                      className="text-[15px] font-[600] transition-colors duration-300"
                      style={{ color: isActive ? '#fff' : 'rgba(148,163,184,.8)' }}
                    >
                      {s.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ══ PIPELINE PANEL ══ */}
        <div
          className="mt-10 lg:mt-12 rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-700 delay-200"
          style={{
            background: 'rgba(255,255,255,.03)',
            padding:    '40px',
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Pipeline progress bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {steps.map((s, i) => {
              const isActive = i === displayStep
              const isPast   = i < displayStep
              const fill     = isActive || isPast ? s.progress : 0
              return (
                <div
                  key={s.id}
                  className="flex flex-col gap-2 cursor-pointer group"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => { setActive(i); setHovered(null) }}
                >
                  {/* Bar label row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[13px] font-[600] uppercase tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? '#22D3EE' : 'rgba(148,163,184,.6)' }}
                    >
                      {s.shortTitle}
                    </span>
                    <span
                      className="text-[12px] font-[700] tabular-nums transition-colors duration-300"
                      style={{ color: isActive ? '#fff' : 'rgba(148,163,184,.5)' }}
                    >
                      {fill}%
                    </span>
                  </div>

                  {/* Bar track */}
                  <div
                    className="relative h-[10px] w-full rounded-[999px] overflow-hidden"
                    style={{ background: 'rgba(255,255,255,.05)' }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-[999px] transition-all duration-700"
                      style={{
                        width:      visible ? `${fill}%` : '0%',
                        background: 'linear-gradient(90deg, #22D3EE, #6366F1)',
                        boxShadow:  isActive ? '0 0 20px rgba(34,211,238,.25)' : 'none',
                        transitionDelay: `${200 + i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-px w-full mb-8" style={{ background: 'rgba(255,255,255,.06)' }} />

          {/* ── Active content panel ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
            {/* Big step badge */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-[24px] p-6 border border-white/8 self-start"
              style={{
                background: 'radial-gradient(circle at 40% 40%, rgba(34,211,238,.08), rgba(99,102,241,.06))',
                minWidth: 120,
              }}
            >
              <span className="text-4xl font-[900] bg-gradient-to-br from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent leading-none">
                {steps[displayStep].id}
              </span>
              <span className="mt-3 text-[#22D3EE]">{steps[displayStep].icon}</span>
            </div>

            {/* Text + tags */}
            <div
              key={displayStep}
              style={{
                animation: 'contentReveal 300ms ease-out both',
              }}
            >
              <style>{`
                @keyframes contentReveal {
                  from { opacity: 0; transform: translateY(10px); }
                  to   { opacity: 1; transform: translateY(0);    }
                }
              `}</style>

              <h3 className="text-2xl font-[700] text-white mb-2">
                {steps[displayStep].title}
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-2xl mb-5">
                {steps[displayStep].description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {steps[displayStep].tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[13px] font-[500] px-4 py-1.5 rounded-[999px] border border-white/8"
                    style={{ background: 'rgba(255,255,255,.05)', color: 'rgba(203,213,225,.85)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step dots navigator */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to step ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width:      i === displayStep ? 28 : 8,
                  height:     8,
                  background: i === displayStep
                    ? 'linear-gradient(90deg, #22D3EE, #6366F1)'
                    : 'rgba(255,255,255,.12)',
                  boxShadow:  i === displayStep ? '0 0 12px rgba(34,211,238,.4)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* ══ MOBILE VERTICAL TIMELINE ══ */}
        <div className="mt-12 flex flex-col gap-0 lg:hidden">
          {steps.map((s, i) => {
            const isActive = i === displayStep
            const isLast   = i === steps.length - 1
            return (
              <div
                key={s.id}
                className="flex gap-5 cursor-pointer"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 500ms ${i * 120}ms, transform 500ms ${i * 120}ms`,
                }}
                onClick={() => setActive(i)}
              >
                {/* Left — node + line */}
                <div className="flex flex-col items-center">
                  {/* Node */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width:         56,
                      height:        56,
                      background:    isActive
                        ? 'radial-gradient(circle, rgba(34,211,238,.15), rgba(99,102,241,.1))'
                        : 'rgba(255,255,255,.05)',
                      border:        isActive
                        ? '1px solid rgba(34,211,238,.35)'
                        : '1px solid rgba(255,255,255,.08)',
                      boxShadow:     isActive ? '0 0 30px rgba(34,211,238,.3)' : 'none',
                      transform:     isActive ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <span className="text-sm font-[900] bg-gradient-to-br from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                      {s.id}
                    </span>
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex-1 w-px my-1 rounded-full overflow-hidden" style={{ minHeight: 40 }}>
                      <div
                        className="w-full h-full pipeline-flow"
                        style={{ opacity: isActive ? .8 : .15 }}
                      />
                    </div>
                  )}
                </div>

                {/* Right — content */}
                <div className="pb-8 flex-1">
                  <h3
                    className="text-lg font-[700] transition-colors duration-300"
                    style={{ color: isActive ? '#fff' : 'rgba(148,163,184,.8)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                  {isActive && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[12px] font-[500] px-3 py-1 rounded-[999px] border border-white/8"
                          style={{ background: 'rgba(255,255,255,.05)', color: 'rgba(203,213,225,.8)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
