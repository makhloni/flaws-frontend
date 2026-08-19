import { create } from 'zustand'
import { getShippingRates } from '../api/shipping.api'

interface Rate {
  serviceLevelCode: string
  serviceLevelName: string
  price: number
}

interface CacheEntry {
  rates: Rate[]
  fetchedAt: number
}

interface CartItemForHash {
  variantId: string
  quantity: number
}

interface ShippingState {
  cache: Record<string, CacheEntry>
  loading: boolean
  fetchRates: (addressId: string, cartItems: CartItemForHash[]) => Promise<Rate[]>
  invalidate: () => void
}

const TTL_MS = 5 * 60 * 1000

function buildKey(addressId: string, cartItems: CartItemForHash[]) {
  const sorted = [...cartItems].sort((a, b) => a.variantId.localeCompare(b.variantId))
  return addressId + '|' + sorted.map(i => `${i.variantId}:${i.quantity}`).join(',')
}

export const useShippingStore = create<ShippingState>((set, get) => ({
  cache: {},
  loading: false,

  fetchRates: async (addressId, cartItems) => {
    const key = buildKey(addressId, cartItems)
    const cached = get().cache[key]
    if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
      return cached.rates
    }

    set({ loading: true })
    try {
      const rates = await getShippingRates(addressId)
      set((state) => ({
        cache: { ...state.cache, [key]: { rates, fetchedAt: Date.now() } },
        loading: false,
      }))
      return rates
    } catch (err) {
      set({ loading: false })
      throw err
    }
  },

  
  invalidate: () => set({ cache: {} }),
}))