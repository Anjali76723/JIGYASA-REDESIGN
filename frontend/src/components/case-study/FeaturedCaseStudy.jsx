export default function FeaturedCaseStudy() {
  return (
    <section className="relative w-full bg-[#020617] py-20 sm:py-32 overflow-hidden">
      {/* Decorative gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        {/* Eyebrow */}
        <p className="text-sm uppercase tracking-[0.35em] text-[#22D3EE]/80 text-center">
          FEATURED SUCCESS STORY
        </p>

        {/* Two-column layout: desktop, stacked: tablet/mobile */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Helping a Manufacturing Company Increase Operational Efficiency by{' '}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                42%
              </span>
            </h2>

            <p className="text-lg text-[#D1D9E8] leading-relaxed">
              We redesigned internal workflows, modernized dashboards, and improved reporting systems, resulting in
              faster decision-making and measurable business growth.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl text-center transition duration-300 hover:border-[#22D3EE]/30 hover:bg-white/10">
                <p className="text-2xl font-bold text-[#22D3EE]">+42%</p>
                <p className="mt-1 text-xs text-[#D1D9E8]">Efficiency</p>
              </div>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl text-center transition duration-300 hover:border-[#22D3EE]/30 hover:bg-white/10">
                <p className="text-2xl font-bold text-[#6366F1]">-31%</p>
                <p className="mt-1 text-xs text-[#D1D9E8]">Reporting Time</p>
              </div>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl text-center transition duration-300 hover:border-[#22D3EE]/30 hover:bg-white/10">
                <p className="text-2xl font-bold text-[#22D3EE]">2.3x</p>
                <p className="mt-1 text-xs text-[#D1D9E8]">Faster Insights</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 rounded-[16px] bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-white font-semibold shadow-lg shadow-[#6366F1]/30 hover:shadow-[0_16px_48px_rgba(99,102,241,0.4)] hover:-translate-y-1 transition duration-300">
                View Case Study
              </button>
              <button className="px-8 py-3 rounded-[16px] border border-white/20 bg-white/5 text-white font-semibold backdrop-blur-xl hover:border-[#22D3EE]/50 hover:bg-white/10 hover:-translate-y-1 transition duration-300">
                Book Consultation
              </button>
            </div>
          </div>

          {/* Right: Premium Dashboard Mockup */}
          <div className="relative h-96 sm:h-[500px]">
            {/* Glassmorphism card container */}
            <div className="absolute inset-0 rounded-[32px] border border-white/15 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-[#6366F1]/20 hover:shadow-[0_32px_80px_rgba(99,102,241,0.3)] transition duration-300">
              {/* Dashboard header with status indicator */}
              <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-[#22D3EE] shadow-lg shadow-[#22D3EE]/50 animate-pulse"></div>
                  <p className="text-sm font-medium text-[#D1D9E8]">Production Dashboard</p>
                </div>
              </div>

              {/* Dashboard content area */}
              <div className="p-6 space-y-6">
                {/* Chart visualization */}
                <div className="h-32 rounded-lg bg-gradient-to-b from-[#6366F1]/10 to-[#22D3EE]/5 border border-white/10 flex items-end justify-between px-4 py-4 gap-2">
                  <div className="flex-1 h-12 rounded-full bg-[#6366F1]/60 shadow-[0_0_12px_rgba(99,102,241,0.4)]"></div>
                  <div className="flex-1 h-20 rounded-full bg-[#22D3EE]/70 shadow-[0_0_12px_rgba(34,211,238,0.4)]"></div>
                  <div className="flex-1 h-16 rounded-full bg-[#6366F1]/60 shadow-[0_0_12px_rgba(99,102,241,0.4)]"></div>
                  <div className="flex-1 h-24 rounded-full bg-[#22D3EE]/70 shadow-[0_0_12px_rgba(34,211,238,0.4)]"></div>
                  <div className="flex-1 h-14 rounded-full bg-[#6366F1]/60 shadow-[0_0_12px_rgba(99,102,241,0.4)]"></div>
                </div>

                {/* Stats rows */}
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#D1D9E8]">Uptime</p>
                    <p className="text-sm font-semibold text-[#22D3EE]">99.8%</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#D1D9E8]">Processing Speed</p>
                    <p className="text-sm font-semibold text-[#6366F1]">2.3s</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#D1D9E8]">Data Accuracy</p>
                    <p className="text-sm font-semibold text-[#22D3EE]">99.7%</p>
                  </div>
                </div>
              </div>

              {/* Glow accent overlay */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#6366F1]/30 to-transparent blur-3xl -z-10"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 border border-[#22D3EE]/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-[#6366F1]/20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
