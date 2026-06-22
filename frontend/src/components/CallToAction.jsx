import React from 'react'

export default function CallToAction() {
  return (
    <section className="relative py-20" style={{ backgroundColor: '#020617' }}>
      {/* Gradient glow background */}
      <div className="pointer-events-none absolute -inset-x-40 -top-32 h-96 bg-gradient-to-r from-cyan-500/10 via-indigo-500/6 to-cyan-400/6 blur-3xl rounded-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-white/4 backdrop-blur-md border border-white/8 rounded-3xl p-10 text-center shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Build Your Next Digital Product?</h2>
          <p className="mt-4 text-lg text-slate-300">Let's discuss your idea and transform it into a scalable digital solution.</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-400 to-indigo-500 text-white shadow-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(34,211,238,0.15)]">
              Book Free Consultation
            </a>

            <a href="#portfolio" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-white/5 text-white border border-white/10 hover:bg-white/8 transform transition-all duration-200">
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
