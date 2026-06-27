import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, Smartphone, PenTool, Cloud, Cpu, 
  ArrowLeft, ArrowRight, CheckCircle, ChevronDown, Plus, 
  Play, RefreshCw, Zap, Server, Network, Layers, Shield,
  Laptop, Globe, Search, Database, BarChart2, Eye, Layout, Settings
} from 'lucide-react'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import { servicesData } from '../data/servicesData'
import { useContactModal } from '../App'

const FONT = 'Space Grotesk, Inter, system-ui'
const PRIMARY_BG = '#050816'

// ── WIDGET 1: GRAPHICS & WEB DESIGNING (VECTORS BLOB CANVAS) ──
function GraphicsBlobVisual() {
  const [shapes, setShapes] = useState([
    { id: 1, type: 'circle', color: 'bg-cyan-500/20 border-cyan-400', size: 'w-16 h-16', top: '10%', left: '20%' },
    { id: 2, type: 'square', color: 'bg-purple-500/20 border-purple-400', size: 'w-20 h-20', top: '40%', left: '50%' },
    { id: 3, type: 'triangle', color: 'bg-blue-500/20 border-blue-400', size: 'w-14 h-14', top: '60%', left: '15%' }
  ])

  const addShape = () => {
    const types = ['circle', 'square', 'triangle']
    const colors = [
      'bg-cyan-500/20 border-cyan-400', 
      'bg-purple-500/20 border-purple-400', 
      'bg-blue-500/20 border-blue-400',
      'bg-emerald-500/20 border-emerald-400'
    ]
    const sizes = ['w-12 h-12', 'w-16 h-16', 'w-20 h-20']
    const newShape = {
      id: Date.now(),
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      top: `${10 + Math.random() * 70}%`,
      left: `${10 + Math.random() * 70}%`
    }
    setShapes([...shapes, newShape])
  }

  return (
    <div className="w-full flex flex-col gap-5 text-left font-mono text-xs">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 h-64 relative overflow-hidden flex items-center justify-center">
        {/* Design Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <AnimatePresence>
          {shapes.map((s) => (
            <motion.div
              key={s.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute border-2 ${s.color} ${s.size} backdrop-blur-sm flex items-center justify-center`}
              style={{ 
                top: s.top, 
                left: s.left,
                borderRadius: s.type === 'circle' ? '50%' : s.type === 'triangle' ? '0 50% 50% 50%' : '12px',
                transform: s.type === 'triangle' ? 'rotate(45deg)' : 'none'
              }}
              drag
              dragConstraints={{ top: 0, left: 0, right: 200, bottom: 150 }}
            >
              <span className="text-[8px] opacity-60">drag</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={addShape}
          className="flex-1 py-3 px-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-semibold hover:bg-cyan-500/10 active:scale-95 transition-all cursor-pointer text-center"
        >
          Inject Vector Object
        </button>
        <button 
          onClick={() => setShapes([])}
          className="py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          Clear Board
        </button>
      </div>
    </div>
  )
}

// ── WIDGET 2: UI/UX DESIGN (PROTOTYPE CONTROLLER) ──
function UIUXPrototypeVisual() {
  const [rounded, setRounded] = useState('rounded-xl')
  const [padding, setPadding] = useState('p-4')
  const [theme, setTheme] = useState('dark')

  return (
    <div className="w-full flex flex-col gap-6 font-sans text-xs text-left">
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => setRounded(rounded === 'rounded-xl' ? 'rounded-none' : rounded === 'rounded-none' ? 'rounded-[24px]' : 'rounded-xl')}
          className="py-2.5 px-3 border border-white/10 rounded-lg hover:bg-white/5 active:scale-95 transition-all text-slate-300 cursor-pointer text-center font-mono"
        >
          Border Radius
        </button>
        <button 
          onClick={() => setPadding(padding === 'p-4' ? 'p-2' : padding === 'p-2' ? 'p-7' : 'p-4')}
          className="py-2.5 px-3 border border-white/10 rounded-lg hover:bg-white/5 active:scale-95 transition-all text-slate-300 cursor-pointer text-center font-mono"
        >
          Spacing Padding
        </button>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="py-2.5 px-3 border border-white/10 rounded-lg hover:bg-white/5 active:scale-95 transition-all text-slate-300 cursor-pointer text-center font-mono"
        >
          Theme Swap
        </button>
      </div>

      <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-8 flex items-center justify-center relative overflow-hidden min-h-[220px]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`${rounded} ${padding} border transition-all duration-300 w-full max-w-sm flex flex-col gap-3 shadow-xl ${theme === 'dark' ? 'bg-[#081221]/95 border-white/10 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'}`}
        >
          <div className="flex justify-between items-center">
            <span className={`text-[10px] font-bold tracking-wider uppercase ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>Visual Blueprint</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>
          <h4 className="text-base font-extrabold tracking-tight leading-tight">Interaction Prototype</h4>
          <p className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Click the buttons above to test dynamic adjustments. Witness how styling attributes alter aesthetic structures instantly.
          </p>

          <div className="flex gap-2 mt-2">
            <span className={`h-1.5 rounded-full flex-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} />
            <span className={`h-1.5 rounded-full flex-1 ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-100'}`} />
            <span className={`h-1.5 rounded-full flex-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} />
          </div>
        </motion.div>
      </div>

      <div className="text-[10px] text-slate-500 flex justify-between items-center px-1 font-mono">
        <span>CSS Class: {rounded} {padding} {theme === 'dark' ? 'bg-dark' : 'bg-light'}</span>
        <span>Component: InteractiveCard.tsx</span>
      </div>
    </div>
  )
}

// ── WIDGET 3: WEB DEVELOPMENT (TERMINAL) ──
function WebTerminalVisual() {
  const [consoleLogs, setConsoleLogs] = useState([
    'System initialization successful.',
    'Ready for production deployment.'
  ])
  const [isCompiling, setIsCompiling] = useState(false)
  const [apiActive, setApiActive] = useState(false)

  const triggerBuild = () => {
    if (isCompiling) return
    setIsCompiling(true)
    setConsoleLogs(prev => [...prev, '$ npm run build'])
    setTimeout(() => setConsoleLogs(prev => [...prev, '> compiling bundle...']), 400)
    setTimeout(() => setConsoleLogs(prev => [...prev, '> modules resolved: 1420 files']), 900)
    setTimeout(() => setConsoleLogs(prev => [...prev, '> bundle.js optimized (142kb)']), 1400)
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, '✓ Build finished successfully in 1.8s!'])
      setIsCompiling(false)
    }, 1800)
  }

  const triggerApi = () => {
    if (apiActive) return
    setApiActive(true)
    setConsoleLogs(prev => [...prev, '$ curl -X GET https://api.jigyasa.io/v1/data'])
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, '✓ Response: 200 OK (45ms)'])
      setApiActive(false)
    }, 1200)
  }

  return (
    <div className="w-full flex flex-col gap-5 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/10 bg-[#081221]/90 shadow-2xl p-4 overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] text-slate-500">terminal@jigyasa-engine: ~</span>
        </div>
        <div className="h-32 overflow-y-auto space-y-1.5 text-cyan-400/90 leading-relaxed pr-2">
          {consoleLogs.map((log, idx) => (
            <div key={idx} className={log.startsWith('✓') ? 'text-emerald-400' : log.startsWith('$') ? 'text-white font-semibold' : ''}>
              {log}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={triggerBuild} disabled={isCompiling} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-semibold hover:bg-cyan-500/10 active:scale-95 transition-all cursor-pointer">
          <Play size={12} className={isCompiling ? 'animate-spin' : ''} />
          Compile Build
        </button>
        <button onClick={triggerApi} disabled={apiActive} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-purple-500/30 bg-purple-950/20 text-purple-400 font-semibold hover:bg-purple-500/10 active:scale-95 transition-all cursor-pointer">
          <Zap size={12} className={apiActive ? 'animate-pulse' : ''} />
          Fetch Live API
        </button>
      </div>
    </div>
  )
}

// ── WIDGET 4: MOBILE APP DEVELOPMENT (IPHONE VIEWPORT) ──
function MobilePhoneVisual() {
  const [activeTab, setActiveTab] = useState('analytics')
  const [counter, setCounter] = useState(1482)

  useEffect(() => {
    const int = setInterval(() => {
      if (activeTab === 'analytics') {
        setCounter(c => c + Math.floor(Math.random() * 3) + 1)
      }
    }, 2000)
    return () => clearInterval(int)
  }, [activeTab])

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      <div className="relative w-60 h-80 rounded-[32px] border-4 border-slate-700 bg-slate-950 shadow-2xl p-2 overflow-hidden flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-3.5 rounded-b-lg bg-slate-700 z-30" />
        
        <div className="w-full h-full rounded-[22px] bg-[#070b17] border border-white/5 overflow-hidden relative flex flex-col justify-between p-3 pt-5 text-white font-sans text-left">
          <div className="flex-1 flex flex-col justify-center">
            {activeTab === 'analytics' ? (
              <div className="space-y-2">
                <span className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Live Installs</span>
                <span className="text-2xl font-extrabold tracking-tight">{counter.toLocaleString()}</span>
                <div className="h-10 flex items-end gap-1">
                  {[20, 40, 30, 50, 70, 45, 60].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-cyan-400" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="font-bold text-purple-300">Security Keys</div>
                <div className="text-[9px] text-slate-400">OAuth Verification Token validated successfully.</div>
              </div>
            )}
          </div>
          
          <div className="border-t border-white/5 pt-1.5 flex justify-around">
            <button onClick={() => setActiveTab('analytics')} className={`text-[9px] cursor-pointer ${activeTab === 'analytics' ? 'text-cyan-400' : 'text-slate-500'}`}>Metrics</button>
            <button onClick={() => setActiveTab('security')} className={`text-[9px] cursor-pointer ${activeTab === 'security' ? 'text-purple-400' : 'text-slate-500'}`}>Security</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── WIDGET 5: SOFTWARE ENGINEERING (FLOW NODES GRAPH) ──
function SoftwareNodesVisual() {
  const [nodesActive, setNodesActive] = useState(false)
  const [log, setLog] = useState('Nodes inactive. Ready for flow audit.')

  const triggerTest = () => {
    if (nodesActive) return
    setNodesActive(true)
    setLog('Initializing structural testing...')
    setTimeout(() => setLog('Client dispatch validated (200 OK)'), 1000)
    setTimeout(() => setLog('Load Balancer route mapped successfully'), 2200)
    setTimeout(() => {
      setLog('PostgreSQL dual-write synced in 8ms.')
      setNodesActive(false)
    }, 3500)
  }

  return (
    <div className="w-full flex flex-col gap-5 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 h-48 relative overflow-hidden flex flex-col justify-between">
        
        {/* Nodes graph lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="50%" x2="50%" y2="25%" stroke={nodesActive ? '#22d3ee' : 'rgba(255,255,255,0.06)'} strokeWidth="1.5" />
          <line x1="50%" y1="25%" x2="85%" y2="50%" stroke={nodesActive ? '#a78bfa' : 'rgba(255,255,255,0.06)'} strokeWidth="1.5" />
        </svg>

        <div className="flex justify-between items-center z-10">
          <div className="p-2 rounded-lg border border-white/10 bg-slate-900 text-[10px]">Client</div>
          <div className="p-2 rounded-lg border border-cyan-400 bg-cyan-950/20 text-cyan-400 text-[10px]">Route Gateway</div>
          <div className="p-2 rounded-lg border border-white/10 bg-slate-900 text-[10px]">Server</div>
        </div>

        <div className="p-2.5 rounded-lg border border-white/5 bg-slate-950/80 text-[10px] text-slate-400">
          <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold mb-0.5">Flow Logs</span>
          <span>{log}</span>
        </div>
      </div>

      <button onClick={triggerTest} disabled={nodesActive} className="w-full py-3 px-4 rounded-xl border border-blue-500/30 bg-blue-950/20 text-blue-400 font-semibold hover:bg-blue-500/10 active:scale-95 transition-all cursor-pointer">
        {nodesActive ? 'Auditing flow...' : 'Run Integration Pipeline Audit'}
      </button>
    </div>
  )
}

// ── WIDGET 6: E-COMMERCE DEVELOPMENT (CHECKOUT BASKET) ──
function EcommerceBasketVisual() {
  const [cartCount, setCartCount] = useState(2)
  const [couponApplied, setCouponApplied] = useState(false)
  
  const discountAmount = couponApplied ? 15.00 : 0.00
  const finalTotal = 120.00 - discountAmount

  return (
    <div className="w-full flex flex-col gap-4 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="font-bold text-white">Digital Cart Dashboard</span>
          <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/30">Items: {cartCount}</span>
        </div>

        <div className="space-y-1.5 text-slate-400 text-[10px]">
          <div className="flex justify-between"><span>Enterprise Plan subscription</span><span>$99.00</span></div>
          <div className="flex justify-between"><span>Advanced API module integration</span><span>$21.00</span></div>
          {couponApplied && <div className="flex justify-between text-emerald-400"><span>Coupon JIGYASA15 discount</span><span>-$15.00</span></div>}
        </div>

        <div className="border-t border-white/5 pt-2 flex justify-between font-bold text-white text-sm">
          <span>Final Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => setCouponApplied(true)} 
          disabled={couponApplied}
          className="py-2.5 px-3 rounded-lg border border-purple-500/30 bg-purple-950/20 text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer text-center"
        >
          Apply Promo Code
        </button>
        <button 
          onClick={() => { setCartCount(0); setCouponApplied(false); }}
          className="py-2.5 px-3 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 transition-all cursor-pointer text-center"
        >
          Empty Cart
        </button>
      </div>
    </div>
  )
}

// ── WIDGET 7: CMS DEVELOPMENT (SCHEMA EDITOR) ──
function CMSEditorVisual() {
  const [contentType, setContentType] = useState('Post')
  const [slugName, setSlugName] = useState('hello-world')

  return (
    <div className="w-full flex flex-col gap-4 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 space-y-3">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Headless Schema Editor</div>
        
        <div className="space-y-2">
          <label className="block text-slate-400 text-[9px] uppercase font-bold">Content Model</label>
          <div className="flex gap-2">
            {['Post', 'Product', 'CaseStudy'].map(type => (
              <button 
                key={type} 
                onClick={() => {
                  setContentType(type)
                  setSlugName(`new-${type.toLowerCase()}-record`)
                }}
                className={`py-1 px-3 rounded border text-[9px] cursor-pointer ${contentType === type ? 'border-cyan-400 bg-cyan-950/20 text-cyan-400' : 'border-white/5 bg-slate-950/50 text-slate-400'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1 bg-slate-950/60 p-2.5 rounded border border-white/5 text-[9px] text-slate-400">
          <div><span className="text-cyan-400">type</span>: <span className="text-purple-400">"{contentType}"</span></div>
          <div><span className="text-cyan-400">slug</span>: <span className="text-purple-400">"{slugName}"</span></div>
          <div><span className="text-cyan-400">status</span>: <span className="text-emerald-400">"draft_active"</span></div>
        </div>
      </div>
    </div>
  )
}

// ── WIDGET 8: SEO (SERP SIMULATOR) ──
function SEORankVisual() {
  const [speedVal, setSpeedVal] = useState(85)
  const [rank, setRank] = useState(8)

  const optimizeSite = () => {
    if (speedVal >= 99) return
    setSpeedVal(99)
    setRank(1)
  }

  return (
    <div className="w-full flex flex-col gap-4 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 space-y-3">
        <div className="flex justify-between items-center text-[10px] text-slate-500">
          <span>Technical Audit</span>
          <span className={speedVal > 90 ? 'text-emerald-400 font-bold' : 'text-yellow-400'}>Lighthouse: {speedVal}/100</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 space-y-1.5">
          <div className="text-cyan-400 font-bold text-[10px]">1. Jigyasa Technologies</div>
          <div className="text-[8px] text-slate-400">https://jigyasatechnologies.com</div>
          <div className="text-[8px] text-slate-500">We build premium, production-grade custom software platforms...</div>
          <div className="text-[9px] text-emerald-400 font-bold">Google SERP Placement: Rank #{rank}</div>
        </div>
      </div>

      <button 
        onClick={optimizeSite} 
        disabled={speedVal >= 99}
        className="w-full py-3 px-4 rounded-xl border border-blue-500/30 bg-blue-950/20 text-blue-400 font-semibold hover:bg-blue-500/10 active:scale-95 transition-all cursor-pointer text-center"
      >
        {speedVal >= 99 ? 'Lighthouse Optimized' : 'Trigger Site-Speed Performance Boost'}
      </button>
    </div>
  )
}

// ── WIDGET 9: DIGITAL MARKETING (CPC CALCULATOR) ──
function MarketingCalculatorVisual() {
  const [budget, setBudget] = useState(150)
  
  const estimatedClicks = Math.floor(budget * 4.2)
  const expectedLeads = Math.floor(estimatedClicks * 0.15)

  return (
    <div className="w-full flex flex-col gap-4 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 space-y-3">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">CPC ROI Campaign Estimator</div>
        
        <div className="space-y-1 text-slate-400">
          <div className="flex justify-between text-[10px]"><span>Daily Marketing Budget</span><span>${budget}/day</span></div>
          <div className="flex justify-between text-[10px]"><span>Estimated Ad Clicks</span><span className="text-cyan-400">{estimatedClicks}</span></div>
          <div className="flex justify-between text-[10px]"><span>Expected Leads Conversion</span><span className="text-purple-400">{expectedLeads}</span></div>
        </div>

        <input 
          type="range" 
          min="50" 
          max="500" 
          value={budget} 
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>
    </div>
  )
}

// ── WIDGET 10: WEB HOSTING & CLOUD (DEPLOY LOGS) ──
function CloudDeployVisual() {
  const [logs, setLogs] = useState(['$ terraform apply', 'Initializing cluster modules...'])
  const [isDeploying, setIsDeploying] = useState(false)

  const startDeploy = () => {
    if (isDeploying) return
    setIsDeploying(true)
    setLogs(prev => [...prev, '$ docker build -t web-app:latest .'])
    setTimeout(() => setLogs(prev => [...prev, '✓ Image created successfully. (42MB)']), 1000)
    setTimeout(() => setLogs(prev => [...prev, '$ kubectl apply -f k8s-deployment.yaml']), 2000)
    setTimeout(() => {
      setLogs(prev => [...prev, '✓ Pod configuration scaled. 3 nodes online.'])
      setIsDeploying(false)
    }, 3200)
  }

  return (
    <div className="w-full flex flex-col gap-4 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 h-36 overflow-y-auto space-y-1.5 text-cyan-400">
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith('✓') ? 'text-emerald-400' : log.startsWith('$') ? 'text-white' : ''}>{log}</div>
        ))}
      </div>
      <button 
        onClick={startDeploy} 
        disabled={isDeploying}
        className="w-full py-3 px-4 rounded-xl border border-blue-500/30 bg-blue-950/20 text-blue-400 font-semibold hover:bg-blue-500/10 active:scale-95 transition-all cursor-pointer"
      >
        {isDeploying ? 'Deploying Container...' : 'Deploy to Kubernetes Cluster'}
      </button>
    </div>
  )
}

// ── WIDGET 11: BUSINESS AUTOMATION (PIPELINE STEP TRACER) ──
function AutomationTracerVisual() {
  const [stepActive, setStepActive] = useState(0)

  const runTest = () => {
    if (stepActive > 0) return
    setStepActive(1)
    setTimeout(() => setStepActive(2), 1200)
    setTimeout(() => setStepActive(3), 2400)
    setTimeout(() => {
      setStepActive(0)
    }, 3800)
  }

  return (
    <div className="w-full flex flex-col gap-4 font-mono text-xs text-left">
      <div className="rounded-2xl border border-white/8 bg-[#081221]/90 p-4 space-y-2">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Automation Pipeline Step Tracer</div>
        
        <div className="space-y-1.5">
          {[
            { id: 1, text: 'Webhook Trigger:PLC_Event' },
            { id: 2, text: 'ML Parser:Extract Risk Level' },
            { id: 3, text: 'Slack Dispatcher:Trigger Alert' }
          ].map(step => (
            <div 
              key={step.id} 
              className={`p-2 rounded border text-[10px] flex justify-between items-center transition-all duration-300 ${stepActive === step.id ? 'border-purple-400 bg-purple-950/20 text-purple-400' : 'border-white/5 bg-slate-950/40 text-slate-500'}`}
            >
              <span>{step.text}</span>
              {stepActive === step.id && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />}
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={runTest} 
        disabled={stepActive > 0}
        className="w-full py-3 px-4 rounded-xl border border-purple-500/30 bg-purple-950/20 text-purple-400 font-semibold hover:bg-purple-500/10 active:scale-95 transition-all cursor-pointer"
      >
        {stepActive > 0 ? 'Automation pipeline running...' : 'Test Webhook Trigger'}
      </button>
    </div>
  )
}

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

// ── WIDGET MAP FOR SIMULATION ──
const WIDGET_MAP = {
  'graphics-web-designing': <GraphicsBlobVisual />,
  'ui-ux-design-prototyping': <UIUXPrototypeVisual />,
  'web-development': <WebTerminalVisual />,
  'mobile-app-development': <MobilePhoneVisual />,
  'software-engineering': <SoftwareNodesVisual />,
  'ecommerce-development': <EcommerceBasketVisual />,
  'cms-development': <CMSEditorVisual />,
  'seo': <SEORankVisual />,
  'digital-marketing': <MarketingCalculatorVisual />,
  'web-hosting-cloud': <CloudDeployVisual />,
  'business-automation': <AutomationTracerVisual />
}

// ── SERVICE DETAIL COMPONENT ──
export default function ServiceDetail() {
  const { slug } = useParams()
  const { openModal } = useContactModal()
  
  // Resolve service details from Central Data file
  const service = servicesData.find(s => s.slug === slug) || servicesData[2] // Fallback to web-dev
  const [activeFaq, setActiveFaq] = useState(null)
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: PRIMARY_BG, color: '#fff', overflowX: 'hidden' }}>
      
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
      `}</style>

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
        {[...Array(6)].map((_, i) => (
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

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                {service.overview}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={openModal}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 shadow-[0_4px_20px_rgba(34,211,238,0.25)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Start Project
                  <ArrowRight size={14} />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('interactive-playground')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all cursor-pointer text-white"
                >
                  Explore Sandbox Simulator
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
                  className="w-full h-80 object-cover rounded-[24px] hover:scale-105 transition-transform duration-700"
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

      {/* ── 2. FEATURES & BENEFITS GRID ── */}
      <section className="py-20 bg-[#081221]/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
              Features Engineered for Impact
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every feature module built by Jigyasa Technologies is verified to drive transactional speed and operational agility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            {service.features.map((f, idx) => (
              <div 
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-[#121B2D]/45 hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(34,211,238,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
                
                {/* Subtle light sweep */}
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(53,208,255,0.03), transparent 60%)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE EXPERIENTIAL WIDGET ── */}
      <section id="interactive-playground" className="py-20 relative z-10">
        <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 60%)' }} />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">Interactive Playground</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
                Experience the Architecture Live
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Interact with the simulation panel on the right. This is a functional prototype of how we structure systems for modern product scale.
              </p>
              
              <div className="space-y-4 pt-2">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 font-sans">
                      <CheckCircle size={10} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{b.title}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Simulator Container */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-[#081221]/65 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-cyan-400/30 px-2.5 py-1 bg-cyan-950/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,208,255,0.8)] animate-pulse" />
                  <span className="text-[9px] font-semibold text-cyan-400 font-mono">Simulator Active</span>
                </div>
                
                {WIDGET_MAP[service.slug]}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. TECHNOLOGY STACK ── */}
      <section className="py-20 bg-[#081221]/30 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
              Our Ecosystem Stack
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We leverage production-grade developer tools designed for performance, stability, and speed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {service.techStack.map((tech) => (
              <span 
                key={tech} 
                className="py-3 px-6 rounded-2xl border border-white/8 bg-[#121B2D]/55 text-slate-300 font-bold text-sm tracking-wide hover:border-cyan-500/30 hover:text-white transition-all duration-300 cursor-default font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS SECTION ── */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 font-mono">Timeline Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
              Our Development Journey
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Structured development steps that transform business requirements into high-value production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative text-left">
            {service.process.map((p, idx) => (
              <div key={idx} className="space-y-4 relative">
                
                {/* Node Line connecting on desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[18px] left-[50%] right-[-50%] h-0.5 bg-gradient-to-r from-cyan-500/30 to-slate-800/10 z-0" />
                )}

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 space-y-3">
                  <span className="w-10 h-10 rounded-full bg-cyan-950/40 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-xs font-bold font-mono shadow-[0_0_12px_rgba(53,208,255,0.15)]">
                    {p.id}
                  </span>
                  <h3 className="text-base font-extrabold text-white">{p.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ SECTION ── */}
      <section className="py-20 bg-[#081221]/30 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: FONT }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Clear, transparent answers to questions regarding integration, stack features, and setup cycles.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {service.faq.map((item, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-[#121B2D]/45 overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-bold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors cursor-pointer select-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} 
                    />
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
                        <div className="p-5 pt-0 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 mt-1 bg-[#050816]/10">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  )
}
