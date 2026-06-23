export default function ContactInfo() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-slate-400 text-lg">Let's discuss your project</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-slate-400 text-sm mb-4">hello@jigyasa.tech</p>
            <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
              Copy Email
            </button>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <p className="text-slate-400 text-sm mb-4">+1 (555) 123-4567</p>
            <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
              Call Now
            </button>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-white font-semibold mb-2">Address</h3>
            <p className="text-slate-400 text-sm mb-4">123 Tech Street, Innovation City</p>
            <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
              Get Directions
            </button>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-4">🕐</div>
            <h3 className="text-white font-semibold mb-2">Business Hours</h3>
            <p className="text-slate-400 text-sm mb-4">Mon - Fri: 9AM - 6PM</p>
            <p className="text-slate-500 text-xs">Weekend: Closed</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-2xl">LinkedIn</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-2xl">Twitter</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-2xl">Instagram</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors text-2xl">GitHub</a>
        </div>
      </div>
    </section>
  )
}
