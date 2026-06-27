import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Reusable Input ── */
function Field({ label, id, name, type = 'text', placeholder, required, value, onChange, error, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20 ${
          error ? 'border-red-400/60 focus:border-red-400' : 'border-white/10'
        }`}
      />
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  )
}

function SelectField({ label, id, name, options, required, value, onChange, error, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name || id}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full rounded-2xl bg-white/5 border px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20 ${
            error ? 'border-red-400/60 focus:border-red-400' : 'border-white/10'
          }`}
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  )
}

/* ── Toast Component ── */
function Toast({ visible, type, message, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[99999] flex items-start gap-4 rounded-2xl bg-[#081024]/95 border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-sm w-full"
          style={{
            borderColor: type === 'success' ? 'rgba(34,211,238,0.3)' : 'rgba(248,113,113,0.3)',
            boxShadow: type === 'success'
              ? '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(34,211,238,0.15)'
              : '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(248,113,113,0.15)',
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{
              background: type === 'success'
                ? 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.15))'
                : 'linear-gradient(135deg, rgba(248,113,113,0.2), rgba(220,38,38,0.15))',
              border: type === 'success'
                ? '1px solid rgba(34,211,238,0.35)'
                : '1px solid rgba(248,113,113,0.35)'
            }}
          >
            {type === 'success' ? (
              <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-0.5 font-sans">
            <h5 className="text-sm font-bold text-white uppercase tracking-wide">
              {type === 'success' ? 'Success' : 'Error'}
            </h5>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 text-slate-500 hover:text-white transition-colors duration-150 p-1 cursor-pointer"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Form body ── */
function FormBody({ onSuccess }) {
  const initialData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    service: '',
    message: '',
  }

  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrs = { ...prev }
        delete nextErrs[name]
        return nextErrs
      })
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrs = { ...prev }
        delete nextErrs[name]
        return nextErrs
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone.trim()) {
      const rawDigits = formData.phone.replace(/\D/g, '')
      if (rawDigits.length < 7 || rawDigits.length > 15) {
        newErrors.phone = 'Phone number must contain between 7 and 15 digits'
      }
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a project service type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide a message of at least 15 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourcePage: window.location.pathname + window.location.search,
        }),
      })

      const resData = await response.json().catch(() => ({}))

      if (!response.ok) {
        const errorMsg = resData.error || (resData.errors && resData.errors.join(' ')) || 'Failed to submit inquiry.'
        throw new Error(errorMsg)
      }

      setToast({
        visible: true,
        type: 'success',
        message: resData.message || 'Your inquiry has been sent successfully!',
      })

      // Reset form
      setFormData(initialData)

      // Notify parent on success
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error('Submission error:', err)
      setToast({
        visible: true,
        type: 'error',
        message: err.message || 'Could not connect to server. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Full Name"
            id="modal-fullName"
            name="name"
            placeholder="John Smith"
            required
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Field
            label="Email"
            id="modal-email"
            name="email"
            type="email"
            placeholder="john@company.com"
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Phone Number"
            id="modal-phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Field
            label="Company Name"
            id="modal-company"
            name="company"
            placeholder="Acme Corp"
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SelectField
            label="Project Budget"
            id="modal-budget"
            name="budget"
            options={['Below $5k', '$5k – $20k', '$20k – $50k', '$50k+']}
            required
            value={formData.budget}
            onChange={(e) => handleSelectChange('budget', e.target.value)}
            error={errors.budget}
          />
          <SelectField
            label="Project Type"
            id="modal-projectType"
            name="service"
            options={['Web App', 'Mobile App', 'UI/UX Design', 'AI Solution', 'Cloud Solution']}
            required
            value={formData.service}
            onChange={(e) => handleSelectChange('service', e.target.value)}
            error={errors.service}
          />
        </div>

        {/* Row 4 — Textarea */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="modal-message" className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Message <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="modal-message"
            name="message"
            rows={5}
            placeholder="Tell us about your project — goals, timeline, and any specific requirements..."
            required
            value={formData.message}
            onChange={handleChange}
            className={`w-full resize-none rounded-2xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-white/20 ${
              errors.message ? 'border-red-400/60 focus:border-red-400' : 'border-white/10'
            }`}
            style={{ minHeight: '160px' }}
          />
          {errors.message && <span className="text-xs text-red-400 mt-1">{errors.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full h-14 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#22D3EE] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending Inquiry...
            </>
          ) : (
            <>
              Start Your Project
              <svg className="inline-block ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </form>

      <Toast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  )
}

/**
 * ContactFormContent
 *
 * Props:
 *  bare {boolean} — default false.
 *    false → renders with its own rounded card surface (used in ContactSection /contact page).
 *    true  → renders without the card wrapper so the parent (ContactModal) provides the surface.
 *  onSuccess {function} - callback when submission is successful.
 */
export default function ContactFormContent({ bare = false, onSuccess }) {
  const header = (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white">Project Inquiry</h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed font-sans">
        Share your vision and requirements. We'll help you transform it into a scalable product.
      </p>
    </div>
  )

  /* ── bare mode: no card wrapper — used inside ContactModal ── */
  if (bare) {
    return (
      <div>
        {header}
        <FormBody onSuccess={onSuccess} />
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
        <FormBody onSuccess={onSuccess} />
      </div>
    </div>
  )
}
