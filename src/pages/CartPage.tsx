import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'
import { useGuestCartStore } from '../store/useGuestCartStore'
import { useShippingStore } from '../store/useShippingStore'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { getAddresses } from '../api/address.api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const FREE_SHIPPING_THRESHOLD = 1500
const RED = '#C' 

export default function CartPage() {
  const { user } = useAuthStore()
  const { items: serverItems, total, loading, fetchCart, updateItem, removeItem } = useCartStore()
  const { items: guestItems, updateItem: updateGuest, removeItem: removeGuest } = useGuestCartStore()
  const { isMobile } = useBreakpoint()
  const { fetchRates, loading: shippingLoading } = useShippingStore()

  const isGuest = !user

  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null)
  const [estimatedShipping, setEstimatedShipping] = useState<number | null>(null)

  useEffect(() => {
    if (user) fetchCart()
  }, [user])

  // Step 1: find the user's default address
  useEffect(() => {
    if (!user) return
    getAddresses()
      .then((addresses) => {
        const def = addresses.find((a: any) => a.isDefault) || addresses[0]
        setDefaultAddressId(def?.id ?? null)
      })
      .catch(() => setDefaultAddressId(null))
  }, [user])

  // Step 2: once we have an address AND cart items, fetch the real (cached) Courier Guy rate
  useEffect(() => {
    if (!user || !defaultAddressId || serverItems.length === 0) {
      setEstimatedShipping(null)
      return
    }
    const cartItems = serverItems.map((i: any) => ({ variantId: i.variant.id, quantity: i.quantity }))
    fetchRates(defaultAddressId, cartItems)
      .then((rates) => setEstimatedShipping(rates[0]?.price ?? null))
      .catch(() => setEstimatedShipping(null))
  }, [user, defaultAddressId, serverItems])

  // Real shipping for logged-in users: live (cached) rate if we have one, otherwise null (unknown, not a fake flat rate).
  // The R1500 free-shipping rule applies on top of the real rate — a live quote doesn't override the threshold.
  const qualifiesForFreeShipping = Number(total) >= FREE_SHIPPING_THRESHOLD
  const rawShipping = estimatedShipping
  const shipping = qualifiesForFreeShipping ? 0 : rawShipping
  const orderTotal = Number(total) + (shipping ?? 0)

  const guestSubtotal = guestItems.reduce((sum, item) => {
    const price = item.variant.salePrice ?? item.variant.price
    return sum + price * item.quantity
  }, 0)
  // Guests have no saved address to quote against — this stays a flat estimate, clearly labeled below
  const guestQualifiesForFreeShipping = guestSubtotal >= FREE_SHIPPING_THRESHOLD
  const guestShipping = guestQualifiesForFreeShipping ? 0 : 100
  const guestTotal = guestSubtotal + guestShipping

  if (loading && user) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  )

  const isEmpty = isGuest ? guestItems.length === 0 : serverItems.length === 0

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '2rem 1rem' : '4rem 2rem' }}>

        <div style={{ marginBottom: '3rem', borderBottom: '1px solid #1a1a1a', paddingBottom: '2rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: RED, marginBottom: '0.5rem' }}>
            Your Selection
          </p>
          <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Cart {!isEmpty && `(${isGuest ? guestItems.length : serverItems.length})`}
          </h1>
        </div>

        {isEmpty ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              Your cart is empty
            </p>
            <Link to="/" style={{ padding: '1rem 3rem', border: '1px solid #ffffff', color: '#ffffff', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '2rem' : '4rem', alignItems: 'flex-start' }}>

            {/* Items */}
            <div style={{ flex: 1, width: '100%' }}>
              {(isGuest ? guestItems : serverItems).map((item: any) => {
                const image = item.product.images.find((i: any) => i.isPrimary)?.url || item.product.images[0]?.url
                const price = item.variant.salePrice ?? item.variant.price

                return (
                  <div key={item.variantId || item.id} style={{ display: 'grid', gridTemplateColumns: isMobile ? '90px 1fr' : '120px 1fr', gap: '1.5rem', padding: '2rem 0', borderBottom: '1px solid #1a1a1a' }}>
                    <Link to={`/products/${item.product.slug}`}>
                      <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
                        {image ? <img src={image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: '#111' }} />}
                      </div>
                    </Link>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <Link to={`/products/${item.product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <p style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {item.product.name}
                          </p>
                        </Link>
                        <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>
                          {item.variant.color} / {item.variant.size}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#fff' }}>
                          R{Number(price).toFixed(2)}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem', border: '1px solid #1a1a1a' }}>
                          <button
                            onClick={() => isGuest
                              ? updateGuest(item.variantId, Math.max(1, item.quantity - 1))
                              : updateItem(item.variant.id, Math.max(1, item.quantity - 1))
                            }
                            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: isMobile ? '6px 10px' : '8px 14px', fontSize: '1rem' }}
                          >−</button>
                          <span style={{ fontSize: '0.75rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button
                            onClick={() => isGuest
                              ? updateGuest(item.variantId, Math.min(item.variant.stock, item.quantity + 1))
                              : updateItem(item.variant.id, Math.min(item.variant.stock, item.quantity + 1))
                            }
                            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: isMobile ? '6px 10px' : '8px 14px', fontSize: '1rem' }}
                          >+</button>
                        </div>
                        <button
                          onClick={() => isGuest ? removeGuest(item.variantId) : removeItem(item.variant.id)}
                          style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div style={{ width: isMobile ? '100%' : '380px', flexShrink: 0, border: '1px solid #1a1a1a', padding: '2rem', position: isMobile ? 'static' : 'sticky', top: '80px', boxSizing: 'border-box' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
                Order Summary
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>Subtotal</p>
                <p style={{ fontSize: '0.8rem' }}>R{isGuest ? guestSubtotal.toFixed(2) : Number(total).toFixed(2)}</p>
              </div>

              {/* Logged-in user: real rate (with free-shipping threshold applied), loading state, or honest "unknown yet" */}
              {!isGuest && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>Shipping</p>
                    <p style={{ fontSize: '0.8rem', color: shipping === 0 ? '#888' : '#fff' }}>
                      {shippingLoading
                        ? 'Calculating...'
                        : qualifiesForFreeShipping
                        ? 'Free'
                        : shipping === null
                        ? 'Calculated at checkout'
                        : shipping === 0
                        ? 'Free'
                        : `R${shipping.toFixed(2)}`}
                    </p>
                  </div>
                  {defaultAddressId === null && !shippingLoading && !qualifiesForFreeShipping && (
                    <p style={{ fontSize: '0.65rem', color: '#888', marginBottom: '1rem' }}>
                      Add an address to see your real shipping cost
                    </p>
                  )}
                </>
              )}

              {/* Guest: no address to quote against, so this stays a flat estimate — labeled honestly */}
              {isGuest && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>Estimated Shipping</p>
                    <p style={{ fontSize: '0.8rem', color: guestShipping === 0 ? '#888' : '#fff' }}>
                      {guestShipping === 0 ? 'Free' : `R${guestShipping.toFixed(2)}`}
                    </p>
                  </div>
                  <p style={{ fontSize: '0.65rem', color: '#888', marginBottom: '1rem' }}>
                    Final rate calculated at checkout based on your address
                  </p>
                </>
              )}

              {/* Only show the free-shipping nudge if they actually don't qualify yet */}
              {!(isGuest ? guestQualifiesForFreeShipping : qualifiesForFreeShipping) && ((isGuest ? guestShipping : shipping) ?? 0) > 0 && (
                <p style={{ fontSize: '0.65rem', color: RED, marginBottom: '1rem' }}>Free shipping on orders over R{FREE_SHIPPING_THRESHOLD}</p>
              )}

              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  R{isGuest ? guestTotal.toFixed(2) : orderTotal.toFixed(2)}
                </p>
              </div>

              {/* Guest prompt */}
              {isGuest && (
                <div style={{ background: '#111', border: '1px solid #1a1a1a', borderTop: `2px solid ${RED}`, padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                    Sign in to complete your purchase. Your cart will be saved.
                  </p>
                  <Link
                    to="/login"
                    style={{ display: 'block', padding: '1rem', background: '#ffffff', color: '#0a0a0a', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}
                  >
                    Sign In to Checkout
                  </Link>
                  <Link
                    to="/register"
                    style={{ display: 'block', padding: '0.9rem', border: '1px solid #333', color: '#888', textDecoration: 'none', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                  >
                    Create Account
                  </Link>
                </div>
              )}

              {!isGuest && (
                <>
                  <Link
                    to="/checkout"
                    style={{ display: 'block', width: '100%', padding: '1.25rem', background: '#ffffff', color: '#0a0a0a', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center', marginBottom: '1rem', boxSizing: 'border-box' }}
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/"
                    style={{ display: 'block', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}
                  >
                    Continue Shopping
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}