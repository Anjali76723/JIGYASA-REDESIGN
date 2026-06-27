import { useMemo } from 'react'

export function GlowLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes slowOrbitCyan {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.08); }
        }
        @keyframes slowOrbitPurple {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, 40px) scale(1.05); }
        }
        @keyframes slowOrbitIndigo {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 50px) scale(1.07); }
        }
      `}</style>

      {/* Layer 2: Large Blurred Cyan Glow */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/6 blur-[130px] animate-[slowOrbitCyan_24s_infinite_ease-in-out]" 
        style={{ top: '8%', left: '3%', willChange: 'transform' }}
      />

      {/* Layer 3: Large Blurred Purple Glow */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[160px] animate-[slowOrbitPurple_28s_infinite_ease-in-out]" 
        style={{ top: '42%', right: '2%', willChange: 'transform' }}
      />

      {/* Extra Subtle Indigo Glow */}
      <div 
        className="absolute w-[750px] h-[750px] rounded-full bg-indigo-500/5 blur-[140px] animate-[slowOrbitIndigo_32s_infinite_ease-in-out]" 
        style={{ bottom: '10%', left: '8%', willChange: 'transform' }}
      />
    </div>
  )
}

export function BeamLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes diagonalSweep1 {
          0%, 100% { transform: translateX(-40px) translateY(-10px) rotate(35deg); opacity: 0.04; }
          50% { transform: translateX(40px) translateY(10px) rotate(37deg); opacity: 0.12; }
        }
        @keyframes diagonalSweep2 {
          0%, 100% { transform: translateX(30px) translateY(10px) rotate(33deg); opacity: 0.03; }
          50% { transform: translateX(-30px) translateY(-10px) rotate(35deg); opacity: 0.10; }
        }
        @keyframes verticalSweep {
          0%, 100% { transform: translateX(-50px) scaleX(0.95); opacity: 0.03; }
          50% { transform: translateX(50px) scaleX(1.05); opacity: 0.08; }
        }
      `}</style>

      {/* Diagonal Beam 1: Cyan Soft streak */}
      <div 
        className="absolute top-[8%] left-[10%] w-[4px] h-[550px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent rotate-[35deg] filter blur-[4px] animate-[diagonalSweep1_18s_infinite_ease-in-out]" 
        style={{ willChange: 'transform, opacity' }} 
      />

      {/* Diagonal Beam 2: Purple Soft streak */}
      <div 
        className="absolute top-[48%] right-[15%] w-[3px] h-[600px] bg-gradient-to-b from-transparent via-purple-400/25 to-transparent rotate-[34deg] filter blur-[3px] animate-[diagonalSweep2_24s_infinite_ease-in-out]" 
        style={{ animationDelay: '3s', willChange: 'transform, opacity' }} 
      />

      {/* Wide Vertical Wave 1: Soft Cyan/Blue */}
      <div 
        className="absolute top-[20%] left-[25%] w-[320px] h-[900px] bg-gradient-to-r from-transparent via-cyan-500/4 to-transparent filter blur-[90px] animate-[verticalSweep_28s_infinite_ease-in-out]" 
        style={{ willChange: 'transform, opacity' }} 
      />

      {/* Wide Vertical Wave 2: Soft Purple/Indigo */}
      <div 
        className="absolute top-[55%] right-[20%] w-[380px] h-[1000px] bg-gradient-to-r from-transparent via-purple-600/3 to-transparent filter blur-[100px] animate-[verticalSweep_32s_infinite_ease-in-out]" 
        style={{ animationDelay: '5s', willChange: 'transform, opacity' }} 
      />
    </div>
  )
}

export function DustLayer() {
  const particles = useMemo(() => {
    // Brand colored subtle dust dots
    const COLORS = ['#22D3EE', '#3B82F6', '#A78BFA']
    return Array.from({ length: 180 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.4,
      delay: Math.random() * -15,
      duration: 15 + Math.random() * 20,
      opacity: 0.05 + Math.random() * 0.12,
      color: COLORS[i % COLORS.length]
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes dustDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: var(--max-opacity, 0.12); }
          85% { opacity: var(--max-opacity, 0.12); }
          100% { transform: translateY(-90px) translateX(15px); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            '--max-opacity': p.opacity,
            animation: `dustDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  )
}
