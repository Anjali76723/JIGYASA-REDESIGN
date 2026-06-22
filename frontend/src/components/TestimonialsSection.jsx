import React from 'react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechNova',
    quote: 'The team transformed our concept into a polished product faster than we imagined. Their strategic insights and execution were top-tier.',
  },
  {
    name: 'Michael Chen',
    role: 'Product Director, FinEdge',
    quote: 'A highly professional partnership — beautiful UX, robust engineering, and clear communication throughout the build.',
  },
  {
    name: 'Emma Wilson',
    role: 'Founder, GrowthLabs',
    quote: 'They delivered beyond expectations. Post-launch metrics improved quickly thanks to their growth-focused approach.',
  },
]

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-cyan-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="relative py-16" style={{ backgroundColor: '#020617' }}>
      {/* floating glows */}
      <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 -top-16 h-72 w-72 rounded-full bg-gradient-to-bl from-indigo-600/10 to-cyan-400/8 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-sm font-semibold text-cyan-300/90 tracking-widest">CLIENT TESTIMONIALS</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-slate-300">We partner with ambitious companies to design and build digital products that drive measurable results.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <article key={t.name} className="relative rounded-[24px] bg-white/3 backdrop-blur-md border border-white/6 p-6 transition-transform transform hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(34,211,238,0.06)]">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-400/30 to-indigo-400/20 flex items-center justify-center text-white font-semibold text-lg">{t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <StarRow />
                  </div>

                  <p className="mt-4 text-slate-200">“{t.quote}”</p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-sm text-slate-200"> </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-sm text-slate-300">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* subtle border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-transparent" style={{ boxShadow: '0 0 40px rgba(34,211,238,0.03), inset 0 1px 0 rgba(255,255,255,0.02)' }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
