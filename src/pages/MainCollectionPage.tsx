import { Link } from 'react-router-dom'

const RED = '#C1272D'

export default function MainCollectionPage() {
  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      paddingTop: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: RED,
          marginBottom: '1rem',
        }}>
          Coming Soon
        </p>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#ffffff',
          marginBottom: '1rem',
        }}>
          We're Still Cooking Main Collection
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
          Something special is on the way. Check back soon.
        </p>
        <Link
          to="/"
          style={{
            padding: '1rem 2.5rem',
            border: '1px solid #ffffff',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}