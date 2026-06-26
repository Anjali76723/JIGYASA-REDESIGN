import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Sparkles, Zap, Users, ArrowUpRight, BarChart2 } from 'lucide-react'
import { useContactModal } from '../../App'

const FONT = 'Space Grotesk, Inter, system-ui'

export default function WhyChooseUsRedesigned() {
  const { openModal } = useContactModal()
  
  // Simulated stats counters
  const [stat1, setStat1] = useState(480)
  const [stat2, setStat2] = useState(99.1)
  const [stat3, setStat3] = useState(12)

  useEffect(() => {
    const timer1 = setInterval(() => {
      setStat1(s => s + Math.floor(Math.random() * 2))
    }, 3000)
    const timer2 = setInterval(() => {
      setStat2(s => {
        const diff = (Math.random() - 0.5) * 0.05
        return Math.min(100, Math.max(99.0, Number((s + diff).toFixed(2))))
      })
    }, 4000)
    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
    }
  }, [])

  return (
    <div className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#050816' }}>
      
      {/* Aurora glow background */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Layout Panel: Strategic content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 font-mono">02 / Strategic Excellence</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: FONT }}>
                Engineering Trust Into<br />
                Every Code Architecture
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                We bridge high-end visuals and production robustness. When you build with Jigyasa Technologies, you collaborate with an in-house crew committed to operational integrity.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              {[
                { 
                  icon: <Users className="w-5 h-5 text-cyan-400" />, 
                  title: 'In-House Development Team', 
                  desc: 'We are pure engineers, not resellers. Your code repositories are built and monitored entirely by our core team.' 
                },
                { 
                  icon: <Zap className="w-5 h-5 text-purple-400" />, 
                  title: 'Agile Transparency Loops', 
                  desc: 'We schedule weekly live build checks and deploy updates continuously to ensure there are no surprises at kickoff.' 
                },
                { 
                  icon: <Shield className="w-5 h-5 text-cyan-400" />, 
                  title: 'Long-Term Partnership Systems', 
                  desc: 'Our work extends past deployments. We audit speed, optimize databases, and support scaling roadmap priorities.' 
                }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{point.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
                className="py-4 px-8 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 shadow-[0_4px_25px_rgba(34,211,238,0.2)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                Schedule Discovery Call
                <ArrowUpRight size={14} />
              </motion.button>
            </div>
          </div>

          {/* Right Layout Panel: Futuristic metrics Cockpit */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-[32px] border border-white/8 bg-[#0b1023]/40 backdrop-blur-xl p-6 sm:p-8 relative space-y-6">
              
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Live Operations Cockpit</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
              </div>

              {/* Grid data metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Active Projects', val: `${stat1}+`, c: 'text-cyan-400' },
                  { label: 'SLA Uptime Ratio', val: `${stat2}%`, c: 'text-purple-400' },
                  { label: 'Core Team Size', val: `${stat3} Eng`, c: 'text-cyan-400' }
                ].map(m => (
                  <div key={m.label} className="p-3.5 rounded-xl border border-white/5 bg-[#121b2d]/50 text-center">
                    <div className={`text-base sm:text-xl font-extrabold ${m.c}`}>{m.val}</div>
                    <div className="text-[9px] text-slate-500 mt-1 leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Graph metrics placeholder drawing dynamically */}
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4 h-36 flex flex-col justify-between">
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block text-left">Traffic Load & Network Pipeline</span>
                <div className="flex-1 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                    <path 
                      d="M0 40 L0 30 L20 15 L40 28 L60 8 L80 18 L100 2 Z" 
                      fill="url(#whyChooseUsGlow)" 
                      opacity="0.15"
                    />
                    <path 
                      d="M0 30 L20 15 L40 28 L60 8 L80 18 L100 2" 
                      fill="none" 
                      stroke="#22D3EE" 
                      strokeWidth="2" 
                    />
                    <defs>
                      <linearGradient id="whyChooseUsGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 text-[10px] text-slate-400 text-left font-mono">
                <div className="text-white font-bold mb-1">Telemetry Status Report</div>
                <div>Server channels optimal. Cloud configs scaling correctly. Zero code logs flagged.</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
