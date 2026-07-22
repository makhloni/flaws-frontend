import axios from './axios'

export const getShippingRates = async (addressId: string) => {
  const res = await axios.post('/shipping/rates', { addressId })
  return res.data.rates as {
    serviceLevelCode: string
    serviceLevelName: string
    price: number
  }[]
}