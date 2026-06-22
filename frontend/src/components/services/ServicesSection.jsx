const services = [
  {
    title: 'Web Development',
    description: 'Full-stack applications built for scale, speed, and security.',
    icon: 'web',
  },
  {
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps that drive engagement.',
    icon: 'mobile',
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that convert users into customers.',
    icon: 'design',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Infrastructure automation and deployment pipelines for agility.',
    icon: 'cloud',
  },
  {
    title: 'AI & Automation',
    description: 'Intelligent systems that automate workflows and drive insights.',
    icon: 'ai',
  },
  {
    title: 'Digital Transformation',
    description: 'Modernize legacy systems and embrace digital-first strategies.',
    icon: 'transform',
  },
]

function ServiceIcon({ type }) {
  const iconMap = {
    web: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="8" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
        <circle cx="8" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 2L15.09 8.26H21.77L17.38 12.19L18.88 18.5L12 14.27L5.12 18.5L6.62 12.19L2.23 8.26H8.91L12 2Z" />
      </svg>
    ),
    transform: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" />
      </svg>
    ),
  }
  return iconMap[type] || iconMap.web
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#020617] py-20 sm:py-32 overflow-hidden">
      {/* Decorative gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#22D3EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6366F1]/3 to-[#22D3EE]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#22D3EE]/80">OUR SERVICES</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Solutions Designed For Modern Businesses
          </h2>
          <p className="mt-6 text-lg text-[#D1D9E8] max-w-2xl mx-auto leading-relaxed">
            From product strategy to engineering and growth, we help businesses build scalable digital experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#6366F1]/30 hover:bg-white/15"
            >
              {/* Icon container */}
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366F1]/20 via-transparent to-[#22D3EE]/20 text-[#22D3EE] shadow-lg shadow-[#6366F1]/20 transition duration-300 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]">
                <ServiceIcon type={service.icon} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm text-[#D1D9E8] leading-relaxed">{service.description}</p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#22D3EE] transition duration-300 group-hover:gap-3">
                <span>Learn more</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#6366F1]/0 to-[#22D3EE]/0 opacity-0 transition duration-300 group-hover:from-[#6366F1]/10 group-hover:to-[#22D3EE]/5 group-hover:opacity-100 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
