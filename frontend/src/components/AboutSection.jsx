import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ImpactMatrix from './ImpactMatrix'

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 } },
}

const pillVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.5 + i * 0.1 },
  }),
}

const leftContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const valueBlockVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.45 + i * 0.12 },
  }),
}

/* ── Strength pills ── */
const pills = ['Strategy', 'Design', 'Engineering']

/* ── Value blocks ── */
const valueBlocks = [
  {
    label: 'Innovation',
    desc: 'Ideas become products',
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.12)',
    border: 'rgba(34,211,238,0.25)',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="#22D3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M10 2a6 6 0 016 6c0 2.5-1.5 4.5-3.5 5.5V15a1 1 0 01-1 1H8.5a1 1 0 01-1-1v-1.5C5.5 12.5 4 10.5 4 8a6 6 0 016-6z" />
        <path d="M8 18h4" />
      </svg>
    ),
  },
  {
    label: 'Engineering',
    desc: 'Built to scale, built to last',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.25)',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="#6366F1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M13 3L9 7l4 4M7 3l4 4-4 4" />
        <rect x="2" y="2" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    label: 'Growth',
    desc: 'Measured by client outcomes',
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.12)',
    border: 'rgba(167,139,250,0.25)',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <polyline points="2 14 7 9 11 13 18 5" />
        <path d="M14 5h4v4" />
      </svg>
    ),
  },
]

/* ── Code bar decorative lines ── */
const codeBars = [
  { width: '72%', color: '#22D3EE' },
  { width: '50%', color: '#6366F1' },
  { width: '85%', color: '#A78BFA' },
  { width: '38%', color: '#22D3EE' },
  { width: '61%', color: '#F472B6' },
  { width: '45%', color: '#6366F1' },
  { width: '78%', color: '#A78BFA' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* ── PART A: Two-column story ── */}
      <div className="relative py-32">
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">

            {/* ── LEFT COLUMN ── */}
            <motion.div
              variants={leftContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-col gap-6"
            >
              {/* Label */}
              <motion.span variants={fadeUp} className="text-sm font-semibold tracking-[0.35em] uppercase text-[#22D3EE]">
                About Us
              </motion.span>

              {/* Heading */}
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                About Jigyasa{' '}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                  Technologies
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p variants={fadeUp} className="text-lg text-[#D1D9E8] leading-relaxed">
                We help organizations transform ideas into scalable digital products through strategy, design, and engineering.
              </motion.p>

              {/* Body paragraphs */}
              <motion.p variants={fadeUp} className="text-[#D1D9E8]/80 leading-relaxed">
                Founded on the belief that great software changes businesses, Jigyasa Technologies partners with startups and enterprises alike to craft digital experiences that are fast, accessible, and built to last. From the first whiteboard sketch to production deployment, we're with you at every step — combining deep technical expertise with a genuine care for the outcomes you need.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#D1D9E8]/80 leading-relaxed">
                Our cross-functional teams bring together product strategists, UX designers, and full-stack engineers under one roof. We work in tight iterations, ship with confidence, and measure success by the growth our clients achieve — not just the code we deliver.
              </motion.p>

              {/* Strength pills */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-1">
                {pills.map((pill, i) => (
                  <motion.span
                    key={pill}
                    custom={i}
                    variants={pillVariant}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="px-5 py-2 rounded-full text-sm font-semibold bg-white/5 border border-white/10 backdrop-blur-xl text-slate-200"
                    style={{
                      boxShadow: '0 2px 12px 0 rgba(34,211,238,0.06)',
                    }}
                  >
                    {pill}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(34,211,238,0.2)]"
                >
                  Learn More
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
                >
                  Our Process
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN — Visual composition panel ── */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="relative"
            >
              {/* Floating accent dots */}
              <div className="pointer-events-none absolute -top-5 -right-5 h-9 w-9 rounded-full bg-cyan-400 blur-xl opacity-40" />
              <div className="pointer-events-none absolute -bottom-5 -left-5 h-9 w-9 rounded-full bg-indigo-500 blur-xl opacity-30" />

              {/* Card outer glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 blur-2xl scale-105" />

              <div
                className="relative rounded-[32px] bg-white/[0.06] border border-white/10 backdrop-blur-xl p-8 sm:p-10"
                style={{ boxShadow: '0 24px 60px rgba(99,102,241,0.10)' }}
              >
                {/* Value blocks */}
                <div className="flex flex-col gap-5 mb-8">
                  {valueBlocks.map((block, i) => (
                    <motion.div
                      key={block.label}
                      custom={i}
                      variants={valueBlockVariant}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      className="flex items-center gap-4"
                    >
                      {/* Icon box */}
                      <div
                        className="flex-shrink-0 h-[28px] w-[28px] rounded-xl flex items-center justify-center"
                        style={{ background: block.bg, border: `1px solid ${block.border}` }}
                      >
                        {block.icon}
                      </div>
                      {/* Text */}
                      <div>
                        <div className="text-sm font-bold text-white">{block.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{block.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative code snippet visual */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {codeBars.map((bar, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-1 w-4 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: bar.width,
                            background: `linear-gradient(90deg, ${bar.color}99, ${bar.color}44)`,
                            opacity: 0.75,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── PART B: ImpactMatrix full-width ── */}
      <ImpactMatrix />
    </section>
  )
}
