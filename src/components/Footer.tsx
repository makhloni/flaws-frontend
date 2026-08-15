import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import flawsLogo from '../assets/flaws-logo.png'

const RED = '#C1272D'

export default function Footer() {
  const { isMobile } = useBreakpoint()

  return (
    <footer style={{ borderTop: '1px solid #1a1a1a', marginTop: '6rem', padding: isMobile ? '3rem 1.5rem 2rem' : '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '2.5rem' : '2rem',
          marginBottom: isMobile ? '3rem' : '4rem',
        }}>

          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
              <img src={flawsLogo} alt="FLAWS" style={{ width: '100px', height: 'auto' }} />
            </Link>
            <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.8, maxWidth: '240px' }}>
              Premium clothing for those who move with intention. Based in South Africa.
            </p>
          </div>

          <div>
            <p style={footerHeading}>Shop</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/collections/flaws-extra" style={footerLink}>FLAWS Extra</Link>
              <Link to="/collections/main-collection" style={footerLink}>Main Collection</Link>
              <Link to="/about" style={footerLink}>About</Link>
            </div>
          </div>

          <div>
            <p style={footerHeading}>Info</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/account" style={footerLink}>My Account</Link>
              <Link to="/orders" style={footerLink}>Orders</Link>
              <Link to="/contact" style={footerLink}>Contact</Link>
              <Link to="/returns" style={footerLink}>Returns & Refunds</Link>
            </div>
          </div>

          <div>
            <p style={footerHeading}>Legal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/terms" style={footerLink}>Terms & Conditions</Link>
              <Link to="/privacy" style={footerLink}>Privacy Policy</Link>
              <Link to="/shipping" style={footerLink}>Shipping & Delivery</Link>
              <Link to="/returns" style={footerLink}>Returns & Refunds</Link>
            </div>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid #1a1a1a',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#555' }}>
            © 2026 <span style={{ color: RED }}>FLAWS</span>. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: '#555' }}>South Africa</p>
        </div>
      </div>
    </footer>
  )
}

const footerHeading: React.CSSProperties = {
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#ffffff',
  marginBottom: '1.25rem',
  fontWeight: 600,
}

const footerLink: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#888',
  textDecoration: 'none',
}