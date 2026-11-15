import { create } from 'zustand'

export interface GuestCartItem {
  productId: string
  variantId: string
  quantity: number
  product: {
    name: string
    slug: string
    isPreorder: boolean
    preorderReleaseDate: string | null
    images: { url: string; isPrimary: boolean }[]
  }
  variant: {
    id: string
    size: string
    color: string
    price: number
    salePrice: number | null
    stock: number
  }
}

export interface AddItemResult {
  ok: boolean
  message?: string
}

interface GuestCartStore {
  items: GuestCartItem[]
  addItem: (item: GuestCartItem) => AddItemResult
  removeItem: (variantId: string) => void
  updateItem: (variantId: string, quantity: number) => void
  clear: () => void
  load: () => void
}

const STORAGE_KEY = 'flaws_guest_cart'

function persist(items: GuestCartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export const useGuestCartStore = create<GuestCartStore>((set, get) => ({
  items: [],

  load: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) set({ items: JSON.parse(stored) })
    } catch {
      set({ items: [] })
    }
  },

  addItem: (newItem) => {
    const items = get().items

    // Preorder rules (mirrors the server): no mixing, one preorder product per cart
    const others = items.filter(i => i.variantId !== newItem.variantId)
    if (others.length > 0) {
      const cartHasPreorder = others.some(i => i.product.isPreorder)
      if (newItem.product.isPreorder !== cartHasPreorder) {
        return {
          ok: false,
          message: newItem.product.isPreorder
            ? 'Preorders must be bought separately. Check out your current cart first.'
            : 'Your cart contains a preorder. Check out or clear it before adding other items.',
        }
      }
      if (newItem.product.isPreorder && others.some(i => i.productId !== newItem.productId)) {
        return { ok: false, message: 'You can only preorder one product per order.' }
      }
    }

    const existing = items.find(i => i.variantId === newItem.variantId)
    let updated: GuestCartItem[]

    if (existing) {
      updated = items.map(i =>
        i.variantId === newItem.variantId
          ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, i.variant.stock) }
          : i
      )
    } else {
      updated = [...items, { ...newItem, quantity: Math.min(newItem.quantity, newItem.variant.stock) }]
    }

    set({ items: updated })
    persist(updated)
    return { ok: true }
  },

  removeItem: (variantId) => {
    const updated = get().items.filter(i => i.variantId !== variantId)
    set({ items: updated })
    persist(updated)
  },

  updateItem: (variantId, quantity) => {
    const items = get().items
    let updated: GuestCartItem[]

    if (quantity <= 0) {
      updated = items.filter(i => i.variantId !== variantId)
    } else {
      updated = items.map(i =>
        i.variantId === variantId
          ? { ...i, quantity: Math.min(quantity, i.variant.stock) }
          : i
      )
    }

    set({ items: updated })
    persist(updated)
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    set({ items: [] })
  },
}))