import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import WhyChooseUs from '../components/WhyChooseUs'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <AboutSection />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  )
}
