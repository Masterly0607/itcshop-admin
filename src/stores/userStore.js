import axiosClient from '@/axios'
import { defineStore } from 'pinia'

import router from '@/router'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: sessionStorage.getItem('TOKEN') || null,
    data: {},
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axiosClient.post('/login', credentials)
        this.token = response.data.token
        this.data = response.data.user
        // Save token to sessionStorage
        sessionStorage.setItem('TOKEN', this.token)
        // Go to dashboard or home
        router.push({ name: 'app.dashboard' })
      } catch (error) {
        console.error('Login error:', error)
        throw error // let UI handle error message (e.g. toast)
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.data = {}
      sessionStorage.removeItem('TOKEN')
      router.push({ name: 'login' })
    },
  },
})
