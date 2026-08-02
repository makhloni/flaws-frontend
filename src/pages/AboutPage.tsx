import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'

// Collection preview images (right side, top section)
import flawsExtraPreview from '../assets/IMG_2713.jpeg'
import mainCollectionPreview from '../assets/main-collection.jpg'

// Archives hero (with "shopping" text overlay)
import archivesHeroVideo from '../assets/Grocery-Shopping.mp4'

// Gallery grid images — replace with your actual archive shots
import gallery1 from '../assets/gallery-1.jpeg'
import gallery2 from '../assets/img-2.jpeg'
import gallery3 from '../assets/gallery-3.jpeg'
import gallery4 from '../assets/gallery-4.jpeg'
import gallery5 from '../assets/gallery-5.jpg'
import gallery6 from '../assets/gallery-6.jpeg'
import gallery7 from '../assets/gallery-7.jpg'
import gallery8 from '../assets/gallery-8.jpeg'

const RED = '#C1272D'

export default function AboutPage() {
  const { isMobile } = useBreakpoint()

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8]

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>

      {/* About + Collection Previews */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '3rem' : '4rem',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
        alignItems: 'start',
      }}>

        {/* Left — Story text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <h1 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '0.5rem',
          }}>
            About FLAWS
          </h1>

          <p style={paragraphStyle}>
            Born in Johannesburg, South Africa, FLAWS was built on a simple belief,
            "we are all unfinished". Every scar, mistake, insecurity, and contradiction
            becomes part of who we are. Instead of hiding them, we choose to wear them.
          </p>

          <p style={paragraphStyle}>
            In a world obsessed with perfection, FLAWS exists as a reminder that beauty
            is found in the imperfect. We create clothes that feel lived in, timeless,
            and honest pieces designed to age with you, collect memories, and tell
            stories long after they're made. FLAWS designs for every chapter of life
            from the streets that shape us to the moments that ask us to rise.
          </p>

          <p style={paragraphStyle}>
            We believe a well-cut pair of trousers belongs in the same wardrobe as a
            washed hoodie. Formalwear and streetwear aren't opposites they're different
            ways of expressing the same person.
          </p>

          <p style={paragraphStyle}>
            Every collection is a chapter. Every chapter belongs to a larger story.
            Growth is rarely clean, and that's exactly what makes it meaningful. FLAWS
            isn't about pretending to have everything figured out.
            <br /><br />
            It's for the outsider who still shows kindness.
            <br />
            The dreamer who keeps creating.
          </p>

          <p style={{ color: RED, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem' }}>
            Welcome to the FLAWS Family.
          </p>
        </div>

        {/* Right — Collection previews */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}>
          <Link to="/collections/flaws-extra" style={{ textDecoration: 'none' }}>
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img
                src={flawsExtraPreview}
                alt="FLAWS Extra"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#ffffff', marginTop: '0.75rem' }}>
              FLAWS Extra
            </p>
          </Link>

          <Link to="/collections/main-collection" style={{ textDecoration: 'none'}}>
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img
                src={mainCollectionPreview}
                alt="Main Collection"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#ffffff', marginTop: '0.75rem' }}>
              Main Collection
            </p>
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Archives Hero */}
      <div style={{ padding: isMobile ? '0 1.5rem 2rem' : '0 2rem 3rem' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#ffffff',
          marginBottom: '1.5rem',
        }}>
          FLAWS Archives
        </p>
        <div style={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          aspectRatio: isMobile ? '4/5' : '16/7',
          overflow: 'hidden',
        }}>
          <video
            src={archivesHeroVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Gallery */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '0 1.5rem 4rem' : '0 2rem 6rem',
        columnCount: isMobile ? 2 : 4,
        columnGap: '1rem',
      }}>
        {galleryImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              width: '100%',
              display: 'block',
              marginBottom: '1rem',
              breakInside: 'avoid',
            }}
          />
        ))}
      </div>

    </div>
  )
}

const paragraphStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 300,
  lineHeight: 1.8,
  color: '#e5e5e5',
}