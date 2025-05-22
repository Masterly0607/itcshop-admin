import axiosClient from '@/axios'
import { defineStore } from 'pinia'

import router from '@/router'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: sessionStorage.getItem('TOKEN') || null,
    data: null,
    loading: false,
    // why we need || '{}'? => if data is null, it will crash your server. Because JSON.parse(expects string). JSON.parse = Converts string → object
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axiosClient.post('/login', credentials)
        this.token = response.data.token
        this.data = response.data.user

        // Save token to sessionStorage
        sessionStorage.setItem('TOKEN', this.token)
        sessionStorage.setItem('USER', JSON.stringify(this.data)) // Converts object → string. Save to storage or send to server. We set this Content-Type: application/json when we send data to server. So, we need to convert js obj to json.

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
    getUser() {
      this.loading = true
      const user = sessionStorage.getItem('USER')
      if (user) {
        this.data = JSON.parse(user)
      } else {
        this.data = null
      }
      this.loading = false
    },
  },
})
