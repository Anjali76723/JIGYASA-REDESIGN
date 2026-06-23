import { Link } from 'react-router-dom'

export default function CTA({ title = "Ready to Transform Your Business?", subtitle = "Let's discuss how we can help you achieve your goals", buttonText = "Start a Project", to = "/contact" }) {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <Link 
          to={to}
          className="inline-flex px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
