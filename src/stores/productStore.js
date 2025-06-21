import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    loading: false,
    meta: {},
  }),

  actions: {
    // ✅ Get paginated products with search & sort
    async getProducts(
      search = '',
      page = 1,
      perPage = 10,
      sortField = 'updated_at',
      sortDirection = 'desc',
    ) {
      this.loading = true
      try {
        const res = await axiosClient.get('/products', {
          params: {
            search,
            page,
            per_page: perPage,
            sort_field: sortField,
            sort_direction: sortDirection,
          },
        })
        this.data = res.data.data
        this.meta = res.data.meta
      } catch (error) {
        console.error('❌ Failed to load products:', error)
      } finally {
        this.loading = false
      }
    },

    // ✅ Get products using full pagination URL
    async getProductsByUrl(url) {
      this.loading = true
      try {
        const res = await axiosClient.get(url)
        this.data = res.data.data
        this.meta = res.data.meta
      } catch (error) {
        console.error('❌ Failed to fetch page:', error)
      } finally {
        this.loading = false
      }
    },

    // ✅ Create new product
    async createProduct(formData) {
      this.loading = true
      try {
        const res = await axiosClient.post('/products', formData)
        return res
      } catch (error) {
        console.error('❌ Failed to create product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Update existing product
    async updateProduct(id, formData) {
      this.loading = true
      try {
        const res = await axiosClient.post(`/products/${id}?_method=PUT`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        })
        return res
      } catch (error) {
        console.error(' Failed to update product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // ✅ Delete product by ID
    async deleteProduct(id) {
      this.loading = true
      try {
        const res = await axiosClient.delete(`/products/${id}`)
        return res
      } catch (error) {
        console.error('❌ Failed to delete product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // ✅ Optional: Get product by ID (useful for editing from URL)
    async getProductById(id) {
      try {
        const res = await axiosClient.get(`/products/${id}`)
        return res.data.data
      } catch (error) {
        console.error(`❌ Failed to fetch product ID ${id}:`, error)
        throw error
      }
    },
  },
})
