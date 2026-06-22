import React from 'react'

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Cloud & DevOps',
  'AI & Automation',
]

const contactInfo = [
  {
    icon: (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
    value: 'hello@jigyasatechnologies.com',
  },
  {
    icon: (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81 19.79 19.79 0 01.97 2.18 2 2 0 012.95.97h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2z" />
      </svg>
    ),
    value: '+91 88882909177',
  },
  {
    icon: (
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    value: 'India',
  },
]

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10" style={{ backgroundColor: '#020617' }}>
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[600px] rounded-full bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-cyan-400/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* ── Top 4-column grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <a href="/" className="flex items-baseline gap-2" style={{ fontFamily: 'Space Grotesk, Inter, system-ui' }}>
              <span className="text-xl font-extrabold text-white tracking-tight">JIGYASA</span>
              <span className="text-sm font-medium text-cyan-300/90">TECHNOLOGIES</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
              We craft scalable digital products through strategy, design, and engineering — for ambitious organizations worldwide.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all duration-300 hover:scale-110 hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400 flex items-center gap-2 group"
                  >
                    <span className="h-px w-3 bg-slate-700 transition-all duration-200 group-hover:w-4 group-hover:bg-cyan-400" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400 flex items-center gap-2 group"
                  >
                    <span className="h-px w-3 bg-slate-700 transition-all duration-200 group-hover:w-4 group-hover:bg-cyan-400" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              {contactInfo.map((c) => (
                <li key={c.value} className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="mt-0.5 text-cyan-400/70">{c.icon}</span>
                  <span className="leading-relaxed">{c.value}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(34,211,238,0.2)] self-start"
            >
              Start a Project
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2025 Jigyasa Technologies. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with ❤️ in India
          </p>
        </div>

      </div>
    </footer>
  )
}
