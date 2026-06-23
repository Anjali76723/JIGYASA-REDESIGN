import Header from '../components/layout/Header'
import ProcessSection from '../components/sections/ProcessSection'
import CTA from '../components/shared/CTA'
import Footer from '../components/layout/Footer'

export default function Process() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <ProcessSection />
      <CTA title="Ready to Start Your Project?" subtitle="Let's begin the journey together" buttonText="Get in Touch" />
      <Footer />
    </div>
  )
}
