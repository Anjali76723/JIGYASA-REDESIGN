import { useState, useCallback, createContext, useContext } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Process from './pages/Process'
import Industries from './pages/Industries'
import Contact from './pages/Contact'
import ContactModal from './components/shared/ContactModal'
import {
  useContactModalTrigger,
  markContactModalDismissed,
} from './hooks/useContactModalTrigger'

/* ─────────────────────────────────────────────
   Modal context — lets any component open it
───────────────────────────────────────────── */
const ContactModalContext = createContext(null)

export function useContactModal() {
  return useContext(ContactModalContext)
}

/* ─────────────────────────────────────────────
   Inner app — needs to be inside ThemeProvider
   but still needs access to modal state
───────────────────────────────────────────── */
function AppInner() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => setModalOpen(true), [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    markContactModalDismissed()
  }, [])

  /* Auto-trigger: 8 s timer OR 50% scroll, once per session */
  useContactModalTrigger(openModal)

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      <Routes>
        <Route path="/"           element={<Home />}       />
        <Route path="/about"      element={<About />}      />
        <Route path="/services"   element={<Services />}   />
        <Route path="/work"       element={<Work />}       />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/process"    element={<Process />}    />
        <Route path="/industries" element={<Industries />} />
        <Route path="/contact"    element={<Contact />}    />
      </Routes>

      {/* Single modal instance for the entire app */}
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

export default App
