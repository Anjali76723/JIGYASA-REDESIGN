import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ContactFormContent from './ContactFormContent'

/**
 * ContactModal
 *
 * Props:
 *  - isOpen   {boolean}   whether the modal is visible
 *  - onClose  {function}  called when user dismisses the modal
 */
export default function ContactModal({ isOpen, onClose }) {
  const overlayRef = useRef(null)

  /* ── Delayed unmount so exit animation can finish ── */
  const [mounted, setMounted]  = useState(false)
  const [visible, setVisible]  = useState(false)
  const exitTimer = useRef(null)

  useEffect(() => {
    if (isOpen) {
      clearTimeout(exitTimer.current)
      setMounted(true)
      /* tiny rAF so the enter animation fires after mount */
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
      /* unmount after exit animation completes (260ms) */
      exitTimer.current = setTimeout(() => setMounted(false), 280)
    }
    return () => clearTimeout(exitTimer.current)
  }, [isOpen])

  /* ── Lock body scroll while open ── */
  useEffect(() => {
    if (isOpen) {
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow    = 'hidden'
      document.body.style.paddingRight = `${scrollbarW}px`
    } else {
      document.body.style.overflow    = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow    = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  /* ── Escape key to close ── */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && isOpen) onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  /* ── Click backdrop (not the panel) to close ── */
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  /* Never render on server, never render when not mounted */
  if (typeof document === 'undefined' || !mounted) return null

  const modal = (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes cmBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cmBackdropOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes cmPanelIn {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes cmPanelOut {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(20px) scale(0.97); }
        }
        .cm-backdrop-in  { animation: cmBackdropIn  260ms ease forwards; }
        .cm-backdrop-out { animation: cmBackdropOut 200ms ease forwards; }
        .cm-panel-in     { animation: cmPanelIn     340ms cubic-bezier(.22,1,.36,1) forwards; }
        .cm-panel-out    { animation: cmPanelOut    200ms ease forwards; }
      `}</style>

      {/*
        ── BACKDROP ──────────────────────────────────────────────────────────
        position:fixed keeps it pinned to the viewport regardless of scroll.
        No backdrop-filter blur — a plain very-dark overlay reads much cleaner
        than a blurred-glass look on arbitrary page backgrounds.
        pointer-events:none when closed so it doesn't block interaction.
      */}
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
        className={visible ? 'cm-backdrop-in' : 'cm-backdrop-out'}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         9999,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '24px 16px',
          background:     'rgba(0, 0, 0, 0.88)',
          overflowY:      'auto',
          pointerEvents:  visible ? 'auto' : 'none',
        }}
      >
        {/*
          ── PANEL ───────────────────────────────────────────────────────────
          Solid dark background — no transparency on the card itself.
          max-w-3xl (768 px) gives the two-column form room to breathe.
          margin: auto + flex parent = perfect centering even when taller
          than the viewport (panel scrolls inside the overlay).
        */}
        <div
          className={visible ? 'cm-panel-in' : 'cm-panel-out'}
          style={{
            position:     'relative',
            width:        '100%',
            maxWidth:     '768px',
            margin:       'auto',
            borderRadius: '28px',
            /* Solid opaque dark background — fully legible */
            background:   '#0d1730',
            border:       '1px solid rgba(255,255,255,0.10)',
            boxShadow:    '0 40px 120px rgba(0,0,0,0.70), 0 0 0 1px rgba(99,102,241,0.12), 0 0 80px rgba(99,102,241,0.08)',
            overflow:     'hidden',
          }}
          /* Stop clicks on the panel from bubbling to the backdrop */
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Subtle ambient glow inside card top-left ── */}
          <div
            aria-hidden
            style={{
              pointerEvents: 'none',
              position:      'absolute',
              top:    '-60px',
              left:   '-60px',
              width:  '320px',
              height: '320px',
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
              filter:       'blur(40px)',
              zIndex:       0,
            }}
          />
          <div
            aria-hidden
            style={{
              pointerEvents: 'none',
              position:      'absolute',
              bottom: '-60px',
              right:  '-60px',
              width:  '320px',
              height: '320px',
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
              filter:       'blur(40px)',
              zIndex:       0,
            }}
          />

          {/* ── HEADER BAR ─────────────────────────────────────────────────
              Contains the badge + title on the left and the close button
              on the right — always visible, never off-edge.
          ── */}
          <div
            style={{
              position:       'relative',
              zIndex:         10,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              gap:            '16px',
              padding:        '20px 28px 0',
            }}
          >
            {/* Badge */}
            <span
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '6px 14px',
                borderRadius:   '999px',
                background:     'rgba(34,211,238,0.08)',
                border:         '1px solid rgba(34,211,238,0.22)',
                color:          '#22D3EE',
                fontSize:       '11px',
                fontWeight:     600,
                letterSpacing:  '.06em',
                textTransform:  'uppercase',
                whiteSpace:     'nowrap',
              }}
            >
              <span
                style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: '#22D3EE',
                  animation: 'pulse 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              Let's Build Something Great
            </span>

            {/* ── Close button ── clearly visible, inside the card ── */}
            <button
              onClick={onClose}
              aria-label="Close contact form"
              style={{
                flexShrink:     0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                background:     'rgba(255,255,255,0.06)',
                border:         '1px solid rgba(255,255,255,0.12)',
                color:          'rgba(255,255,255,0.65)',
                cursor:         'pointer',
                transition:     'all 200ms ease',
                outline:        'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background    = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.28)'
                e.currentTarget.style.color         = '#ffffff'
                e.currentTarget.style.boxShadow     = '0 0 0 3px rgba(34,211,238,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background    = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color         = 'rgba(255,255,255,0.65)'
                e.currentTarget.style.boxShadow     = 'none'
              }}
            >
              <svg
                width="14" height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── FORM CONTENT ───────────────────────────────────────────────
              bare=true — skips ContactFormContent's own card wrapper since
              the modal panel IS the card. Fields and logic are identical.
          ── */}
          <div style={{ position: 'relative', zIndex: 10, padding: '8px 28px 28px' }}>
            <ContactFormContent bare />
          </div>

        </div>
      </div>
    </>
  )

  return createPortal(modal, document.body)
}
