export default function IndustriesSection() {
  const industries = [
    {
      title: "Healthcare",
      description: "Digital health solutions, patient management systems, and telemedicine platforms",
      icon: "🏥",
      services: ["Web Apps", "Mobile Apps", "Cloud Solutions"]
    },
    {
      title: "Finance",
      description: "Banking applications, fintech solutions, and secure payment systems",
      icon: "💰",
      services: ["Mobile Apps", "Security", "API Integration"]
    },
    {
      title: "E-Commerce",
      description: "Online stores, marketplaces, and inventory management systems",
      icon: "🛒",
      services: ["Web Development", "Payment Gateway", "Analytics"]
    },
    {
      title: "Education",
      description: "Learning management systems, educational apps, and online platforms",
      icon: "🎓",
      services: ["Web Apps", "Mobile Apps", "UI/UX Design"]
    },
    {
      title: "Real Estate",
      description: "Property listing platforms, virtual tours, and management systems",
      icon: "🏠",
      services: ["Web Development", "3D Visualization", "Mobile Apps"]
    },
    {
      title: "Manufacturing",
      description: "IoT solutions, supply chain management, and automation systems",
      icon: "🏭",
      services: ["IoT", "Cloud Solutions", "Data Analytics"]
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
          <p className="text-slate-400 text-lg">Expertise across diverse sectors</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{industry.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{industry.description}</p>
              <div className="flex flex-wrap gap-2">
                {industry.services.map((service, i) => (
                  <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
