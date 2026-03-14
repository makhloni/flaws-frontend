import api from './axios'

export const getSiteContent = () =>
  api.get('/content').then(r => r.data)