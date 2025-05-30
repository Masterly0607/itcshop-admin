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
            <TableHeaderCell class="border-b-2 p-2 text-left" field="action">
              Action
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
              <img :src="product.image + '?t=' + Date.now()" class="w-16" />
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
              {{ product.title }}
            </td>
            <td class="border-b p-2">{{ product.price }}</td>
            <td class="border-b p-2">{{ product.updated_at }}</td>
            <td class="border-b p-2">
              <div class="dropdown dropdown-end dropdown-sm">
                <div tabindex="0" role="button" class="btn m-1 btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content menu bg-base-100 rounded-box z-1 w-35 p-2 shadow-sm"
                >
                  <li @click="$emit('edit', product)">
                    <a>
                      <span
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5 text-primary"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </span>
                      <span>Edit</span>
                    </a>
                  </li>
                  <li @click="deleteProduct(product.id)">
                    <a>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5 text-primary"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </span>
                      <span>Delete</span>
                    </a>
                  </li>
                </ul>
              </div>
            </td>
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
import { ref, computed } from 'vue'
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
defineProps({
  onEdit: Function, // parent will pass this
})
// Ok: Get all project(the parameter inside this function called the default value of the function)
async function getProducts(
  searchText = search.value,
  per = perPage.value,
  sort_field = sortField.value,
  sort_direction = sortDirection.value,
) {
  await productStore.getProducts(searchText, 1, per, sort_field, sort_direction) // Why when searching or filtering, we reset page to page one?
}

async function getForPage(ev, link) {
  ev.preventDefault()

  if (!link.url) return

  try {
    await productStore.getProductsByUrl(link.url)
  } catch (error) {
    console.error('Failed to get page:', error)
  }
}

// OK: Sorting Product
function sortProduct(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  getProducts(search.value, perPage.value, sortField.value, sortDirection.value)
}

// Delete Product
async function deleteProduct(id) {
  const confirmed = confirm('Are you sure you want to delete this product?')
  if (!confirmed) return
  try {
    await productStore.deleteProduct(id)
    await productStore.getProducts()
  } catch (error) {
    console.error('Delete failed:', error)
  }
}
</script>
