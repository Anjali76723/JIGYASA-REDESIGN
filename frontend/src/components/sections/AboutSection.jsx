export default function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Jigyasa Technologies</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-400 mb-6">
              To empower businesses with innovative digital solutions that drive growth, efficiency, and competitive advantage in the modern marketplace.
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">Our Story</h3>
            <p className="text-slate-400">
              Founded with a passion for technology and innovation, Jigyasa Technologies has grown into a leading digital agency serving clients across multiple industries. We combine technical expertise with creative thinking to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-slate-400 text-sm">Years Experience</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400 text-sm">Happy Clients</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-slate-400 text-sm">Projects Delivered</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-slate-400 text-sm">Team Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
