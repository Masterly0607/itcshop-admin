<template>
  <section>
    <div class="flex items-center justify-between">
      <div class="text-3xl font-semibold">Products</div>
      <button class="btn btn-primary text-white" @click="showAddProductModal">
        Add new Product
      </button>
    </div>

    <ProductModal ref="modal" :product="currentProduct" />
    <!-- why ref="modal"? => If you want to control the modal (child) from the parent, like calling openModal() or closeModal() -->
    <ProductsTable :onEdit="editProduct" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductModal from './ProductModal.vue'
import { useProductStore } from '@/stores/productStore'
import ProductsTable from './ProductsTable.vue'

const modal = ref(null) // ref for modal component so we can call openModal()

// default object to use when creating/editing
const currentProduct = ref({
  id: null,
  title: '',
  image: '',
  description: '',
  price: '',
})

const productStore = useProductStore()

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
} // Resets form, then opens modal

function editProduct(product) {
  currentProduct.value = { ...product }
  modal.value?.openModal()
}
</script>
