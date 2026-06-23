export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Understanding your business goals, requirements, and target audience",
      deliverables: "Requirements document, user personas"
    },
    {
      number: "02",
      title: "Strategy",
      description: "Developing a comprehensive roadmap and technical architecture",
      deliverables: "Project plan, wireframes, tech stack"
    },
    {
      number: "03",
      title: "Design",
      description: "Creating intuitive and visually stunning user interfaces",
      deliverables: "UI designs, prototypes, design system"
    },
    {
      number: "04",
      title: "Development",
      description: "Building robust and scalable solutions with clean code",
      deliverables: "Functional application, API integration"
    },
    {
      number: "05",
      title: "Testing",
      description: "Rigorous quality assurance to ensure flawless performance",
      deliverables: "Test reports, bug fixes, optimization"
    },
    {
      number: "06",
      title: "Launch & Support",
      description: "Deploying to production and providing ongoing support",
      deliverables: "Live deployment, documentation, maintenance"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Process</h2>
          <p className="text-slate-400 text-lg">How we bring your ideas to life</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-4xl font-bold text-indigo-400 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{step.description}</p>
              <div className="text-xs text-slate-500">
                <span className="font-medium">Deliverables:</span> {step.deliverables}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
