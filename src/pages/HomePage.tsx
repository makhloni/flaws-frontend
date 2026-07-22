import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useContentStore } from '../store/useContentStore'
import flawsLogo from '../assets/flaws-logo.png'
import flawsExtra from '../assets/Flaws-extra.jpeg'
import mainCollectionImage from '../assets/main-collection.jpg'
import newsletterImage from '../assets/img-2.jpeg'

const RED = '#C1272D'

interface Product {
  id: string
  name: string
  slug: string
  isFeatured: boolean
  createdAt: string
  images: { url: string; isPrimary: boolean }[]
  variants: { price: number; salePrice: number | null }[]
}


export default function HomePage() {
  const { isMobile } = useBreakpoint()
  const { content } = useContentStore()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    axios.get('/products').then((res) => {
      const products: Product[] = res.data
      setAllProducts(products)

      const featuredIds = content?.featured_product_ids
        ? content.featured_product_ids.split(',').filter(Boolean)
        : []
      if (featuredIds.length > 0) {
        const ordered = featuredIds
          .map((id: string) => products.find(p => p.id === id))
          .filter(Boolean) as Product[]
        setFeatured(ordered.length > 0 ? ordered : products.filter(p => p.isFeatured))
      } else {
        setFeatured(products.filter(p => p.isFeatured))
      }
    })
  }, [content])

  const newArrivals = [...allProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>

      {/* Hero - Two Panel Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: 0,
        minHeight: '100svh',
        background: '#0a0a0a',
      }}>

        {/* Left Panel - Lifestyle Image */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: isMobile ? '70svh' : '100svh',
          overflow: 'hidden',
          textAlign: 'center',
          gap: '1.5rem',
        }}>
          <img
            src={flawsExtra}
            alt="FLAWS Extra"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15))',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#ffffff',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '1.5rem',
            }}>
              FLAWS<br />Extra
            </h2>
            <Link to="/collections/flaws-extra" style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#0a0a0a',
              padding: '1rem 2.25rem',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Right Panel - Main Collection Teaser */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: isMobile ? '50svh' : '100svh',
          overflow: 'hidden',
          textAlign: 'center',
          gap: '1.5rem',
          borderLeft: isMobile ? 'none' : `1px solid ${RED}`,
          borderTop: isMobile ? `1px solid ${RED}` : 'none',
        }}>
          <img
            src={mainCollectionImage}
            alt="FLAWS Main Collection"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15))',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <img
              src={flawsLogo}
              alt="FLAWS main collection"
              style={{ width: isMobile ? '160px' : '240px' }}
            />
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: RED,
              marginBottom: '0.5rem',
            }}>
              main collection
            </p>
            <p style={{
              fontSize: isMobile ? '1.3rem' : '1.6rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.05em',
            }}>
              Coming Soon!
            </p>
          </div>
        </div>

      </div>
      {/* Featured Products */}
      {featured.length > 0 && (
        <section style={{ padding: isMobile ? '3rem 1rem' : '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
                Selected Pieces
              </p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Featured
              </h2>
            </div>
            <Link to="/products" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', textDecoration: 'none', borderBottom: '1px solid #888', paddingBottom: '2px' }}>
              View All
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            background: '#1a1a1a',
          }}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals Carousel */}
      {newArrivals.length > 0 && (
        <ProductCarousel
          title="New Arrivals"
          eyebrow="Just Landed"
          products={newArrivals}
          isMobile={isMobile}
        />
      )}
      {/* Why Shop With Us */}
      <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '2rem 1rem' : '2rem',
        }}>
          {[
            {
              label: 'Free Shipping',
              detail: 'On orders over R1500',
              icon: (
                <path d="M3 7h13l4 4v6h-2M3 7v10h2m10-10v10M9 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
              ),
            },
            {
              label: 'Secure Checkout',
              detail: 'Encrypted payment via PayFast',
              icon: (
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              ),
            },
            {
              label: 'Tracked Delivery',
              detail: 'Real-time courier tracking',
              icon: (
                <path d="M9 20l-5.5-3-.5-11L9 3l6 3.5v11L9 20zM3.5 6l5.5 3v11" />
              ),
            },
            {
              label: 'Easy Returns',
              detail: 'Hassle-free return policy',
              icon: (
                <path d="M3 12a9 9 0 1 0 2.6-6.4M3 4v5h5" />
              ),
            },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <svg
                width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke={RED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ marginBottom: '1rem' }}
              >
                {item.icon}
              </svg>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '0.35rem' }}>
                {item.label}
              </p>
              <p style={{ fontSize: '0.7rem', color: '#888' }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 0,
        }}>

          {/* Left — Image */}
          <div style={{
            position: 'relative',
            minHeight: isMobile ? '40svh' : '560px',
            overflow: 'hidden',
          }}>
            <img
              src={newsletterImage}
              alt="FLAWS"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.1))',
            }} />
          </div>

          {/* Right — Form */}
          <div style={{
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '3rem 1.5rem' : '4rem 5rem',
            borderLeft: isMobile ? 'none' : `1px solid ${RED}`,
          }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '0.75rem' }}>
              Stay Connected
            </p>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
              Get Early Access
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '380px' }}>
              Be the first to know about new drops, restocks, and exclusive releases.
            </p>

            <NewsletterForm />
          </div>

        </div>
      </section>
    </div>
  )
}
function ProductCarousel({ title, eyebrow, products, isMobile }: {
  title: string
  eyebrow: string
  products: Product[]
  isMobile: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = isMobile ? 220 : 340
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section style={{ padding: isMobile ? '3rem 0' : '6rem 0', borderTop: '1px solid #1a1a1a' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '2rem',
        padding: isMobile ? '0 1rem' : '0 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '0.5rem' }}>
            {eyebrow}
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
            {title}
          </h2>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => scroll('left')} aria-label="Scroll left" style={arrowButtonStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button onClick={() => scroll('right')} aria-label="Scroll right" style={arrowButtonStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '1px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: isMobile ? '0 1rem' : '0 2rem',
          scrollbarWidth: 'none',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              flex: `0 0 ${isMobile ? '200px' : '320px'}`,
              scrollSnapAlign: 'start',
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const primaryImage = product.images.find((i) => i.isPrimary)?.url || product.images[0]?.url
  const price = product.variants[0]?.salePrice ?? product.variants[0]?.price

  return (
    <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: '#0a0a0a', cursor: 'pointer', overflow: 'hidden' }}
      >
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
          {primaryImage ? (
            <img src={primaryImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              No Image
            </div>
          )}
        </div>
        <div style={{ padding: '1rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '0.25rem' }}>
            {product.name}
          </p>
          {price && <p style={{ fontSize: '0.75rem', color: '#888' }}>R{Number(price).toFixed(2)}</p>}
        </div>
      </div>
    </Link>
  )
}

const arrowButtonStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid #333',
  color: '#fff',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

function NewsletterForm() {
  const [form, setForm] = useState({ name: '', email: '', city: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.city) {
      setError('All fields are required')
      return
    }
    setStatus('loading')
    setError('')
    try {
      await axios.post('/waitlist', form)
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontSize: '0.85rem', color: '#ffffff' }}>
        You're on the list — thanks for joining.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        style={inputStyle}
      />
      {error && (
        <p style={{ fontSize: '0.7rem', color: '#ff6b6b' }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '1rem',
          background: RED,
          color: '#ffffff',
          border: 'none',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 700,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          marginTop: '0.5rem',
        }}
      >
        {status === 'loading' ? 'Joining...' : 'Join Now'}
      </button>
    </form>
  )
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
}