import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ChevronDown } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const FAQS = [
  {
    q: 'What backend and frontend frameworks do you specialize in?',
    a: 'We build primarily using React, Next.js, and TypeScript on the frontend. Our backend architectures leverage Node.js, Express, Go, or Bun, connected to database clusters like PostgreSQL and TimescaleDB.'
  },
  {
    q: 'How do you guarantee server and database security?',
    a: 'We set up secure network VPC subnets on cloud platforms, isolate client databases, encrypt session logs with JWT tokens, and enforce automated penetration/vulnerability checks.'
  },
  {
    q: 'How do we track project milestones and sprint progress?',
    a: 'We invite you to dedicated Slack channels for direct daily communication. We configure weekly sprint review meetings, track progress transparently on Jira/linear boards, and publish builds constantly to staging servers.'
  },
  {
    q: 'Do you manage system maintenance and SRE post-launch?',
    a: 'Yes, we provide ongoing maintenance support tiers. We monitor server loads using Prometheus/Grafana, manage cloud budget optimizations, inspect log errors, and release new features.'
  }
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#050816' }}>
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">05 / Common Queries</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Transparent explanations regarding codebase setups, communication pipelines, and post-launch maintenance.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-white/8 bg-[#121b2d]/55 overflow-hidden transition-all duration-300 relative"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`p-1.5 rounded-lg border border-white/5 bg-slate-950 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 border-cyan-500/30' : ''}`}>
                    <ChevronDown size={14} className={isOpen ? 'text-cyan-400' : 'text-slate-400'} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-[#050816]/10 mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
