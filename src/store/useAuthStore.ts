import { create } from 'zustand'
import { getMe } from '../api/auth.api'
import { mergeGuestCart } from '../api/cart.api'

interface User {
  id: string
  name: string
  email: string
  phone?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (token: string, user: User) => void
  logout: () => void
  fetchMe: () => Promise<void>
  mergeAndLogin: (token: string, user: any) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    set({ token, user })
  },


  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  },

  fetchMe: async () => {
    try {
      const user = await getMe()
      set({ user })
    } catch {
      localStorage.removeItem('token')
      set({ token: null, user: null })
    }
  },

  mergeAndLogin: async (token: string, user: any) => {
  localStorage.setItem('token', token)
  set({ token, user })

  
  const guestItems = JSON.parse(localStorage.getItem('flaws_guest_cart') || '[]')

  localStorage.removeItem('flaws_guest_cart')

  if (guestItems.length > 0) {
    try {
      await mergeGuestCart(
        guestItems.map((i: any) => ({
          variantId: i.variantId,
          productId: i.productId,
          quantity: i.quantity,
        }))
      )
    } catch {
      
    }
    localStorage.removeItem('flaws_guest_cart')
  }
},
}))