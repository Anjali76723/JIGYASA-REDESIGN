import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const FAQS = [
  {
    q: 'What is the typical timeline for a custom software project?',
    a: 'Small projects usually take 2–4 weeks. Enterprise software and mobile apps generally require around 3–6 months depending on complexity.'
  },
  {
    q: 'Do you provide long-term maintenance after launch?',
    a: 'Yes. We offer monitoring, updates, security patches, backups, bug fixes and performance improvements.'
  },
  {
    q: 'Can you integrate with our ERP or existing database?',
    a: 'Yes. We integrate securely with ERPs, CRMs and custom databases using APIs and modern integration strategies.'
  },
  {
    q: 'How do we begin if we are unsure which service we need?',
    a: 'We begin with a short discovery consultation and recommend the right solution based on your goals.'
  }
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="relative w-full py-32 border-t border-white/5 overflow-hidden" style={{ backgroundColor: '#050816' }}>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle lines grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left panel: Title block */}
          <div className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-36">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 px-3.5 py-1 bg-cyan-950/20 text-cyan-400 text-xs font-mono font-bold">
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ fontFamily: FONT }}>
              Common<br />
              Queries
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
              Everything you need to know about our project timelines, post-launch hypercare support, API integrations, and starting guidelines.
            </p>
          </div>

          {/* Right panel: Premium Accordions */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {FAQS.map((faq, idx) => {
              const isOpen = activeIndex === idx
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border transition-all duration-500 overflow-hidden relative group backdrop-blur-md ${isOpen ? 'border-cyan-500/30 bg-[#0d1527]/80 shadow-[0_15px_40px_rgba(34,211,238,0.05)]' : 'border-white/5 bg-[#121B2D]/40 hover:border-white/10 hover:bg-[#121B2D]/60'}`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors cursor-pointer select-none gap-4"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-cyan-400 bg-cyan-950/40 text-cyan-400' : 'border-white/10 bg-slate-950/50 text-slate-400 group-hover:border-white/20'}`}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 bg-[#050816]/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Aurora highlight inside card */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.02), transparent 50%)' }} />
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
