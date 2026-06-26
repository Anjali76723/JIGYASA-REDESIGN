import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap, Target, Search, PenTool, Terminal, Shield, Award } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    icon: <Search className="w-5 h-5 text-cyan-400" />,
    desc: 'We research market trends, map your business workflows, define functional scopes, and design the software architecture roadmap.',
    deliverables: ['Business Flow Diagrams', 'Scope of Work Blueprint', 'Architecture Map'],
    color: '#22D3EE'
  },
  {
    num: '02',
    title: 'Design & Prototype',
    icon: <PenTool className="w-5 h-5 text-purple-400" />,
    desc: 'Creating high-fidelity UI layout files and clickable interactive mockups in Figma to validate usability and visual aesthetics.',
    deliverables: ['Clickable Figma Prototype', 'Design Token System', 'Component Style Guide'],
    color: '#a78bfa'
  },
  {
    num: '03',
    title: 'Agile Development',
    icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    desc: 'We write fully tested, typed, and scalable code in short sprints, deploying staging versions frequently to receive feedback.',
    deliverables: ['Staging Server Builds', 'API Documentation', 'Clean Code Repository'],
    color: '#22d3ee'
  },
  {
    num: '04',
    title: 'Testing & QA',
    icon: <Shield className="w-5 h-5 text-purple-400" />,
    desc: 'Exhaustive verification loops assessing security keys, speed bottlenecks, Lighthouse scores, and database indexing.',
    deliverables: ['Security Audit Logs', 'Speed Performance Scores', 'QA Testing Report'],
    color: '#a78bfa'
  },
  {
    num: '05',
    title: 'Deployment & Launch',
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    desc: 'Deploying containerized pods on AWS/GCP clusters, configuring SSL certifications, and routing domains safely.',
    deliverables: ['Docker / Kubernetes Configs', 'Cloud VPC Settings', 'Production Release'],
    color: '#22d3ee'
  },
  {
    num: '06',
    title: 'Support & Growth',
    icon: <Award className="w-5 h-5 text-purple-400" />,
    desc: 'Post-launch operations, server budget optimizations, regular feature updates, and database indexing audits.',
    deliverables: ['SRE Server Monitoring', 'Code Maintenance Logs', 'Next Roadmap Plan'],
    color: '#a78bfa'
  }
]

export default function DeliveryProcess() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#050816' }}>
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">01 / Our Blueprint</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
            The Delivery Process
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            How we translate abstract concepts into production-grade systems in 6 linear steps.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Interactive Step Cards */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${isActive ? 'border-cyan-500/30 bg-[#121b2d]/60 shadow-[0_15px_40px_rgba(34,211,238,0.06)]' : 'border-white/5 bg-[#121b2d]/10 hover:bg-white/[0.02]'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-white/5 text-slate-400 border border-white/5'}`}>
                        {step.num}
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{step.title}</h3>
                    </div>
                    {isActive ? <Zap size={14} className="text-cyan-400 animate-pulse" /> : null}
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3"
                      >
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{step.desc}</p>
                        
                        <div className="space-y-1.5 border-t border-white/5 pt-3">
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold font-mono">Deliverables</div>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((del, i) => (
                              <span key={i} className="py-1 px-3 rounded-full border border-white/5 bg-slate-950/40 text-[10px] text-slate-300 font-semibold">{del}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Right panel: Curved Animated Light Graph */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl border border-white/8 bg-[#0b1023]/40 backdrop-blur-xl p-6 sm:p-8 relative min-h-[460px] flex flex-col justify-between">
              
              {/* Decorative line */}
              <div className="absolute left-[38px] top-[40px] bottom-[40px] w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent" />

              <div className="space-y-8 z-10 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/8">
                    {STEPS[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Active Workflow Stage</span>
                    <h4 className="text-xl font-bold text-white">{STEPS[activeStep].title}</h4>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-white/5 bg-slate-950/40 space-y-4">
                  <div className="text-xs leading-relaxed text-slate-400">
                    "{STEPS[activeStep].desc}"
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-mono">Stage Output Blueprints</div>
                    {STEPS[activeStep].deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-cyan-400 font-semibold">
                        <CheckCircle size={12} />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 flex justify-between items-center border-t border-white/5 pt-4 font-mono">
                <span>Phase ID: RUN_PHASE_{STEPS[activeStep].num}</span>
                <span>Active: 100% Verified</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
