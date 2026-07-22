import api from './axios'

export const createOrder = (addressId: string) =>
  api.post('/orders', { addressId }).then(r => r.data)

export const getOrders = () =>
  api.get('/orders').then(r => r.data)

export const getOrderById = (id: string) =>
  api.get(`/orders/${id}`).then(r => r.data)

export const getOrderTracking = async (orderId: string) => {
  const res = await api.get(`/orders/${orderId}/tracking`)
  return res.data as {
    booked: boolean
    status: any
  }
}