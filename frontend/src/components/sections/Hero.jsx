export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Transform Your{' '}
          <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            Digital Presence
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          We build exceptional digital experiences that drive growth and innovation for businesses worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-flex px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Start a Project
          </a>
          <a 
            href="/work" 
            className="inline-flex px-8 py-4 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  )
}
