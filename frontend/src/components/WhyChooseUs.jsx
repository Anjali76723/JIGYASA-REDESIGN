import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Journey steps data ── */
const steps = [
  {
    id: '01',
    title: 'Proven Expertise',
    desc: '500+ successful digital projects delivered worldwide',
    accent: '#22D3EE',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Dedicated Team',
    desc: 'Experienced designers, developers and strategists',
    accent: '#6366F1',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Agile Delivery',
    desc: 'Fast development cycles with transparent communication',
    accent: '#A78BFA',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M3 12h3l3 6 4-12 3 6h4" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Long-Term Partnership',
    desc: 'Ongoing support, optimization and growth services',
    accent: '#FBBF24',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 8c-3 0-5 1.5-5 4s2 4 5 4 5-1.5 5-4-2-4-5-4z" />
        <path d="M7 12h10" />
      </svg>
    ),
  },
]

/* ── Animated connecting SVG lines (desktop only) ── */
function ConnectingLine({ fromAccent, toAccent, index }) {
  const id = `line-grad-${index}`
  return (
    <div
      className="hidden lg:flex justify-center items-center w-full"
      style={{ height: 56, position: 'relative' }}
      aria-hidden="true"
    >
      <svg
        width="320"
        height="56"
        viewBox="0 0 320 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromAccent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={toAccent} stopOpacity="0.35" />
          </linearGradient>
          <style>{`
            @keyframes drawLine${index} {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes travelDot${index} {
              0%   { offset-distance: 0%;   opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
          `}</style>
        </defs>
        {/* Curved bezier path */}
        <path
          id={`path-${index}`}
          d="M 0 0 C 80 0, 240 56, 320 56"
          stroke={`url(#${id})`}
          strokeWidth="1.5"
          strokeDasharray="400"
          style={{
            animation: `drawLine${index} 1.2s ease forwards`,
            animationDelay: `${0.3 + index * 0.2}s`,
            strokeDashoffset: 400,
          }}
        />
        {/* Travelling dot */}
        <circle
          r="4"
          fill={fromAccent}
          style={{
            offsetPath: `path("M 0 0 C 80 0, 240 56, 320 56")`,
            animation: `travelDot${index} 2.4s ease-in-out infinite`,
            animationDelay: `${0.5 + index * 0.2}s`,
          }}
        />
      </svg>
    </div>
  )
}

/* ── Journey card ── */
function JourneyCard({ step, index, inView }) {
  const isRight = index % 2 === 1

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut', delay: index * 0.2 },
    },
  }

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`relative rounded-[24px] backdrop-blur-xl p-7 flex flex-col gap-5 ${
        isRight ? 'lg:ml-auto' : 'lg:mr-auto'
      }`}
      style={{
        background: `linear-gradient(135deg, ${step.accent}14 0%, transparent 70%)`,
        border: `1px solid ${step.accent}33`,
        maxWidth: '480px',
        width: '100%',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${step.accent}99`
        e.currentTarget.style.boxShadow = `0 16px 48px 0 ${step.accent}33`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${step.accent}33`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Decorative step number */}
      <div
        className="absolute top-4 right-5 text-6xl font-black leading-none select-none"
        style={{
          background: `linear-gradient(135deg, ${step.accent}, transparent)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.18,
        }}
      >
        {step.id}
      </div>

      {/* Icon box */}
      <div
        className="h-[52px] w-[52px] rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${step.accent}33, transparent)`,
          border: `1px solid ${step.accent}44`,
          color: step.accent,
        }}
      >
        {step.icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

/* ── Main Component ── */
export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -left-24 -top-8 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 to-indigo-500/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-8 -bottom-16 h-96 w-96 rounded-full bg-gradient-to-bl from-indigo-600/10 to-cyan-400/6 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-sm font-semibold tracking-[0.35em] uppercase text-[#22D3EE]">
            Why Choose Us
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            From Idea to{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
              Long-Term Success
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            We combine domain expertise, design excellence, and engineering discipline to deliver products that drive measurable growth.
          </p>
        </motion.div>

        {/* Journey flow — alternating zigzag on desktop, single column on mobile */}
        <div className="flex flex-col gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Card with zigzag offset via padding */}
              <div
                className={`w-full flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <JourneyCard step={step} index={index} inView={inView} />
              </div>

              {/* Connecting line between cards (not after last) */}
              {index < steps.length - 1 && (
                <ConnectingLine
                  fromAccent={step.accent}
                  toAccent={steps[index + 1].accent}
                  index={index}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
