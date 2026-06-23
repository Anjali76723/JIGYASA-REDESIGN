export default function ContactForm() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Send Us a Message</h2>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Name *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Company</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Your company name"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Service Interest</label>
            <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors">
              <option value="">Select a service</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-apps">Mobile Applications</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="cloud">Cloud Solutions</option>
              <option value="devops">DevOps & Infrastructure</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Project Budget</label>
            <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors">
              <option value="">Select budget range</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k+">$100,000+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Project Details *</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">How Did You Hear About Us?</label>
            <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none transition-colors">
              <option value="">Select an option</option>
              <option value="google">Google Search</option>
              <option value="referral">Referral</option>
              <option value="social">Social Media</option>
              <option value="linkedin">LinkedIn</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
