import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Jigyasa Technologies</h3>
            <p className="text-slate-400 text-sm">
              Transforming businesses through innovative digital solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link to="/work" className="text-slate-400 hover:text-white transition-colors text-sm">Work</Link></li>
              <li><Link to="/process" className="text-slate-400 hover:text-white transition-colors text-sm">Process</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Web Development</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Mobile Apps</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">UI/UX Design</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Cloud Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Get in Touch</Link></li>
              <li><Link to="/industries" className="text-slate-400 hover:text-white transition-colors text-sm">Industries</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Jigyasa Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
