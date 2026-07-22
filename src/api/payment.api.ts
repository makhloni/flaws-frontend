import api from './axios'

export const initializePayment = async (addressId: string, serviceLevelCode: string) => {
  const res = await api.post('/payment/initialize', { addressId, serviceLevelCode })
  return res.data
}

export const verifyPayment = (reference: string) =>
  api.get(`/payment/verify/${reference}`).then(r => r.data)