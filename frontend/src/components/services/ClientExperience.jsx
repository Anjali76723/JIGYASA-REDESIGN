import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Settings, Award, CheckCircle } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const STAGES = [
  {
    title: 'Scoping & Alignment Kickoff',
    desc: 'Align on functional requirements, define user journey scopes, setup shared Slack channels, and structure the sprint boards.',
    status: 'COMPLETED',
    icon: <Target className="w-5 h-5 text-cyan-400" />
  },
  {
    title: 'Weekly Iteration Demos',
    desc: 'We publish continuous updates on our staging servers. You test the code live in sprint intervals and adjust feature directions.',
    status: 'ACTIVE',
    icon: <Eye className="w-5 h-5 text-purple-400" />
  },
  {
    title: 'Pre-Launch Verification Checks',
    desc: 'Exhaustive verification tests auditing page rendering speed, database queries optimization, SRE server alerts, and SSL synchronization.',
    status: 'PENDING',
    icon: <Settings className="w-5 h-5 text-cyan-400" />
  },
  {
    title: 'Launch & Hypercare Scale',
    desc: 'We launch production clusters, verify DNS routes, track telemetry logs, and outline upcoming development priorities.',
    status: 'PENDING',
    icon: <Award className="w-5 h-5 text-purple-400" />
  }
]

export default function ClientExperience() {
  const [activeStage, setActiveStage] = useState(1)

  return (
    <div className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#050816' }}>
      
      {/* Glow highlight */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">04 / Partnership Flow</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
            Client Success Pipeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            How you participate in the engineering loop from first scope discussion to ongoing support.
          </p>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch relative">
          
          {/* Connector lines on desktop */}
          <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-cyan-400/30 via-purple-500/20 to-slate-800/10 z-0" />

          {STAGES.map((stage, idx) => {
            const isActive = activeStage === idx
            return (
              <div 
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between cursor-pointer relative z-10 ${isActive ? 'border-cyan-500/30 bg-[#121b2d]/60 shadow-[0_15px_40px_rgba(34,211,238,0.06)]' : 'border-white/5 bg-[#121b2d]/10 hover:bg-white/[0.02]'}`}
              >
                <div className="space-y-4">
                  {/* Step Node Icon Wrapper */}
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 ${isActive ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_12px_rgba(53,208,255,0.2)]' : 'border-white/8 bg-slate-950'}`}>
                    {stage.icon}
                  </div>

                  <div>
                    <span className={`text-[8px] font-bold font-mono tracking-widest uppercase ${stage.status === 'COMPLETED' ? 'text-cyan-400' : stage.status === 'ACTIVE' ? 'text-purple-400' : 'text-slate-500'}`}>
                      {stage.status}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 leading-snug">{stage.title}</h3>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">{stage.desc}</p>
                </div>

                <div className="border-t border-white/5 pt-3 mt-4 text-[10px] text-slate-500 font-mono flex justify-between items-center">
                  <span>STEP 0{idx + 1}</span>
                  {stage.status === 'COMPLETED' && <CheckCircle size={10} className="text-cyan-400" />}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
