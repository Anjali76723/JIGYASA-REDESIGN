import Navbar from '../components/Navbar'
import ServicesSection from '../components/services/ServicesSection'
import DeliveryProcess from '../components/services/DeliveryProcess'
import WhyChooseUsRedesigned from '../components/services/WhyChooseUsRedesigned'
import TechnicalPromise from '../components/services/TechnicalPromise'
import ClientExperience from '../components/services/ClientExperience'
import FAQSection from '../components/services/FAQSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050816', color: '#fff' }}>
      <Navbar />
      <ServicesSection />
      <DeliveryProcess />
      <WhyChooseUsRedesigned />
      <TechnicalPromise />
      <ClientExperience />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
