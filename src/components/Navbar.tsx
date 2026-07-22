import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useGuestCartStore } from '../store/useGuestCartStore'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useCartStore } from '../store/useCartStore'
import SearchModal from './SearchModal'

const RED = '#C1272D'

export default function Navbar() {
  const { user } = useAuthStore()
  const { items: serverItems } = useCartStore()
  const { items: guestItems } = useGuestCartStore()
  const { isMobile } = useBreakpoint()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const cartCount = user ? serverItems.length : guestItems.length

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'FLAWS Extra', to: '/collections?collection=extra' },
    { label: 'Main Collection', to: '/collections?collection=main' },
    { label: 'About', to: '/about' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: '64px',
        background: scrolled || menuOpen ? 'rgba(10,10,10,0.98)' : 'transparent',
        borderBottom: scrolled || menuOpen ? '1px solid #1a1a1a' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
      }}>

        {/* Left — hamburger on mobile only */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              {menuOpen ? (
                <span style={{ color: '#fff', fontSize: '1.2rem', lineHeight: 1 }}>✕</span>
              ) : (
                <>
                  <span style={{ display: 'block', width: '22px', height: '1px', background: '#fff' }} />
                  <span style={{ display: 'block', width: '22px', height: '1px', background: '#fff' }} />
                  <span style={{ display: 'block', width: '22px', height: '1px', background: '#fff' }} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Center — nav links (desktop) or logo (mobile) */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}>
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: '1.05rem',
                  color: isActive(to) ? RED : '#ffffff',
                  textDecoration: isActive(to) ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

      {/* Right — icon-only actions */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.25rem' }}>

        {!isMobile && (
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            style={iconButtonStyle}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        )}

        <Link to={user ? '/account' : '/login'} aria-label="Account" style={iconButtonStyle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </Link>

        <Link to="/cart" aria-label="Cart" style={{ ...iconButtonStyle, position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8h12l-1 12H7L6 8z" />
            <path d="M9 8V6a3 3 0 016 0v2" />
          </svg>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: RED,
              color: '#fff',
              fontSize: '0.6rem',
              fontWeight: 700,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav >

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

  {
    isMobile && menuOpen && (
      <div style={{
        position: 'sticky',
        top: '64px', left: 0, right: 0, bottom: 0,
        background: '#0a0a0a',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 2rem',
        borderTop: '1px solid #1a1a1a',
        overflowY: 'auto',
      }}>
        {navLinks.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isActive(to) ? RED : '#ffffff',
              textDecoration: 'none',
              padding: '1.25rem 0',
              borderBottom: '1px solid #1a1a1a',
            }}
          >
            {label}
          </Link>
        ))}

        <button
          onClick={() => { setMenuOpen(false); setSearchOpen(true) }}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: '1px solid #1a1a1a',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '1.25rem 0',
            textAlign: 'left',
            width: '100%',
          }}
        >
          Search
        </button>

        <Link
          to={user ? '/account' : '/login'}
          onClick={() => setMenuOpen(false)}
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '1.25rem 0',
            borderBottom: '1px solid #1a1a1a',
          }}
        >
          {user ? (user.name?.split(' ')[0] || 'Account') : 'Login'}
        </Link>
      </div>
    )
  }
    </>
  )
}

const iconButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#ffffff',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
}