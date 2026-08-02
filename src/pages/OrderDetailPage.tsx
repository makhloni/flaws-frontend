import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderById, getOrderTracking } from '../api/orders.api'

const RED = '#C1272D'

interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  total: number
  product: {
    name: string
    slug: string
    images: { url: string; isPrimary: boolean }[]
  }
  variant: {
    size: string
    color: string
  }
}

interface Order {
  id: string
  status: string
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  isPaid: boolean
  createdAt: string
  trackingNumber: string | null
  address: {
    fullName: string
    street: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  items: OrderItem[]
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  const [tracking, setTracking] = useState<any>(null)
  const [trackingLoading, setTrackingLoading] = useState(false)
  const [trackingError, setTrackingError] = useState('')

  useEffect(() => {
    if (!id) return
    getOrderById(id).then((data) => {
      setOrder(data)
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (!order?.trackingNumber || !id) return
    setTrackingLoading(true)
    getOrderTracking(id)
      .then((data) => {
        setTracking(data)
        setTrackingError('')
      })
      .catch(() => {
        setTrackingError('Could not load tracking status right now')
      })
      .finally(() => setTrackingLoading(false))
  }, [order?.trackingNumber, id])

  if (loading) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  )

  if (!order) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Order not found</p>
    </div>
  )

  const statusColor = {
    PENDING: '#888',
    CONFIRMED: '#4CAF50',
    PROCESSING: '#2196F3',
    SHIPPED: '#9C27B0',
    DELIVERED: '#4CAF50',
    CANCELLED: '#ff6b6b',
    REFUNDED: '#ff6b6b',
  }[order.status] || '#888'

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid #1a1a1a', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '0.5rem' }}>
                Order Confirmed
              </p>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Thank You
              </h1>
              <p style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'monospace' }}>
                #{order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: statusColor,
                border: `1px solid ${statusColor}`,
                padding: '6px 12px',
              }}>
                {order.status}
              </span>
              <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.75rem' }}>
                {new Date(order.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
            Items
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {order.items.map((item) => {
              const image = item.product.images.find(i => i.isPrimary)?.url || item.product.images[0]?.url
              return (
                <div key={item.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid #1a1a1a',
                  alignItems: 'center',
                }}>
                  <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
                    {image ? (
                      <img src={image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#111' }} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#888' }}>
                      {item.variant.color} / {item.variant.size}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.25rem' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#fff' }}>
                    R{Number(item.total).toFixed(2)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>

          {/* Delivery Address */}
          <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Delivery Address
            </p>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{order.address.fullName}</p>
            <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.8 }}>
              {order.address.street}<br />
              {order.address.city}, {order.address.province}<br />
              {order.address.postalCode}<br />
              {order.address.country}
            </p>
          </div>

          {/* Order Total */}
          <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1rem' }}>
              Payment Summary
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>Subtotal</p>
                <p style={{ fontSize: '0.75rem' }}>R{Number(order.subtotal).toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>Shipping</p>
                <p style={{ fontSize: '0.75rem' }}>
                  {Number(order.shippingCost) === 0 ? 'Free' : `R${Number(order.shippingCost).toFixed(2)}`}
                </p>
              </div>
              {Number(order.discount) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.75rem', color: '#888' }}>Discount</p>
                  <p style={{ fontSize: '0.75rem', color: '#4CAF50' }}>-R{Number(order.discount).toFixed(2)}</p>
                </div>
              )}
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>R{Number(order.total).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking */}
        {order.trackingNumber && (
          <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
                  Tracking Number
                </p>
                <p style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#fff' }}>
                  {order.trackingNumber}
                </p>
              </div>
            </div>

            {trackingLoading && (
              <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '1rem' }}>Loading tracking status...</p>
            )}

            {trackingError && (
              <p style={{ fontSize: '0.7rem', color: '#ff6b6b', marginTop: '1rem' }}>{trackingError}</p>
            )}

            {tracking?.status && (
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1rem', marginTop: '1rem' }}>
                <TrackingStatus status={tracking.status} />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/orders"
            style={{
              padding: '1rem 2rem',
              border: '1px solid #333',
              color: '#888',
              textDecoration: 'none',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            All Orders
          </Link>
          <Link
            to="/"
            style={{
              padding: '1rem 2rem',
              background: '#ffffff',
              color: '#0a0a0a',
              textDecoration: 'none',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

function TrackingStatus({ status }: { status: any }) {
  const shipment = status.shipments?.[0]
  const steps = status.tracking_steps || []

  if (!shipment) return null

  const statusLabels: Record<string, string> = {
    submitted: 'Submitted',
    'collection-assigned': 'Collection Assigned',
    'awaiting-dropoff': 'Awaiting Drop-off',
    'collection-exception': 'Collection Issue',
    'collection-failed-attempt': 'Collection Attempt Failed',
    collected: 'Collected',
    'at-hub': 'At Hub',
    'in-transit': 'In Transit',
    'at-destination-hub': 'At Destination Hub',
    'out-for-delivery': 'Out for Delivery',
    'delivery-exception': 'Delivery Issue',
    'delivery-failed-attempt': 'Delivery Attempt Failed',
    'in-locker': 'In Locker',
    'ready-for-pickup': 'Ready for Pickup',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    created: 'Order Created',
  }

  const shipmentEvents = (shipment.tracking_events || []).filter((e: any) => e.parcel_id === 0)

  return (
    <div>
      {/* Progress steps */}
      {steps.length > 0 && (
        <div style={{ display: 'flex', marginBottom: '2rem', gap: '0.25rem' }}>
          {steps.map((step: any) => (
            <div key={step.step_number} style={{ flex: 1 }}>
              <div style={{
                height: '3px',
                background: step.progress === 'pending' ? '#1a1a1a' : RED,
                marginBottom: '0.5rem',
              }} />
              <p style={{
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: step.progress === 'current' ? '#fff' : step.progress === 'pending' ? '#555' : RED,
              }}>
                {statusLabels[step.label] || step.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Current status + ETA */}
      <p style={{ fontSize: '0.75rem', color: '#fff', marginBottom: '0.5rem' }}>
        Current status:{' '}
        <span style={{ color: RED }}>
          {statusLabels[shipment.status] || shipment.status}
        </span>
      </p>
      {shipment.shipment_estimated_delivery_from && (
        <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '1.5rem' }}>
          Estimated delivery:{' '}
          {new Date(shipment.shipment_estimated_delivery_from).toLocaleDateString('en-ZA', {
            weekday: 'long', day: 'numeric', month: 'long',
          })}
          {' '}between{' '}
          {new Date(shipment.shipment_estimated_delivery_from).toLocaleTimeString('en-ZA', {
            hour: '2-digit', minute: '2-digit',
          })}
          {' '}and{' '}
          {new Date(shipment.shipment_estimated_delivery_to).toLocaleTimeString('en-ZA', {
            hour: '2-digit', minute: '2-digit',
          })}
        </p>
      )}

      {/* Event history */}
      {shipmentEvents.length > 0 && (
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shipmentEvents.map((event: any) => (
            <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <p style={{ fontSize: '0.7rem', color: '#ccc' }}>
                {statusLabels[event.status] || event.status}
                {event.location ? ` — ${event.location}` : ''}
              </p>
              <p style={{ fontSize: '0.65rem', color: '#555', whiteSpace: 'nowrap' }}>
                {event.date
                  ? new Date(event.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                  : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}