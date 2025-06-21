// stores/orderStore.ts
import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    filteredOrders: [],
    loading: false,
  }),
  actions: {
    async getOrders() {
      this.loading = true
      const res = await axiosClient.get('/orders')
      this.orders = res.data
      this.filteredOrders = res.data

      this.loading = false
    },
    async getOrderById(id) {
      const res = await axiosClient.get(`/orders/${id}`)
      return res.data
    },
    async updateOrder(id, data) {
      try {
        await axiosClient.post(`/orders/${id}`, data, {
          params: {
            _method: 'PUT',
          },
        })
        await this.getOrders() // 🔁 Refresh the order list after update
      } catch (error) {
        console.error('Failed to update order:', error)
        throw error
      }
    },
    filterOrders(search) {
      this.orders = this.orders.filter((o) =>
        o.customer?.name?.toLowerCase().includes(search.toLowerCase()),
      )
    },
  },
})
