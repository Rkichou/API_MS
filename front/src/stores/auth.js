import { defineStore } from 'pinia'
import api from '../config/api'
import { useCartStore } from './cart'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/users/login', credentials)
        this.setAuth(response.data)
        return response
      } catch (error) {
        throw error
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/users/register', userData)
        this.setAuth(response.data)
        return response
      } catch (error) {
        throw error
      }
    },

    setAuth(data) {
      this.token = data.token
      this.userId = data.userId
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },

    logout() {
      this.token = null
      this.userId = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      delete api.defaults.headers.common['Authorization']
      const cartStore = useCartStore()
      cartStore.clearCart()
    }
  }
})