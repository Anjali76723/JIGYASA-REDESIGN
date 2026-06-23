import Navbar from '../components/Navbar'
import IndustriesSection from '../components/IndustriesSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Industries() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <IndustriesSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
