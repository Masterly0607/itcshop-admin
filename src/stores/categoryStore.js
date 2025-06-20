// src/stores/categoryStore.js
import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    loading: false,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await axiosClient.get('/categories')
        this.categories = res.data
      } finally {
        this.loading = false
      }
    },

    async create(data) {
      await axiosClient.post('/categories', data)
      await this.fetchAll()
    },

    async update(id, data) {
      const clean = {
        name: data.name, // ✅ only send what backend needs
      }
      await axiosClient.put(`/categories/${id}`, clean)
      await this.fetchAll()
    },

    async destroy(id) {
      await axiosClient.delete(`/categories/${id}`)
      await this.fetchAll()
    },
  },
})
