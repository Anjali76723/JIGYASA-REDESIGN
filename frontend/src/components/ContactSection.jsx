import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'

/* Lazy-load the Three.js sphere — never blocks first paint */
const ContactSphere = lazy(() => import('./contact/ContactSphere'))

/* ─── Brand info ─── */
const COMPANY = {
  name:     'Jigyasa Technologies',
  website:  'https://jigyasatechnologies.com',
  email:    'hello@jigyasatechnologies.com',
  phone:    '+91 88882909177',
  location: 'India',
}

const FONT = 'Space Grotesk, Inter, system-ui'
const BG   = '#020617'

/* ─── Keyframes ─── */
const KF = `
  @keyframes csBadgeShimmer {
    0%,88%  { transform:translateX(-130%) skewX(-16deg); opacity:0; }
    90%     { opacity:.4; }
    100%    { transform:translateX(270%)  skewX(-16deg); opacity:0; }
  }
  @keyframes csWordReveal {
    from { opacity:0; transform:translateY(20px); filter:blur(4px); }
    to   { opacity:1; transform:translateY(0);    filter:blur(0);   }
  }
  @keyframes csGradSweep {
    0%   { background-position:0% 50%; }
    100% { background-position:200% 50%; }
  }
  @keyframes csGlowPulse {
    0%,100% { opacity:.5; }
    50%     { opacity:1; }
  }
  @keyframes csSpin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes csCheckDraw {
    from { stroke-dashoffset: 40; }
    to   { stroke-dashoffset: 0;  }
  }
  @keyframes csSuccessScale {
    0%   { transform:scale(0.6); opacity:0; }
    60%  { transform:scale(1.1); }
    100% { transform:scale(1);   opacity:1; }
  }
  @keyframes csToastIn {
    from { transform:translateY(80px) scale(0.95); opacity:0; }
    to   { transform:translateY(0)    scale(1);    opacity:1; }
  }
  @keyframes csToastOut {
    from { transform:translateY(0)    scale(1);    opacity:1; }
    to   { transform:translateY(80px) scale(0.95); opacity:0; }
  }
`

/* ─── Toast ─── */
function Toast({ visible, onDone }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDone, 4500)
    return () => clearTimeout(t)
  }, [visible, onDone])

  if (!visible) return null
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
      display: 'flex', alignItems: 'flex-start', gap: 14,
      padding: '16px 20px', borderRadius: 16, maxWidth: 360,
      background: 'rgba(8,16,36,0.97)',
      border: '1px solid rgba(34,211,238,0.30)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(34,211,238,0.10)',
      backdropFilter: 'blur(20px)',
      animation: `csToastIn 0.4s cubic-bezier(.22,1,.36,1) forwards`,
      fontFamily: FONT,
    }}>
      <div style={{
        flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg,rgba(34,211,238,0.2),rgba(99,102,241,0.15))',
        border: '1px solid rgba(34,211,238,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7"
            style={{ strokeDasharray: 40, strokeDashoffset: 0,
              animation: 'csCheckDraw 0.5s ease 0.1s both' }} />
        </svg>
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          Message received!
        </p>
        <p style={{ fontSize: 12, color: 'rgba(148,163,184,0.85)', lineHeight: 1.6 }}>
          Thank you for contacting {COMPANY.name}. Our team will reach out within 24 hours.
        </p>
      </div>
      <button onClick={onDone} style={{
        flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
        color: 'rgba(148,163,184,0.5)', padding: '2px 0', lineHeight: 1,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

/* ─── Validated form field ─── */
function Field({ label, id, type = 'text', placeholder, required, error, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: 'rgba(148,163,184,0.75)', fontFamily: FONT,
      }}>{label}{required && <span style={{ color: '#22D3EE', marginLeft: 3 }}>*</span>}</label>
      <input
        id={id} name={id} type={type} placeholder={placeholder}
        value={value} onChange={e => onChange(id, e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', borderRadius: 14, padding: '12px 16px',
          fontSize: 14, color: '#fff', fontFamily: FONT,
          background: focused ? 'rgba(34,211,238,0.05)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${error ? '#F87171' : focused ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.10)'}`,
          outline: 'none',
          boxShadow: focused ? `0 0 0 3px rgba(34,211,238,0.10)` : 'none',
          transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
        }}
      />
      {error && (
        <span style={{ fontSize: 11, color: '#F87171', fontFamily: FONT, marginTop: 2 }}>
          {error}
        </span>
      )}
    </div>
  )
}

function SelectField({ label, id, options, required, error, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: 'rgba(148,163,184,0.75)', fontFamily: FONT,
      }}>{label}{required && <span style={{ color: '#22D3EE', marginLeft: 3 }}>*</span>}</label>
      <select
        id={id} name={id} value={value}
        onChange={e => onChange(id, e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', borderRadius: 14, padding: '12px 16px',
          fontSize: 14, color: value ? '#fff' : 'rgba(100,116,139,0.8)', fontFamily: FONT,
          background: focused ? 'rgba(34,211,238,0.05)' : '#0c1528',
          border: `1px solid ${error ? '#F87171' : focused ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.10)'}`,
          outline: 'none', appearance: 'none', cursor: 'pointer',
          boxShadow: focused ? '0 0 0 3px rgba(34,211,238,0.10)' : 'none',
          transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
        }}
      >
        <option value="" disabled style={{ background: '#0c1528', color: 'rgba(100,116,139,0.8)' }}>
          Select an option
        </option>
        {options.map(o => (
          <option key={o} value={o} style={{ background: '#0c1528', color: '#fff' }}>{o}</option>
        ))}
      </select>
      {error && <span style={{ fontSize: 11, color: '#F87171', fontFamily: FONT, marginTop: 2 }}>{error}</span>}
    </div>
  )
}

/* ─── Validation logic ─── */
function validate(fields) {
  const errs = {}
  if (!fields['cs-fullName']?.trim())
    errs['cs-fullName'] = 'Full name is required'
  if (!fields['cs-email']?.trim())
    errs['cs-email'] = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields['cs-email']))
    errs['cs-email'] = 'Please enter a valid email address'
  if (!fields['cs-projectType'])
    errs['cs-projectType'] = 'Please select a project type'
  if (!fields['cs-message']?.trim())
    errs['cs-message'] = 'Message is required'
  else if (fields['cs-message'].trim().length < 20)
    errs['cs-message'] = 'Please provide at least 20 characters'
  return errs
}

/* ─── The enhanced contact form ─── */
function ContactForm({ onSuccess }) {
  const INIT = {
    'cs-fullName': '', 'cs-email': '', 'cs-phone': '', 'cs-company': '',
    'cs-budget': '', 'cs-projectType': '', 'cs-message': '',
  }
  const [fields, setFields]     = useState(INIT)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (id, val) => {
    setFields(f => ({ ...f, [id]: val }))
    if (errors[id]) setErrors(e => { const n = { ...e }; delete n[id]; return n })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))  // simulated API
    setLoading(false)
    setSubmitted(true)
    onSuccess()
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 20, padding: '48px 24px', textAlign: 'center',
        animation: 'csSuccessScale 0.5s cubic-bezier(.22,1,.36,1) both' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg,rgba(34,211,238,0.2),rgba(99,102,241,0.15))',
          border: '1px solid rgba(34,211,238,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(34,211,238,0.20)',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7"
              style={{ strokeDasharray: 40, animation: 'csCheckDraw 0.6s ease 0.15s both' }} />
          </svg>
        </div>
        <div>
          <h4 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10, fontFamily: FONT }}>
            Message Received ✓
          </h4>
          <p style={{ fontSize: 14, color: 'rgba(148,163,184,0.8)', lineHeight: 1.75,
            maxWidth: 320, fontFamily: FONT }}>
            Thanks for contacting {COMPANY.name}. Our team will review your project
            requirements and get back to you shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Full Name"  id="cs-fullName" placeholder="John Smith"
          required value={fields['cs-fullName']} onChange={handleChange} error={errors['cs-fullName']} />
        <Field label="Email"  id="cs-email" type="email" placeholder="john@company.com"
          required value={fields['cs-email']} onChange={handleChange} error={errors['cs-email']} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Phone" id="cs-phone" type="tel" placeholder={COMPANY.phone}
          value={fields['cs-phone']} onChange={handleChange} error={errors['cs-phone']} />
        <Field label="Company" id="cs-company" placeholder={COMPANY.name}
          value={fields['cs-company']} onChange={handleChange} error={errors['cs-company']} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <SelectField label="Project Budget" id="cs-budget"
          options={['Below $5k','$5k – $20k','$20k – $50k','$50k+']}
          value={fields['cs-budget']} onChange={handleChange} error={errors['cs-budget']} />
        <SelectField label="Project Type" id="cs-projectType" required
          options={['Web App','Mobile App','UI/UX Design','AI Solution','Cloud Solution']}
          value={fields['cs-projectType']} onChange={handleChange} error={errors['cs-projectType']} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="cs-message" style={{
          fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.1em', color: 'rgba(148,163,184,0.75)', fontFamily: FONT,
        }}>Message <span style={{ color: '#22D3EE' }}>*</span></label>
        <textarea id="cs-message" name="cs-message" rows={5}
          placeholder="Tell us about your project — goals, timeline, and any specific requirements..."
          value={fields['cs-message']}
          onChange={e => handleChange('cs-message', e.target.value)}
          style={{
            width: '100%', borderRadius: 14, padding: '12px 16px', resize: 'none',
            fontSize: 14, color: '#fff', fontFamily: FONT, background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${errors['cs-message'] ? '#F87171' : 'rgba(255,255,255,0.10)'}`,
            outline: 'none', minHeight: 160,
            transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(34,211,238,0.5)'
            e.target.style.background = 'rgba(34,211,238,0.05)'
            e.target.style.boxShadow = '0 0 0 3px rgba(34,211,238,0.10)'
          }}
          onBlur={e => {
            e.target.style.borderColor = errors['cs-message'] ? '#F87171' : 'rgba(255,255,255,0.10)'
            e.target.style.background = 'rgba(255,255,255,0.04)'
            e.target.style.boxShadow = 'none'
          }}
        />
        {errors['cs-message'] && (
          <span style={{ fontSize: 11, color: '#F87171', fontFamily: FONT }}>{errors['cs-message']}</span>
        )}
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading} style={{
        width: '100%', height: 52, borderRadius: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
        background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366F1,#22D3EE)',
        color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: FONT,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        boxShadow: loading ? 'none' : '0 8px 32px rgba(34,211,238,0.20)',
        transition: 'box-shadow 250ms, background 250ms, transform 150ms',
        transform: 'translateY(0)',
      }}
        onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow='0 0 52px rgba(34,211,238,0.38),0 8px 32px rgba(99,102,241,0.30)'; e.currentTarget.style.transform='translateY(-1px)' } }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow='0 8px 32px rgba(34,211,238,0.20)'; e.currentTarget.style.transform='translateY(0)' }}
      >
        {loading ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round"
              style={{ animation: 'csSpin 0.8s linear infinite' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

/* ─── Contact info cards (below sphere) ─── */
const CONTACT_CARDS = [
  {
    label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`,
    accent: '#22D3EE',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
  },
  {
    label: 'WhatsApp', value: COMPANY.phone, href: `https://wa.me/918888290917`,
    accent: '#34D399',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    label: 'Location', value: COMPANY.location, href: '#',
    accent: '#A78BFA',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  },
]

/* ─── Main ContactSection ─── */
export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [toastVisible, setToastVisible] = useState(false)

  return (
    <section id="contact" ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      backgroundColor: BG, padding: '80px 0 96px',
    }}>
      <style>{KF}</style>

      {/* Background glows */}
      <div style={{ pointerEvents: 'none', position: 'absolute', left: '-10%', top: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(34,211,238,0.06) 0%,transparent 65%)',
        filter: 'blur(120px)' }} />
      <div style={{ pointerEvents: 'none', position: 'absolute', right: '-8%', bottom: 0,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 65%)',
        filter: 'blur(120px)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Page heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: '#22D3EE', marginBottom: 16, fontFamily: FONT }}>
            Contact Us
          </p>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 800, color: '#fff',
            lineHeight: 1.08, letterSpacing: '-0.02em', fontFamily: FONT }}>
            {"Let's Build Your Next "}
            <span style={{
              backgroundImage: 'linear-gradient(90deg,#22D3EE 0%,#6366F1 40%,#A78BFA 70%,#22D3EE 100%)',
              backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'csGradSweep 5s linear infinite',
            }}>Digital Success</span>
            {' Story'}
          </h2>
          <p style={{ marginTop: 16, fontSize: 17, color: 'rgba(209,217,232,0.75)',
            lineHeight: 1.75, fontFamily: FONT }}>
            Tell us about your project goals and challenges. Our team will reach out within 24 hours.
          </p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 'clamp(24px,4vw,56px)', alignItems: 'start' }}>

          {/* ═══ LEFT — sphere + contact info ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {/* Sphere container */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '90%',
              borderRadius: 28, overflow: 'hidden',
              background: 'radial-gradient(ellipse at 50% 50%,rgba(34,211,238,0.06) 0%,rgba(99,102,241,0.04) 40%,transparent 70%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Suspense fallback={
                <div style={{ position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%',
                    border: '2px solid rgba(34,211,238,0.3)',
                    borderTopColor: '#22D3EE',
                    animation: 'csSpin 0.9s linear infinite' }} />
                </div>
              }>
                <ContactSphere />
              </Suspense>

              {/* Centre label overlay */}
              <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0,
                display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{
                  padding: '6px 16px', borderRadius: 999, fontFamily: FONT,
                  background: 'rgba(2,6,23,0.75)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(34,211,238,0.20)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(34,211,238,0.85)',
                  animation: 'csGlowPulse 3s ease-in-out infinite',
                }}>
                  Digital Intelligence Network
                </div>
              </div>
            </div>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CONTACT_CARDS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                    borderRadius: 16, textDecoration: 'none',
                    background: `linear-gradient(135deg,${c.accent}0d,transparent)`,
                    border: `1px solid ${c.accent}28`,
                    transition: 'border-color 250ms, background 250ms, box-shadow 250ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${c.accent}55`
                    e.currentTarget.style.boxShadow = `0 8px 32px ${c.accent}18`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${c.accent}28`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${c.accent}14`, border: `1px solid ${c.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.accent,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.1em', color: 'rgba(148,163,184,0.55)', fontFamily: FONT }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginTop: 2,
                      fontFamily: FONT }}>{c.value}</div>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: 'rgba(148,163,184,0.3)' }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ═══ RIGHT — form card ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
          >
            <div style={{
              position: 'relative', borderRadius: 28, padding: '36px 36px 40px',
              background: 'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.025) 100%)',
              border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 80px rgba(99,102,241,0.12)',
            }}>
              {/* Top gradient line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                borderRadius: '28px 28px 0 0',
                background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.6),rgba(99,102,241,0.5),transparent)',
              }} />
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: FONT, marginBottom: 8 }}>
                  Project Inquiry
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.75)', lineHeight: 1.65, fontFamily: FONT }}>
                  Share your vision and requirements. We'll help you transform it into a scalable product.
                </p>
              </div>
              <ContactForm onSuccess={() => setToastVisible(true)} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Toast notification */}
      <Toast visible={toastVisible} onDone={() => setToastVisible(false)} />
    </section>
  )
}
