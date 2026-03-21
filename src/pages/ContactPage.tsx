import { useState } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function ContactPage() {
  const { isMobile } = useBreakpoint()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return setError('Please fill in all required fields')
    setSending(true)
    setError('')

    try {
      const res = await fetch('https://flaws-production.up.railway.app/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setError('Failed to send message. Please email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '6rem 2rem' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '2rem', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>
            Get in Touch
          </p>
          <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Contact Us
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '6rem', alignItems: 'start' }}>

          {/* Left — Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <p style={labelStyle}>Email</p>
              <a href="mailto:support@flaws.co.za" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>
                support@flaws.co.za
              </a>
            </div>

            <div>
              <p style={labelStyle}>Returns</p>
              <a href="mailto:returns@flaws.co.za" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>
                returns@flaws.co.za
              </a>
            </div>

            <div>
              <p style={labelStyle}>Location</p>
              <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8 }}>
                Johannesburg<br />South Africa
              </p>
            </div>

            <div>
              <p style={labelStyle}>Hours</p>
              <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8 }}>
                Monday – Friday<br />
                9:00 AM – 5:00 PM SAST
              </p>
            </div>

            <div>
              <p style={labelStyle}>Response Time</p>
              <p style={{ fontSize: '0.85rem', color: '#888' }}>
                We respond within 1–2 business days.
              </p>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid #1a1a1a' }}>
              <p style={labelStyle}>Returns Policy</p>
              <a href="/returns" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'underline' }}>
                Read our returns & refund policy →
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {sent ? (
              <div style={{ border: '1px solid #1a1a1a', padding: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: '0.5rem' }}>
                  Message Sent
                </p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>
                  We'll get back to you within 1–2 business days.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="Order enquiry, sizing help, etc."
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={6}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: '0.7rem', color: '#ff6b6b' }}>{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    padding: '1.1rem',
                    background: sending ? '#333' : '#ffffff',
                    color: sending ? '#888' : '#0a0a0a',
                    border: 'none',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#888',
  marginBottom: '0.5rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 1rem',
  background: '#111',
  border: '1px solid #1a1a1a',
  color: '#ffffff',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}