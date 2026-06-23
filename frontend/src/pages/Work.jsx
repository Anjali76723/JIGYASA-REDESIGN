import Header from '../components/layout/Header'
import SelectedWork from '../components/sections/SelectedWork'
import CTA from '../components/shared/CTA'
import Footer from '../components/layout/Footer'

export default function Work() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <SelectedWork />
      <CTA title="Have a Project in Mind?" subtitle="Let's bring your vision to life" buttonText="Start a Project" />
      <Footer />
    </div>
  )
}
