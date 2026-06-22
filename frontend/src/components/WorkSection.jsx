import React from 'react'

const projects = [
  {
    id: 'manufacturing',
    title: 'Manufacturing Analytics Platform',
    category: 'Industrial · Data Analytics',
    description:
      'A real-time analytics platform that ingests sensor data from factory floors, surfaces KPIs through interactive dashboards, and reduces downtime with predictive maintenance alerts.',
    accent: 'from-cyan-400 to-indigo-500',
    glowColor: 'rgba(34,211,238,0.12)',
    iconColor: 'text-cyan-300',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-8 4 4 4-6 4 10" />
        <rect x="2" y="3" width="20" height="18" rx="2" />
      </svg>
    ),
  },
  {
    id: 'healthcare',
    title: 'Healthcare Management System',
    category: 'Healthcare · SaaS',
    description:
      'An end-to-end patient management solution covering appointment scheduling, EHR integration, billing, and HIPAA-compliant telemedicine — streamlining care for clinics of all sizes.',
    accent: 'from-indigo-400 to-cyan-400',
    glowColor: 'rgba(99,102,241,0.12)',
    iconColor: 'text-indigo-300',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
        <rect x="3" y="3" width="18" height="18" rx="3" />
      </svg>
    ),
  },
  {
    id: 'fintech',
    title: 'FinTech Insights Dashboard',
    category: 'FinTech · Web App',
    description:
      'A feature-rich financial dashboard delivering portfolio analytics, real-time market data, and AI-powered spending insights — helping users make smarter money decisions faster.',
    accent: 'from-cyan-300 to-indigo-400',
    glowColor: 'rgba(34,211,238,0.10)',
    iconColor: 'text-cyan-300',
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8c-3 0-5 1.2-5 4s2 4 5 4 5-1.2 5-4-2-4-5-4z" />
        <path d="M12 4v4M12 16v4" />
      </svg>
    ),
  },
]

export default function WorkSection() {
  return (
    <section id="work" className="relative py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-500/15 to-indigo-500/8 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-bl from-indigo-600/10 to-cyan-400/8 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80 font-semibold">
            SELECTED WORK
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
            Selected Work
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Digital products and platforms we've helped bring to life.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col rounded-[24px] bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-3"
              style={{
                '--glow-color': project.glowColor,
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `0 24px 56px ${project.glowColor}` }}
              />

              {/* Image placeholder */}
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-white/5 to-white/3 border-b border-white/8 flex items-center justify-center overflow-hidden">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                {/* Gradient blob */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />
                {/* Icon */}
                <div
                  className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 ${project.iconColor}`}
                >
                  {project.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Category badge */}
                <span
                  className={`self-start text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${project.accent} bg-clip-text text-transparent border border-white/10`}
                >
                  {project.category}
                </span>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Button */}
                <a
                  href="#contact"
                  className={`mt-2 inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r ${project.accent} text-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg`}
                >
                  View Case Study
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Subtle inner border shimmer */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[24px]"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
