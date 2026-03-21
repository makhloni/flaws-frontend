import api from './axios'

export const getProducts = () => api.get('/products').then(r => r.data)
export const getProductBySlug = (slug: string) => api.get(`/products/${slug}`).then(r => r.data)
export const getRelatedProducts = (slug: string) =>
    api.get(`/products/${slug}/related`).then(r => r.data)