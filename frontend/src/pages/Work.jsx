import Navbar from '../components/Navbar'
import WorkSection from '../components/WorkSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function Work() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <WorkSection />
      <CallToAction />
      <Footer />
    </div>
  )
}
