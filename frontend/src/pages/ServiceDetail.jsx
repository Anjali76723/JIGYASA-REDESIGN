import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, Smartphone, PenTool, Cloud, Cpu, 
  ArrowLeft, ArrowRight, CheckCircle, ChevronRight,
  Globe, Layers, Database, Search, BarChart2, Layout,
  Check, ChevronDown, ChevronUp
} from 'lucide-react'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import { servicesData } from '../data/servicesData'
import { useContactModal } from '../App'

const FONT = 'Space Grotesk, Inter, system-ui'
const PRIMARY_BG = '#050816'

// ── ICON MAP FOR HEADER ──
const ICON_MAP = {
  'graphics-web-designing': <PenTool className="w-8 h-8 text-cyan-400" />,
  'ui-ux-design-prototyping': <Layout className="w-8 h-8 text-purple-400" />,
  'web-development': <Terminal className="w-8 h-8 text-cyan-400" />,
  'mobile-app-development': <Smartphone className="w-8 h-8 text-cyan-400" />,
  'software-engineering': <Database className="w-8 h-8 text-blue-400" />,
  'ecommerce-development': <Globe className="w-8 h-8 text-purple-400" />,
  'cms-development': <Layers className="w-8 h-8 text-cyan-400" />,
  'seo': <Search className="w-8 h-8 text-blue-400" />,
  'digital-marketing': <BarChart2 className="w-8 h-8 text-cyan-400" />,
  'web-hosting-cloud': <Cloud className="w-8 h-8 text-blue-400" />,
  'business-automation': <Cpu className="w-8 h-8 text-purple-400" />
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const { openModal } = useContactModal()
  const [expandedCards, setExpandedCards] = useState({})
  
  const toggleCard = (idx) => {
    setExpandedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }
  
  // Resolve service details from Central Data file
  const service = servicesData.find(s => s.slug === slug) || servicesData[2] // Fallback to web-dev
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  return (
    <div className="relative" style={{ minHeight: '100vh', backgroundColor: PRIMARY_BG, color: '#fff', overflowX: 'hidden' }}>
      
      {/* Dynamic Keyframes for background animations */}
      <style>{`
        @keyframes detailSweep {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.35; }
        }
        @keyframes floatingBlobDetail {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-40px) scale(1.1) rotate(180deg); }
        }
        @keyframes floatingBlobDetailSlow {
          0%, 100% { transform: translateY(0) scale(1.1) rotate(0deg); }
          50% { transform: translateY(40px) scale(0.9) rotate(-180deg); }
        }
        .text-gradient {
          background-image: linear-gradient(90deg, #22D3EE 0%, #6366F1 45%, #A78BFA 75%, #22D3EE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: detailSweep 6s linear infinite;
        }
        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 1;
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

      {/* Floating background gradient blobs */}
      <div 
        className="absolute top-[10%] left-[-150px] w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none animate-[floatingBlobDetail_15s_ease-in-out_infinite] z-0" 
        style={{ backgroundColor: service.color || '#22D3EE', opacity: 0.12 }}
      />
      <div 
        className="absolute top-[45%] right-[-150px] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none animate-[floatingBlobDetailSlow_20s_ease-in-out_infinite] z-0" 
        style={{ backgroundColor: '#6366F1', opacity: 0.10 }}
      />
      <div 
        className="absolute bottom-[20%] left-[-100px] w-[550px] h-[550px] rounded-full blur-[135px] pointer-events-none animate-[floatingBlobDetail_22s_ease-in-out_infinite] z-0" 
        style={{ backgroundColor: service.color || '#A78BFA', opacity: 0.12 }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      
      {/* Noise Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

      <Navbar />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden z-10">
        
        {/* Glow Spheres */}
        <div className="ambient-glow -top-32 -left-20" style={{ background: `radial-gradient(circle, ${service.glowColor || 'rgba(34,211,238,0.1)'} 0%, transparent 70%)` }} />
        <div className="ambient-glow bottom-0 -right-20" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

        {/* Floating Bubble particles */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            aria-hidden
            style={{
              position: 'absolute',
              width: `${12 + (i * 8)}px`,
              height: `${12 + (i * 8)}px`,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#22D3EE' : '#6366F1',
              left: `${15 + (i * 14) % 70}%`,
              top: `${20 + (i * 12) % 60}%`,
              animation: `floatBubble ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              pointerEvents: 'none'
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Back button */}
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-wider mb-8"
          >
            <ArrowLeft size={14} />
            Back to All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                  {ICON_MAP[service.slug]}
                </div>
                <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-400 font-mono">Service Details</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]" style={{ fontFamily: FONT }}>
                {service.title}
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-gradient leading-snug">
                {service.tagline}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {service.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="py-1 px-3.5 rounded-full border border-white/8 bg-[#121B2D]/40 text-xs font-semibold text-slate-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <button 
                  onClick={openModal}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 shadow-[0_4px_20px_rgba(34,211,238,0.25)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Start Project
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-[32px] filter blur-xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-[#081221]/45 backdrop-blur-xl overflow-hidden p-2 shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-80 object-cover rounded-[24px] hover:scale-105 transition-transform duration-[1000ms] ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-1">Production Asset</div>
                  <div className="text-sm font-bold text-white font-sans">{service.title} Model</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW SECTION ── */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-[#081221]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">Overview</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
            {service.sectionTitle}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {service.sectionContent}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full mt-4" />
        </div>
      </section>

      {/* ── 3. LARGE IMAGE + CONTENT ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual Mockup / Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-3xl filter blur-xl" />
              <div className="relative rounded-3xl border border-white/10 bg-[#081221]/45 backdrop-blur-xl overflow-hidden p-2 shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-96 object-cover rounded-2xl hover:scale-105 transition-transform duration-[1000ms] ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-1">Architecture Preview</div>
                  <div className="text-sm font-bold text-white font-sans">{service.title} Systems Visual</div>
                </div>
              </div>
            </div>

            {/* Right Column: Key description details */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">Service Scope</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
                Engineered for Performance
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
              
              <div className="p-6 rounded-2xl border border-white/5 bg-[#121B2D]/40 backdrop-blur-sm space-y-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-widest">Target Parameters</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Responsive Interfaces</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Optimized Assets</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Stable Architectures</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Security Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURE TIMELINE (REDESIGNED CAPABILITIES) ── */}
      <section className="py-24 bg-[#081221]/30 border-y border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
              Features & Highlights
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore our core capabilities, structured to outline direct execution focus. Click any card to expand its Key Deliverables.
            </p>
          </div>

          <div className="relative">
            {/* Center connector line */}
            <div className="absolute top-0 bottom-0 left-4 lg:left-1/2 w-0.5 bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/30 -translate-x-[50%] z-0" />

            <div className="space-y-12">
              {service.highlights.map((h, idx) => {
                const isLeft = idx % 2 === 0
                const isExpanded = !!expandedCards[idx]
                const stepNum = String(idx + 1).padStart(2, '0')

                return (
                  <div key={idx} className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-full min-h-[160px]">
                    
                    {/* Node Dot */}
                    <div className="absolute left-4 lg:left-1/2 -translate-x-[50%] z-20 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 rounded-full bg-[#050816] border-2 flex items-center justify-center text-xs font-bold font-mono shadow-lg transition-all duration-300 cursor-pointer"
                        style={{ 
                          borderColor: isExpanded ? '#22D3EE' : 'rgba(255, 255, 255, 0.15)',
                          color: isExpanded ? '#22D3EE' : '#fff',
                          boxShadow: isExpanded ? '0 0 15px rgba(34, 211, 238, 0.25)' : 'none'
                        }}
                        onClick={() => toggleCard(idx)}
                      >
                        {stepNum}
                      </motion.div>
                    </div>

                    {/* Timeline side cards */}
                    <div className={`w-full lg:w-[45%] pl-12 lg:pl-0 ${isLeft ? 'order-1 lg:text-right' : 'order-2 lg:order-1 hidden lg:block'}`} />

                    {/* Card container */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => toggleCard(idx)}
                      className={`w-full lg:w-[45%] pl-12 lg:pl-0 order-2 ${isLeft ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'} z-10 cursor-pointer group`}
                    >
                      <div className="relative p-6 sm:p-8 rounded-3xl border border-white/8 bg-[#121B2D]/40 backdrop-blur-xl hover:border-cyan-400/30 hover:shadow-[0_20px_50px_rgba(34,211,238,0.06)] transition-all duration-300 flex flex-col justify-between sheen-sweep shadow-2xl">
                        
                        <div className="space-y-3 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase font-mono">Capability {stepNum}</span>
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                              {isExpanded ? 'Hide Deliverables' : 'Show Deliverables'}
                              <ChevronDown size={12} className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                            {h.title}
                          </h3>

                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            {h.desc}
                          </p>
                        </div>

                        {/* Expandable Key Deliverables Drawer */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-white/5 text-left space-y-3">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-400/80 font-mono block">Key Deliverables</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {service.keyDeliverables.map((del, dIdx) => (
                                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300 font-semibold">
                                      <Check size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                                      <span>{del}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Glow effect on hover */}
                        <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.02), transparent 60%)' }} />
                      </div>
                    </motion.div>

                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. SUPPORTING INFORMATION ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">Ecosystem</span>
            <h3 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
              Our Technology Stack
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We leverage production-grade developer libraries and infrastructure tools designed for performance, stability, and speed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {service.tags.map((tech) => (
              <span 
                key={tech} 
                className="py-3 px-6 rounded-2xl border border-white/8 bg-[#121B2D]/55 text-slate-300 font-bold text-sm tracking-wide hover:border-cyan-500/30 hover:text-white transition-all duration-300 cursor-default font-mono animate-pulse"
                style={{ animationDuration: '4s' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  )
}
