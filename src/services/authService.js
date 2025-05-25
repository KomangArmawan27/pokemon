// src/services/authService.js
import axios from 'axios'

const BASE_URL = 'https://gopoke-production.up.railway.app/api/v1'

export async function login(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' }
  }
}

export async function register(email, name, password) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { email, name, password })
    return response.data
  } catch (error) {
    throw error
  }
}
