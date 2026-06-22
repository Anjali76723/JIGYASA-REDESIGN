import React from 'react'

const features = [
  {
    key: 'expertise',
    title: 'Proven Expertise',
    desc: '500+ successful digital projects delivered worldwide',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'team',
    title: 'Dedicated Team',
    desc: 'Experienced designers, developers and strategists',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05C15.7 13.7 16 14.32 16 15v1h4v-1c0-2.33-4.67-3.5-4-3.5z" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'agile',
    title: 'Agile Delivery',
    desc: 'Fast development cycles with transparent communication',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h3l3 6 4-12 3 6h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'partnership',
    title: 'Long-Term Partnership',
    desc: 'Ongoing support, optimization and growth services',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M21 8V7a2 2 0 00-2-2h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16v1a2 2 0 002 2h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 8v8M17 8v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative py-16" style={{ backgroundColor: '#020617' }}>
      {/* Animated background glows */}
      <div className="pointer-events-none absolute -left-24 -top-8 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 -bottom-16 h-80 w-80 rounded-full bg-gradient-to-bl from-indigo-600/10 to-cyan-400/8 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-sm font-semibold text-cyan-300/90 tracking-widest">WHY CHOOSE US</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Delivering Results That Matter</h2>
          <p className="mt-4 text-lg text-slate-300">We combine domain expertise, design excellence, and engineering discipline to deliver products that drive measurable growth.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <article key={f.key} className="group relative rounded-[24px] p-6 bg-white/3 backdrop-blur-md border border-white/6 transition-transform transform hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(34,211,238,0.06)]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white/5 ring-1 ring-white/8 grid place-items-center">{f.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[24px]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }} />
            </article>
          ))}
        </div>

        {/* Statistics row */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-lg p-6 bg-white/3 backdrop-blur-md border border-white/6 text-center">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">500+</div>
            <div className="mt-2 text-sm text-slate-300">Projects Delivered</div>
          </div>
          <div className="rounded-lg p-6 bg-white/3 backdrop-blur-md border border-white/6 text-center">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">98%</div>
            <div className="mt-2 text-sm text-slate-300">Client Satisfaction</div>
          </div>
          <div className="rounded-lg p-6 bg-white/3 backdrop-blur-md border border-white/6 text-center">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">50+</div>
            <div className="mt-2 text-sm text-slate-300">Experts</div>
          </div>
          <div className="rounded-lg p-6 bg-white/3 backdrop-blur-md border border-white/6 text-center">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">10+</div>
            <div className="mt-2 text-sm text-slate-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
