import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Search, PenTool, Terminal, Shield, Zap, Award, Check } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const STEPS = [
  {
    num: '01',
    phase: 'Discovery',
    title: 'Strategy & Mapping',
    desc: 'We research market trends, map your business workflows, define functional scopes, and design the software architecture roadmap.',
    deliverables: ['Workflow Diagrams', 'Scope of Work Blueprint', 'Architecture Map'],
    icon: <Search className="w-5 h-5 text-cyan-400" />,
    color: '#22D3EE'
  },
  {
    num: '02',
    phase: 'Design',
    title: 'High-Fidelity Mockups & Prototypes',
    desc: 'Creating interactive Figma visual layouts and responsive layout sheets to validate client usability and aesthetic alignment.',
    deliverables: ['Clickable Prototype', 'Design Token System', 'Component Style Guide'],
    icon: <PenTool className="w-5 h-5 text-purple-400" />,
    color: '#a78bfa'
  },
  {
    num: '03',
    phase: 'Development',
    title: 'Agile Coding & Staging',
    desc: 'We compile clean, fully tested and typed code. We schedule weekly staging updates so you can test features in real sprint iterations.',
    deliverables: ['Live Staging Server Builds', 'API Documentation', 'Clean Git Repository'],
    icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    color: '#22D3EE'
  },
  {
    num: '04',
    phase: 'Testing',
    title: 'QA, Speed & Security Auditing',
    desc: 'Exhaustive verification loops assessing security keys, speed bottlenecks, Lighthouse scores, and database indexing.',
    deliverables: ['Security Audit Logs', 'Speed Performance Scores', 'QA Testing Report'],
    icon: <Shield className="w-5 h-5 text-purple-400" />,
    color: '#a78bfa'
  },
  {
    num: '05',
    phase: 'Deployment',
    title: 'Cloud Cluster Orchestration',
    desc: 'Deploying containerized pods on AWS/GCP clusters, configuring SSL certifications, and routing domain channels safely.',
    deliverables: ['Docker / Kubernetes Configs', 'Cloud VPC Settings', 'Production Release'],
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    color: '#22D3EE'
  },
  {
    num: '06',
    phase: 'Support',
    title: 'Post-Launch Tuning & SRE Monitoring',
    desc: 'Post-launch operations, server budget optimizations, regular security upgrades, and database index audits.',
    deliverables: ['SRE Server Monitoring', 'Code Maintenance Logs', 'Next Roadmap Plan'],
    icon: <Award className="w-5 h-5 text-purple-400" />,
    color: '#a78bfa'
  }
]

export default function DeliveryProcess() {
  const containerRef = useRef(null)
  
  // Track scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smooth scroll line progress
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-32 border-t border-white/5 overflow-hidden" 
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Dynamic keyframe for floating blob */}
      <style>{`
        @keyframes floatingBlobProcess {
          0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.05; }
          50% { transform: translate(-45%, -20px) scale(1.1); opacity: 0.15; }
        }
      `}</style>
      
      {/* Background glowing blob */}
      <div 
        className="absolute top-1/4 left-1/2 w-[550px] h-[550px] bg-cyan-500 rounded-full blur-[130px] pointer-events-none animate-[floatingBlobProcess_12s_ease-in-out_infinite]"
        style={{ transform: 'translateX(-50%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-28 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">02 / Execution Roadmap</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ fontFamily: FONT }}>
            Delivery Process
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            How we translate abstract business rules into high-value production systems.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Track lines (Desktop) */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-white/5 -translate-x-1/2 z-0" />
          
          {/* Glowing animated line fill */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent -translate-x-1/2 z-0"
          />

          {/* Steps List */}
          <div className="space-y-20 relative z-10">
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0
              
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-stretch justify-center relative w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Node Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1.2, opacity: 1 }}
                      viewport={{ once: false, margin: "-100px" }}
                      className="w-8 h-8 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                      style={{ borderColor: step.color }}
                    >
                      <span className="text-[10px] font-bold font-mono text-white">{step.num}</span>
                    </motion.div>
                  </div>

                  {/* Left spacer for desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card wrapper */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      whileHover={{ y: -4 }}
                      className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#121B2D]/40 backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300 relative group shadow-xl"
                    >
                      {/* Highlight border sweep */}
                      <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(ellipse at top left, rgba(53,208,255,0.03), transparent 60%)' }} />

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                            {step.icon}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold font-mono tracking-widest uppercase" style={{ color: step.color }}>
                              {step.phase} Phase
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{step.title}</h3>
                          </div>
                        </div>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {step.desc}
                        </p>

                        <div className="border-t border-white/5 pt-4 mt-2">
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block mb-2 font-mono">Outputs</span>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((del, i) => (
                              <span 
                                key={i} 
                                className="py-1 px-3 rounded-full border border-white/5 bg-slate-950/60 text-[10px] text-slate-300 font-semibold flex items-center gap-1.5"
                              >
                                <Check size={8} style={{ color: step.color }} />
                                {del}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </div>
  )
}
