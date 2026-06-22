import React from 'react'

const steps = [
  {
    id: '01',
    title: 'Discovery',
    desc: 'Understand business goals, users, and requirements',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 11c1.8-2 4-3 7-3s5.2 1 7 3v6H5v-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Strategy & Design',
    desc: 'Create wireframes, UX flows, and visual designs',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M3 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Development',
    desc: 'Build scalable applications using modern technologies',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Launch & Growth',
    desc: 'Deploy, monitor, optimize, and scale products',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden py-16" style={{ backgroundColor: '#020617' }}>
      {/* Floating gradients */}
      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-gradient-to-bl from-indigo-600/10 to-cyan-400/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-sm font-semibold text-cyan-300/90 tracking-widest">OUR PROCESS</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">How We Transform Ideas Into Digital Products</h2>
          <p className="mt-4 text-lg text-slate-300">We blend strategy, design, and engineering to craft products that users love and businesses trust—moving from discovery to launch with measurable outcomes.</p>
        </div>

        {/* Grid for mobile & tablet */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
          {steps.map((s) => (
            <article key={s.id} className="group relative bg-white/3 backdrop-blur-md border border-white/6 rounded-2xl p-6 transition transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.06)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/4 ring-1 ring-white/6">{s.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{s.title}</div>
                  <div className="mt-1 text-sm text-slate-300">{s.desc}</div>
                </div>
                <div className="ml-auto">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">{s.id}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop row with connectors */}
        <div className="hidden lg:flex items-start mt-10 relative">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <article className="group relative flex-1 bg-white/4 backdrop-blur-md border border-white/6 rounded-2xl p-8 mx-3 transition transform hover:-translate-y-3 hover:shadow-[0_28px_60px_rgba(34,211,238,0.08)]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-lg bg-white/5 ring-1 ring-white/8 grid place-items-center">{s.icon}</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                      <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">{s.id}</div>
                    </div>
                    <p className="mt-3 text-slate-300">{s.desc}</p>
                  </div>
                </div>

                {/* subtle bottom glow */}
                <div className="pointer-events-none absolute inset-x-6 bottom-4 h-1 rounded-full bg-gradient-to-r from-cyan-400/10 via-transparent to-indigo-500/8 opacity-80" />
              </article>

              {/* connector between cards (not after last) */}
              {i !== steps.length - 1 && (
                <div className="flex items-center flex-col justify-center w-16">
                  <div className="h-1 w-full rounded-full bg-gradient-to-r from-cyan-400/30 via-transparent to-indigo-500/30" />
                  <div className="mt-3 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-pulse" />
                    <span className="h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.45)]" />
                    <span className="h-3 w-3 rounded-full bg-cyan-300/70" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
