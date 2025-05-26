<template>
  <section>
    <div class="flex items-center justify-between">
      <div class="text-3xl font-semibold">Products</div>
      <button class="btn btn-primary text-white" @click="showAddProductModal">
        Add new Product
      </button>
    </div>

    <ProductModal ref="modal" :product="currentProduct" />

    <ProductsTable />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductModal from './ProductModal.vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import ProductsTable from './ProductsTable.vue'

const modal = ref(null)
const currentProduct = ref({
  id: null,
  title: '',
  image: '',
  description: '',
  price: '',
})

// ✅ Use Pinia store to get products from backend
const productStore = useProductStore()
const { data: products } = storeToRefs(productStore)

onMounted(() => {
  productStore.getProducts()
})

function showAddProductModal() {
  currentProduct.value = {
    id: null,
    title: '',
    image: '',
    description: '',
    price: '',
  }
  modal.value?.openModal()
}

function editProduct(product) {
  currentProduct.value = { ...product }
  modal.value?.openModal()
}
</script>
