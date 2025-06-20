<!-- src/views/admin/categories/Categories.vue -->
<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Manage Categories</h1>
      <button class="btn btn-primary text-white" @click="openCreate">Add Category</button>
    </div>

    <CategoryModal ref="modalRef" :category="selectedCategory" @refresh="categoryStore.fetchAll" />
    <CategoriesTable
      :categories="categoryStore.categories"
      :loading="categoryStore.loading"
      @edit="openEdit"
      @delete="deleteCategory"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryModal from './CategoryModal.vue'
import CategoriesTable from './CategoriesTable.vue'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()
const modalRef = ref(null)
const selectedCategory = ref(null)

const openCreate = () => {
  selectedCategory.value = null
  modalRef.value.openModal()
}

const openEdit = (cat) => {
  selectedCategory.value = { ...cat }
  modalRef.value.openModal()
}

const deleteCategory = (id) => {
  if (confirm('Are you sure you want to delete?')) {
    categoryStore.destroy(id)
  }
}

onMounted(() => categoryStore.fetchAll())
</script>
