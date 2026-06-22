import { ThemeProvider } from './context/ThemeContext'
import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import FeaturedCaseStudy from "./components/case-study/FeaturedCaseStudy";
import ServicesSection from "./components/services/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import IndustriesSection from "./components/IndustriesSection";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

function AppContent() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <Hero />
      <FeaturedCaseStudy />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <IndustriesSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
