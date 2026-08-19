import { create } from 'zustand'
import { getCart, updateCartItem, removeFromCart, clearCart } from '../api/cart.api'

interface CartItem {
  id: string
  quantity: number
  variantId: string
  productId: string
  variant: {
    id: string
    size: string
    color: string
    price: number
    salePrice: number | null
    stock: number
  }
  product: {
    id: string
    name: string
    slug: string
    images: { url: string; isPrimary: boolean }[]
  }
}

interface CartStore {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
  fetchCart: () => Promise<void>
  updateItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (variantId: string) => Promise<void>
  clear: () => Promise<void>
}

function recalcTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + (i.variant.salePrice ?? i.variant.price) * i.quantity, 0)
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getCart()
      set({ items: data.items, total: data.total, loading: false })
    } catch {
      set({ loading: false, error: 'Failed to load cart' })
    }
  },

  updateItem: async (variantId, quantity) => {
    const previous = get().items
    const clamped = Math.max(0, quantity)

    const optimistic = clamped === 0
      ? previous.filter(i => i.variantId !== variantId)
      : previous.map(i =>
          i.variantId === variantId
            ? { ...i, quantity: Math.min(clamped, i.variant.stock) }
            : i
        )

    set({ items: optimistic, total: recalcTotal(optimistic), error: null })

    try {
      if (clamped === 0) {
        await removeFromCart(variantId)
      } else {
        await updateCartItem(variantId, clamped)
      }
      const data = await getCart()
      set({ items: data.items, total: data.total })
    } catch {
      set({ items: previous, total: recalcTotal(previous), error: 'Failed to update quantity' })
    }
  },

  removeItem: async (variantId) => {
    const previous = get().items
    const optimistic = previous.filter(i => i.variantId !== variantId)
    set({ items: optimistic, total: recalcTotal(optimistic), error: null })

    try {
      await removeFromCart(variantId)
      const data = await getCart()
      set({ items: data.items, total: data.total })
    } catch {
      set({ items: previous, total: recalcTotal(previous), error: 'Failed to remove item' })
    }
  },

  clear: async () => {
    const previous = get().items
    set({ items: [], total: 0, error: null })
    try {
      await clearCart()
    } catch {
      set({ items: previous, total: recalcTotal(previous), error: 'Failed to clear cart' })
    }
  },
}))