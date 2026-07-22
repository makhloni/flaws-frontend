import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCollectionBySlug, getCollections } from '../api/collections.api'

const RED = '#C1272D'

interface Product {
  id: string
  name: string
  slug: string
  gender: string
  isFeatured: boolean
  images: { url: string; isPrimary: boolean }[]
  variants: { price: number; salePrice: number | null; size: string }[]
}

interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  gender: string
  products: Product[]
}

export default function CollectionDetailPage() {
  const { slug } = useParams()
  const [collection, setCollection] = useState<Collection | null>(null)
  const [otherCollections, setOtherCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getCollectionBySlug(slug).then((data) => {
      setCollection(data)
      setLoading(false)
    })
    getCollections().then((all: Collection[]) => {
      setOtherCollections(all.filter((c: Collection) => c.slug !== slug))
    })
  }, [slug])

  if (loading) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  )

  if (!collection) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Collection not found</p>
    </div>
  )

  // Pull up to 3 product images for the hero collage — falls back to
  // collection.imageUrl, then nothing, so this never crashes on a
  // brand-new collection with few/no products yet.
  const collageImages = collection.products
    .map(p => p.images.find(i => i.isPrimary)?.url || p.images[0]?.url)
    .filter(Boolean)
    .slice(0, 3)
  if (collageImages.length === 0 && collection.imageUrl) {
    collageImages.push(collection.imageUrl)
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Hero Collage */}
      {collageImages.length > 0 && (
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: `repeat(${collageImages.length}, 1fr)`,
          height: '380px',
          overflow: 'hidden',
        }}>
          {collageImages.map((url, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
              />
            </div>
          ))}
          <h1 style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textAlign: 'center',
            padding: '0 1rem',
          }}>
            {collection.name}
          </h1>
        </div>
      )}

      {/* Breadcrumb + count */}
      <div style={{
        borderBottom: '1px solid #1a1a1a',
        padding: '1.5rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link
          to="/collections"
          style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', textDecoration: 'none' }}
        >
          ← Collections
        </Link>
        <p style={{ fontSize: '0.75rem', color: '#888' }}>{collection.products.length} pieces</p>
      </div>

      {/* Backstory */}
      {collection.description && (
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '1.5rem' }}>
            {collection.gender}
          </p>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.8,
          }}>
            {collection.description}
          </p>
          <div style={{ width: '40px', height: '1px', background: RED, margin: '2rem auto 0' }} />
        </div>
      )}

      {/* Products Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {collection.products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem' }}>
            <p style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              No products in this collection yet
            </p>
            <Link
              to="/collections"
              style={{
                padding: '1rem 3rem',
                border: '1px solid #ffffff',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              View Other Collections
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: '#1a1a1a',
          }}>
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Cross-link to other collections */}
      {otherCollections.length > 0 && (
        <div style={{
          borderTop: '1px solid #1a1a1a',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '1.25rem' }}>
            Looking for something else?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {otherCollections.map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                style={{
                  padding: '0.85rem 2rem',
                  border: '1px solid #333',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const primaryImage = product.images.find((i) => i.isPrimary)?.url || product.images[0]?.url
  const price = product.variants[0]?.salePrice ?? product.variants[0]?.price
  const sizes = [...new Set(product.variants.map((v) => v.size))]

  return (
    <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: '#0a0a0a', cursor: 'pointer', overflow: 'hidden' }}
      >
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111', position: 'relative' }}>
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s ease',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              No Image
            </div>
          )}

          {hovered && sizes.length > 0 && (
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '6px' }}>
              {sizes.map((size) => (
                <span key={size} style={{
                  background: 'rgba(10,10,10,0.85)',
                  color: '#fff',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  padding: '4px 8px',
                  textTransform: 'uppercase',
                }}>
                  {size}
                </span>
              ))}
            </div>
          )}

          {product.isFeatured && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: '#ffffff',
              color: '#0a0a0a',
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              padding: '4px 8px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Featured
            </div>
          )}
        </div>

        <div style={{ padding: '1rem', background: '#0a0a0a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
              {product.name}
            </p>
            {price && (
              <p style={{ fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap' }}>
                R{Number(price).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}