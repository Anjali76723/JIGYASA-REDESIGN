import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white">
            Jigyasa Technologies
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/services" className="text-slate-300 hover:text-white transition-colors">Services</Link>
            <Link to="/work" className="text-slate-300 hover:text-white transition-colors">Work</Link>
            <Link to="/process" className="text-slate-300 hover:text-white transition-colors">Process</Link>
            <Link to="/industries" className="text-slate-300 hover:text-white transition-colors">Industries</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
          </div>

          <Link 
            to="/contact" 
            className="hidden md:inline-flex px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Start a Project
          </Link>

          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
