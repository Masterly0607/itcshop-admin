import axiosClient from '@/axios'
import { defineStore } from 'pinia'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: sessionStorage.getItem('TOKEN') || null,
    data: null,
    loading: false,
    users: [],
  }),

  actions: {
    //  Auth: Login
    async login(credentials) {
      try {
        const response = await axiosClient.post('/admin/login', credentials)
        this.token = response.data.token
        this.data = response.data.user

        sessionStorage.setItem('TOKEN', this.token)
        sessionStorage.setItem('USER', JSON.stringify(this.data))
        router.push({ name: 'app.dashboard' })
      } catch (error) {
        console.error('Login error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    //  Logout
    logout() {
      this.token = null
      this.data = null
      sessionStorage.removeItem('TOKEN')
      sessionStorage.removeItem('USER')
      router.push({ name: 'login' })
    },

    //  Get all users

    async getUsers(params) {
      this.loading = true
      try {
        const res = await axiosClient.get('admin/users', { params })
        this.users = res.data // for backup or use elsewhere
        return res.data // return the paginated response
      } catch (err) {
        console.error('Failed to fetch users:', err)
      } finally {
        this.loading = false
      }
    },

    //  Create user
    async createUser(userData) {
      try {
        await axiosClient.post('admin/users', userData)
      } catch (err) {
        console.error('Create user failed:', err)
        throw err
      }
    },

    //  Update user
    async updateUser(id, userData) {
      try {
        await axiosClient.put(`admin/users/${id}`, userData)
      } catch (err) {
        console.error('Update user failed:', err)
        throw err
      }
    },

    //  Delete user
    async deleteUser(id) {
      try {
        await axiosClient.delete(`admin/users/${id}`)
      } catch (err) {
        console.error('Delete user failed:', err)
        throw err
      }
    },
  },
})
