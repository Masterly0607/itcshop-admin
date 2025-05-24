<template>
  <div class="bg-white p-4 rounded-lg shadow mt-10">
    <div class="flex justify-between border-b-2 pb-3 items-center">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">Per Page</span>
        <select v-model="perPage" class="select" @change="getProducts()">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type here to Search Products"
          class="input"
          v-model="search"
          @change="getProducts()"
        />
      </div>
    </div>

    <div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <TableHeaderCell
              class="border-b-2 p-2 text-left"
              field="id"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortProduct"
            >
              ID
            </TableHeaderCell>

            <TableHeaderCell
              class="border-b-2 p-2 text-left"
              field=""
              :sort-field="sortField"
              :sort-direction="sortDirection"
            >
              Image
            </TableHeaderCell>

            <TableHeaderCell
              class="border-b-2 p-2 text-left"
              field="title"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortProduct"
            >
              Title
            </TableHeaderCell>

            <TableHeaderCell
              class="border-b-2 p-2 text-left"
              field="price"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortProduct"
            >
              Price
            </TableHeaderCell>

            <TableHeaderCell
              class="border-b-2 p-2 text-left"
              field="updated_at"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortProduct"
            >
              Last Updated At
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody v-if="productStore.loading">
          <tr>
            <td colspan="5">
              <SpinnerComponent class="my-4"></SpinnerComponent>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="product in products" :key="product.id">
            <td class="border-b p-2">{{ product.id }}</td>
            <td class="border-b p-2">
              <img :src="product.image" :alt="product.name" srcset="" class="w-16" />
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ product.title }}
            </td>
            <td class="border-b p-2">{{ product.price }}</td>
            <td class="border-b p-2">{{ product.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-5" v-if="!productStore.loading">
        <span> Showing form {{ meta.from }} to {{ meta.to }} </span>
        <nav v-if="meta.total > meta.per_page">
          <a
            href="#"
            v-for="(link, i) in meta.links"
            :key="i"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            v-html="link.label"
            :class="[
              link.active
                ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md' : '',
              i === meta.links.length - 1 ? 'rouned-r-md' : '',
              !link.url ? 'pointer-events-none opacity-50' : '',
            ]"
          >
          </a>
          <!--  v-html="link.label"  = Laravel gives the label as HTML string like « Previous or 1, 2 → this renders it as HTML instead of plain text.-->
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'
import { ref, computed, onMounted } from 'vue'
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import TableHeaderCell from '@/components/core/table/TableHeaderCell.vue'
import { PRODUCTS_PER_PAGE } from '../../constants'
const productStore = useProductStore()
const perPage = ref(PRODUCTS_PER_PAGE)
const search = ref('')
const products = computed(() => productStore.data)
const meta = computed(() => productStore.meta)
const sortField = ref('updated_at')
const sortDirection = ref('desc')
onMounted(() => {
  getProducts()
})
async function getProducts(
  searchText = search.value,
  per = perPage.value,
  sort_field = sortField.value,
  sort_direction = sortDirection.value,
) {
  await productStore.getProducts(searchText, 1, per, sort_field, sort_direction) // why put 1 ? If we don't put one, when we search in page3, the data of search will match only page3. What if data of search exist in page1 or page2? So, we reset to page1
}
async function getForPage(ev, link) {
  ev.preventDefault() // Prevent default <a href> behavior

  if (!link.url) return // Don’t do anything if the link is disabled

  try {
    await productStore.getProductsByUrl(link.url)
  } catch (error) {
    console.error('Failed to get page:', error)
  }
}

// Sorting
function sortProduct(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }

  // 👇 Fetch data again with new sort values
  getProducts(search.value, perPage.value, sortField.value, sortDirection.value)
}
</script>
