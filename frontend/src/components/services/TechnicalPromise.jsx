import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Database, Shield, Zap, Terminal, CheckCircle, ChevronRight, Play } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const PROMISES = [
  {
    icon: <Code className="w-5 h-5" />,
    title: 'Clean Code Quality Standards',
    desc: 'We follow strict linter rules, configure code compliance scripts, and enforce automated test coverage pipelines on every repository commit.',
    chips: ['TypeScript compliance', 'Automated QA runs', 'Isolated modules'],
    color: '#22D3EE'
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: 'Relational Database Integrity',
    desc: 'We construct clean DB schemas with row-level data isolation, optimized query indexing plans, and safe replication layers.',
    chips: ['PostgreSQL', 'TimescaleDB', 'Query indexing'],
    color: '#a78bfa'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'SRE Monitoring & Cloud Security',
    desc: 'Deployment configurations built inside secure VPC containers with continuous Prometheus logging checks and automated failover alerts.',
    chips: ['Prometheus logs', 'Cloud SRE alerts', 'SSL sync configs'],
    color: '#22d3ee'
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Speed-First Architecture Plans',
    desc: 'Lighthouse scoring optimized dynamically to ensure quick first contentful paint ratios and low bounce rates.',
    chips: ['Lighthouse 95+', 'CDN caching', 'Hydration speeds'],
    color: '#a78bfa'
  }
]

export default function TechnicalPromise() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Sub-state for database query logs
  const [sqlLog, setSqlLog] = useState([
    '-- Ready to query relational nodes',
    'EXPLAIN ANALYZE SELECT * FROM transactions WHERE user_id = $1;'
  ])

  // Sub-state for SRE dashboard
  const [uptime, setUptime] = useState(99.982)
  const [cpuUsage, setCpuUsage] = useState(14)

  useEffect(() => {
    const uptimeTimer = setInterval(() => {
      setUptime(u => Math.min(100, Math.max(99.9, Number((u + (Math.random() - 0.5) * 0.002).toFixed(3)))))
    }, 3000)

    const cpuTimer = setInterval(() => {
      setCpuUsage(c => Math.min(90, Math.max(8, c + Math.floor((Math.random() - 0.5) * 6))))
    }, 2000)

    return () => {
      clearInterval(uptimeTimer)
      clearInterval(cpuTimer)
    }
  }, [])

  // Terminal compilation steps
  const testSteps = [
    'eslint --ext .js,.ts src/',
    '✓ 0 lint errors found.',
    'jest --coverage --maxWorkers=2',
    ' PASS  src/tests/gateway.test.ts (4.8s)',
    ' PASS  src/tests/auth.test.ts (3.2s)',
    '✓ All 24 integration tests passed. Coverage: 98.4%'
  ]

  return (
    <div className="relative w-full py-32 border-t border-white/5 overflow-hidden" style={{ backgroundColor: '#050816' }}>
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">03 / Technical Quality</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ fontFamily: FONT }}>
            Our Technical Promise
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Four core engineering priorities built natively into every software module we release.
          </p>
        </div>

        {/* Promise Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Simulated developer cockpit dashboard */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="rounded-3xl border border-white/8 bg-[#0b1023]/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative min-h-[420px] flex flex-col justify-between overflow-hidden text-left font-mono">
              
              {/* Header border */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-mono">
                  {activeIndex === 0 && 'Quality Audit Terminal'}
                  {activeIndex === 1 && 'Database Cluster Console'}
                  {activeIndex === 2 && 'Cloud VPC Telemetry'}
                  {activeIndex === 3 && 'Lighthouse Performance Analyzer'}
                </span>
              </div>

              {/* Dynamic Workspace Container */}
              <div className="flex-1 flex flex-col justify-center text-xs">
                <AnimatePresence mode="wait">
                  {activeIndex === 0 && (
                    <motion.div 
                      key="code"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2.5 text-cyan-400 text-[11px] leading-relaxed"
                    >
                      <div>$ {testSteps[0]}</div>
                      <div className="text-emerald-400 font-semibold">{testSteps[1]}</div>
                      <div>$ {testSteps[2]}</div>
                      <div className="text-slate-400">{testSteps[3]}</div>
                      <div className="text-slate-400">{testSteps[4]}</div>
                      <div className="text-emerald-400 font-bold border-t border-white/5 pt-2 mt-2 flex items-center gap-1.5">
                        <CheckCircle size={12} />
                        {testSteps[5]}
                      </div>
                    </motion.div>
                  )}

                  {activeIndex === 1 && (
                    <motion.div 
                      key="db"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="text-slate-500 text-[10px] leading-relaxed">
                        {sqlLog.map((line, idx) => (
                          <div key={idx}>{line}</div>
                        ))}
                      </div>
                      
                      <div className="p-3 rounded-lg border border-white/5 bg-slate-950/60 text-[11px] text-purple-300 space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-widest font-bold">Query Execution Profile</div>
                        <div>▶ Hash Join  (cost=12.45..423.82 rows=145 width=42)</div>
                        <div>  Index Scan using tr_user_id_idx on transactions...</div>
                        <div className="text-emerald-400 font-bold mt-1.5 flex justify-between">
                          <span>Planning Time: 0.28ms</span>
                          <span>Execution Time: 7.42ms</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeIndex === 2 && (
                    <motion.div 
                      key="sre"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 w-full"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/50 text-center">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider mb-1 font-bold">Service Uptime</span>
                          <span className="text-base font-extrabold text-cyan-400">{uptime}%</span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/50 text-center">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider mb-1 font-bold">Container Load</span>
                          <span className="text-base font-extrabold text-purple-400">{cpuUsage}% CPU</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-white/5 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                          <span>Kubernetes Pod: vpc-auth-deploy</span>
                        </div>
                        <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">Optimal</span>
                      </div>
                    </motion.div>
                  )}

                  {activeIndex === 3 && (
                    <motion.div 
                      key="speed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-center gap-6">
                        {/* Circle Score meter */}
                        <div className="relative w-20 h-20 rounded-full border-4 border-cyan-400/20 flex items-center justify-center">
                          <svg className="absolute w-full h-full -rotate-90">
                            <circle cx="40" cy="40" r="36" fill="transparent" stroke="#22d3ee" strokeWidth="4" strokeDasharray="226" strokeDashoffset="2.2" />
                          </svg>
                          <span className="text-lg font-bold text-white">99</span>
                        </div>

                        <div className="space-y-1 text-slate-400 text-[11px]">
                          <div className="flex justify-between gap-4"><span>Performance:</span><span className="text-emerald-400 font-bold">99%</span></div>
                          <div className="flex justify-between gap-4"><span>First Contentful Paint:</span><span className="text-emerald-400 font-bold">0.32s</span></div>
                          <div className="flex justify-between gap-4"><span>Time to Interactive:</span><span className="text-emerald-400 font-bold">0.78s</span></div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-white/5 bg-slate-950/60 text-[10px] text-slate-500 leading-snug">
                        Analysis: Bundle.js compiled at 142kb. Fully hydrated SSR container. Edge cached CDN nodes responding in 18ms.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Console logs status */}
              <div className="border-t border-white/5 pt-4 mt-4 text-[10px] text-slate-500 flex justify-between items-center font-mono">
                <span>SYSTEM_STATUS: OK</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              </div>

            </div>
          </div>

          {/* Right Column: Promise Cards */}
          <div className="lg:col-span-6 space-y-4">
            {PROMISES.map((item, idx) => {
              const isActive = activeIndex === idx
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden group text-left cursor-default ${isActive ? 'border-cyan-500/30 bg-[#121B2D]/55 shadow-2xl' : 'border-white/5 bg-[#121B2D]/10 hover:border-white/10'}`}
                >
                  {/* Sweep gradient overlay on active */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at top left, rgba(53,208,255,0.035), transparent 60%)' }} />
                  )}

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-cyan-950/20 text-cyan-400 border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-white/5 text-slate-400 border-white/5'}`}>
                          {item.icon}
                        </div>
                        <h3 className={`text-base sm:text-lg font-bold transition-colors ${isActive ? 'text-cyan-400' : 'text-white'}`}>{item.title}</h3>
                      </div>
                      <ChevronRight size={14} className={`text-slate-500 transform transition-transform duration-300 ${isActive ? 'translate-x-1 text-cyan-400' : ''}`} />
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.chips.map(chip => (
                        <span 
                          key={chip} 
                          className="py-1 px-3 rounded-full border border-white/5 bg-slate-950/50 text-[9px] text-slate-400 font-bold font-mono tracking-wide"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
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
