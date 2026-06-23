export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies like React, Next.js, and Node.js",
      icon: "🌐"
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android",
      icon: "📱"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive and engaging experiences",
      icon: "🎨"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services",
      icon: "☁️"
    },
    {
      title: "DevOps & Infrastructure",
      description: "CI/CD pipelines, automation, and infrastructure management",
      icon: "⚙️"
    },
    {
      title: "Digital Transformation",
      description: "End-to-end digital strategy and implementation",
      icon: "🚀"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-slate-400 text-lg">Comprehensive digital solutions for your business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
