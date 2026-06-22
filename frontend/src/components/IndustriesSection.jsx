import React from 'react'

const industries = [
  {
    key: 'healthcare',
    title: 'Healthcare',
    desc: 'Patient-centered digital platforms, telemedicine and health analytics.',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'fintech',
    title: 'FinTech',
    desc: 'Secure payments, financial dashboards and real-time insights.',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 8c-3 0-5 1-5 4s2 4 5 4 5-1 5-4-2-4-5-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'ecommerce',
    title: 'E-Commerce',
    desc: 'Conversion-first storefronts, headless commerce and integrations.',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M3 3h2l1 5h13l1-5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 19a2 2 0 11-4 0M8 19a2 2 0 11-4 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'education',
    title: 'Education',
    desc: 'Learning platforms, LMS integrations and engaging experiences.',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l9 4-9 4-9-4 9-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11l9 4 9-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21l9-4 9 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'logistics',
    title: 'Logistics',
    desc: 'Fleet management, tracking systems and operational automation.',
    icon: (
      <svg className="h-8 w-8 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M3 13h14v6H3zM21 16h-2v-3l-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'saas',
    title: 'SaaS',
    desc: 'Scalable multi-tenant platforms with robust APIs and analytics.',
    icon: (
      <svg className="h-8 w-8 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 7v-2a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative py-16" style={{ backgroundColor: '#020617' }}>
      {/* subtle animated glows */}
      <div className="pointer-events-none absolute -left-20 -top-8 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 -bottom-12 h-80 w-80 rounded-full bg-gradient-to-bl from-indigo-600/10 to-cyan-400/8 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Industries We Serve</h2>
          <p className="mt-4 text-lg text-slate-300">We build tailored solutions across industries—delivering secure, compliant and delightful user experiences.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <article key={ind.key} className="group relative rounded-[20px] p-6 bg-white/3 backdrop-blur-md border border-white/6 transition-transform transform hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(34,211,238,0.06)]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white/5 ring-1 ring-white/8 grid place-items-center">{ind.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{ind.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{ind.desc}</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[20px]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
