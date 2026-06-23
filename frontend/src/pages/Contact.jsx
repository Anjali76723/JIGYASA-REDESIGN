import Header from '../components/layout/Header'
import ContactInfo from '../components/sections/ContactInfo'
import ContactForm from '../components/sections/ContactForm'
import Footer from '../components/layout/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <ContactInfo />
      <ContactForm />
      <Footer />
    </div>
  )
}
