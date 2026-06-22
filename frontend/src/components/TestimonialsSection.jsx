import React, { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const testimonials = [
  {
    name:    'Sarah Johnson',
    role:    'CEO',
    company: 'TechNova',
    initials:'SJ',
    from:    '#22D3EE',
    to:      '#6366F1',
    quote:   'The team transformed our concept into a polished product faster than we imagined. Their strategic insights and execution were genuinely top-tier — a partnership that felt like having a world-class in-house team.',
  },
  {
    name:    'Michael Chen',
    role:    'Product Director',
    company: 'FinEdge',
    initials:'MC',
    from:    '#6366F1',
    to:      '#a78bfa',
    quote:   'A highly professional partnership — beautiful UX, robust engineering, and clear communication throughout the build. They didn\'t just deliver a product; they delivered lasting confidence.',
  },
  {
    name:    'Emma Wilson',
    role:    'Founder',
    company: 'GrowthLabs',
    initials:'EW',
    from:    '#a78bfa',
    to:      '#22D3EE',
    quote:   'They delivered beyond every expectation we set. Post-launch metrics improved dramatically, thanks to their growth-focused approach and relentless attention to performance and detail.',
  },
  {
    name:    'James Park',
    role:    'CTO',
    company: 'Scaleway',
    initials:'JP',
    from:    '#22D3EE',
    to:      '#a78bfa',
    quote:   'Engineering excellence combined with product sensibility — rare to find both in one agency. Our platform handles 10× the traffic since the rebuild, with zero reliability incidents.',
  },
]

/* progress widths map to the stat values visually */
const stats = [
  { value: '98%',  label: 'Client Satisfaction', progress: 98,  delay: 0   },
  { value: '500+', label: 'Projects Delivered',   progress: 92,  delay: 100 },
  { value: '15+',  label: 'Industries Served',    progress: 75,  delay: 200 },
  { value: '4.9',  label: 'Average Rating',       progress: 98,  delay: 300 },
]

/* trust logo names — rendered as text marks (no external images needed) */
const trustLogos = [
  'Microsoft','Amazon','Stripe','Notion','Slack',
  'Shopify','Linear','Vercel','Figma','Atlassian',
]

/* social proof avatars — gradient pairs */
const avatarColors = [
  ['#22D3EE','#6366F1'],
  ['#6366F1','#a78bfa'],
  ['#a78bfa','#22D3EE'],
  ['#22D3EE','#a78bfa'],
  ['#6366F1','#22D3EE'],
]

/* ─────────────────────────────────────────────────────────
   STAR ROW
───────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-[18px] w-[18px]"
          viewBox="0 0 20 20" fill="#22D3EE" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   TRUST LOGO MARQUEE
───────────────────────────────────────────────────────── */
function TrustMarquee() {
  const [paused, setPaused] = useState(false)
  const doubled = [...trustLogos, ...trustLogos]   // seamless loop

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Trusted by"
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{ background: 'linear-gradient(90deg, #020617, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{ background: 'linear-gradient(-90deg, #020617, transparent)' }} />

      <div
        className="flex items-center gap-12"
        style={{
          width:     'max-content',
          animation: `marqueeScroll 28s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-sm font-[700] tracking-widest uppercase cursor-default transition-all duration-300 select-none whitespace-nowrap"
            style={{
              color:          'rgba(255,255,255,.35)',
              letterSpacing:  '.12em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color     = 'rgba(255,255,255,.9)'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color     = 'rgba(255,255,255,.35)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const [current,    setCurrent]    = useState(0)
  const [animState,  setAnimState]  = useState('visible')
  const [visible,    setVisible]    = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)
  const sectionRef = useRef(null)
  const timerRef   = useRef(null)

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* ── Slide transition ── */
  const goTo = useCallback((next) => {
    if (animState !== 'visible') return
    clearTimeout(timerRef.current)
    setAnimState('leaving')
    setTimeout(() => {
      setCurrent(next)
      setAnimState('entering')
      setTimeout(() => setAnimState('visible'), 420)
    }, 360)
  }, [animState])

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((current + 1) % testimonials.length)

  /* ── Auto-rotate testimonials every 5s ── */
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % testimonials.length)
    }, 5000)
    return () => clearTimeout(timerRef.current)
  }, [current, goTo])

  /* ── Cycle active metric every 3s ── */
  useEffect(() => {
    const t = setInterval(() => setActiveMetric(m => (m + 1) % stats.length), 3000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[current]

  const quoteStyle = {
    transition: 'opacity 360ms ease, transform 360ms ease',
    opacity:   animState === 'visible' ? 1 : 0,
    transform: animState === 'leaving'  ? 'translateY(-16px)' :
               animState === 'entering' ? 'translateY(16px)'  : 'translateY(0)',
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes avatarFloat {
          0%,100% { transform:translateY(0);   }
          50%      { transform:translateY(-8px);}
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes glowPulse {
          0%,100% { transform:translateY(0)   scale(1);    }
          50%      { transform:translateY(-16px) scale(1.02); }
        }
      `}</style>

      {/* ── Ambient glows — slow float ── */}
      <div className="pointer-events-none absolute rounded-full"
        style={{
          width:600, height:600, top:'-10%', left:'-8%',
          background:'radial-gradient(circle, rgba(34,211,238,.08) 0%, transparent 65%)',
          filter:'blur(220px)',
          animation:'glowPulse 12s ease-in-out infinite alternate',
        }} />
      <div className="pointer-events-none absolute rounded-full"
        style={{
          width:700, height:700, bottom:'-10%', right:'-8%',
          background:'radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 65%)',
          filter:'blur(240px)',
          animation:'glowPulse 12s ease-in-out 6s infinite alternate',
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ════════════════════════════════
            HEADER
        ════════════════════════════════ */}
        <div
          className="text-center max-w-[700px] mx-auto transition-all duration-700"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="text-sm font-[700] uppercase tracking-[0.35em] text-[#22D3EE]">
            Client Testimonials
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Trusted By Teams Building<br className="hidden sm:block" />
            Exceptional Products
          </h2>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            We partner with ambitious companies to design and build digital products
            that drive measurable results — from seed to scale.
          </p>
        </div>

        {/* ════════════════════════════════
            TRUST LOGO MARQUEE
        ════════════════════════════════ */}
        <div
          className="mt-14 mb-16 transition-all duration-700 delay-150"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {/* top divider */}
          <div className="h-px w-full mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent)' }} />
          <TrustMarquee />
          {/* bottom divider */}
          <div className="h-px w-full mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent)' }} />
        </div>

        {/* ════════════════════════════════
            MAIN 2-COLUMN GRID
        ════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">

          {/* ────────────────────────────
              LEFT — testimonial card
          ──────────────────────────── */}
          <div
            className="group relative rounded-[32px] border border-white/10 backdrop-blur-xl overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-[6px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.03) 100%)',
              boxShadow:  '0 20px 60px rgba(99,102,241,.15), inset 0 1px 0 rgba(255,255,255,.05)',
              minHeight:  420,
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 700ms 200ms, transform 700ms 200ms, box-shadow 300ms',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 32px 80px rgba(99,102,241,.24), inset 0 1px 0 rgba(255,255,255,.06)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 20px 60px rgba(99,102,241,.15), inset 0 1px 0 rgba(255,255,255,.05)'}
          >
            {/* Oversized quote mark — 140px, slight float */}
            <div
              aria-hidden
              className="pointer-events-none absolute select-none"
              style={{
                top:        12,
                right:      28,
                fontSize:   140,
                lineHeight: 1,
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                color:      'rgba(255,255,255,.05)',
                animation:  'avatarFloat 6s ease-in-out infinite',
              }}
            >
              "
            </div>
            {/* Glow behind quote mark */}
            <div className="pointer-events-none absolute top-0 right-0 rounded-full"
              style={{ width:300, height:300, background:'radial-gradient(circle at 70% 15%, rgba(34,211,238,.06), transparent 65%)', filter:'blur(40px)' }} />

            <div className="relative z-10 p-8 sm:p-10 flex flex-col gap-8">

              {/* Stars */}
              <div style={quoteStyle}>
                <Stars />
              </div>

              {/* Quote */}
              <div style={quoteStyle}>
                <blockquote
                  className="text-white font-[400] leading-[1.8]"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)', maxWidth:'90%' }}
                >
                  <span className="text-[#22D3EE] font-[800] mr-1" style={{ fontSize:'1.6em', lineHeight:0, verticalAlign:'-0.25em' }}>"</span>
                  {t.quote}
                  <span className="text-[#22D3EE] font-[800] ml-1" style={{ fontSize:'1.6em', lineHeight:0, verticalAlign:'-0.25em' }}>"</span>
                </blockquote>
              </div>

              {/* Author row + nav */}
              <div className="flex items-end justify-between gap-4 mt-auto">
                {/* Author */}
                <div style={quoteStyle} className="flex items-center gap-4">
                  {/* Avatar — gradient border + float */}
                  <div
                    className="flex-shrink-0 rounded-full p-[2.5px]"
                    style={{
                      background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                      boxShadow:  `0 0 24px ${t.from}44`,
                      animation:  'avatarFloat 6s ease-in-out infinite',
                      width: 80, height: 80,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-lg font-[800] text-white"
                      style={{ background: 'linear-gradient(135deg, rgba(7,16,36,.97), rgba(15,23,42,.93))' }}
                    >
                      {t.initials}
                    </div>
                  </div>

                  <div>
                    <p className="text-[16px] font-[700] text-white leading-tight">{t.name}</p>
                    <p className="text-[13px] text-slate-400 mt-1">{t.role}</p>
                    <p
                      className="text-[13px] font-[600] mt-0.5 bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent"
                    >
                      {t.company}
                    </p>
                  </div>
                </div>

                {/* Nav arrows — 48×48, glassmorphism */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="transition-all duration-200 hover:scale-105"
                    style={{
                      width:48, height:48,
                      borderRadius:'50%',
                      background:'rgba(255,255,255,.06)',
                      border:'1px solid rgba(255,255,255,.10)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'rgba(255,255,255,.6)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.12)'
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.06)'
                      e.currentTarget.style.color = 'rgba(255,255,255,.6)'
                    }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="transition-all duration-200 hover:scale-105"
                    style={{
                      width:48, height:48,
                      borderRadius:'50%',
                      background:'rgba(255,255,255,.06)',
                      border:'1px solid rgba(255,255,255,.10)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'rgba(255,255,255,.6)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.12)'
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.06)'
                      e.currentTarget.style.color = 'rgba(255,255,255,.6)'
                    }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-2.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      height:     8,
                      width:      i === current ? 40 : 8,
                      background: i === current
                        ? 'linear-gradient(90deg, #6366F1, #22D3EE)'
                        : 'rgba(255,255,255,.2)',
                      boxShadow:  i === current ? '0 0 14px rgba(34,211,238,.55)' : 'none',
                      opacity:    i === current ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* ────────────────────────────
              RIGHT — impact metrics
          ──────────────────────────── */}
          <div
            className="flex flex-col"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 700ms 300ms, transform 700ms 300ms',
            }}
          >
            {/* Panel label */}
            <p className="text-[11px] font-[700] uppercase tracking-[0.3em] text-slate-500 mb-2 pl-1">
              Impact Metrics
            </p>

            {stats.map((s, i) => {
              const isActive = i === activeMetric
              return (
                <div
                  key={s.label}
                  className="transition-all duration-500 cursor-default"
                  style={{
                    padding:         '24px 16px',
                    borderBottom:    '1px solid rgba(255,255,255,.08)',
                    opacity:         visible ? 1 : 0,
                    transform:       visible ? 'translateX(0)' : 'translateX(16px)',
                    transition:      `opacity 600ms ${s.delay}ms, transform 600ms ${s.delay}ms`,
                    scale:           isActive ? '1.03' : '1',
                    boxShadow:       isActive ? '0 0 24px rgba(34,211,238,.08)' : 'none',
                    borderRadius:    isActive ? 16 : 0,
                    background:      isActive ? 'rgba(34,211,238,.03)' : 'transparent',
                    transitionProperty: 'opacity, transform, scale, box-shadow, background, border-radius',
                    transitionDuration: isActive ? '400ms' : '400ms',
                  }}
                >
                  {/* Value */}
                  <div
                    className="font-[800] leading-none bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent"
                    style={{ fontSize: 48, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {s.value}
                  </div>

                  {/* Label */}
                  <p className="mt-2 text-[14px] font-[500] text-[#D1D9E8]">{s.label}</p>

                  {/* Mini progress bar */}
                  <div
                    className="mt-3 h-[6px] w-full rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,.06)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                      style={{
                        width:           visible ? `${s.progress}%` : '0%',
                        background:      'linear-gradient(90deg, #22D3EE, #6366F1)',
                        boxShadow:       isActive ? '0 0 12px rgba(34,211,238,.4)' : 'none',
                        transitionDelay: `${s.delay + 400}ms`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* ════════════════════════════════
            SOCIAL PROOF STRIP
        ════════════════════════════════ */}
        <div
          className="mt-16 flex flex-col items-center gap-4 transition-all duration-700 delay-[500ms]"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {/* Overlapping avatars */}
          <div className="flex items-center">
            {avatarColors.map(([from, to], i) => (
              <div
                key={i}
                className="rounded-full p-[2px] transition-transform duration-200 hover:scale-110 hover:z-10"
                style={{
                  background:  `linear-gradient(135deg, ${from}, ${to})`,
                  marginLeft:  i === 0 ? 0 : -12,
                  zIndex:      avatarColors.length - i,
                  position:    'relative',
                  width:       40,
                  height:      40,
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-[800] text-white"
                  style={{ background: 'linear-gradient(135deg, rgba(7,16,36,.95), rgba(15,23,42,.9))' }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              </div>
            ))}
            {/* +120 badge */}
            <div
              className="rounded-full flex items-center justify-center text-[11px] font-[800] border border-white/10"
              style={{
                width:       40,
                height:      40,
                marginLeft:  -12,
                zIndex:      0,
                background:  'rgba(255,255,255,.06)',
                color:       '#22D3EE',
                position:    'relative',
              }}
            >
              +120
            </div>
          </div>

          {/* Caption */}
          <div className="text-center">
            <p className="text-[15px] font-[600] text-white">+120 Happy Clients</p>
            <p className="text-[13px] text-slate-500 mt-1">
              Trusted by teams across 15+ industries worldwide
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
