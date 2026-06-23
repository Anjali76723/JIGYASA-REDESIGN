import React from 'react'
import ContactFormContent from './shared/ContactFormContent'

/* ── Contact Cards ── */
const contactCards = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+91 88882909177',
    accentClass: 'from-green-400/20 to-green-500/5',
    borderClass: 'border-green-500/20',
    glowClass: 'group-hover:shadow-[0_16px_40px_rgba(34,197,94,0.12)]',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    value: 'hello@jigyasatechnologies.com',
    accentClass: 'from-cyan-400/20 to-cyan-500/5',
    borderClass: 'border-cyan-500/20',
    glowClass: 'group-hover:shadow-[0_16px_40px_rgba(34,211,238,0.12)]',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Location',
    value: 'India',
    accentClass: 'from-violet-400/20 to-violet-500/5',
    borderClass: 'border-violet-500/20',
    glowClass: 'group-hover:shadow-[0_16px_40px_rgba(139,92,246,0.12)]',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
]

/* ── Social Icons ── */
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
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

/* ── Main Component ── */
export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full bg-[#22D3EE]/8 blur-[200px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#6366F1]/8 blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[40%_58%] lg:gap-[2%] items-start">

          {/* ── LEFT SIDE ── */}
          <div className="flex flex-col gap-8">
            {/* Label + heading */}
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold tracking-[0.35em] uppercase text-[#22D3EE]">
                Contact Us
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Let's Build Your Next{' '}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
                  Digital Success
                </span>{' '}
                Story
              </h2>
              <p className="text-[#D1D9E8]/80 leading-relaxed">
                Tell us about your project goals and challenges. Our team will reach out within 24 hours.
              </p>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {contactCards.map((card) => (
                <div
                  key={card.id}
                  className={`group relative flex items-center gap-4 rounded-[24px] bg-gradient-to-r ${card.accentClass} border ${card.borderClass} backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-2 ${card.glowClass} cursor-pointer`}
                >
                  {/* Icon */}
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}>
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {card.label}
                    </span>
                    <span className="mt-0.5 text-sm font-medium text-white truncate">
                      {card.value}
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-slate-500 mr-1">
                Follow Us
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all duration-300 hover:scale-110 hover:text-cyan-400 hover:border-cyan-400/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE — Form (shared component) ── */}
          <div className="relative">
            <ContactFormContent />
          </div>

        </div>
      </div>
    </section>
  )
}
