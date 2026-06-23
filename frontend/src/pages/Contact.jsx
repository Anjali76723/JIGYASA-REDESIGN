import Navbar from '../components/Navbar'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  )
}
