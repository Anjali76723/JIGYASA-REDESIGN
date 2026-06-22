import React, { useState } from 'react'

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

/* ── Reusable Input ── */
function Field({ label, id, type = 'text', placeholder, required, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20"
      />
    </div>
  )
}

function SelectField({ label, id, options, required, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20"
        style={{ backgroundColor: '#0c1528' }}
      >
        <option value="" disabled className="text-slate-500 bg-[#0c1528]">
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0c1528] text-white">
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

/* ── Main Component ── */
export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

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

          {/* ── RIGHT SIDE — Form ── */}
          <div className="relative">
            {/* Card outer glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 to-[#22D3EE]/10 blur-2xl" />

            <div className="relative rounded-[32px] bg-gradient-to-br from-white/8 to-white/3 border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(99,102,241,0.15)]">
              {/* Form header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Project Inquiry</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Share your vision and requirements. We'll help you transform it into a scalable product.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 border border-cyan-400/30">
                    <svg className="h-8 w-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Full Name" id="fullName" placeholder="John Smith" required />
                    <Field label="Email" id="email" type="email" placeholder="john@company.com" required />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Phone Number" id="phone" type="tel" placeholder="+91 98765 43210" />
                    <Field label="Company Name" id="company" placeholder="Acme Corp" />
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Project Budget"
                      id="budget"
                      options={['Below $5k', '$5k – $20k', '$20k – $50k', '$50k+']}
                      required
                    />
                    <SelectField
                      label="Project Type"
                      id="projectType"
                      options={['Web App', 'Mobile App', 'UI/UX Design', 'AI Solution', 'Cloud Solution']}
                      required
                    />
                  </div>

                  {/* Row 4 — Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project — goals, timeline, and any specific requirements..."
                      required
                      className="w-full resize-none rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20"
                      style={{ minHeight: '180px' }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-1 w-full h-14 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] active:scale-[0.99]"
                  >
                    Start Your Project
                    <svg
                      className="inline-block ml-2 h-4 w-4 -mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
