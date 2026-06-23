import Navbar from '../components/Navbar'
import ServicesSection from '../components/services/ServicesSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <ServicesSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
