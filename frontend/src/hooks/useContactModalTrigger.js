import { useEffect, useCallback } from 'react'

const SESSION_KEY = 'jigyasa_contact_modal_dismissed'

/**
 * useContactModalTrigger
 *
 * Automatically opens the contact modal once per browser session,
 * triggered by whichever fires first:
 *   - 8 seconds on the page
 *   - user has scrolled past 50% of the document height
 *
 * If the user has already dismissed the modal this session
 * (sessionStorage flag set), the hook does nothing.
 *
 * @param {function} openModal  - callback to open the modal
 */
export function useContactModalTrigger(openModal) {
  const tryOpen = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    openModal()
  }, [openModal])

  useEffect(() => {
    /* Already dismissed this session — skip entirely */
    if (sessionStorage.getItem(SESSION_KEY)) return

    /* ── Timer trigger: 8 seconds ── */
    const timer = setTimeout(tryOpen, 8000)

    /* ── Scroll trigger: 50% of page height ── */
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total    = document.documentElement.scrollHeight
      if (scrolled / total >= 0.5) {
        clearTimeout(timer)
        window.removeEventListener('scroll', handleScroll, { passive: true })
        tryOpen()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [tryOpen])
}

/**
 * markContactModalDismissed
 * Call this whenever the user closes the modal so it won't
 * auto-trigger again during the same browser session.
 */
export function markContactModalDismissed() {
  sessionStorage.setItem(SESSION_KEY, '1')
}
