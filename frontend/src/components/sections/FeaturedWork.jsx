import { Link } from 'react-router-dom'

export default function FeaturedWork() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      client: "TechCorp",
      results: "300% increase in sales",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      client: "FinanceHub",
      results: "500K+ active users",
      category: "Mobile Apps"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Success Stories</h2>
          <p className="text-slate-400 text-lg">See how we've helped businesses transform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-sm text-indigo-400 font-medium mb-2">{project.category}</div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.client}</p>
              <div className="text-emerald-400 font-semibold mb-4">{project.results}</div>
              <Link to="/work" className="text-white hover:text-indigo-400 transition-colors">
                View Case Study →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/work" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            View All Work →
          </Link>
        </div>
      </div>
    </section>
  )
}
