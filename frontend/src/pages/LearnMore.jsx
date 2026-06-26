import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, Shield, Users, Layers } from 'lucide-react'
import Navbar from '../components/Navbar'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const FONT = 'Space Grotesk, Inter, system-ui'
const BG = '#070B17'

const KF = `
  @keyframes lmGradSweep{0%{background-position:0% 50%}100%{background-position:200% 50%}}
  @keyframes lmParticle{0%,100%{opacity:.15;transform:translateY(0) scale(1)}50%{opacity:.45;transform:translateY(-20px) scale(1.15)}}
  @keyframes lmParticleAlt{0%,100%{opacity:.15;transform:translate(0,0) scale(1)}50%{opacity:.45;transform:translate(15px, 15px) scale(1.1)}}
  @keyframes lmBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
  @keyframes lmGlowSweep{0%{left:-150%}100%{left:150%}}
  @keyframes lmFloatIcon{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-5px) rotate(2deg)}}
  @keyframes lmFloatIconAlt{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(-3deg)}}
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`

const PARTICLES = Array.from({length:18},(_, i)=>({
  id:i, left:`${5+(i*5.3)%88}%`, top:`${5+(i*7.1)%86}%`,
  size:1.2+(i%3)*1.1, dur:`${5+(i%4)*1.5}s`, delay:`${(i*.4)%4}s`,
  anim: i % 2 === 0 ? 'lmParticle' : 'lmParticleAlt',
  color:['#35D0FF','#6C63FF','#A78BFA'][i%3],
}))

/* ── Hero ── */
function LMHero() {
  const ref = useRef(null)
  const inView = useInView(ref,{once:true})
  return (
    <section ref={ref} style={{position:'relative',overflow:'hidden',
      backgroundColor:BG, paddingTop:140, paddingBottom:100}}>
      {PARTICLES.map(p=>(
        <div key={p.id} aria-hidden style={{position:'absolute',left:p.left,top:p.top,
          width:p.size,height:p.size,borderRadius:'50%',background:p.color,
          animation:`${p.anim} ${p.dur} ${p.delay} ease-in-out infinite`,pointerEvents:'none'}}/>
      ))}
      <div style={{pointerEvents:'none',position:'absolute',left:'-8%',top:'-15%',
        width:560,height:560,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(53,208,255,.055) 0%,transparent 65%)',filter:'blur(120px)'}}/>
      <div style={{pointerEvents:'none',position:'absolute',right:'-5%',bottom:0,
        width:500,height:500,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(108,99,255,.055) 0%,transparent 65%)',filter:'blur(110px)'}}/>
      
      <div style={{position:'relative',zIndex:10,maxWidth:800,margin:'0 auto',
        padding:'0 24px',textAlign:'center'}}>
        <motion.p 
          initial={{opacity:0,y:14}} 
          animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.5, ease:[0.22, 1, 0.36, 1]}} 
          style={{fontSize:11,fontWeight:700,
            letterSpacing:'0.35em',textTransform:'uppercase',color:'#35D0FF',
            marginBottom:16,fontFamily:FONT}}
        >
          About Jigyasa Technologies
        </motion.p>
        <motion.h1 
          initial={{opacity:0,y:28}} 
          animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.7,delay:.1, ease:[0.22, 1, 0.36, 1]}}
          style={{fontSize:'clamp(2.4rem,5vw,4rem)',fontWeight:800,color:'#fff',
            lineHeight:1.08,letterSpacing:'-0.02em',fontFamily:FONT,marginBottom:20}}
        >
          We build software that{' '}
          <span style={{backgroundImage:'linear-gradient(90deg,#35D0FF 0%,#6C63FF 38%,#A78BFA 65%,#35D0FF 100%)',
            backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
            backgroundClip:'text',animation:'lmGradSweep 5s linear infinite'}}>
            changes businesses
          </span>
        </motion.h1>
        <motion.p 
          initial={{opacity:0,y:18}} 
          animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.7,delay:.2, ease:[0.22, 1, 0.36, 1]}}
          style={{fontSize:17,color:'rgba(209,217,232,0.75)',lineHeight:1.75,
            fontFamily:FONT,maxWidth:'52ch',margin:'0 auto'}}
        >
          Since 2015, Jigyasa Technologies has partnered with startups and enterprises
          to design, engineer, and grow digital products that drive measurable outcomes.
        </motion.p>

        {/* Bouncing Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ animation: 'lmBounce 2.5s ease-in-out infinite', marginTop: 80 }}
          className="flex justify-center"
        >
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[#35D0FF]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Technology Stack ── */
const TECH_STACK = [
  {
    title: 'Frontend UI',
    subtitle: (
      <>
        HTML5 / SASS /
        <br />
        GSAP
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2z" fill="#E34F26"/>
        <path d="M12 2.2v19.6l6.8-1.9 1.6-17.7z" fill="#F06529"/>
        <path d="M12 9.6H8.5l-.2-3H12V3.8H5.1l.8 9H12v-3.2zm0 6.6l-3.3-.9-.2-2.5H5.3l.4 4.9 6.3 1.7v-3.2z" fill="#EAEAEA"/>
        <path d="M12 9.6v3.2h4.8l-.5 5-4.3 1.2v3.2l6.3-1.7.9-10.9H12zm0-5.8v2.8h6.9l.2-2.8H12z" fill="#FFFFFF"/>
      </svg>
    ),
    color: '#E34F26'
  },
  {
    title: 'Modern SPA',
    subtitle: (
      <>
        React / TypeScript
        <br />
        / Next.js
      </>
    ),
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-16 h-16 mx-auto" fill="none" stroke="#61DAFB" strokeWidth="1.2">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    ),
    color: '#61DAFB'
  },
  {
    title: 'Backend Scale',
    subtitle: (
      <>
        Node.js / Express /
        <br />
        Bun
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 15.5c-1.2 0-2.2-1-2.2-2.2v-4.5h1.8v4.5c0 .2.2.4.4.4h1.1c.2 0 .4-.2.4-.4v-4.5h1.8v4.5c0 1.2-1 2.2-2.2 2.2h-1.3z" fill="#339933" />
      </svg>
    ),
    color: '#339933'
  },
  {
    title: 'Enterprise ERP',
    subtitle: (
      <>
        PHP 8 / Laravel 11
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto" fill="none" stroke="#FF2D20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    color: '#FF2D20'
  },
  {
    title: 'Cloud Native',
    subtitle: (
      <>
        AWS / GCP /
        <br />
        Docker
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#0EA5E9" />
      </svg>
    ),
    color: '#0EA5E9'
  }
]

function TechnologyStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 35, rotate: 1 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section ref={ref} className="py-[140px] relative overflow-hidden" style={{ backgroundColor: BG }}>
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#35D0FF]/3 blur-[140px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[720px] mx-auto mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#35D0FF] mb-4" style={{ fontFamily: FONT }}>
            Technology Stack
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight" style={{ fontFamily: FONT }}>
            Modern Tools for Production-Grade Software
          </h2>
          <p className="mt-4 text-[#9CA7C7] text-[18px] leading-[1.8] max-w-[720px] mx-auto" style={{ fontFamily: FONT }}>
            A production-ready stack selected for speed, stability, and scale.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.title}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.03,
                borderColor: tech.color + '66',
                boxShadow: `0 20px 45px ${tech.color}1d`
              }}
              className="group relative rounded-[24px] border border-white/8 bg-[#121B2D]/55 p-8 text-center backdrop-blur-[20px] transition-all duration-[0.4s] flex flex-col items-center justify-center min-h-[320px] cursor-default overflow-hidden"
            >
              {/* Sliding Glow/Shine Sweep */}
              <div className="absolute top-0 bottom-0 w-[60%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -left-[150%] pointer-events-none group-hover:animate-[lmGlowSweep_1.2s_ease-in-out_forwards]" />
              
              {/* Floating Icon Wrapper */}
              <div 
                style={{ 
                  animation: i % 2 === 0 ? 'lmFloatIcon 5s ease-in-out infinite' : 'lmFloatIconAlt 6s ease-in-out infinite',
                  animationDelay: `${i * 0.3}s`
                }}
                className="mb-6"
              >
                {tech.icon}
              </div>

              <h3 className="text-xl font-extrabold text-white mb-3" style={{ fontFamily: FONT }}>
                {tech.title}
              </h3>
              <p className="text-[#9CA7C7] text-sm leading-relaxed" style={{ fontFamily: FONT }}>
                {tech.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Why Businesses Choose Jigyasa ── */
function WhyBusinessesChooseJigyasa() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: 1 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const cards = [
    {
      icon: Rocket,
      title: 'Fast Execution',
      description: 'We deliver in short development cycles with continuous feedback, helping ideas reach production faster.'
    },
    {
      icon: Shield,
      title: 'Reliable Engineering',
      description: 'Maintainable architecture, secure development practices, and production-ready code from day one.'
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description: 'We work closely with clients throughout the project instead of disappearing after delivery.'
    },
    {
      icon: Layers,
      title: 'Scalable Solutions',
      description: 'Every solution is designed to grow with your business rather than requiring a rebuild later.'
    }
  ]

  return (
    <section
      ref={ref}
      style={{ backgroundColor: '#070B17' }}
      className="py-[140px] relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#35D0FF]/4 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#6C63FF]/4 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[720px] mx-auto mb-16"
        >
          <h2 
            className="font-extrabold text-white tracking-tight leading-tight text-[36px] md:text-[48px] lg:text-[64px]"
            style={{ fontFamily: FONT }}
          >
            Why Businesses Choose Jigyasa
          </h2>
          <p 
            className="mt-6 text-[#9CA7C7] text-[18px] leading-[1.8] max-w-[720px] mx-auto"
            style={{ fontFamily: FONT }}
          >
            Focused on practical engineering, transparent collaboration, and scalable digital solutions.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8"
        >
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: '0 20px 45px rgba(53, 208, 255, 0.18)',
                  borderColor: 'rgba(53, 208, 255, 0.35)',
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="group relative rounded-[28px] border border-white/8 bg-[#121B2D]/55 p-8 md:p-10 backdrop-blur-[20px] cursor-default overflow-hidden"
              >
                {/* Sliding Glow/Shine Sweep */}
                <div className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-[#35D0FF]/10 to-transparent skew-x-12 -left-[150%] pointer-events-none group-hover:animate-[lmGlowSweep_1.1s_ease-in-out_forwards]" />
                
                {/* Subtle border glow overlay */}
                <div className="absolute inset-0 border border-[#35D0FF]/0 rounded-[28px] group-hover:border-[#35D0FF]/15 transition-colors duration-[0.45s]" />
                
                <div className="flex flex-col gap-6">
                  {/* Icon Wrapper with floating animation */}
                  <div 
                    style={{ 
                      animation: i % 2 === 0 ? 'lmFloatIcon 6s ease-in-out infinite' : 'lmFloatIconAlt 5s ease-in-out infinite',
                      animationDelay: `${i * 0.45}s`
                    }}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#35D0FF] group-hover:text-white group-hover:bg-[#35D0FF] transition-all duration-[0.45s] self-start"
                  >
                    <Icon className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-[0.45s]" />
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h3 
                      className="text-2xl font-extrabold text-white"
                      style={{ fontFamily: FONT }}
                    >
                      {card.title}
                    </h3>
                    <p 
                      className="mt-3 text-[#9CA7C7] text-base leading-relaxed"
                      style={{ fontFamily: FONT }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default function LearnMore() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: BG, color: '#F8FAFC' }}>
      <style>{KF}</style>
      <Navbar />
      <LMHero />
      <TechnologyStack />
      <WhyBusinessesChooseJigyasa />
      <CallToAction />
      <Footer />
    </div>
  )
}
