import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useContentStore } from '../store/useContentStore'
import flawsLogo from '../assets/flaws-logo.png'
import flawsExtra from '../assets/Flaws-extra.jpeg'

interface Product {
  id: string
  name: string
  slug: string
  isFeatured: boolean
  images: { url: string; isPrimary: boolean }[]
  variants: { price: number; salePrice: number | null }[]
}

export default function HomePage() {
  const { isMobile } = useBreakpoint()
  const { content, loading: contentLoading } = useContentStore()
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    axios.get('/products').then((res) => {
      const allProducts: Product[] = res.data

      const featuredIds = content?.featured_product_ids
        ? content.featured_product_ids.split(',').filter(Boolean)
        : []

      if (featuredIds.length > 0) {
        const ordered = featuredIds
          .map((id: string) => allProducts.find(p => p.id === id))
          .filter(Boolean) as Product[]
        setFeatured(ordered.length > 0 ? ordered : allProducts.filter(p => p.isFeatured))
      } else {
        setFeatured(allProducts.filter(p => p.isFeatured))
      }
    })
  }, [content])

  const heroHeadline = content?.hero_headline || ''
  const heroSubtext = content?.hero_subtext || ''

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>

      {/* Hero */}
      {/* Hero - Three Panel Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
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
          minHeight: isMobile ? '60svh' : '100svh',
          background: '#111',
          overflow: 'hidden',
          textAlign: 'center',
          gap: '1.5rem',
        }}>
          {/* Background image fills the panel */}
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

          {/* Optional dark overlay so text stays legible over the photo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.15))',
          }} />

          {/* Text overlay - centered */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#ffffff',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '1.5rem',
            }}>
              FLAWS<br />Extra
            </h2>
            <Link to="/collections" style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#0a0a0a',
              padding: '1rem 2rem',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Middle Panel - Brand Statement */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem',
          borderLeft: isMobile ? 'none' : '1px solid #1a1a1a',
          borderRight: isMobile ? 'none' : '1px solid #1a1a1a',
          borderTop: isMobile ? '1px solid #1a1a1a' : 'none',
          minHeight: isMobile ? '50svh' : '100svh',
          textAlign: 'center',
          gap: '2rem',
        }}>
          <p style={{
            fontSize: isMobile ? '1.6rem' : '2.2rem',
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: '#ffffff',
            lineHeight: 1.4,
          }}>
            Welcome to FLAWS.
          </p>

          {/* Script logo — replace with your actual image file */}
          <img
            src={flawsLogo}
            alt="FLAWS main collection"
            style={{
              width: isMobile ? '200px' : '320px',
            }}
          />

          {/* Social Icons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            {/* Instagram */}
            <a
              href="https://instagram.com/flawswrldwide"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/@flawswrldwide"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@flawswrldwide"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Panel - Collection Teaser */}
        <div style={{
          background: '#c4b49a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: isMobile ? '50svh' : '100svh',
          padding: '3rem 2rem',
          textAlign: 'center',
          gap: '1.5rem',
          borderTop: isMobile ? '1px solid #1a1a1a' : 'none',
        }}>
          {/* Main collection script logo — replace with actual file */}
          <img
            src={flawsLogo}
            alt="FLAWS main collection"
            style={{
              width: isMobile ? '140px' : '200px',
            }}
          />

          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3a3028',
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

      {/* Featured Products */}
      {featured.length > 0 && (
        <section style={{ padding: isMobile ? '3rem 1rem' : '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
          }}>
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

      {/* Collections Banner */}
      <section style={{ padding: isMobile ? '3rem 1rem' : '6rem 2rem', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1px',
          background: '#1a1a1a',
        }}>
          <CollectionBanner title="Men's" subtitle="Essentials" href="/collections?gender=MEN" isMobile={isMobile} />
          <CollectionBanner title="Women's" subtitle="Essentials" href="/collections?gender=WOMEN" isMobile={isMobile} />
        </div>
      </section>

      {/* Brand Statement */}
      <section style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 2rem', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <p style={{
          fontSize: isMobile ? '1.3rem' : 'clamp(1.5rem, 4vw, 3rem)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          color: '#ffffff',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: 1.5,
        }}>
          Designed for those who find beauty in imperfection.
        </p>
        <div style={{ width: '40px', height: '1px', background: '#888', margin: '2rem auto 0' }} />
      </section>
    </div>
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

function CollectionBanner({ title, subtitle, href, isMobile }: { title: string; subtitle: string; href: string; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#111' : '#0a0a0a',
          padding: isMobile ? '3rem 1.5rem' : '6rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: isMobile ? '220px' : '400px',
          transition: 'background 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
          {subtitle}
        </p>
        <h3 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginTop: '1.5rem' }}>
          Shop Now →
        </p>
      </div>
    </Link>
  )
}