import Navbar from '../components/Navbar'
import Hero from '../components/hero/Hero'
import TestimonialsSection from '../components/TestimonialsSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <Hero />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
