<template>
  <th
    @click="sortable && emit('sort', field)"
    class="border-b-2 p-2 text-left bg-gray-200 select-none"
    :class="[
      sortable ? 'cursor-pointer' : 'cursor-default',
      field === sortField ? 'bg-blue-50' : '',
    ]"
  >
    <div class="flex items-center justify-between gap-1">
      <span class="whitespace-nowrap text-sm font-medium">
        <slot />
      </span>

      <!-- Sort icon -->
      <template v-if="sortable && sortField === field">
        <svg
          v-if="sortDirection === 'asc'"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </template>

      <!-- Static icon for non-sortable like "Action" -->
      <template v-if="!sortable && field">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </template>
    </div>
  </th>
</template>

<script setup>
const {
  field,
  sortField,
  sortDirection,
  sortable = true,
} = defineProps({
  field: String,
  sortField: String,
  sortDirection: String,
  sortable: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['sort'])
</script>
