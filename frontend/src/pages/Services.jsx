import Navbar from '../components/Navbar'
import ServicesSection from '../components/services/ServicesSection'
import DeliveryProcess from '../components/services/DeliveryProcess'
import TechnicalPromise from '../components/services/TechnicalPromise'
import FAQSection from '../components/services/FAQSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import { GlowLayer, BeamLayer, DustLayer } from '../components/services/BackgroundLayers'

export default function Services() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#050816', color: '#fff' }}>
      <GlowLayer />
      <BeamLayer />
      <DustLayer />

      <div className="relative z-10">
        <Navbar />
        <ServicesSection />
        <DeliveryProcess />
        <TechnicalPromise />
        <FAQSection />
        <CallToAction />
        <Footer />
      </div>
    </div>
  )
}
