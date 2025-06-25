import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    loading: false,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await axiosClient.get('/customers')
        this.customers = res.data
      } finally {
        this.loading = false
      }
    },

    async update(id, data) {
      const clean = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        address: data.address,
      }
      await axiosClient.put(`/customers/${id}`, clean)
      await this.fetchAll()
    },

    async destroy(id) {
      await axiosClient.delete(`/customers/${id}`)
      await this.fetchAll()
    },
  },
})
