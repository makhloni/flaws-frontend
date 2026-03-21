import { useContentStore } from '../store/useContentStore'

export default function AnnouncementBar() {
  const { content, loading } = useContentStore()

  if (loading || !content) return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff',
      color: '#0a0a0a',
      textAlign: 'center',
      padding: '8px 16px',
      fontSize: '0.7rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontWeight: 500,
      minHeight: '33px',
    }} />
  )

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff',
      color: '#0a0a0a',
      textAlign: 'center',
      padding: '8px 16px',
      fontSize: '0.7rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontWeight: 500,
    }}>
      {content.banner_text}
    </div>
  )
}