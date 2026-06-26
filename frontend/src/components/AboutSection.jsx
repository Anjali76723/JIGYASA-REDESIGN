import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ImpactMatrix from './ImpactMatrix'
import SoftwareArchitectureMap from './SoftwareArchitectureMap'

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

/* ── Strength pills ── */
const pills = ['Strategy', 'Design', 'Engineering']

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
                <Link
                  to="/learn-more"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(34,211,238,0.2)]"
                >
                  Learn More
                </Link>
                <a
                  href="#process"
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
                >
                  Our Process
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN — Software Architecture Map ── */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="relative flex items-center justify-center"
              style={{ minHeight: 720 }}
            >
              <SoftwareArchitectureMap inView={inView} />
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── PART B: ImpactMatrix full-width ── */}
      <ImpactMatrix />
    </section>
  )
}
