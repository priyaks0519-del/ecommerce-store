import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
}

// Products API
export const productsAPI = {
  getAll: (page = 0, size = 12) => api.get(`/products?page=${page}&size=${size}`),
  getById: (id) => api.get(`/products/${id}`),
  search: (name, page = 0, size = 12) => api.get(`/products/search?name=${name}&page=${page}&size=${size}`),
  getByCategory: (category, page = 0, size = 12) => api.get(`/products/category/${category}?page=${page}&size=${size}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
}

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (cartItemId, quantity) => api.put(`/cart/${cartItemId}?quantity=${quantity}`),
  remove: (cartItemId) => api.delete(`/cart/${cartItemId}`),
  clear: () => api.delete('/cart'),
  getTotal: () => api.get('/cart/total'),
}

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: (page = 0, size = 10) => api.get(`/orders?page=${page}&size=${size}`),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status?status=${status}`),
}

export default api