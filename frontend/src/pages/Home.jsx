import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import FeaturedWork from '../components/sections/FeaturedWork'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/shared/CTA'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <Hero />
      <FeaturedWork />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
