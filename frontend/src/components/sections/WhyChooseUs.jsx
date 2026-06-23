export default function WhyChooseUs() {
  const differentiators = [
    {
      title: "Expert Team",
      description: "Highly skilled professionals with deep expertise in modern technologies"
    },
    {
      title: "Innovation First",
      description: "We stay ahead of trends to deliver cutting-edge solutions"
    },
    {
      title: "Quality Focus",
      description: "Rigorous quality assurance ensures exceptional deliverables"
    },
    {
      title: "Partner Approach",
      description: "We work as an extension of your team, committed to your success"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Jigyasa</h2>
          <p className="text-slate-400 text-lg">What sets us apart from other agencies</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
