import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Terminal, Smartphone, PenTool, Cloud, Cpu, TrendingUp, Laptop, 
  Layers, Globe, Settings, Database, Activity, Layout, Eye, 
  Search, Play, RefreshCw, Zap, Shield, ArrowRight, CheckCircle, BarChart2
} from 'lucide-react'

const FONT = 'Space Grotesk, Inter, system-ui'
const PRIMARY_BG = '#050816'

// ── CUSTOM ICONS ──
const Icons = {
  graphics: <PenTool className="w-6 h-6 text-cyan-400" />,
  uiux: <Layout className="w-6 h-6 text-purple-400" />,
  web: <Terminal className="w-6 h-6 text-cyan-400" />,
  mobile: <Smartphone className="w-6 h-6 text-cyan-400" />,
  software: <Database className="w-6 h-6 text-blue-400" />,
  ecommerce: <Globe className="w-6 h-6 text-purple-400" />,
  cms: <Layers className="w-6 h-6 text-cyan-400" />,
  seo: <Search className="w-6 h-6 text-blue-400" />,
  marketing: <BarChart2 className="w-6 h-6 text-cyan-400" />,
  hosting: <Cloud className="w-6 h-6 text-blue-400" />,
  automation: <Cpu className="w-6 h-6 text-purple-400" />
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('all')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Track global scroll for parallax elements
  const { scrollY } = useScroll()
  const yParallax1 = useTransform(scrollY, [0, 2000], [0, -100])
  const yParallax2 = useTransform(scrollY, [0, 2000], [0, 80])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Deliverables hover state management
  const [hoveredDeliverable, setHoveredDeliverable] = useState(null)

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full pt-36 pb-32 overflow-hidden" 
      style={{ backgroundColor: PRIMARY_BG, color: '#fff' }}
    >
      
      {/* ── STYLING KEYFRAMES ── */}
      <style>{`
        @keyframes sweepGrad {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes floatSpheres {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.1); }
        }
        @keyframes floatGlass {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(1.5deg); }
        }
        .gradient-title-sweep {
          background-image: linear-gradient(90deg, #22D3EE 0%, #6366F1 42%, #A78BFA 72%, #22D3EE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sweepGrad 6s linear infinite;
        }
        .glow-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.12;
          pointer-events: none;
          z-index: 1;
        }
        .glass-panel-glow {
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.05), inset 0 0 12px rgba(255, 255, 255, 0.03);
        }
      `}</style>

      {/* ── BACKGROUND LAYERS ── */}
      {/* Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />
      
      {/* Noise Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

      {/* Glow Orbs */}
      <div className="glow-orb -top-40 -left-40 bg-cyan-500 animate-[floatSpheres_9s_ease-in-out_infinite]" />
      <div className="glow-orb bottom-20 -right-40 bg-purple-600 animate-[floatSpheres_11s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }} />

      {/* Mouse Reactive Spotlight */}
      <div 
        className="pointer-events-none absolute rounded-full bg-cyan-500/5 blur-[120px] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-75 hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── HERO HEADER AREA ── */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-10 pb-20">
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
            <span className="gradient-title-sweep">That Power Modern Businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#9CA7C7] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            We transform vision into production-grade systems. Explore our 11 core capabilities below, structured in custom interactive layouts.
          </motion.p>
        </div>

        {/* ── FLOATING ANCHOR NAVIGATION BAR ── */}
        <div className="sticky top-20 z-40 flex justify-center py-6 mb-16">
          <div className="inline-flex flex-wrap justify-center items-center gap-2 p-1.5 rounded-full border border-white/8 bg-[#0b1023]/60 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'block-staggered', label: 'Design' },
              { id: 'block-bento', label: 'Engineering' },
              { id: 'block-stacked', label: 'Storefronts & CMS' },
              { id: 'block-growth', label: 'Marketing & SEO' },
              { id: 'block-timeline', label: 'Cloud & Automation' }
            ].map(tab => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    if (tab.id !== 'all') {
                      const el = document.getElementById(tab.id)
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  }}
                  className={`relative py-2 px-5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {active && (
                    <motion.div 
                      layoutId="navTabBg"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/25 border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            BLOCK 1: STAGGERED STORY LAYOUT (Design Division)
        ─────────────────────────────────────────────────────────── */}
        <div id="block-staggered" className="space-y-24 py-16 scroll-mt-28">
          
          <div className="flex flex-col gap-3 text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">01 / Design Studio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>Graphics & Interface Frameworks</h2>
          </div>

          {/* Graphics & Web Designing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative rounded-[32px] overflow-hidden border border-white/10 p-2 bg-[#081221]/50 backdrop-blur-md group"
            >
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" 
                alt="Graphics Designing" 
                className="w-full h-80 sm:h-96 object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />
            </motion.div>

            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8">{Icons.graphics}</div>
                <h3 className="text-2xl sm:text-3xl font-bold">Graphics & Web Designing</h3>
              </div>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                We craft custom visual assets, design templates, and high-fidelity graphics that define modern brand architectures. From vector shapes to complex layout concepts, our designs communicate luxury.
              </p>
              
              {/* Deliverables accordion panel */}
              <div className="rounded-2xl border border-white/5 bg-[#121B2D]/40 p-5 glass-panel-glow">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-3 font-mono">Core Deliverables (Hover Reveal)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Branding Guidelines', desc: 'Detailed typography and logo blueprints.' },
                    { label: 'Vector Icon Sets', desc: 'Custom pixel-perfect brand asset packs.' },
                    { label: 'Web Mockup Boards', desc: 'High-density visual layouts ready for export.' },
                    { label: 'Social Media Kits', desc: 'Optimized layouts matching platform grids.' }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      onMouseEnter={() => setHoveredDeliverable(`graphics-${idx}`)}
                      onMouseLeave={() => setHoveredDeliverable(null)}
                      className="p-3 rounded-xl border border-white/5 bg-slate-950/20 hover:border-cyan-500/30 hover:bg-cyan-950/5 transition-all duration-300 relative cursor-default overflow-hidden"
                    >
                      <div className="font-semibold text-xs text-white">{item.label}</div>
                      <AnimatePresence>
                        {hoveredDeliverable === `graphics-${idx}` && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-cyan-400 mt-1"
                          >
                            {item.desc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/services/graphics-web-design" className="py-3 px-6 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2">
                  View Case Study
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-2">
                  {['Figma', 'Photoshop', 'Illustrator'].map(t => (
                    <span key={t} className="py-1 px-3 rounded-full border border-white/5 bg-white/5 text-[10px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* UI/UX Design & Prototyping */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Desktop layout: content left, image right */}
            <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8">{Icons.uiux}</div>
                <h3 className="text-2xl sm:text-3xl font-bold">UI/UX Design & Prototyping</h3>
              </div>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Wireframe models, prototype maps, and functional spacing systems designed to keep navigation seamless. Every spacing token and hover state is audited to optimize customer retention.
              </p>
              
              {/* Deliverables flip/hover list */}
              <div className="rounded-2xl border border-white/5 bg-[#121B2D]/40 p-5 glass-panel-glow">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-3 font-mono">Core Deliverables (Hover Reveal)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'User Persona Journeys', desc: 'Logic mapping user navigation goals.' },
                    { label: 'Interactive Figma Flow', desc: 'Clickable layout frames showing transitions.' },
                    { label: 'UX Auditing Metrics', desc: 'Evaluating layout pain points.' },
                    { label: 'Design Tokens & UI kit', desc: 'Complete assets database for production.' }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      onMouseEnter={() => setHoveredDeliverable(`uiux-${idx}`)}
                      onMouseLeave={() => setHoveredDeliverable(null)}
                      className="p-3 rounded-xl border border-white/5 bg-slate-950/20 hover:border-purple-500/30 hover:bg-purple-950/5 transition-all duration-300 relative cursor-default overflow-hidden"
                    >
                      <div className="font-semibold text-xs text-white">{item.label}</div>
                      <AnimatePresence>
                        {hoveredDeliverable === `uiux-${idx}` && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-purple-400 mt-1"
                          >
                            {item.desc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/services/ui-ux-design" className="py-3 px-6 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2">
                  Explore Prototypes
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-2">
                  {['Framer', 'Figma', 'CSS Grid'].map(t => (
                    <span key={t} className="py-1 px-3 rounded-full border border-white/5 bg-white/5 text-[10px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative rounded-[32px] overflow-hidden border border-white/10 p-2 bg-[#081221]/50 backdrop-blur-md group order-1 lg:order-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80" 
                alt="UI/UX Prototyping" 
                className="w-full h-80 sm:h-96 object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            BLOCK 2: ENGINEERING BENTO GRID (Core Software Systems)
        ─────────────────────────────────────────────────────────── */}
        <div id="block-bento" className="py-16 scroll-mt-28">
          <div className="flex flex-col gap-3 text-left mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">02 / Technical Studio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>Core Software & Engineering</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            
            {/* Card 1: Web Development (Spans 2 columns on medium+) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 rounded-[28px] border border-white/8 bg-[#121B2D]/55 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/20 hover:shadow-[0_20px_50px_rgba(34,211,238,0.04)] transition-all duration-300 relative group min-h-[480px]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/8">{Icons.web}</div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 bg-slate-950/50 text-slate-400">Featured System</span>
                </div>
                <h3 className="text-2xl font-extrabold">Web Development</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                  Full-stack web applications compiled for speed. We construct optimized server routing architectures, load data queries instantly, and secure applications with modular compliance scripts.
                </p>

                {/* Key deliverables list */}
                <div className="space-y-2.5 pt-3 border-t border-white/5 max-w-md">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                  {[
                    'API endpoints & secure token gateway routing',
                    'Single Page Application (SPA) loading frames',
                    'Optimized dynamic site database pipelines'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <Link to="/services/web-development" className="text-white hover:text-cyan-400 font-bold text-xs flex items-center gap-2">
                  Launch Details
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-2">
                  {['React', 'Next.js', 'Node.js', 'PostgreSQL'].map(t => (
                    <span key={t} className="py-1 px-2.5 rounded-full border border-white/5 bg-slate-900/60 text-[9px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>

              {/* Card visual background elements */}
              <div className="absolute right-6 top-6 bottom-32 w-1/3 opacity-15 pointer-events-none hidden lg:block border border-white/5 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/10" />
            </motion.div>

            {/* Card 2: Mobile App Development (1 column) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-[28px] border border-white/8 bg-[#121B2D]/55 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-purple-500/20 hover:shadow-[0_20px_50px_rgba(167,139,250,0.04)] transition-all duration-300 group min-h-[480px]"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 w-fit">{Icons.mobile}</div>
                <h3 className="text-2xl font-extrabold">Mobile App Development</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Native iOS/Android and cross-platform React Native solutions engineered to run on hardware nodes smoothly.
                </p>

                {/* Key deliverables list */}
                <div className="space-y-2 pt-3 border-t border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                  {[
                    'Device SDK integrations',
                    'Biometric security configurations',
                    'Offline database data-sync'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <Link to="/services/mobile-app-development" className="text-white hover:text-cyan-400 font-bold text-xs flex items-center gap-2">
                  Launch Details
                  <ArrowRight size={12} />
                </Link>
                <div className="flex flex-wrap gap-1.5">
                  {['React Native', 'Swift', 'Kotlin'].map(t => (
                    <span key={t} className="py-1 px-2 rounded-full border border-white/5 bg-slate-900/60 text-[9px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3: Software Engineering (3 columns wide) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-3 rounded-[28px] border border-white/8 bg-[#121B2D]/55 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row gap-8 justify-between hover:border-blue-500/20 hover:shadow-[0_20px_50px_rgba(99,102,241,0.04)] transition-all duration-300 group min-h-[300px]"
            >
              <div className="space-y-4 md:w-2/3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 w-fit">{Icons.software}</div>
                <h3 className="text-2xl font-extrabold">Software Engineering</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enterprise-grade system design, server architectures, complex database models, and algorithm audits. We engineer core code frameworks where transaction volume and data integrity are vital.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['C#', 'Go', 'Java', 'Python', 'PostgreSQL', 'Redis', 'Docker'].map(t => (
                    <span key={t} className="py-1 px-2.5 rounded-full border border-white/5 bg-slate-900/60 text-[9px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 md:w-1/3">
                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                  {[
                    'Database cluster load systems',
                    'Enterprise microservice schemas',
                    'Container configuration logs'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/services/software-engineering" className="text-white hover:text-cyan-400 font-bold text-xs flex items-center gap-2 pt-6">
                  Verify Architecture Details
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            BLOCK 3: STACKED STICKY GLASS CARDS (E-Commerce & CMS Platforms)
        ─────────────────────────────────────────────────────────── */}
        <div id="block-stacked" className="py-16 scroll-mt-28">
          <div className="flex flex-col gap-3 text-left mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">03 / Storefronts & Platforms</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>E-Commerce & Headless Content Management</h2>
          </div>

          <div className="space-y-12">
            
            {/* Card 1: E-Commerce Development */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-28 rounded-[32px] border border-white/8 bg-[#0B1023]/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row gap-8 items-center text-left"
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/8">{Icons.ecommerce}</div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">E-Commerce Development</h3>
                </div>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  We build lightning-fast web checkout portals, shopping grids, and localized payment solutions. Our storefront architectures keep database load minimal to boost user transactional conversions.
                </p>

                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Custom checkout flows', 'Product catalogs dashboards', 'Stripe processing loops', 'ERP stock synchronization'].map((del, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Link to="/services/ecommerce-development" className="py-3 px-6 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2">
                    Checkout Store Demos
                    <ArrowRight size={12} />
                  </Link>
                  <div className="flex items-center gap-1.5">
                    {['Shopify API', 'Stripe', 'Redux'].map(t => (
                      <span key={t} className="py-1 px-3 rounded-full border border-white/5 bg-white/5 text-[10px] text-slate-400 font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50 p-2 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80" 
                  alt="E-Commerce Development" 
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </motion.div>

            {/* Card 2: CMS Development */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-32 rounded-[32px] border border-white/8 bg-[#0B1023]/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row gap-8 items-center text-left"
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/8">{Icons.cms}</div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">CMS Development</h3>
                </div>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Headless CMS pipelines separating content schemas from frontend displays. Clients easily edit texts, load assets, and adjust layouts without writing code.
                </p>

                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Headless CMS API maps', 'Dynamic custom Gutenberg blocks', 'Strapi/Sanity panel sets', 'Granular user permission models'].map((del, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Link to="/services/cms-development" className="py-3 px-6 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2">
                    CMS Spec Details
                    <ArrowRight size={12} />
                  </Link>
                  <div className="flex items-center gap-1.5">
                    {['Strapi', 'Sanity.io', 'WordPress', 'GraphQL'].map(t => (
                      <span key={t} className="py-1 px-3 rounded-full border border-white/5 bg-white/5 text-[10px] text-slate-400 font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50 p-2 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1548092372-0d1bd40894a3?auto=format&fit=crop&w=800&q=80" 
                  alt="CMS Development" 
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            BLOCK 4: DIGITAL GROWTH HUB (SEO & Marketing Campaigns)
        ─────────────────────────────────────────────────────────── */}
        <div id="block-growth" className="py-16 scroll-mt-28">
          <div className="flex flex-col gap-3 text-left mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">04 / Growth Division</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>SEO Optimization & Digital Campaigns</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
            
            {/* SEO */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 rounded-[28px] border border-white/8 bg-[#121B2D]/55 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 w-fit">{Icons.seo}</div>
                <h3 className="text-2xl font-bold">SEO (Search Engine Optimization)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Lighthouse score speedups, keyword search volume analysis, and clean meta tag schemas. We build structural configurations that index fast and gain search rank placement automatically.
                </p>

                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/20 space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Core Deliverables</div>
                  {['Site speed performance audit', 'Dynamic schema JSON-LD configurations', 'Search ranking keywords blueprints'].map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <Link to="/services/seo" className="text-white hover:text-cyan-400 font-bold text-xs flex items-center gap-2">
                  SEO Checklist Details
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-1.5">
                  {['Lighthouse', 'Schema.org', 'SEMrush'].map(t => (
                    <span key={t} className="py-1 px-2.5 rounded-full border border-white/5 bg-slate-900/60 text-[9px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Digital Marketing */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 rounded-[28px] border border-white/8 bg-[#121B2D]/55 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 w-fit">{Icons.marketing}</div>
                <h3 className="text-2xl font-bold">Digital Marketing</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Campaign setup management, lead generation funnels, paid social pipelines, and live click conversion dashboards. Our metrics focus strictly on reducing client advertising spend.
                </p>

                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/20 space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Core Deliverables</div>
                  {['Paid search advertising setup', 'ROI tracking dashboards', 'Content campaign blueprints'].map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle size={12} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <Link to="/services/digital-marketing" className="text-white hover:text-purple-400 font-bold text-xs flex items-center gap-2">
                  Campaign Portals
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-1.5">
                  {['Google Ads', 'Meta Manager', 'GA4'].map(t => (
                    <span key={t} className="py-1 px-2.5 rounded-full border border-white/5 bg-slate-900/60 text-[9px] text-slate-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            BLOCK 5: CLOUD & AUTOMATION PIPELINE TIMELINE
        ─────────────────────────────────────────────────────────── */}
        <div id="block-timeline" className="py-16 scroll-mt-28">
          <div className="flex flex-col gap-3 text-left mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">05 / Systems Division</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>Cloud Hostings & Business Automations</h2>
          </div>

          <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-16 text-left max-w-4xl mx-auto">
            
            {/* Timeline Line indicator */}
            <div className="absolute left-[-5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent" />

            {/* Cloud & Hosting */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative space-y-4"
            >
              {/* Bullet node */}
              <div className="absolute left-[-32px] sm:left-[-48px] top-2.5 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-950 shadow-[0_0_10px_#22d3ee]" />

              <div className="space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold font-mono">STEP 10 / AWS & GCP PLATFORMS</span>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  Web Hosting & Cloud
                  <span className="p-1 rounded bg-white/5 border border-white/10">{Icons.hosting}</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  Provisioning container clusters, load balancing web nodes, configuring secure VPC routers, and writing Terraform recipes. We manage deployment scales with high SRE monitoring checks.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4 max-w-xl space-y-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {['Terraform IaC deployment files', 'Docker container blueprints', 'Kubernetes scaling setup rules', 'SSL certificate setups'].map((d, i) => (
                    <div key={i} className="flex items-center gap-2 font-semibold">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Link to="/services/web-hosting-cloud" className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 hover:underline">
                  Explore Deployments
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-1.5">
                  {['AWS', 'Docker', 'Terraform'].map(t => (
                    <span key={t} className="py-0.5 px-2 rounded-full border border-white/5 bg-white/5 text-[9px] text-slate-500 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Business Automation */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative space-y-4"
            >
              {/* Bullet node */}
              <div className="absolute left-[-32px] sm:left-[-48px] top-2.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-950 shadow-[0_0_10px_#a78bfa]" />

              <div className="space-y-2">
                <span className="text-[10px] text-purple-400 font-bold font-mono">STEP 11 / WORKFLOW CONNECTOR</span>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  Business Automation
                  <span className="p-1 rounded bg-white/5 border border-white/10">{Icons.automation}</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  Automated scripting, robotic process tasks, spreadsheet sync grids, webhook triggers, and slack messaging integrations. We automate your manual business pipelines to save work hours.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4 max-w-xl space-y-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">Key Deliverables</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-semibold">
                  {['Automated n8n logic charts', 'Private webhook pipelines', 'Database script executors', 'Custom task alert triggers'].map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Link to="/services/business-automation" className="text-xs font-bold text-purple-400 flex items-center gap-1.5 hover:underline">
                  Inspect Automation Bots
                  <ArrowRight size={12} />
                </Link>
                <div className="flex gap-1.5">
                  {['n8n', 'Python', 'Webhooks'].map(t => (
                    <span key={t} className="py-0.5 px-2 rounded-full border border-white/5 bg-white/5 text-[9px] text-slate-500 font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
