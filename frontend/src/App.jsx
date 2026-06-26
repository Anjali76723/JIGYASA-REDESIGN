import { useState, useCallback, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

import Home       from './pages/Home'
import About      from './pages/About'
import Services   from './pages/Services'
import Work       from './pages/Work'
import CaseStudy  from './pages/CaseStudy'
import Portfolio  from './pages/Portfolio'
import LearnMore  from './pages/LearnMore'
import Industries from './pages/Industries'
import Contact    from './pages/Contact'

import ContactModal from './components/shared/ContactModal'
import {
  useContactModalTrigger,
  markContactModalDismissed,
} from './hooks/useContactModalTrigger'

/* ── Modal context — lets any component open it ── */
const ContactModalContext = createContext(null)
export function useContactModal() {
  return useContext(ContactModalContext)
}

function AppInner() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal  = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => {
    setModalOpen(false)
    markContactModalDismissed()
  }, [])

  /* Auto-trigger: 8s timer OR 50% scroll, once per session */
  useContactModalTrigger(openModal)

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      <Routes>
        <Route path="/"            element={<Home />}       />
        <Route path="/about"       element={<About />}      />
        <Route path="/services"    element={<Services />}   />
        <Route path="/work"        element={<Work />}       />
        <Route path="/work/:slug"  element={<CaseStudy />}  />
        <Route path="/portfolio"   element={<Portfolio />}  />
        <Route path="/learn-more"  element={<LearnMore />}  />
        <Route path="/industries"  element={<Industries />} />
        <Route path="/contact"     element={<Contact />}    />
        {/* Fallback — serve home for any unknown path */}
        <Route path="*"            element={<Home />}       />
      </Routes>

      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
