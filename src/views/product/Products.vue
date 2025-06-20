<!-- ✅ Products.vue -->
<template>
  <section>
    <div class="flex items-center justify-between">
      <div class="text-3xl font-semibold">Products</div>
      <button class="btn btn-primary text-white" @click="showAddProductModal">
        Add new Product
      </button>
    </div>

    <ProductModal ref="modal" :product="currentProduct" :key="currentProduct.id ?? 'new'" />
    <ProductsTable :onEdit="editProduct" />
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ProductModal from './ProductModal.vue'
import { useProductStore } from '@/stores/productStore'
import ProductsTable from './ProductsTable.vue'

const modal = ref(null)
const productStore = useProductStore()

const currentProduct = ref({
  id: null,
  title: '',
  images: [],
  description: '',
  price: '',
})

onMounted(() => {
  productStore.getProducts()
})

function showAddProductModal() {
  currentProduct.value = {
    id: null,
    title: '',
    images: [],
    description: '',
    price: '',
  }
  modal.value?.openModal()
}

async function editProduct(product) {
  currentProduct.value = JSON.parse(
    JSON.stringify({
      ...product,
      images: product.images ?? [],
    }),
  )
  await nextTick()
  modal.value?.openModal()
}
</script>
