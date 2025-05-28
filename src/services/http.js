import axios from 'axios'
import router from '../router'

const http = axios.create({
  baseURL: 'https://gopoke-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach token
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to catch 401 errors globally
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')

      // Ensure redirection works in hash-based routing (GitHub Pages)
      window.location.href = `${window.location.origin}/#/login`
    }
    return Promise.reject(error)
  }
)

export default http
