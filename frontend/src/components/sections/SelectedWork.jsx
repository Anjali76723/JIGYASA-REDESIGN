export default function SelectedWork() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      client: "TechCorp",
      description: "Full-stack e-commerce solution with advanced features"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Apps",
      client: "FinanceHub",
      description: "Secure and intuitive mobile banking application"
    },
    {
      id: 3,
      title: "Healthcare Portal",
      category: "Web Development",
      client: "MediCare Plus",
      description: "Patient management and telemedicine platform"
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      category: "UI/UX Design",
      client: "DataFlow",
      description: "Analytics dashboard with real-time data visualization"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected Work</h2>
          <p className="text-slate-400 text-lg">Featured projects and case studies</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-sm text-indigo-400 font-medium mb-2">{project.category}</div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.client}</p>
              <p className="text-slate-300 text-sm mb-4">{project.description}</p>
              <button className="text-white hover:text-indigo-400 transition-colors text-sm font-medium">
                View Case Study →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
