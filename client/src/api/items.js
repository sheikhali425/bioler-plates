import api from './client'

export const fetchItems = (params = {}) => api.get('/items', { params })
export const createItem = (payload) => api.post('/items', payload)
export const updateItem = (id, payload) => api.put(`/items/${id}`, payload)
export const deleteItem = (id) => api.delete(`/items/${id}`)
