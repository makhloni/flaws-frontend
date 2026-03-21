import { create } from 'zustand'
import { getSiteContent } from '../api/content.api'
import type { SiteContent } from '../api/content.api'

interface ContentStore {
  content: SiteContent | null
  loading: boolean
  fetch: () => Promise<void>
}

export const useContentStore = create<ContentStore>((set) => ({
  content: null,
  loading: true,
  fetch: async () => {
    try {
      const content = await getSiteContent()
      set({ content, loading: false })
    } catch {
      set({ loading: false })
    }
  },
}))