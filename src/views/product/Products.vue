<template>
  <section>
    <div class="flex items-center justify-between">
      <div class="text-3xl font-semibold">Products</div>
      <input
        type="submit"
        value="Add new Product"
        class="btn btn-primary text-white"
        @click="showAddProductModal"
      />
    </div>
    <ProductModal ref="modal" />
    <!-- ref="modal" = gives you a connection to the <ProductModal> component -->
    <ProductsTable />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProductModal from './ProductModal.vue'
import ProductsTable from './ProductsTable.vue'

const modal = ref(null)

function showAddProductModal() {
  modal.value?.openModal()
}
// const emptyProduct = ref({
//   id: null,
//   title: '',
//   image: '',
//   description: '',
//   price: '',
// })
</script>
