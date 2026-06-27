import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, Smartphone, PenTool, Cloud, Cpu, Globe, 
  Layers, Database, Search, BarChart2, Layout,
  ArrowRight, Check, ChevronDown, ChevronUp, Zap
} from 'lucide-react'
import { servicesData } from '../../data/servicesData'

const FONT = 'Space Grotesk, Inter, system-ui'
const PRIMARY_BG = '#050816'

// Map slugs to corresponding icons
const ICON_MAP = {
  'graphics-web-designing': <PenTool className="w-5 h-5 text-cyan-400" />,
  'ui-ux-design-prototyping': <Layout className="w-5 h-5 text-purple-400" />,
  'web-development': <Terminal className="w-5 h-5 text-cyan-400" />,
  'mobile-app-development': <Smartphone className="w-5 h-5 text-cyan-400" />,
  'software-engineering': <Database className="w-5 h-5 text-blue-400" />,
  'ecommerce-development': <Globe className="w-5 h-5 text-purple-400" />,
  'cms-development': <Layers className="w-5 h-5 text-cyan-400" />,
  'seo': <Search className="w-5 h-5 text-blue-400" />,
  'digital-marketing': <BarChart2 className="w-5 h-5 text-cyan-400" />,
  'web-hosting-cloud': <Cloud className="w-5 h-5 text-blue-400" />,
  'business-automation': <Cpu className="w-5 h-5 text-purple-400" />
}

export default function ServicesSection() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [openDeliverables, setOpenDeliverables] = useState({})

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const toggleDeliverables = (slug) => {
    setOpenDeliverables(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }))
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full pt-36 pb-32 overflow-hidden" 
      style={{ backgroundColor: 'transparent', color: '#fff' }}
    >
      {/* Dynamic Keyframes for background animations */}
      <style>{`
        @keyframes sweep {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes floatingBlob {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.08; }
          50% { transform: translateY(-40px) scale(1.15) rotate(180deg); opacity: 0.22; }
        }
        @keyframes floatingBlobSlow {
          0%, 100% { transform: translateY(0) scale(1.1) rotate(0deg); opacity: 0.06; }
          50% { transform: translateY(40px) scale(0.9) rotate(-180deg); opacity: 0.18; }
        }
        .header-title-gradient {
          background-image: linear-gradient(90deg, #22D3EE 0%, #6366F1 45%, #A78BFA 75%, #22D3EE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sweep 6s linear infinite;
        }
        .glowing-blob {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 1;
        }
        .card-inner-glow {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.02), inset 0 0 12px rgba(255, 255, 255, 0.02);
        }
        .sheen-sweep {
          position: relative;
          overflow: hidden;
        }
        .sheen-sweep::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.04) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          transition: all 0.8s ease;
          opacity: 0;
          pointer-events: none;
        }
        .group:hover .sheen-sweep::after {
          left: 120%;
          opacity: 1;
          transition: all 1.2s ease-out;
        }
      `}</style>

      {/* Grid line overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Noise Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

      {/* Floating Aurora blobs */}
      <div className="glowing-blob -top-24 -left-20 bg-cyan-500/30 animate-[floatingBlob_12s_ease-in-out_infinite]" />
      <div className="glowing-blob top-[40%] right-[-100px] bg-purple-600/25 animate-[floatingBlobSlow_15s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }} />
      <div className="glowing-blob bottom-24 -left-20 bg-indigo-500/20 animate-[floatingBlob_18s_ease-in-out_infinite]" style={{ animationDelay: '5s' }} />

      {/* Mouse spotlight overlay */}
      <div 
        className="pointer-events-none absolute rounded-full bg-cyan-500/5 blur-[120px] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-100 hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ── HERO HEADER AREA ── */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-10 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/35 px-4 py-1.5 bg-cyan-950/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] text-[11px] font-mono font-bold"
          >
            <Zap size={12} className="animate-pulse" />
            VISIONARY DIGITAL PRODUCTION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
            style={{ fontFamily: FONT }}
          >
            End-to-End Digital Solutions<br />
            <span className="header-title-gradient">That Power Modern Businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            We transform vision into production-grade systems. Explore our 11 core capabilities below, structured in custom interactive layouts.
          </motion.p>
        </div>

        {/* ── DYNAMIC SERVICES showcase ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const isDelOpen = !!openDeliverables[service.slug]

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl border border-white/8 bg-[#121B2D]/40 backdrop-blur-xl hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(34,211,238,0.06)] transition-all duration-500 flex flex-col justify-between overflow-hidden p-2 min-h-[500px] card-inner-glow sheen-sweep"
              >
                
                {/* Visual Thumbnail */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/5 bg-slate-900">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1023] via-transparent to-transparent opacity-90" />
                  
                  {/* Floating Icon node */}
                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#050816]/80 border border-white/10 backdrop-blur-md shadow-lg">
                    {ICON_MAP[service.slug]}
                  </div>
                </div>

                {/* Card Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {service.overview}
                    </p>
                  </div>

                  {/* Dynamic interactive deliverables panel */}
                  <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3 transition-all duration-300">
                    <button 
                      onClick={() => toggleDeliverables(service.slug)}
                      className="w-full flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono cursor-pointer hover:text-cyan-400 transition-colors select-none"
                    >
                      <span>Key Deliverables</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] lowercase text-slate-600">(click to toggle)</span>
                        {isDelOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isDelOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-3 border-t border-white/5 mt-2">
                            {service.keyDeliverables.map((del, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300 font-semibold">
                                <Check size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer tags and Link */}
                  <div className="space-y-4 border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="py-0.5 px-2 rounded-full border border-white/5 bg-[#050816]/40 text-[9px] text-slate-400 font-bold font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Link 
                        to={`/services/${service.slug}`}
                        className="text-xs font-bold text-white hover:text-cyan-400 flex items-center gap-1.5 group/link"
                      >
                        Explore Service
                        <ArrowRight size={12} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                </div>

                {/* Spot sweep light inside card */}
                <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.02), transparent 50%)' }} />

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
