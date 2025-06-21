<template>
  <!-- Table Display -->
  <BaseTable
    v-if="products.length"
    title="Products"
    :loading="productStore.loading"
    :search="search"
    :per-page="perPage"
    :columns="6"
    search-placeholder="Type here to Search Products"
    @update:search="updateSearch"
    @update:perPage="updatePerPage"
    @page="getByUrl"
  >
    <!-- Header -->
    <template #thead>
      <TableHeaderCell
        field="id"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @sort="sort"
        >ID</TableHeaderCell
      >
      <TableHeaderCell>Image</TableHeaderCell>
      <TableHeaderCell
        field="title"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @sort="sort"
        >Title</TableHeaderCell
      >
      <TableHeaderCell
        field="price"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @sort="sort"
        >Price</TableHeaderCell
      >
      <TableHeaderCell
        field="updated_at"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @sort="sort"
        >Last Updated At</TableHeaderCell
      >
      <TableHeaderCell>Action</TableHeaderCell>
    </template>

    <!-- Body -->
    <template #tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        class="hover:bg-gray-50 transition duration-150 ease-in-out"
      >
        <td class="border-b p-2">{{ product.id }}</td>

        <td class="border-b p-2">
          <div v-if="product.images?.length">
            <img :src="product.images[0].image" class="w-16 h-16 object-cover rounded" />
          </div>
          <div
            v-else
            class="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-500 text-sm rounded"
          >
            No Image
          </div>
        </td>

        <td class="border-b p-2 max-w-[200px] truncate">{{ product.title }}</td>
        <td class="border-b p-2">{{ product.price }}</td>
        <td class="border-b p-2">{{ product.updated_at }}</td>
        <td class="border-b p-2 relative">
          <div class="dropdown dropdown-end">
            <button tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v.01M12 12v.01M12 18v.01"
                />
              </svg>
            </button>
            <ul
              tabindex="0"
              class="dropdown-content z-[999] menu p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li><a @click="$emit('edit', product)">Edit</a></li>
              <li><a @click="openDeleteModal(product.id)" class="text-red-500">Delete</a></li>
            </ul>
          </div>
        </td>
      </tr>
    </template>
  </BaseTable>

  <!-- Empty state -->
  <div v-else class="text-center py-16 text-gray-500 text-lg">No products found.</div>

  <DeleteModal ref="deleteModalRef" @confirm="deleteConfirmed" />
</template>

<script setup>
const emit = defineEmits(['edit'])

import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import BaseTable from '@/components/core/table/BaseTable.vue'
import TableHeaderCell from '@/components/core/table/TableHeaderCell.vue'
import DeleteModal from '@/components/core/modal/DeleteModal.vue'

const productStore = useProductStore()
const products = computed(() => productStore.data)

const perPage = ref(10)
const search = ref('')
const sortField = ref('updated_at')
const sortDirection = ref('desc')
const currentPage = ref(1)

const deleteModalRef = ref(null)
const targetId = ref(null)

onMounted(() => {
  getProducts()
})

function getProducts() {
  productStore.getProducts(
    search.value,
    currentPage.value,
    perPage.value,
    sortField.value,
    sortDirection.value,
  )
}

function updateSearch(val) {
  search.value = val
  currentPage.value = 1
  getProducts()
}

function updatePerPage(val) {
  perPage.value = val
  currentPage.value = 1
  getProducts()
}

function sort(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  getProducts()
}

function getByUrl(url) {
  const page = new URL(url).searchParams.get('page')
  if (page) currentPage.value = parseInt(page)
  productStore.getProductsByUrl(url)
}

function openDeleteModal(id) {
  targetId.value = id
  deleteModalRef.value?.openModal()
}

function deleteConfirmed() {
  productStore.deleteProduct(targetId.value).then(getProducts)
}
</script>
