<!-- Products.vue -->
<template>
  <section class="flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-semibold">Products</div>
      <button class="btn btn-primary text-white" @click="showAddProductModal">
        Add new Product
      </button>
    </div>

    <ProductModal ref="modal" :product="currentProduct" :key="currentProduct.id ?? 'new'" />

    <div class="flex-1 overflow-auto">
      <ProductsTable :onEdit="editProduct" />
    </div>
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
  category_id: '',
  flash_sale_start: '',
  flash_sale_end: '',
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
    category_id: '',
    flash_sale_start: '',
    flash_sale_end: '',
  }
  modal.value?.openModal()
}

async function editProduct(p) {
  currentProduct.value = {
    id: p.id,
    title: p.title ?? '',
    images: p.images ?? [],
    description: p.description ?? '',
    price: p.price ?? '',
    category_id: p.category_id ?? '',

    //  Properly format datetime-local
    flash_sale_start: p.flash_sale_start ? p.flash_sale_start.slice(0, 16).replace(' ', 'T') : '',
    flash_sale_end: p.flash_sale_end ? p.flash_sale_end.slice(0, 16).replace(' ', 'T') : '',
  }

  await nextTick()
  modal.value?.openModal()
}
</script>
