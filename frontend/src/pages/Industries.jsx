import Header from '../components/layout/Header'
import IndustriesSection from '../components/sections/IndustriesSection'
import CTA from '../components/shared/CTA'
import Footer from '../components/layout/Footer'

export default function Industries() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <IndustriesSection />
      <CTA title="Industry-Specific Solutions?" subtitle="Let's discuss your industry needs" buttonText="Get in Touch" />
      <Footer />
    </div>
  )
}
