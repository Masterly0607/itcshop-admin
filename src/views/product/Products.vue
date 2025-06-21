<template>
  <section class="flex flex-col flex-1 min-h-0">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-semibold">Products</div>
      <button class="btn btn-primary text-white" @click="showAddProductModal">
        Add new Product
      </button>
    </div>

    <!-- Product Modal -->
    <ProductModal ref="modal" :product="currentProduct" />

    <!-- Table Container -->
    <div class="flex-1 overflow-auto">
      <ProductsTable :onEdit="editProduct" />
    </div>

    <!-- Bottom Pagination -->
    <div
      v-if="productStore.meta.total > 0"
      class="mt-auto flex justify-between items-center px-2 py-4 text-sm text-gray-500"
    >
      <div>
        Showing from {{ productStore.meta.from }} to {{ productStore.meta.to }} of
        {{ productStore.meta.total }}
      </div>
      <div class="join">
        <button
          class="join-item btn btn-sm"
          :disabled="productStore.meta.current_page === 1"
          @click="goToPage(productStore.meta.current_page - 1)"
        >
          « Previous
        </button>
        <button class="join-item btn btn-sm btn-active">
          {{ productStore.meta.current_page }}
        </button>
        <button
          class="join-item btn btn-sm"
          :disabled="productStore.meta.current_page === productStore.meta.last_page"
          @click="goToPage(productStore.meta.current_page + 1)"
        >
          Next »
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ProductModal from './ProductModal.vue'
import ProductsTable from './ProductsTable.vue'
import { useProductStore } from '@/stores/productStore'

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
  currentProduct.value = JSON.parse(
    JSON.stringify({
      id: p.id,
      title: p.title ?? '',
      images: p.images ?? [],
      description: p.description ?? '',
      price: p.price ?? '',
      category_id: p.category_id ?? '',
      flash_sale_start: p.flash_sale_start ? p.flash_sale_start.slice(0, 16).replace(' ', 'T') : '',
      flash_sale_end: p.flash_sale_end ? p.flash_sale_end.slice(0, 16).replace(' ', 'T') : '',
    }),
  )

  await nextTick()
  modal.value?.openModal()
}

function goToPage(page) {
  const url = `${import.meta.env.VITE_API_BASE_URL}/products?page=${page}`
  productStore.getProductsByUrl(url)
}
</script>
