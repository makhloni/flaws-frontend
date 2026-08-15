import { useBreakpoint } from '../hooks/useBreakpoint'

const RED = '#C1272D'

interface LegalPageLayoutProps {
  eyebrow: string
  title: string
  lastUpdated: string
  intro?: React.ReactNode
  children: React.ReactNode
}

export default function LegalPageLayout({ eyebrow, title, lastUpdated, intro, children }: LegalPageLayoutProps) {
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '6rem 2rem' }}>

        <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '2rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '0.75rem' }}>
            {eyebrow}
          </p>
          <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {title}
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1rem' }}>
            Last updated: {lastUpdated}
          </p>
          {intro && (
            <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8, marginTop: '1.5rem' }}>
              {intro}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '2rem' }}>
      <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
        {title}
      </h2>
      <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {children}
      </div>
    </div>
  )
}

export function LegalList({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.7 }}>{item}</li>
      ))}
    </Tag>
  )
}