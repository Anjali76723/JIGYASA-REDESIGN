import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import FeaturedCaseStudy from "./components/case-study/FeaturedCaseStudy";
import ServicesSection from "./components/services/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import IndustriesSection from "./components/IndustriesSection";
import CallToAction from "./components/CallToAction";


function App() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />
      <Hero />
      <FeaturedCaseStudy />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <IndustriesSection />
      <CallToAction />
   
    </div>
  );
}

export default App;
