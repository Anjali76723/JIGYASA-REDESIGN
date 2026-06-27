import Navbar from '../components/Navbar'
import ServicesSection from '../components/services/ServicesSection'
import DeliveryProcess from '../components/services/DeliveryProcess'
import TechnicalPromise from '../components/services/TechnicalPromise'
import FAQSection from '../components/services/FAQSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050816', color: '#fff' }}>
      <Navbar />
      <ServicesSection />
      <DeliveryProcess />
      <TechnicalPromise />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
