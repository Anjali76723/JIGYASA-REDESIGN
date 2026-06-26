import { motion } from 'framer-motion'
import { Terminal, Shield, Cpu, Zap, Code, Database, RefreshCw, Cpu as CpuIcon } from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'

const PROMISES = [
  {
    icon: <Code className="w-5 h-5 text-cyan-400" />,
    title: 'Clean Code Quality Standards',
    desc: 'We follow strict linter rules, configure code compliance scripts, and enforce automated test coverage pipelines on every repository commit.',
    chips: ['TypeScript compliance', 'Automated QA runs', 'Isolated modules']
  },
  {
    icon: <Database className="w-5 h-5 text-purple-400" />,
    title: 'Relational Database Integrity',
    desc: 'We construct clean DB schemas with row-level data isolation, optimized query indexing plans, and safe replication layers.',
    chips: ['PostgreSQL', 'TimescaleDB', 'Query indexing']
  },
  {
    icon: <Shield className="w-5 h-5 text-cyan-400" />,
    title: 'SRE Monitoring & Cloud Security',
    desc: 'Deployment configurations built inside secure VPC containers with continuous Prometheus logging checks and automated failover alerts.',
    chips: ['Prometheus logs', 'Cloud SRE alerts', 'SSL sync configs']
  },
  {
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    title: 'Speed-First Architecture Plans',
    desc: 'Lighthouse scoring optimized dynamically to ensure quick first contentful paint ratios and low bounce rates.',
    chips: ['Lighthouse 95+', 'CDN caching', 'Hydration speeds']
  }
]

export default function TechnicalPromise() {
  return (
    <div className="relative w-full py-24 border-t border-white/5" style={{ backgroundColor: '#050816' }}>
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">03 / Technical Quality</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
            Our Technical Promise
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Four engineering priorities built natively into every system module we deliver.
          </p>
        </div>

        {/* Promise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
          {PROMISES.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="p-6 sm:p-8 rounded-[24px] border border-white/8 bg-[#121b2d]/45 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Highlight sweep overlay */}
              <div className="absolute top-0 left-0 w-full h-full rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(53,208,255,0.025), transparent 60%)' }} />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.chips.map(chip => (
                    <span 
                      key={chip} 
                      className="py-1 px-3 rounded-full border border-white/5 bg-slate-950/40 text-[9px] text-slate-300 font-bold font-mono tracking-wide"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
