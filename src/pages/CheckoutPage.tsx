import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { getAddresses, addAddress } from '../api/address.api'
import { initializePayment } from '../api/payment.api'
import { getShippingRates } from '../api/shipping.api'

const RED = '#C1272D'
const FREE_SHIPPING_THRESHOLD = 1500

interface Address {
  id: string
  fullName: string
  street: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface Rate {
  serviceLevelCode: string
  serviceLevelName: string
  price: number
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()
  const { items, total, fetchCart } = useCartStore()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()

  const [rates, setRates] = useState<Rate[]>([])
  const [ratesLoading, setRatesLoading] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')

  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
  })

  useEffect(() => {
    if (searchParams.get('cancelled') === 'true') {
      setError('Payment was cancelled. You can try again.')
    }
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchCart()
    getAddresses().then((data) => {
      setAddresses(data)
      if (data.length > 0) setSelectedAddress(data[0].id)
      else setShowAddForm(true)
    })
  }, [])

  // Fetch shipping rates whenever the selected address changes
  useEffect(() => {
    if (!selectedAddress) {
      setRates([])
      setSelectedService('')
      return
    }
    setRatesLoading(true)
    setSelectedService('')
    getShippingRates(selectedAddress)
      .then((data) => {
        setRates(data)
        if (data.length > 0) setSelectedService(data[0].serviceLevelCode)
      })
      .catch(() => {
        setRates([])
        setError('Could not load delivery options for this address')
      })
      .finally(() => setRatesLoading(false))
  }, [selectedAddress])

  const handleAddAddress = async () => {
    if (!form.fullName || !form.street || !form.city || !form.province || !form.postalCode) {
      return setError('All address fields are required')
    }
    try {
      const newAddress = await addAddress(form)
      setAddresses((prev) => [...prev, newAddress])
      setSelectedAddress(newAddress.id)
      setShowAddForm(false)
      setError('')
    } catch {
      setError('Failed to save address')
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return setError('Please select a delivery address')
    if (!selectedService) return setError('Please select a delivery option')
    if (items.length === 0) return setError('Your cart is empty')

    setPlacing(true)
    setError('')

    try {
      const data = await initializePayment(selectedAddress, selectedService)

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.payFastUrl

      Object.entries(data.paymentData).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value as string
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.response?.data?.message || 'Failed to initialize payment')
      setPlacing(false)
    }
  }

  const selectedRate = rates.find((r) => r.serviceLevelCode === selectedService)
  // The R1500 free-shipping rule applies on top of whatever the courier quotes —
  // a live rate doesn't override the threshold, same as on the cart page.
  const qualifiesForFreeShipping = Number(total) >= FREE_SHIPPING_THRESHOLD
  const shipping = qualifiesForFreeShipping ? 0 : (selectedRate ? selectedRate.price : 0)
  const orderTotal = Number(total) + shipping

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '2rem 1rem' : '4rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid #1a1a1a', paddingBottom: '2rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '0.5rem' }}>
            Final Step
          </p>
          <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Checkout
          </h1>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'flex-start',
        }}>

          {/* Left — Address + Delivery Options */}
          <div style={{ flex: 1, width: '100%' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
              Delivery Address
            </p>

            {addresses.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    style={{
                      padding: '1.5rem',
                      border: selectedAddress === address.id ? `1px solid ${RED}` : '1px solid #1a1a1a',
                      cursor: 'pointer',
                      transition: 'border 0.2s',
                    }}

                  >
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{address.fullName}</p>
                    <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.6 }}>
                      {address.street}, {address.city}<br />
                      {address.province}, {address.postalCode}<br />
                      {address.country}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  background: 'none',
                  border: '1px solid #333',
                  color: '#888',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                + Add New Address
              </button>
            ) : (
              <div style={{ border: '1px solid #1a1a1a', padding: isMobile ? '1.5rem' : '2rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
                  New Address
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'fullName', label: 'Full Name', placeholder: 'Your name' },
                    { key: 'street', label: 'Street Address', placeholder: 'Street' },
                    { key: 'city', label: 'City', placeholder: 'Johannesburg' },
                    { key: 'province', label: 'Province', placeholder: 'Gauteng' },
                    { key: 'postalCode', label: 'Postal Code', placeholder: '2000' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <p style={labelStyle}>{label}</p>
                      <input
                        type="text"
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleAddAddress}
                    style={{
                      padding: '0.9rem 2rem',
                      background: '#ffffff',
                      color: '#0a0a0a',
                      border: 'none',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Save Address
                  </button>
                  {addresses.length > 0 && (
                    <button
                      onClick={() => setShowAddForm(false)}
                      style={{
                        padding: '0.9rem 2rem',
                        background: 'none',
                        border: '1px solid #333',
                        color: '#888',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Options */}
            {selectedAddress && (
              <div style={{ marginTop: '3rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
                  Delivery Option
                </p>

                {ratesLoading && (
                  <p style={{ fontSize: '0.75rem', color: '#888' }}>Loading delivery options...</p>
                )}

                {!ratesLoading && rates.length === 0 && (
                  <p style={{ fontSize: '0.75rem', color: '#888' }}>
                    No delivery options available for this address.
                  </p>
                )}

                {!ratesLoading && rates.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {rates.map((rate) => (
                      <div
                        key={rate.serviceLevelCode}
                        onClick={() => setSelectedService(rate.serviceLevelCode)}
                        style={{
                          padding: '1.25rem 1.5rem',
                          border: selectedService === rate.serviceLevelCode ? `1px solid ${RED}` : '1px solid #1a1a1a',
                          cursor: 'pointer',
                          transition: 'border 0.2s',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {rate.serviceLevelName}
                        </p>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {qualifiesForFreeShipping ? 'Free' : (rate.price === 0 ? 'Free' : `R${rate.price.toFixed(2)}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {qualifiesForFreeShipping && !ratesLoading && rates.length > 0 && (
                  <p style={{ fontSize: '0.65rem', color: '#888', marginTop: '1rem' }}>
                    Your order qualifies for free shipping (over R{FREE_SHIPPING_THRESHOLD}) — displayed rates are waived at checkout.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right — Order Summary */}
          <div style={{
            width: isMobile ? '100%' : '380px',
            flexShrink: 0,
            border: '1px solid #1a1a1a',
            padding: '2rem',
            position: isMobile ? 'static' : 'sticky',
            top: '80px',
            boxSizing: 'border-box',
          }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
              Order Summary
            </p>

            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => {
                const price = item.variant.salePrice ?? item.variant.price
                return (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: '0.65rem', color: '#888' }}>
                        {item.variant.color} / {item.variant.size} × {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap' }}>
                      R{(Number(price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                )
              })}
            </div>

            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>Subtotal</p>
                <p style={{ fontSize: '0.75rem' }}>R{Number(total).toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>Shipping</p>
                <p style={{ fontSize: '0.75rem', color: shipping === 0 ? '#888' : '#fff' }}>
                  {selectedRate ? (shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`) : '—'}
                </p>
              </div>
              {!qualifiesForFreeShipping && selectedRate && shipping > 0 && (
                <p style={{ fontSize: '0.65rem', color: RED }}>Free shipping on orders over R{FREE_SHIPPING_THRESHOLD}</p>
              )}
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>R{orderTotal.toFixed(2)}</p>
              </div>
            </div>

            {error && (
              <p style={{ fontSize: '0.7rem', color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={placing || items.length === 0 || !selectedService}
              style={{
                width: '100%',
                padding: '1.25rem',
                background: placing || !selectedService ? '#333' : '#ffffff',
                color: placing || !selectedService ? '#888' : '#0a0a0a',
                border: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: placing || !selectedService ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {placing ? 'Initializing...' : 'Pay Now'}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#888',
  marginBottom: '8px',
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