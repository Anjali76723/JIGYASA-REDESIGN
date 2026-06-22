export default function Hero() {
  return (
    <section
  aria-labelledby="hero-heading"
  className="relative overflow-visible max-w-[1600px] mx-auto px-8 py-12 md:py-24"
>
      {/* Background gradient orbs & decorative shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-tr from-[#22D3EE]/30 via-transparent to-transparent blur-3xl opacity-70 transform rotate-12" />
        <div className="absolute -right-28 top-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#6366F1]/20 via-transparent to-transparent blur-2xl opacity-60" />
        <div className="absolute left-1/2 -top-10 w-96 h-96 rounded-full bg-gradient-to-r from-[#22D3EE]/6 to-[#6366F1]/6 blur-2xl opacity-40 transform -translate-x-1/2" />

        <svg className="absolute right-6 bottom-0 w-48 h-48 opacity-20" viewBox="0 0 100 100" fill="none" aria-hidden>
          <rect x="10" y="10" width="80" height="80" rx="12" stroke="#6366F1" strokeWidth="0.6" strokeOpacity="0.2" />
        </svg>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_620px_240px] xl:gap-x-10 gap-10 items-start relative">
        {/* Column 1: Left - content */}
        <div>
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-white/6 text-[#D1D9E8] backdrop-blur-sm">
              Digital Transformation Studio
            </span>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-[#F8FAFC]"
            >
              Engineering Digital Products That{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A78BFA]">Scale</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-[#D1D9E8]">
              We help ambitious businesses design, develop and grow modern digital experiences.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <a
                href="#start"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-md text-base font-semibold text-white shadow-sm bg-[#6366F1] hover:bg-[#4F46E5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]/40"
                aria-label="Start your project"
              >
                Start Your Project
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-md border border-[#334155] text-base font-medium text-[#D1D9E8] bg-white/2 hover:bg-white/3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/6"
                aria-label="View case studies"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Center - dashboard */}
        <div>
          <div className="relative w-full max-w-[620px]">
            <div className="relative">
              <div className="rounded-3xl p-6 border border-white/6 bg-[#0b1220] backdrop-blur-md shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:gap-4 gap-4">
                  <div className="flex-1 rounded-xl p-4 bg-gradient-to-b from-white/2 to-transparent border border-white/4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[#D1D9E8] font-medium">Analytics</div>
                      <div className="text-xs text-[#94A3B8]">Last 7 days</div>
                    </div>
                    <div className="mt-4">
                      <div className="text-lg font-semibold text-[#F8FAFC]">34.8k</div>
                      <div className="mt-2 h-12">
                        <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="#22D3EE"
                            strokeWidth="2"
                            points="0,18 10,14 20,12 30,10 40,8 50,6 60,8 70,5 80,7 90,4 100,6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-44 rounded-xl p-4 bg-gradient-to-b from-white/2 to-transparent border border-white/4">
                    <div className="text-sm text-[#D1D9E8] font-medium">Revenue</div>
                    <div className="mt-4 text-lg font-semibold text-[#F8FAFC]">$1.2M</div>
                    <div className="text-xs text-[#94A3B8] mt-2">MoM +12%</div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg p-4 bg-[#071025]/80 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#D1D9E8] font-medium">Performance</div>
                    <div className="text-xs text-[#94A3B8]">Overview</div>
                  </div>
                  <div className="mt-3 h-36">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="3"
                        points="0,30 10,28 20,22 30,18 40,12 50,10 60,14 70,9 80,12 90,6 100,8"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* layered card shadow for depth */}
              <div className="absolute -inset-1 transform translate-x-2 translate-y-3 rounded-3xl bg-gradient-to-r from-[#000000]/40 to-transparent blur-xl opacity-30 -z-10" />

              {/* Floating stat cards with gradient */}
              <div className="pointer-events-none">
                <div className="absolute -top-8 -left-8 w-36 rounded-xl p-3 bg-gradient-to-br from-[#22D3EE]/30 to-[#6366F1]/20 border border-white/4 shadow-lg">
                  <div className="text-xs text-[#D1D9E8]">Conversion</div>
                  <div className="text-lg font-semibold text-[#F8FAFC]">+24%</div>
                </div>

                <div className="absolute -bottom-8 -right-8 w-40 rounded-xl p-3 bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/20 border border-white/4 shadow-lg">
                  <div className="text-xs text-[#D1D9E8]">NPS</div>
                  <div className="text-lg font-semibold text-[#F8FAFC]">+48</div>
                </div>
              </div>

              {/* Tablet: 2x2 grid under dashboard. Visible from md up to lg (hidden at lg+) */}
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 mt-6">
                <div className="w-full h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-5 shadow-lg">
                  <div className="text-2xl font-extrabold text-[#22D3EE]">500+</div>
                  <div className="text-sm text-[#D1D9E8] mt-2">Projects Delivered</div>
                </div>
                <div className="w-full h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-5 shadow-lg">
                  <div className="text-2xl font-extrabold text-[#6366F1]">98%</div>
                  <div className="text-sm text-[#D1D9E8] mt-2">Client Satisfaction</div>
                </div>
                <div className="w-full h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-5 shadow-lg">
                  <div className="text-2xl font-extrabold text-[#22D3EE]">15+</div>
                  <div className="text-sm text-[#D1D9E8] mt-2">Industries Served</div>
                </div>
                <div className="w-full h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-5 shadow-lg">
                  <div className="text-2xl font-extrabold text-[#6366F1]">24/7</div>
                  <div className="text-sm text-[#D1D9E8] mt-2">Support</div>
                </div>
              </div>

              {/* Mobile: horizontal scroll visible under md (sm and xs) */}
              <div className="md:hidden mt-6 -mx-6 px-6">
                <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
                  <div className="flex-shrink-0 w-[220px] h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-5 py-4 shadow-lg">
                    <div className="text-2xl font-extrabold text-[#22D3EE]">500+</div>
                    <div className="text-sm text-[#D1D9E8] mt-2">Projects</div>
                  </div>
                  <div className="flex-shrink-0 w-[220px] h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-5 py-4 shadow-lg">
                    <div className="text-2xl font-extrabold text-[#6366F1]">98%</div>
                    <div className="text-sm text-[#D1D9E8] mt-2">Satisfaction</div>
                  </div>
                  <div className="flex-shrink-0 w-[220px] h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-5 py-4 shadow-lg">
                    <div className="text-2xl font-extrabold text-[#22D3EE]">15+</div>
                    <div className="text-sm text-[#D1D9E8] mt-2">Industries</div>
                  </div>
                  <div className="flex-shrink-0 w-[220px] h-[110px] rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md px-5 py-4 shadow-lg">
                    <div className="text-2xl font-extrabold text-[#6366F1]">24/7</div>
                    <div className="text-sm text-[#D1D9E8] mt-2">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Right - trust rail (desktop only, no absolute) */}
       <div className="hidden xl:flex flex-col items-end w-[240px] gap-5 justify-center pt-10">
          <div className="relative w-full">
            <div className="absolute -left-6 top-0 h-[420px] w-px bg-gradient-to-b from-[#22D3EE]/30 via-[#6366F1]/20 to-transparent blur-sm opacity-85 rounded -z-10" />

            <div className="flex flex-col items-end gap-4">
              <div className="w-full h-[100px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 shadow-[0_8px_30px_rgba(34,211,238,0.06)] text-right">
                <div className="text-3xl font-extrabold text-[#22D3EE]">500+</div>
                <div className="text-sm text-[#D1D9E8] mt-2">Projects Delivered</div>
              </div>

              <div className="w-full h-[100px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 shadow-[0_8px_30px_rgba(99,102,241,0.06)] text-right">
                <div className="text-3xl font-extrabold text-[#6366F1]">98%</div>
                <div className="text-sm text-[#D1D9E8] mt-2">Client Satisfaction</div>
              </div>

              <div className="w-full h-[100px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 shadow-[0_8px_30px_rgba(34,211,238,0.04)] text-right">
                <div className="text-3xl font-extrabold text-[#22D3EE]">15+</div>
                <div className="text-sm text-[#D1D9E8] mt-2">Industries Served</div>
              </div>

              <div className="w-full h-[100px] rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 shadow-[0_8px_30px_rgba(99,102,241,0.04)] text-right">
                <div className="text-3xl font-extrabold text-[#6366F1]">24/7</div>
                <div className="text-sm text-[#D1D9E8] mt-2">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle floating decorative orbs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute right-20 top-32 w-24 h-24 rounded-full bg-gradient-to-tr from-[#22D3EE]/10 to-transparent blur-2xl opacity-60" />
        <div className="absolute left-10 bottom-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#6366F1]/8 to-transparent blur-2xl opacity-50" />
      </div>
    </section>
  )
}
