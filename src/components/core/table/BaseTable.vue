<template>
  <div class="bg-white p-4 rounded-lg shadow mt-6">
    <!-- Top Controls -->
    <div
      v-if="search !== undefined || perPage !== undefined"
      class="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-200 mb-4"
    >
      <!-- Per Page Dropdown -->
      <div v-if="perPage !== undefined" class="flex items-center gap-2 whitespace-nowrap">
        <span class="text-sm font-medium">Per Page</span>
        <select
          class="select select-sm select-bordered"
          :value="perPage"
          @change="$emit('update:perPage', +$event.target.value)"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <!-- Search Box -->
      <div v-if="search !== undefined">
        <input
          type="text"
          class="input input-sm input-bordered w-64"
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          :placeholder="searchPlaceholder || 'Search...'"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead class="bg-gray-50 text-sm text-gray-700 font-semibold">
          <tr>
            <slot name="thead" />
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr>
            <td :colspan="columns" class="text-center py-4 text-sm text-gray-500">Loading...</td>
          </tr>
        </tbody>

        <tbody v-else>
          <slot name="tbody" />
        </tbody>
      </table>
    </div>

    <!-- Optional Pagination could go here later -->
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
  meta: Object,
  search: String, // optional
  perPage: Number, // optional
  searchPlaceholder: String, // optional
  columns: Number,
})
</script>
