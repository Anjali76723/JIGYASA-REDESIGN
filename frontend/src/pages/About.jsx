import Header from '../components/layout/Header'
import AboutSection from '../components/sections/AboutSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import CTA from '../components/shared/CTA'
import Footer from '../components/layout/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <AboutSection />
      <WhyChooseUs />
      <CTA title="Ready to Work With Us?" subtitle="Let's discuss your project" buttonText="Get in Touch" />
      <Footer />
    </div>
  )
}
