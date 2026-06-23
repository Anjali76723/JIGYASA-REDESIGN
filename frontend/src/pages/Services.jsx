import Header from '../components/layout/Header'
import ServicesSection from '../components/sections/ServicesSection'
import CTA from '../components/shared/CTA'
import Footer from '../components/layout/Footer'

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <ServicesSection />
      <CTA title="Need a Custom Solution?" subtitle="Let's discuss your specific requirements" buttonText="Get in Touch" />
      <Footer />
    </div>
  )
}
