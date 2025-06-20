import { defineStore } from 'pinia'
import axiosClient from '@/axios'
export const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    loading: false,
    meta: {},
  }),
  actions: {
    // Get all products
    // search = '', page = 1, perPage = 10 = These are default values for the parameters. If u call getProducts(). It looks like this getProducts('', 1, 10)
    async getProducts(
      search,
      page = 1,
      perPage = 10,
      sortField = 'updated_at',
      sortDirection = 'desc',
    ) {
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
        console.error('Failed to load products:', error)
      }
    },

    // Get product by URL
    async getProductsByUrl(url) {
      this.loading = true
      try {
        const response = await axiosClient.get(url)
        this.data = response.data.data
        this.meta = response.data.meta
      } catch (error) {
        console.error('Failed to fetch page:', error)
      } finally {
        this.loading = false
      }
    },

    // Create Product
    async createProduct(formData) {
      this.loading = true
      try {
        const response = await axiosClient.post('/products', formData)
        return response
      } catch (error) {
        console.error('Failed to create product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Delete Product
    async deleteProduct(id) {
      this.loading = true
      try {
        const response = await axiosClient.delete(`/products/${id}`)
        return response
      } catch (error) {
        console.error('Failed to delete product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Update product
    // Update Product
    async updateProduct(id, formData) {
      this.loading = true
      try {
        const response = await axiosClient.post(`/products/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            _method: 'PUT',
          },
        })
        return response
      } catch (error) {
        console.error('Failed to update product:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
