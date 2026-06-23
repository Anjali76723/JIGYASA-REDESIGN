import Navbar from '../components/Navbar'
import ProcessSection from '../components/ProcessSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Process() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <ProcessSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
