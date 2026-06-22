import React from 'react'

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Experts' },
  { value: '10+', label: 'Years Experience' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* ── LEFT SIDE ── */}
          <div className="flex flex-col gap-6">
            {/* Label */}
            <span className="text-sm font-semibold tracking-[0.35em] uppercase text-[#22D3EE]">
              About Us
            </span>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              About Jigyasa{' '}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-[#D1D9E8] leading-relaxed">
              We help organizations transform ideas into scalable digital products through strategy, design, and engineering.
            </p>

            {/* Body copy */}
            <p className="text-[#D1D9E8]/80 leading-relaxed">
              Founded on the belief that great software changes businesses, Jigyasa Technologies partners with startups and enterprises alike to craft digital experiences that are fast, accessible, and built to last. From the first whiteboard sketch to production deployment, we're with you at every step — combining deep technical expertise with a genuine care for the outcomes you need.
            </p>
            <p className="text-[#D1D9E8]/80 leading-relaxed">
              Our cross-functional teams bring together product strategists, UX designers, and full-stack engineers under one roof. We work in tight iterations, ship with confidence, and measure success by the growth our clients achieve — not just the code we deliver.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
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
            </div>
          </div>

          {/* ── RIGHT SIDE — Stats Card ── */}
          <div className="relative">
            {/* Card glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 blur-2xl scale-105" />

            <div className="relative rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-[0_24px_60px_rgba(99,102,241,0.1)]">
              {/* Card heading */}
              <div className="mb-8">
                <p className="text-sm font-semibold tracking-widest text-cyan-300/80 uppercase">
                  Our Impact
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Numbers That Speak
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Results built through consistency, craftsmanship, and deep client partnerships.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="relative rounded-[20px] bg-white/5 border border-white/8 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(34,211,238,0.08)]"
                  >
                    {/* subtle glow per card */}
                    <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br from-cyan-400/5 to-indigo-500/5" />
                    <div className="relative z-10">
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                        {s.value}
                      </div>
                      <div className="mt-2 text-sm text-slate-300">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative bottom strip */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="mt-4 text-xs text-center text-slate-500">
                Trusted by startups and enterprises worldwide
              </p>

              {/* Floating accent dots */}
              <div className="pointer-events-none absolute -top-4 -right-4 h-8 w-8 rounded-full bg-cyan-400 blur-xl opacity-40" />
              <div className="pointer-events-none absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-indigo-500 blur-xl opacity-30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
