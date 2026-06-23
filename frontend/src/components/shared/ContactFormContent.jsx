import { useState } from 'react'

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

/* ── Form body — fields + submit ── */
function FormBody() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
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
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name"  id="modal-fullName" placeholder="John Smith"           required />
        <Field label="Email"      id="modal-email"    type="email" placeholder="john@company.com" required />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone Number" id="modal-phone"   type="tel" placeholder="+91 98765 43210" />
        <Field label="Company Name" id="modal-company" placeholder="Acme Corp" />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          label="Project Budget"
          id="modal-budget"
          options={['Below $5k', '$5k – $20k', '$20k – $50k', '$50k+']}
          required
        />
        <SelectField
          label="Project Type"
          id="modal-projectType"
          options={['Web App', 'Mobile App', 'UI/UX Design', 'AI Solution', 'Cloud Solution']}
          required
        />
      </div>

      {/* Row 4 — Textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="modal-message" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="modal-message"
          name="message"
          rows={5}
          placeholder="Tell us about your project — goals, timeline, and any specific requirements..."
          required
          className="w-full resize-none rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20"
          style={{ minHeight: '160px' }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-1 w-full h-14 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] active:scale-[0.99]"
      >
        Start Your Project
        <svg className="inline-block ml-2 h-4 w-4 -mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}

/**
 * ContactFormContent
 *
 * Props:
 *  bare {boolean} — default false.
 *    false → renders with its own rounded card surface (used in ContactSection /contact page).
 *    true  → renders without the card wrapper so the parent (ContactModal) provides the surface.
 */
export default function ContactFormContent({ bare = false }) {
  const header = (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white">Project Inquiry</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        Share your vision and requirements. We'll help you transform it into a scalable product.
      </p>
    </div>
  )

  /* ── bare mode: no card wrapper — used inside ContactModal ── */
  if (bare) {
    return (
      <div>
        {header}
        <FormBody />
      </div>
    )
  }

  /* ── default: full card — used in ContactSection on the /contact page ── */
  return (
    <div className="relative rounded-[32px] bg-gradient-to-br from-white/8 to-white/3 border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(99,102,241,0.15)]">
      {/* Card outer glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 to-[#22D3EE]/10 blur-2xl" />
      <div className="relative">
        {header}
        <FormBody />
      </div>
    </div>
  )
}
