import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    data: [],
    loading: false,
  }),

  actions: {
    async getCoupons() {
      this.loading = true
      try {
        const res = await axiosClient.get('/coupons')
        this.data = res.data
      } catch (error) {
        console.error('Failed to fetch coupons:', error)
      } finally {
        this.loading = false
      }
    },

    async createCoupon(data) {
      this.loading = true
      try {
        const res = await axiosClient.post('/coupons', data)
        return res.data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCoupon(id, data) {
      this.loading = true
      try {
        const res = await axiosClient.put(`/coupons/${id}`, data)
        return res.data
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCoupon(id) {
      this.loading = true
      try {
        await axiosClient.delete(`/coupons/${id}`)
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
