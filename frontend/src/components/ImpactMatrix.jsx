import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Count-up hook ── */
function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let startTime = null
    const numeric = parseInt(String(target).replace(/\D/g, ''), 10)
    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numeric))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return count
}

/* ── Tile component ── */
function MetricTile({ metric, index, inView }) {
  const count = useCountUp(metric.numericValue, inView)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden"
      style={{
        '--accent': metric.accent,
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = metric.accent + '66'
        e.currentTarget.style.boxShadow = `0 16px 48px 0 ${metric.accent}22`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
        e.currentTarget.style.boxShadow = '0 4px 32px 0 rgba(0,0,0,0.18)'
      }}
    >
      {/* Top accent gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-[28px]"
        style={{ background: `linear-gradient(90deg, transparent, ${metric.accent}99, transparent)` }}
      />

      {/* Background gradient blob */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 rounded-[28px]"
        style={{
          background: `radial-gradient(ellipse at top left, ${metric.accent}33 0%, transparent 60%)`,
        }}
      />

      {/* Decorative icon */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div
          className="h-10 w-10 rounded-xl flex items-center justify-center"
          style={{ background: `${metric.accent}18`, border: `1px solid ${metric.accent}33` }}
        >
          {metric.icon}
        </div>
      </div>

      {/* Count number */}
      <div className="relative z-10">
        <div
          className="font-extrabold leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            background: metric.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count}
          {metric.suffix}
        </div>
        <div className="mt-3 text-base font-medium text-slate-300">{metric.label}</div>
      </div>
    </motion.div>
  )
}

/* ── Ambient floating particles ── */
function Particles() {
  const particles = [
    { cx: '12%', cy: '18%', r: 2.5, dur: '6s', delay: '0s' },
    { cx: '85%', cy: '12%', r: 1.8, dur: '8s', delay: '1s' },
    { cx: '72%', cy: '78%', r: 3.0, dur: '7s', delay: '2s' },
    { cx: '28%', cy: '85%', r: 2.0, dur: '9s', delay: '0.5s' },
    { cx: '55%', cy: '22%', r: 1.5, dur: '5s', delay: '3s' },
    { cx: '90%', cy: '55%', r: 2.2, dur: '10s', delay: '1.5s' },
    { cx: '10%', cy: '60%', r: 1.6, dur: '7.5s', delay: '2.5s' },
    { cx: '40%', cy: '5%', r: 2.0, dur: '6.5s', delay: '4s' },
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ opacity: 0.25 }}
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes floatParticle {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
            50% { transform: translateY(-18px) scale(1.15); opacity: 1; }
          }
        `}</style>
      </defs>
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="#22D3EE"
          style={{
            animation: `floatParticle ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </svg>
  )
}

/* ── Metrics data ── */
const metrics = [
  {
    id: 'projects',
    numericValue: 500,
    suffix: '+',
    label: 'Projects Delivered',
    accent: '#22D3EE',
    gradient: 'linear-gradient(135deg, #22D3EE, #67E8F9)',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="2" y="3" width="18" height="14" rx="2" />
        <path d="M8 21l4-4 4 4" />
        <path d="M7 8h8M7 11h5" />
      </svg>
    ),
  },
  {
    id: 'satisfaction',
    numericValue: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    accent: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="11" cy="11" r="9" />
        <path d="M7.5 13s1 2 3.5 2 3.5-2 3.5-2" />
        <circle cx="8" cy="9" r="1" fill="#6366F1" />
        <circle cx="14" cy="9" r="1" fill="#6366F1" />
      </svg>
    ),
  },
  {
    id: 'experts',
    numericValue: 50,
    suffix: '+',
    label: 'Experts',
    accent: '#A78BFA',
    gradient: 'linear-gradient(135deg, #A78BFA, #C4B5FD)',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="11" cy="7" r="4" />
        <path d="M3 19c0-3.3 3.6-6 8-6s8 2.7 8 6" />
      </svg>
    ),
  },
  {
    id: 'experience',
    numericValue: 10,
    suffix: '+',
    label: 'Years Experience',
    accent: '#F472B6',
    gradient: 'linear-gradient(135deg, #F472B6, #FBBF24)',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="11" cy="11" r="9" />
        <path d="M11 6v5l3 3" />
      </svg>
    ),
  },
]

/* ── Main Component ── */
export default function ImpactMatrix() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-600/12 blur-[140px]" />

      {/* Floating particles */}
      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold tracking-[0.35em] uppercase text-[#22D3EE]">
            Our Impact
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Numbers That{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
              Define Us
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Results built through consistency, craftsmanship, and deep client partnerships over a decade.
          </p>
        </motion.div>

        {/* Asymmetric bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Top row: large tile (col-span-2 on lg) + tall tile */}
          <div className="lg:col-span-2">
            <MetricTile metric={metrics[0]} index={0} inView={inView} />
          </div>
          <div className="row-span-2 hidden lg:block">
            <MetricTile metric={metrics[1]} index={1} inView={inView} />
          </div>
          {/* satisfaction visible on mobile/tablet */}
          <div className="lg:hidden">
            <MetricTile metric={metrics[1]} index={1} inView={inView} />
          </div>

          {/* Bottom row */}
          <div>
            <MetricTile metric={metrics[2]} index={2} inView={inView} />
          </div>
          <div className="lg:col-span-1">
            <MetricTile metric={metrics[3]} index={3} inView={inView} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
